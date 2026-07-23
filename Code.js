// ═══════════════════════════════════════════════════════
//  BJH Sales Dashboard — Apps Script (Code.gs)
// [PDF-ASSETS v145] ฟอนต์ Sarabun (Regular/Bold) + โลโก้ BJC ฝัง base64 สำหรับ PDF
// [V559] SARABUN_REGULAR_B64 / SARABUN_BOLD_B64 / BJC_LOGO_B64 moved to PdfAssets.js
//  Data: Google Drive (compressed JSON)
//  Config: Google Sheets (fad / spfix / budget / sa_bud)
// ═══════════════════════════════════════════════════════

var FOLDER_NAME    = 'BJH_Dashboard_Data';
var META_FILE_NAME = 'bjh_meta.json';
var SHEET_NAME     = 'BJH_Config'; // ชื่อ Google Sheet
var BJH_CONFIG_ID  = '1b_EKGBYe8Wbb1G6XFhbEy6b7ODX6BCYYqNhcg8kTSDk'; // ID ตายตัวของ BJH_Config

// ── Respond ───────────────────────────────────────────────
function respond(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── logAccess: บันทึก log การเข้าใช้งานลง Sheet '_log' (รวม access+activity) ──
//   รับ name จาก frontend (จาก _currentUser.name) แทน email
function logAccess(tab, name) {
  try {
    var userName = String(name||'(unknown)').trim();
    if (!userName) userName = '(unknown)';
    _logAppend('access', userName, String(tab||'(unknown)'), '');
    return JSON.stringify({ok:true, name: userName});
  } catch(e) {
    return JSON.stringify({ok:false, error: String(e.message||e)});
  }
}

// ── Get Access Statistics (Admin only) ──────────────────────
//   range: 'today' | '7d' | '30d' | 'all' (default: '30d')
//   Returns: { ok, users: [{name, lastAccess, todayCount, rangeCount}], summary }
function getAccessStats(range) {
  try {
    range = String(range||'30d').toLowerCase();
    var ss = getSpreadsheet();
    var sh = ss.getSheetByName('_log');
    if (!sh || sh.getLastRow() < 2) {
      return JSON.stringify({ ok:true, users:[], summary:{total:0,today:0,activeToday:0}, range: range });
    }
    var data = sh.getDataRange().getValues();
    // header: timestamp | type | user_name | action | detail
    var now = new Date();
    var todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    var rangeStart;
    if (range === 'today') rangeStart = todayStart;
    else if (range === '7d') rangeStart = todayStart - 7*24*3600*1000;
    else if (range === '30d') rangeStart = todayStart - 30*24*3600*1000;
    else rangeStart = 0; // all
    var userMap = {};
    var totalRange = 0, totalToday = 0;
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var ts = row[0];
      var type = String(row[1]||'');
      var name = String(row[2]||'').trim();
      if (type !== 'access') continue;
      if (!name || name === '(unknown)') continue;
      var tsMs;
      if (ts instanceof Date) tsMs = ts.getTime();
      else if (typeof ts === 'string') { var d = new Date(ts); tsMs = isNaN(d) ? 0 : d.getTime(); }
      else if (typeof ts === 'number') tsMs = ts;
      else continue;
      if (tsMs < rangeStart) continue;
      if (!userMap[name]) {
        userMap[name] = { name: name, lastAccess: tsMs, todayCount: 0, rangeCount: 0 };
      }
      userMap[name].rangeCount++;
      totalRange++;
      if (tsMs >= todayStart) {
        userMap[name].todayCount++;
        totalToday++;
      }
      if (tsMs > userMap[name].lastAccess) userMap[name].lastAccess = tsMs;
    }
    var users = Object.keys(userMap).map(function(k){
      var u = userMap[k];
      return {
        name: u.name,
        lastAccess: new Date(u.lastAccess).toISOString(),
        todayCount: u.todayCount,
        rangeCount: u.rangeCount
      };
    });
    // sort by lastAccess desc
    users.sort(function(a,b){ return new Date(b.lastAccess).getTime() - new Date(a.lastAccess).getTime(); });
    var activeToday = users.filter(function(u){ return u.todayCount > 0; }).length;
    return JSON.stringify({
      ok: true,
      users: users,
      summary: { total: totalRange, today: totalToday, activeToday: activeToday },
      range: range
    });
  } catch(e) {
    return JSON.stringify({ ok:false, error: String(e.message||e) });
  }
}

// ── doGet ─────────────────────────────────────────────────
// ── include (HTML template helper) ─────────────────────────────────
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ════════════════════════════════════════════════════════
// [v486] HTTP FAST PATH — เลี่ยง google.script.run
//   วัดจริง V484: script.run ส่ง 3.25 MB ใช้ 8.8s = ~370 KB/s
//     (ไม่ใช่ HTTP — เป็น postMessage bridge ผ่าน iframe sandbox, serialize ทุก byte)
//   ContentService + fetch() = HTTP จริง + gzip transport + browser 6 concurrent
//   client มี fallback อัตโนมัติ -> fetch พังเมื่อไหร่ ใช้ script.run เหมือนเดิม (ไม่มีทางแย่ลง)
//   ความปลอดภัย: ไม่ต่างจากเดิม — /exec URL เดิมก็เรียก getDataForClientTx() ได้อยู่แล้วโดยไม่ต้อง login
// ════════════════════════════════════════════════════════
// [v488] ตั้ง URL /exec ครั้งเดียว — เปิด Apps Script Editor -> เลือกฟังก์ชันนี้ -> Run -> ดู Logger
//   ถ้า Logger แสดง .../dev  = ยังไม่ได้ Deploy หรือ getUrl() คืน dev
//   -> ให้ copy URL /exec (ตัวที่ทีมขายใช้) มาใส่เองด้วย bjhSetExecUrl('https://.../exec')
function bjhSaveExecUrl() {
  var u = '';
  try { u = ScriptApp.getService().getUrl() || ''; } catch(e) { u = ''; }
  if (u && u.indexOf('/exec') >= 0) {
    PropertiesService.getScriptProperties().setProperty('BJH_EXEC_URL', u);
    Logger.log('[v488] ✅ บันทึกแล้ว BJH_EXEC_URL = ' + u);
  } else {
    Logger.log('[v488] ⚠️ getUrl() คืน: ' + (u || '(ว่าง)'));
    Logger.log('[v488] -> ให้รัน bjhSetExecUrl("https://script.google.com/macros/s/<DEPLOYMENT_ID>/exec") แทน');
  }
  return u;
}
function bjhSetExecUrl(url) {
  url = String(url || '').trim();
  if (url.indexOf('/exec') < 0) { Logger.log('[v488] ❌ ต้องเป็น URL ที่ลงท้าย /exec'); return false; }
  PropertiesService.getScriptProperties().setProperty('BJH_EXEC_URL', url);
  Logger.log('[v488] ✅ บันทึกแล้ว BJH_EXEC_URL = ' + url);
  return true;
}
function bjhShowUrls() {
  var g = ''; try { g = ScriptApp.getService().getUrl(); } catch(e) {}
  var p = ''; try { p = PropertiesService.getScriptProperties().getProperty('BJH_EXEC_URL') || '(ยังไม่ตั้ง)'; } catch(e) {}
  Logger.log('getService().getUrl() = ' + g);
  Logger.log('BJH_EXEC_URL (prop)   = ' + p);
  return { getUrl: g, prop: p };
}

// ══════════════════════════════════════════════════════════════
// [C30] CACHE LAYER — ปัญหาจริงที่ทำให้ช้า
//   วัดจริง: HTTP tx = 11.3s → 20.3s (แกว่ง 2 เท่า!) สำหรับไฟล์ 3.26 MB
//   ไม่ใช่ network — เป็น getDataAsString() อ่าน Drive ฝั่ง server (ช้า + แกว่งมาก)
//   แก้: cache เนื้อไฟล์ใน CacheService (chunk 90KB) + warm จาก trigger
//        -> ไม่มีใครต้องอ่าน Drive อีกเลย
//
//   version key มาจาก Script Properties (BJH_VER_TX / BJH_VER_MASTER / BJH_VER_CFG)
//   trigger เขียนไฟล์ใหม่ = bump version = cache key ใหม่ -> ไม่มีทางได้ข้อมูลเก่า ✅
// ══════════════════════════════════════════════════════════════
var _BJH_CHUNK = 90000;   // < 100KB (เพดาน CacheService ต่อ key)
var _BJH_TTL   = 21600;   // 6 ชม. (เพดาน CacheService)

function _bjhVer(which) {
  try { return PropertiesService.getScriptProperties().getProperty('BJH_VER_' + which) || '0'; }
  catch (e) { return '0'; }
}
function _bjhBumpVer(which) {
  var v = String(Date.now());
  try { PropertiesService.getScriptProperties().setProperty('BJH_VER_' + which, v); } catch (e) {}
  Logger.log('[CACHE] bump BJH_VER_' + which + ' = ' + v);
  return v;
}

function _bjhCachePut(key, str) {
  if (!str) return false;
  try {
    var c = CacheService.getScriptCache();
    var n = Math.ceil(str.length / _BJH_CHUNK);
    if (n > 500) { Logger.log('[CACHE] ' + key + ' ใหญ่เกิน (' + n + ' chunks) -> ข้าม'); return false; }
    var t0 = Date.now(), buf = {}, cnt = 0;
    for (var i = 0; i < n; i++) {
      buf[key + '_' + i] = str.substr(i * _BJH_CHUNK, _BJH_CHUNK);
      cnt++;
      if (cnt >= 40) { c.putAll(buf, _BJH_TTL); buf = {}; cnt = 0; }
    }
    if (cnt) c.putAll(buf, _BJH_TTL);
    c.put(key + '_n', String(n), _BJH_TTL);   // marker เขียนท้ายสุด = atomic (อ่านเจอ = ครบแล้ว)
    Logger.log('[CACHE] PUT ' + key + ' | ' + (str.length / 1048576).toFixed(2) + ' MB / '
               + n + ' chunks | ' + (Date.now() - t0) + 'ms');
    return true;
  } catch (e) { Logger.log('[CACHE] put fail ' + key + ': ' + e); return false; }
}

function _bjhCacheGet(key) {
  try {
    var c = CacheService.getScriptCache();
    var nStr = c.get(key + '_n');
    if (!nStr) return null;
    var n = parseInt(nStr, 10);
    if (!n || n < 1) return null;
    var t0 = Date.now(), out = '';
    for (var s = 0; s < n; s += 40) {
      var keys = [], end = Math.min(s + 40, n);
      for (var i = s; i < end; i++) keys.push(key + '_' + i);
      var got = c.getAll(keys);
      for (var j = s; j < end; j++) {
        var v = got[key + '_' + j];
        if (v == null) { Logger.log('[CACHE] MISS ' + key + ' (chunk ' + j + ' หาย)'); return null; }
        out += v;
      }
    }
    Logger.log('[CACHE] ✅ HIT ' + key + ' | ' + (out.length / 1048576).toFixed(2)
               + ' MB | ' + (Date.now() - t0) + 'ms');
    return out;
  } catch (e) { Logger.log('[CACHE] get fail ' + key + ': ' + e); return null; }
}

// อ่านเนื้อไฟล์จาก Drive แบบ cache-first
function _bjhReadDriveCached(fileName, verKey) {
  var ck = 'bjhF_' + verKey + '_' + _bjhVer(verKey);
  var hit = _bjhCacheGet(ck);
  if (hit) return hit;
  var t0 = Date.now();
  var folder = getOrCreateFolder();
  var it = folder.getFilesByName(fileName);
  if (!it.hasNext()) return null;
  var content = it.next().getBlob().getDataAsString();
  Logger.log('[CACHE] ⏳ Drive read ' + fileName + ' | ' + (content.length / 1048576).toFixed(2)
             + ' MB | ' + (Date.now() - t0) + 'ms  (cache miss)');
  _bjhCachePut(ck, content);
  return content;
}

// meta (ไฟล์เล็ก) — cache ด้วย version เดียวกับ TX
function _bjhMetaCached() {
  var ck = 'bjhMETA_' + _bjhVer('TX');
  var hit = _bjhCacheGet(ck);
  if (hit) { try { return JSON.parse(hit) || {}; } catch (e) { return {}; } }
  var meta = {};
  try {
    var folder = getOrCreateFolder();
    var it = folder.getFilesByName(META_FILE_NAME);
    if (it.hasNext()) meta = JSON.parse(it.next().getBlob().getDataAsString()) || {};
  } catch (e) {}
  _bjhCachePut(ck, JSON.stringify(meta));
  return meta;
}

// ── warm cache (trigger เรียกหลังเขียนไฟล์เสร็จ / รันเองใน editor ก็ได้) ──
function bjhWarmCache() {
  var t0 = Date.now();
  try { _bjhReadDriveCached(SMARTFLOW_TX_FILE, 'TX'); }        catch (e) { Logger.log('[CACHE] warm TX fail: ' + e); }
  try { _bjhReadDriveCached(SMARTFLOW_MASTER_FILE, 'MASTER'); } catch (e) { Logger.log('[CACHE] warm MASTER fail: ' + e); }
  try { _bjhMetaCached(); } catch (e) {}
  Logger.log('[CACHE] ✅ warm เสร็จ ' + (Date.now() - t0) + 'ms');
  return true;
}
function bjhClearCache() {
  _bjhBumpVer('TX'); _bjhBumpVer('MASTER'); _bjhBumpVer('CFG');
  Logger.log('[CACHE] ล้าง cache แล้ว (bump version ทั้งหมด) — รอบหน้าจะอ่าน Drive ใหม่');
  return true;
}
function bjhCacheStatus() {
  var r = {};
  ['TX', 'MASTER', 'CFG'].forEach(function (k) {
    var ver = _bjhVer(k);
    var ck = (k === 'CFG') ? ('bjhCFG_' + ver) : ('bjhF_' + k + '_' + ver);
    var n = null;
    try { n = CacheService.getScriptCache().get(ck + '_n'); } catch (e) {}
    r[k] = { ver: ver, cached: !!n, chunks: n || 0 };
  });
  Logger.log(JSON.stringify(r, null, 2));
  return r;
}

function _txtOut(s, isJson) {
  return ContentService.createTextOutput(s)
    .setMimeType(isJson ? ContentService.MimeType.JSON : ContentService.MimeType.TEXT);
}

function doGet(e) {
  var action = e && e.parameter && e.parameter.action;

  // ── [v486] HTTP fast path ──
  if (action === 'ping')   return _txtOut('pong', false);
  if (action === 'boot')   return _txtOut(getBootBundle(e.parameter.yr), true);
  if (action === 'master') return _txtOut(getDataForClientMaster(), true);
  if (action === 'tx') {
    // ส่ง '' -> ข้าม block เขียน Sheet (_logActivity) ที่กินอีก 2-4s
    // client ยิง logAccess('Refresh') แยกแบบ fire-and-forget -> audit ยังครบ
    return _txtOut(getDataForClientTx('', ''), true);
  }

  if (action === 'getFiles')  return respond(getFilesFromDrive());
  if (action === 'getMeta')   return respond(getMetaFromDrive());
  if (action === 'getConfig') return respond(getConfig());
  if (action === 'getAccessStats') return respond(getAccessStats(e.parameter.range));
  var _t = HtmlService.createTemplateFromFile('Index');
  try { _t.execUrl = ScriptApp.getService().getUrl(); } catch(_e){ _t.execUrl = ''; }
  // [v488] apiUrl = URL /exec สำหรับ fetch() (HTTP fast path)
  //   ปัญหา V486: ScriptApp.getService().getUrl() คืน "/dev" ตอนเปิดจาก /dev
  //     -> fetch('/dev?action=ping') โดน CORS block (No 'Access-Control-Allow-Origin')
  //     เพราะ /dev ต้อง login Google -> ตอบหน้า auth ไม่ใช่ ContentService
  //   -> ต้องใช้ /exec (deployed, Access: Anyone) ซึ่ง ContentService ส่ง ACAO: * มาให้
  //   ตั้งครั้งเดียว: รัน bjhSaveExecUrl() ใน editor  (หรือใส่ Script Property 'BJH_EXEC_URL' เอง)
  try {
    var _api = PropertiesService.getScriptProperties().getProperty('BJH_EXEC_URL') || '';
    if (!_api) {
      var _u = _t.execUrl || '';
      _api = (_u.indexOf('/dev') >= 0) ? '' : _u;   // /dev ใช้ fetch ไม่ได้ -> ปล่อยว่าง -> client fallback script.run
    }
    _t.apiUrl = _api;
  } catch(_e2){ _t.apiUrl = ''; }
  return _t
    .evaluate()
    .setTitle('BJH Sales Dashboard')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ── doPost ────────────────────────────────────────────────
function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var action  = payload.action;
    if (action === 'uploadChunk')    return respond(uploadChunk(payload));
    if (action === 'finalizeUpload') return respond(finalizeUpload(payload));
    return respond({ ok: false, error: 'Unknown action: ' + action });
  } catch (err) {
    return respond({ ok: false, error: err.message });
  }
}

// ════════════════════════════════════════════════════════
//  CONFIG — อ่านจาก Google Sheets
// ════════════════════════════════════════════════════════

// ── _config_kv helpers: รวม 3 sheet (fcsp, fcfad, display_config) เข้า sheet เดียว ──
// Sheet schema: section | key | value
// - section: 'fcsp' | 'fcfad' | 'display_config'
// - key: ตาม section (เช่น '1'-'12' สำหรับ fcsp/fcfad, 'ordered'/'prospect' สำหรับ display_config)
// - value: string/number (parse ใน reader)
//
// Safety: legacy sheets (fcsp, fcfad, display_config) ยังคงอยู่
// - ถ้า _config_kv ไม่มี data ของ section นั้น → fallback อ่าน sheet เก่า
// - Save → เขียน _config_kv เท่านั้น (ไม่แตะ sheet เก่า)
// - Auto-migrate ครั้งแรก: ถ้า _config_kv ว่าง → copy จาก sheet เก่า
function _ckvReadAll(ss) {
  var sheet = ss.getSheetByName('_config_kv');
  if (!sheet) return null;
  var data = sheet.getDataRange().getValues();
  var result = {};
  for (var i = 1; i < data.length; i++) {
    var section = String(data[i][0]||'').trim();
    var key = String(data[i][1]||'').trim();
    var val = data[i][2];
    if (!section || !key) continue;
    if (!result[section]) result[section] = {};
    // [v247] parse JSON array/object ที่เก็บเป็น string (เช่น contract_track.quo_statuses)
    if (typeof val === 'string' && val.length>1 && (val.charAt(0)==='[' || val.charAt(0)==='{')) {
      try { val = JSON.parse(val); } catch(e){}
    }
    result[section][key] = val;
  }
  return result;
}
function _ckvWriteSection(ss, section, dataMap) {
  // อ่าน rows ที่ section อื่นก่อน
  var sheet = ss.getSheetByName('_config_kv') || ss.insertSheet('_config_kv');
  var existing = sheet.getDataRange().getValues();
  var keepRows = [];
  for (var i = 1; i < existing.length; i++) {
    var s = String(existing[i][0]||'').trim();
    var k = String(existing[i][1]||'').trim();
    if (s && k && s !== section) {
      keepRows.push([s, k, existing[i][2]]);
    }
  }
  // เขียน rows ของ section ปัจจุบัน
  var newRows = [];
  Object.keys(dataMap||{}).forEach(function(key){
    var v = dataMap[key];
    // boolean → 'true'/'false' | array/object → JSON string | number/string → as-is
    var vOut;
    if (typeof v === 'boolean') vOut = v ? 'true' : 'false';
    else if (v && typeof v === 'object') vOut = JSON.stringify(v); // [v250] array เช่น quo_statuses
    else vOut = v;
    newRows.push([section, key, vOut]);
  });
  // Clear + write all rows (header + keepRows + newRows)
  sheet.clearContents();
  sheet.getRange('A1:C1').setValues([['section','key','value']]);
  var allRows = keepRows.concat(newRows);
  if (allRows.length) sheet.getRange(2,1,allRows.length,3).setValues(allRows);
  return true;
}
function _ckvAutoMigrate(ss) {
  // Per-section migration: เช็คทีละ section ใน _config_kv
  // ถ้า section ไหนยังไม่มีใน _config_kv + Sheet เก่ามี → migrate + delete Sheet เก่า
  // SAFETY: ถ้า error → ไม่ลบ → user revert ได้
  var sheet = ss.getSheetByName('_config_kv');
  if (!sheet) {
    sheet = ss.insertSheet('_config_kv');
    sheet.getRange('A1:C1').setValues([['section','key','value']]);
  }
  // อ่าน sections ที่มีอยู่แล้วใน _config_kv
  var existingSections = {};
  try {
    var existing = sheet.getDataRange().getValues();
    for (var ex = 1; ex < existing.length; ex++) {
      var s = String(existing[ex][0]||'').trim();
      if (s) existingSections[s] = true;
    }
  } catch(e){}

  var newRowsAll = [];
  var migrated = []; // sheets ที่ migrate สำเร็จ — delete

  function migrateSection(sectionName, legacySheetName) {
    if (existingSections[sectionName]) return; // มีแล้ว
    var legacySh = ss.getSheetByName(legacySheetName);
    if (!legacySh) return;
    var d = legacySh.getDataRange().getValues();
    var added = 0;
    for (var i = 1; i < d.length; i++) {
      var k = String(d[i][0]||'').trim();
      if (k) { newRowsAll.push([sectionName, k, d[i][1]]); added++; }
    }
    if (added > 0) migrated.push(legacySheetName);
  }

  try {
    migrateSection('fcsp', 'fcsp');
    migrateSection('fcfad', 'fcfad');
    migrateSection('display_config', 'display_config');
    migrateSection('hm_stage', 'hm_stage');
    migrateSection('status_group', 'status_group');

    // tab_permissions: special encoding (4 cols → encoded string)
    if (!existingSections['tab_permissions']) {
      var tpSh = ss.getSheetByName('tab_permissions');
      if (tpSh) {
        var tpD = tpSh.getDataRange().getValues();
        var added = 0;
        for (var t = 1; t < tpD.length; t++) {
          var key = String(tpD[t][0]||'').trim();
          if (!key) continue;
          var perm = {
            admin:   tpD[t][1]===true || String(tpD[t][1]).toUpperCase()==='TRUE' || tpD[t][1]==='Y',
            manager: tpD[t][2]===true || String(tpD[t][2]).toUpperCase()==='TRUE' || tpD[t][2]==='Y',
            sales:   tpD[t][3]===true || String(tpD[t][3]).toUpperCase()==='TRUE' || tpD[t][3]==='Y'
          };
          newRowsAll.push(['tab_permissions', key, _tpEncode(perm)]);
          added++;
        }
        if (added > 0) migrated.push('tab_permissions');
      }
    }

    // Append new rows to _config_kv (ไม่ลบ existing — preserve sections เดิม)
    if (newRowsAll.length) {
      var startRow = sheet.getLastRow() + 1;
      sheet.getRange(startRow, 1, newRowsAll.length, 3).setValues(newRowsAll);
    }

    // Delete legacy sheets ที่ migrate สำเร็จ + legacy ที่ไม่ใช้แล้ว
    var legacyToDelete = migrated.concat(['fad','spfix','fcsp_team','fcfad_team']);
    legacyToDelete.forEach(function(name){
      try {
        var sh = ss.getSheetByName(name);
        if (sh) ss.deleteSheet(sh);
      } catch(e){}
    });
  } catch(e) {
    try { Logger.log('Migration error: ' + e.message); } catch(_){}
  }
  return newRowsAll.length > 0;
}

// ── _log helpers: รวม access_log + activity_log เข้า sheet เดียว ──
// Sheet schema: timestamp | type | user_name | action | detail
function _logAppend(type, userName, action, detail) {
  try {
    var ss = getSpreadsheet();
    var sh = ss.getSheetByName('_log');
    if (!sh) {
      sh = ss.insertSheet('_log');
      sh.getRange(1,1,1,5).setValues([['timestamp','type','user_name','action','detail']]);
      sh.getRange(1,1,1,5).setFontWeight('bold').setBackground('#1a3a5c').setFontColor('#ffffff');
      sh.setFrozenRows(1);
    }
    var ts;
    try { ts = _thaiTime(); } catch(e) { ts = new Date(); }
    sh.appendRow([ts, String(type||''), String(userName||''), String(action||''), String(detail||'')]);
  } catch(e){}
}
function _logAutoMigrate(ss) {
  // ถ้า _log ยังว่าง → migrate จาก access_log + activity_log → delete เก่า
  var sh = ss.getSheetByName('_log');
  if (sh && sh.getLastRow() > 1) return false;
  if (!sh) sh = ss.insertSheet('_log');
  sh.clearContents();
  sh.getRange(1,1,1,5).setValues([['timestamp','type','user_name','action','detail']]);
  sh.getRange(1,1,1,5).setFontWeight('bold').setBackground('#1a3a5c').setFontColor('#ffffff');
  sh.setFrozenRows(1);
  var rows = [];
  var migrated = [];
  try {
    // Migrate access_log (timestamp | name | tab | user_agent)
    var acc = ss.getSheetByName('access_log');
    if (acc) {
      var ad = acc.getDataRange().getValues();
      for (var i=1; i<ad.length; i++) {
        var ts = ad[i][0]; if (!ts) continue;
        var name = String(ad[i][1]||'');
        var tab = String(ad[i][2]||'');
        var ua = String(ad[i][3]||'');
        rows.push([ts, 'access', name, tab, ua]);
      }
      migrated.push('access_log');
    }
    // Migrate activity_log (Timestamp | EmpID | Name | Action)
    var act = ss.getSheetByName('activity_log');
    if (act) {
      var bd = act.getDataRange().getValues();
      for (var j=1; j<bd.length; j++) {
        var ts2 = bd[j][0]; if (!ts2) continue;
        var empId = String(bd[j][1]||'');
        var nm = String(bd[j][2]||'');
        var action = String(bd[j][3]||'');
        rows.push([ts2, 'activity', nm, action, empId]);
      }
      migrated.push('activity_log');
    }
    // Sort by timestamp ascending
    rows.sort(function(a,b){
      var ta = new Date(a[0]).getTime();
      var tb = new Date(b[0]).getTime();
      return ta - tb;
    });
    if (rows.length) sh.getRange(2,1,rows.length,5).setValues(rows);
    // Delete legacy
    migrated.forEach(function(name){
      try { var s = ss.getSheetByName(name); if (s) ss.deleteSheet(s); } catch(e){}
    });
  } catch(e) {
    try { Logger.log('Log migration error: ' + e.message); } catch(_){}
  }
  return rows.length > 0;
}

// ── _qn_overrides helpers: รวม unassigned_overrides + brand_overrides ──
// Sheet schema: qn | team | brand
// - team: จาก unassigned_overrides
// - brand: จาก brand_overrides
// - แต่ละ row อาจมีแค่ team หรือ brand หรือทั้งคู่ก็ได้
function _qnoReadAll(ss) {
  var sheet = ss.getSheetByName('_qn_overrides');
  if (!sheet) return null;
  var data = sheet.getDataRange().getValues();
  var teams = {};
  var brands = {};
  for (var i = 1; i < data.length; i++) {
    var qn = String(data[i][0]||'').trim();
    if (!qn) continue;
    var tm = String(data[i][1]||'').trim();
    var br = String(data[i][2]||'').trim();
    if (tm) teams[qn] = tm;
    if (br) brands[qn] = br;
  }
  return {teams: teams, brands: brands};
}
function _qnoWriteCategory(ss, category, dataMap) {
  // category = 'team' | 'brand'
  // dataMap = { qn: value, ... }
  var sheet = ss.getSheetByName('_qn_overrides') || ss.insertSheet('_qn_overrides');
  // อ่านของเดิม
  var existing = sheet.getDataRange().getValues();
  var rowsByQn = {}; // qn → {team, brand}
  for (var i = 1; i < existing.length; i++) {
    var qn = String(existing[i][0]||'').trim();
    if (!qn) continue;
    rowsByQn[qn] = {
      team: String(existing[i][1]||'').trim(),
      brand: String(existing[i][2]||'').trim()
    };
  }
  // Update category ที่ต้องการ (overwrite ทั้งหมด)
  if (category === 'team') {
    // ลบ team field ของทุก qn → เซ็ตใหม่จาก dataMap
    Object.keys(rowsByQn).forEach(function(qn){ rowsByQn[qn].team = ''; });
    Object.keys(dataMap||{}).forEach(function(qn){
      if (!rowsByQn[qn]) rowsByQn[qn] = {team:'', brand:''};
      rowsByQn[qn].team = String(dataMap[qn]||'').trim();
    });
  } else if (category === 'brand') {
    Object.keys(rowsByQn).forEach(function(qn){ rowsByQn[qn].brand = ''; });
    Object.keys(dataMap||{}).forEach(function(qn){
      if (!rowsByQn[qn]) rowsByQn[qn] = {team:'', brand:''};
      rowsByQn[qn].brand = String(dataMap[qn]||'').trim();
    });
  }
  // เขียนกลับ — drop rows ที่ทั้ง team และ brand ว่าง
  var allRows = [];
  Object.keys(rowsByQn).forEach(function(qn){
    var r = rowsByQn[qn];
    if (r.team || r.brand) allRows.push([qn, r.team, r.brand]);
  });
  sheet.clearContents();
  sheet.getRange('A1:C1').setValues([['qn','team','brand']]);
  if (allRows.length) sheet.getRange(2,1,allRows.length,3).setValues(allRows);
  return true;
}
function _qnoAutoMigrate(ss) {
  // Per-category migration
  var sheet = ss.getSheetByName('_qn_overrides');
  if (!sheet) {
    sheet = ss.insertSheet('_qn_overrides');
    sheet.getRange('A1:C1').setValues([['qn','team','brand']]);
  }
  // อ่านของเดิมใน _qn_overrides
  var existing = sheet.getDataRange().getValues();
  var hasTeam = false, hasBrand = false;
  for (var ex = 1; ex < existing.length; ex++) {
    if (String(existing[ex][1]||'').trim()) hasTeam = true;
    if (String(existing[ex][2]||'').trim()) hasBrand = true;
  }
  var migrated = [];
  try {
    // Migrate unassigned_overrides → team column
    if (!hasTeam) {
      var unaSh = ss.getSheetByName('unassigned_overrides');
      if (unaSh) {
        var teamMap = {};
        var unaD = unaSh.getDataRange().getValues();
        for (var i = 1; i < unaD.length; i++) {
          var qn = String(unaD[i][0]||'').trim();
          var tm = String(unaD[i][1]||'').trim();
          if (qn && tm) teamMap[qn] = tm;
        }
        if (Object.keys(teamMap).length > 0) {
          _qnoWriteCategory(ss, 'team', teamMap);
          migrated.push('unassigned_overrides');
        }
      }
    }
    // Migrate brand_overrides → brand column
    if (!hasBrand) {
      var brSh = ss.getSheetByName('brand_overrides');
      if (brSh) {
        var brandMap = {};
        var brD = brSh.getDataRange().getValues();
        for (var j = 1; j < brD.length; j++) {
          var qn2 = String(brD[j][0]||'').trim();
          var br = String(brD[j][1]||'').trim();
          if (qn2 && br) brandMap[qn2] = br;
        }
        if (Object.keys(brandMap).length > 0) {
          _qnoWriteCategory(ss, 'brand', brandMap);
          migrated.push('brand_overrides');
        }
      }
    }
    // Delete legacy ที่ migrate สำเร็จ
    migrated.forEach(function(name){
      try { var s = ss.getSheetByName(name); if (s) ss.deleteSheet(s); } catch(e){}
    });
  } catch(e) {
    try { Logger.log('QN overrides migration error: ' + e.message); } catch(_){}
  }
  return migrated.length > 0;
}

// ── tab_permissions encode/decode (เก็บเป็น string ใน _config_kv) ──
// Frontend structure: {tab: {admin:bool, manager:bool, sales:bool}}
// Encoded: "A,M,S" (เฉพาะ role ที่ true) เช่น "A,M" = admin+manager only
function _tpEncode(perm) {
  var parts = [];
  if (perm && perm.admin) parts.push('A');
  if (perm && perm.manager) parts.push('M');
  if (perm && perm.sales) parts.push('S');
  return parts.join(',');
}
function _tpDecode(str) {
  var s = String(str||'').toUpperCase();
  return {
    admin: s.indexOf('A') >= 0,
    manager: s.indexOf('M') >= 0,
    sales: s.indexOf('S') >= 0
  };
}

// [v486] memoize — SpreadsheetApp.openById() กิน 1-2s ต่อครั้ง
//   getBootBundle เรียก 5 ฟังก์ชัน ที่แต่ละตัวเรียก getSpreadsheet() -> เปิด 5 รอบ = เสียฟรี 5-8s
//   cache ระดับ execution เท่านั้น (ไม่ข้าม request -> ไม่มีปัญหาข้อมูลค้าง)
var _BJH_SS_MEMO = null;
function getSpreadsheet() {
  if (_BJH_SS_MEMO) return _BJH_SS_MEMO;
  _BJH_SS_MEMO = _getSpreadsheet_();
  return _BJH_SS_MEMO;
}
function _getSpreadsheet_() {
  // ผูกด้วย ID ตายตัวก่อน (เสถียร ทุกคนเปิดได้ตัวเดียวกัน)
  if (BJH_CONFIG_ID) {
    try { return SpreadsheetApp.openById(BJH_CONFIG_ID); } catch (e) {}
  }
  // fallback: หา Sheet ที่ชื่อ BJH_Config ใน Drive
  var files = DriveApp.getFilesByName(SHEET_NAME);
  if (files.hasNext()) {
    return SpreadsheetApp.open(files.next());
  }
  // ถ้าไม่มี → สร้างใหม่พร้อม template
  return createConfigSheet();
}

// ── อ่าน Config จาก Sheets → JSON ───────────────────────
function getConfig() {
  // [C30] cache config (อ่าน Sheet ~1-2s ทุกครั้ง) — invalidate ทันทีเมื่อ saveConfigSection
  var _ck = 'bjhCFG_' + _bjhVer('CFG');
  try {
    var _hit = _bjhCacheGet(_ck);
    if (_hit) return JSON.parse(_hit);
  } catch (e) {}
  var _cfg = _getConfig_();
  try { _bjhCachePut(_ck, JSON.stringify(_cfg)); } catch (e) {}
  return _cfg;
}

function _getConfig_() {
  try {
    var ss = getSpreadsheet();
    var config = {};

    // ── Auto-migrate _config_kv ครั้งแรก (ถ้ายังว่าง) ──
    var _mgP=PropertiesService.getScriptProperties();
    if (!_mgP.getProperty('BJH_MIG_DONE')) {
      try { _ckvAutoMigrate(ss); } catch(e){}
      try { _logAutoMigrate(ss); } catch(e){}
      try { _qnoAutoMigrate(ss); } catch(e){}
      try {
        var _lg=['fcsp','fcfad','display_config','hm_stage','status_group','tab_permissions','access_log','activity_log','unassigned_overrides','brand_overrides'];
        var _left=0; for (var _z=0;_z<_lg.length;_z++){ if (ss.getSheetByName(_lg[_z])) _left++; }
        if (_left===0) _mgP.setProperty('BJH_MIG_DONE','1');
      } catch(e){}
    }
    // ── อ่าน _config_kv (รวม fcsp + fcfad + display_config + hm_stage + status_group + tab_permissions) ──
    var ckv = _ckvReadAll(ss) || {};
    if (ckv.qf_chips) config.qf_chips = ckv.qf_chips;
    if (ckv.sum_status) config.sum_status = ckv.sum_status; // [C37] Summary status filter (ส่วนกลาง)
    if (ckv.note_sn) config.note_sn = ckv.note_sn; // [B8] Note ต่อ SN
    if (ckv.sales_region) config.sales_region = ckv.sales_region; // [B10] พื้นที่เซลล์
    if (ckv.parts_status) config.parts_status = ckv.parts_status; // [V562] Parts Status Mapping
    if (ckv.mobile_links) config.mobile_links = ckv.mobile_links; // [V506] ลิงก์ภายนอกหน้า Mobile (BJH Contact ฯลฯ)
    if (ckv.bkk_sales) config.bkk_sales = ckv.bkk_sales; // [V521] sales ประจำ รพ. ในกรุงเทพฯ
    if (ckv.price_table) config.price_table = ckv.price_table; // [v403] Price table (brand||model -> {ages,excl})
    if (ckv.price_groups) config.price_groups = ckv.price_groups; // [v433] Price table แบบกลุ่ม (group -> {name,brand,models,y})
    if (ckv.qsp_exceptions) config.qsp_exceptions = ckv.qsp_exceptions; // [v448] QSP23/24 ที่ยกเว้นไม่ให้ filter ออก (เลือกเองทีละใบ)
    if (ckv.frequent_parts) config.frequent_parts = ckv.frequent_parts; // [v433] อะไหล่เสียบ่อย (สำหรับเลือกยกเว้น)
    if (ckv.email_req) config.email_req = ckv.email_req; // [v245] email เบิกอะไหล่
    if (ckv.province_rep) config.province_rep = ckv.province_rep; // [v314] override จังหวัด→ผู้แทน
    if (ckv.ar_cfg) config.ar_cfg = ckv.ar_cfg; // [v335] AR credit days config
    if (ckv.ar_paid) config.ar_paid = ckv.ar_paid; // [v337] AR paid bills (import MD)
    if (ckv.sp_merge_map) config.sp_merge_map = ckv.sp_merge_map; // [v347] SP Bill Merge to → QN ปลายทาง
    if (ckv.sp_alert_quo_map) config.sp_alert_quo_map = ckv.sp_alert_quo_map; // [v367] Alert: SN → QSP mapping (manual, กรอกเองเมื่อ auto-match ไม่เจอ)
    // ── อ่าน _qn_overrides (รวม unassigned + brand) ──
    var qno = _qnoReadAll(ss);

    // ── fad (Actual FAD) ──────────────────────────────────
    // Sheet: fad | คอลัมน์: month(1-12), value_exvat
    var fadSheet = ss.getSheetByName('fad');
    if (fadSheet) {
      var fadData = fadSheet.getDataRange().getValues();
      config.fad = {};
      for (var i = 1; i < fadData.length; i++) { // skip header
        var mo = parseInt(fadData[i][0]);
        var val = parseFloat(fadData[i][1]) || 0;
        if (mo >= 1 && mo <= 12 && val > 0)
          config.fad[String(mo)] = val; // 1-indexed (month 1-12)
      }
    }

    // ── spfix (SP Forecast Fix) ───────────────────────────
    // Sheet: spfix | คอลัมน์: month(1-12), value_exvat
    var spSheet = ss.getSheetByName('spfix');
    if (spSheet) {
      var spData = spSheet.getDataRange().getValues();
      config.spfix = {};
      for (var j = 1; j < spData.length; j++) {
        var smo = parseInt(spData[j][0]);
        var sval = parseFloat(spData[j][1]) || 0;
        if (smo >= 1 && smo <= 12)
          config.spfix[String(smo)] = sval;
      }
    }

    // ── fcsp (Forecast SP รายเดือน) ──────────────────────
    // ── fcsp (Forecast SP รายเดือน) ──────────────────────
    // อ่านจาก _config_kv ก่อน, fallback Sheet 'fcsp' เก่า
    if (ckv.fcsp && Object.keys(ckv.fcsp).length > 0) {
      config.fcsp = {};
      Object.keys(ckv.fcsp).forEach(function(k){
        var mo = parseInt(k);
        if (mo >= 1 && mo <= 12) config.fcsp[String(mo)] = parseFloat(ckv.fcsp[k]) || 0;
      });
    } else {
      var fcspSheet = ss.getSheetByName('fcsp');
      if (fcspSheet) {
        var fcspData = fcspSheet.getDataRange().getValues();
        config.fcsp = {};
        for (var jfc = 1; jfc < fcspData.length; jfc++) {
          var fmoS = parseInt(fcspData[jfc][0]);
          var fvalS = parseFloat(fcspData[jfc][1]) || 0;
          if (fmoS >= 1 && fmoS <= 12)
            config.fcsp[String(fmoS)] = fvalS;
        }
      }
    }

    // ── api_config (SmartFlow API settings) ──────────────
    // อ่านจาก _config_kv (ไม่มี legacy)
    if (ckv.api_config && Object.keys(ckv.api_config).length > 0) {
      config.api_config = {};
      Object.keys(ckv.api_config).forEach(function(k){
        config.api_config[k] = String(ckv.api_config[k] || '');
      });
    }

    // ── fcfad (Forecast Challenge รายเดือน) ──────────────
    // อ่านจาก _config_kv ก่อน, fallback Sheet 'fcfad' เก่า
    if (ckv.fcfad && Object.keys(ckv.fcfad).length > 0) {
      config.fcfad = {};
      Object.keys(ckv.fcfad).forEach(function(k){
        var mo = parseInt(k);
        if (mo >= 1 && mo <= 12) config.fcfad[String(mo)] = parseFloat(ckv.fcfad[k]) || 0;
      });
    } else {
      var fcfadSheet = ss.getSheetByName('fcfad');
      if (fcfadSheet) {
        var fcfadData = fcfadSheet.getDataRange().getValues();
        config.fcfad = {};
        for (var jf = 1; jf < fcfadData.length; jf++) {
          var fmo = parseInt(fcfadData[jf][0]);
          var fval = parseFloat(fcfadData[jf][1]) || 0;
          if (fmo >= 1 && fmo <= 12)
            config.fcfad[String(fmo)] = fval;
        }
      }
    }

    // ── fcsp_team (Forecast SP team×SC/SP×12) ────────────
    var fcspTeamSheet = ss.getSheetByName('fcsp_team');
    if (fcspTeamSheet) {
      var fcspTd = fcspTeamSheet.getDataRange().getValues();
      config.fcsp_team = [];
      for (var fsi = 1; fsi < fcspTd.length; fsi++) {
        var row = fcspTd[fsi];
        var tm=String(row[0]||'').trim(), tp=String(row[1]||'').trim().toUpperCase();
        if(!tm||!tp) continue;
        var arr=[];
        for(var k=2;k<=13;k++) arr.push(parseFloat(row[k])||0);
        config.fcsp_team.push({team:tm,type:tp,months:arr});
      }
    }

    // ── fcfad_team (Forecast FAD team×SC/SP×12) ──────────
    var fcfadTeamSheet = ss.getSheetByName('fcfad_team');
    if (fcfadTeamSheet) {
      var fcfadTd = fcfadTeamSheet.getDataRange().getValues();
      config.fcfad_team = [];
      for (var ffi = 1; ffi < fcfadTd.length; ffi++) {
        var rowF = fcfadTd[ffi];
        var tmF=String(rowF[0]||'').trim(), tpF=String(rowF[1]||'').trim().toUpperCase();
        if(!tmF||!tpF) continue;
        var arrF=[];
        for(var kF=2;kF<=13;kF++) arrF.push(parseFloat(rowF[kF])||0);
        config.fcfad_team.push({team:tmF,type:tpF,months:arrF});
      }
    }

    // ── actual_fad (multi-year: yr × team × SC/SP × 12 months — past months manual override) ──────────
    // Sheet: actual_fad | คอลัมน์: yr (optional), team, type, jan..dec
    //   Backward compat: ถ้า header A1 ≠ 'yr' → assume yr=2026
    //   Return: config.actual_fad = { '2026': {team: {SC, SP}}, '2027': {...} }
    var actFadSheet = ss.getSheetByName('actual_fad');
    if (actFadSheet) {
      var afD = actFadSheet.getDataRange().getValues();
      config.actual_fad = {};
      var hasYrColAF = (afD.length > 0 && String(afD[0][0]||'').trim().toLowerCase() === 'yr');
      var DEFAULT_YR_AF = '2026';
      for (var afi = 1; afi < afD.length; afi++) {
        var rowA = afD[afi];
        var yrA, tmA, tpA, startA;
        if (hasYrColAF) {
          yrA = String(rowA[0]||'').trim();
          tmA = String(rowA[1]||'').trim();
          tpA = String(rowA[2]||'').trim().toUpperCase();
          startA = 3;
        } else {
          yrA = DEFAULT_YR_AF;
          tmA = String(rowA[0]||'').trim();
          tpA = String(rowA[1]||'').trim().toUpperCase();
          startA = 2;
        }
        if (!yrA || !tmA || !tpA) continue;
        if (!config.actual_fad[yrA]) config.actual_fad[yrA] = {};
        if (!config.actual_fad[yrA][tmA]) config.actual_fad[yrA][tmA] = {};
        var arrA = [];
        for (var kA = startA; kA < startA + 12; kA++) arrA.push(parseFloat(rowA[kA]) || 0);
        config.actual_fad[yrA][tmA][tpA] = arrA;
      }
    }

    // ── display_config (FAD section: ordered/prospect toggle) ──────
    // อ่านจาก _config_kv ก่อน, fallback Sheet 'display_config' เก่า
    if (ckv.display_config && Object.keys(ckv.display_config).length > 0) {
      config.display_config = {};
      Object.keys(ckv.display_config).forEach(function(k){
        var v = String(ckv.display_config[k]||'').toLowerCase().trim();
        config.display_config[k] = (v==='true'||v==='1'||v==='yes');
      });
    } else {
      var dispSheet = ss.getSheetByName('display_config');
      if (dispSheet) {
        var dispD = dispSheet.getDataRange().getValues();
        config.display_config = {};
        for (var di = 1; di < dispD.length; di++) {
          var kk = String(dispD[di][0]||'').trim();
          var vv = String(dispD[di][1]||'').trim().toLowerCase();
          if (!kk) continue;
          config.display_config[kk] = (vv==='true'||vv==='1'||vv==='yes');
        }
      }
    }

    // ── unassigned_overrides (qn → team) ─────────────────
    // อ่านจาก _qn_overrides ก่อน, fallback Sheet 'unassigned_overrides' เก่า
    if (qno && Object.keys(qno.teams).length > 0) {
      config.unassigned_overrides = qno.teams;
    } else {
      var unaSheet = ss.getSheetByName('unassigned_overrides');
      if (unaSheet) {
        var unaD = unaSheet.getDataRange().getValues();
        config.unassigned_overrides = {};
        for (var ui = 1; ui < unaD.length; ui++) {
          var qn = String(unaD[ui][0]||'').trim();
          var tm = String(unaD[ui][1]||'').trim();
          if(qn && tm) config.unassigned_overrides[qn] = tm;
        }
      }
    }

    // ── brand_overrides (qn → brand) ─────────────────
    // อ่านจาก _qn_overrides ก่อน, fallback Sheet 'brand_overrides' เก่า
    if (qno && Object.keys(qno.brands).length > 0) {
      config.brand_overrides = qno.brands;
    } else {
      var brSheet = ss.getSheetByName('brand_overrides');
      if (brSheet) {
        var brD = brSheet.getDataRange().getValues();
        config.brand_overrides = {};
        for (var bri = 1; bri < brD.length; bri++) {
          var bqn = String(brD[bri][0]||'').trim();
          var bbr = String(brD[bri][1]||'').trim();
          if(bqn && bbr) config.brand_overrides[bqn] = bbr;
        }
      }
    }

    // ── tab_permissions (tab → admin/manager/sales) ──────
    // อ่านจาก _config_kv ก่อน (encoded "A,M,S"), fallback Sheet 'tab_permissions' เก่า
    if (ckv.tab_permissions && Object.keys(ckv.tab_permissions).length > 0) {
      config.tab_permissions = {};
      Object.keys(ckv.tab_permissions).forEach(function(k){
        config.tab_permissions[k] = _tpDecode(ckv.tab_permissions[k]);
      });
    } else {
      var tpSheet = ss.getSheetByName('tab_permissions');
      if (tpSheet) {
        var tpD = tpSheet.getDataRange().getValues();
        config.tab_permissions = {};
        for (var tpi = 1; tpi < tpD.length; tpi++) {
          var tpTab = String(tpD[tpi][0]||'').trim();
          if(!tpTab) continue;
          config.tab_permissions[tpTab] = {
            admin:   tpD[tpi][1]===true || String(tpD[tpi][1]).toUpperCase()==='TRUE' || tpD[tpi][1]==='Y',
            manager: tpD[tpi][2]===true || String(tpD[tpi][2]).toUpperCase()==='TRUE' || tpD[tpi][2]==='Y',
            sales:   tpD[tpi][3]===true || String(tpD[tpi][3]).toUpperCase()==='TRUE' || tpD[tpi][3]==='Y'
          };
        }
      }
    }

    // ── budget (multi-year: yr × team × type × 12 months) ─────
    // Sheet: budget | คอลัมน์: yr (optional, default 2026), team, type, jan..dec
    //   Backward compat: ถ้า header เก่า (team, type, jan..dec) → assume yr=2026
    //   Return: config.budget = { '2026': {team: {SC, SP}}, '2027': {...} }
    var budSheet = ss.getSheetByName('budget');
    if (budSheet) {
      var budData = budSheet.getDataRange().getValues();
      config.budget = {};
      // Auto-detect schema: ถ้า header A1 = 'yr' → multi-year, else legacy
      var hasYrCol = (budData.length > 0 && String(budData[0][0]||'').trim().toLowerCase() === 'yr');
      var DEFAULT_YR_BUD = String(new Date().getFullYear() <= 2026 ? 2026 : 2026); // legacy = 2026
      for (var k = 1; k < budData.length; k++) {
        var row = budData[k];
        var yrK, teamK, typeK, startCol;
        if (hasYrCol) {
          yrK = String(row[0]||'').trim();
          teamK = String(row[1]||'').trim();
          typeK = String(row[2]||'').trim();
          startCol = 3;
        } else {
          yrK = DEFAULT_YR_BUD;
          teamK = String(row[0]||'').trim();
          typeK = String(row[1]||'').trim();
          startCol = 2;
        }
        if (!yrK || !teamK || !typeK) continue;
        if (!config.budget[yrK]) config.budget[yrK] = {};
        if (!config.budget[yrK][teamK]) config.budget[yrK][teamK] = {};
        var monthsK = [];
        for (var m = startCol; m < startCol + 12; m++) monthsK.push(parseFloat(row[m]) || 0);
        config.budget[yrK][teamK][typeK] = monthsK;
      }
    }

    // ── sa_bud (Sales Budget) — multi-year support ────────────
    // Sheet: sa_bud | คอลัมน์: yr (optional), sales_name, budget
    //   Backward compat: ถ้า header A1 ≠ 'yr' → assume yr=2026
    //   Return: config.sa_bud = { '2026': {sales: amount}, '2027': {...} }
    var saSheet = ss.getSheetByName('sa_bud');
    if (saSheet) {
      var saData = saSheet.getDataRange().getValues();
      config.sa_bud = {};
      var hasYrCol2 = (saData.length > 0 && String(saData[0][0]||'').trim().toLowerCase() === 'yr');
      var DEFAULT_YR_SA = '2026';
      for (var n = 1; n < saData.length; n++) {
        var rowSA = saData[n];
        var yrSA, nameSA, budSA;
        if (hasYrCol2) {
          yrSA = String(rowSA[0]||'').trim();
          nameSA = String(rowSA[1]||'').trim();
          budSA = parseFloat(rowSA[2]) || 0;
        } else {
          yrSA = DEFAULT_YR_SA;
          nameSA = String(rowSA[0]||'').trim();
          budSA = parseFloat(rowSA[1]) || 0;
        }
        if (!yrSA || !nameSA) continue;
        if (!config.sa_bud[yrSA]) config.sa_bud[yrSA] = {};
        config.sa_bud[yrSA][nameSA] = budSA;
      }
    }

    // ── hm_stage (High/Medium Prospect mapping) ────────────
    // อ่านจาก _config_kv ก่อน, fallback Sheet 'hm_stage' เก่า
    if (ckv.hm_stage && Object.keys(ckv.hm_stage).length > 0) {
      config.hm_stage = {};
      Object.keys(ckv.hm_stage).forEach(function(k){
        var v = String(ckv.hm_stage[k]||'').trim().toUpperCase();
        if (v==='H' || v==='M' || v==='L') config.hm_stage[k] = v;
      });
    } else {
      var hmSheet = ss.getSheetByName('hm_stage');
      if (hmSheet) {
        var hmData = hmSheet.getDataRange().getValues();
        config.hm_stage = {};
        for (var hi = 1; hi < hmData.length; hi++) {
          var hSt = String(hmData[hi][0]).trim();
          var hGr = String(hmData[hi][1]||'').trim().toUpperCase();
          if (hSt && (hGr==='H' || hGr==='M' || hGr==='L')) config.hm_stage[hSt] = hGr;
        }
      }
    }

    // ── status_group (Dashboard groupings) ────────────
    // อ่านจาก _config_kv ก่อน, fallback Sheet 'status_group' เก่า
    if (ckv.status_group && Object.keys(ckv.status_group).length > 0) {
      config.status_group = {};
      Object.keys(ckv.status_group).forEach(function(k){
        var v = String(ckv.status_group[k]||'').trim().toLowerCase();
        if (v==='actual'||v==='ordered'||v==='fcsp'||v==='prospect') config.status_group[k] = v;
      });
    } else {
      var sgSheet = ss.getSheetByName('status_group');
      if (sgSheet) {
        var sgData = sgSheet.getDataRange().getValues();
        config.status_group = {};
        for (var sgi = 1; sgi < sgData.length; sgi++) {
          var sSt = String(sgData[sgi][0]).trim();
          var sGr = String(sgData[sgi][1]||'').trim().toLowerCase();
          if (sSt && (sGr==='actual'||sGr==='ordered'||sGr==='fcsp'||sGr==='prospect')) config.status_group[sSt] = sGr;
        }
      }
    }

    // ── model_group (Installation Base: model → group) ────────────
    // อ่านจาก _config_kv เท่านั้น (ไม่มี legacy sheet)
    if (ckv.model_group && Object.keys(ckv.model_group).length > 0) {
      config.model_group = {};
      Object.keys(ckv.model_group).forEach(function(k){
        var v = String(ckv.model_group[k]||'').trim();
        if (v) config.model_group[k] = v;
      });
    }

    // [V479] Sales Retention config
    if (ckv.sales_model_group && Object.keys(ckv.sales_model_group).length > 0) {
      config.sales_model_group = {};
      Object.keys(ckv.sales_model_group).forEach(function(k){
        var v = String(ckv.sales_model_group[k]||'').trim();
        if (v) config.sales_model_group[k] = v;
      });
    }
    if (ckv.sales_hosp_group && Object.keys(ckv.sales_hosp_group).length > 0) {
      config.sales_hosp_group = {};
      Object.keys(ckv.sales_hosp_group).forEach(function(k){
        var v = String(ckv.sales_hosp_group[k]||'').trim();
        if (v) config.sales_hosp_group[k] = v;
      });
    }
    // [C17] กลุ่มประเภทสัญญา
    if (ckv.ctype && Object.keys(ckv.ctype).length > 0) {
      config.ctype = {};
      Object.keys(ckv.ctype).forEach(function(k){
        var v = String(ckv.ctype[k]||'').trim();
        if (v) config.ctype[k] = v;
      });
    }

    // [V479.15] Sales Areas config (แยกจาก Retention)
    if (ckv.sa_hosp_group && Object.keys(ckv.sa_hosp_group).length > 0) {
      config.sa_hosp_group = {};
      Object.keys(ckv.sa_hosp_group).forEach(function(k){
        var v = String(ckv.sa_hosp_group[k]||'').trim();
        if (v) config.sa_hosp_group[k] = v;
      });
    }
    if (ckv.sa_area_override && Object.keys(ckv.sa_area_override).length > 0) {
      config.sa_area_override = {};
      Object.keys(ckv.sa_area_override).forEach(function(k){
        var v = String(ckv.sa_area_override[k]||'').trim();
        if (v) config.sa_area_override[k] = v;
      });
    }
    // [V479.28] Quotation notes (โน้ตต่อใบเสนอราคา)
    if (ckv.quote_notes && Object.keys(ckv.quote_notes).length > 0) {
      config.quote_notes = {};
      Object.keys(ckv.quote_notes).forEach(function(k){
        var v = String(ckv.quote_notes[k]||'').trim();
        if (v) config.quote_notes[k] = v;
      });
    }

    return { ok: true, config: config };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// ── สร้าง Config Sheet พร้อม template ────────────────────
function createConfigSheet() {
  var ss = SpreadsheetApp.create(SHEET_NAME);

  // Sheet: fad
  var fadSheet = ss.getActiveSheet();
  fadSheet.setName('fad');
  fadSheet.getRange('A1:B1').setValues([['month','value_exvat']]);
  fadSheet.getRange('A2:B13').setValues([
    [1, 16730000],[2, 12070000],[3, 25550000],[4, 14310000],
    [5, 0],[6, 0],[7, 0],[8, 0],[9, 0],[10, 0],[11, 0],[12, 0]
  ]);
  fadSheet.getRange('A1:B1').setFontWeight('bold').setBackground('#1a3a5c').setFontColor('#ffffff');

  // Sheet: spfix
  var spSheet = ss.insertSheet('spfix');
  spSheet.getRange('A1:B1').setValues([['month','value_exvat']]);
  spSheet.getRange('A2:B12').setValues([
    [5,5000000],[6,5000000],[7,5000000],[8,5000000],
    [9,5000000],[10,5000000],[11,5000000],[12,5000000],
    [1,0],[2,0],[3,0]
  ]);
  spSheet.getRange('A1:B1').setFontWeight('bold').setBackground('#1a3a5c').setFontColor('#ffffff');

  // Sheet: budget
  var budSheet = ss.insertSheet('budget');
  var budHeaders = ['team','type','jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  budSheet.getRange(1,1,1,14).setValues([budHeaders]);
  budSheet.getRange(1,1,1,14).setFontWeight('bold').setBackground('#1a3a5c').setFontColor('#ffffff');
  var budRows = [
    ['Service 1','SP', 2850,2850,3800,3150,3150,4200,4050,4050,5400,3750,3750,5000],
    ['Service 1','SC', 9405,9405,9940,10395,10395,10960,13365,13365,14020,12375,12375,13000],
    ['Service 2','SP', 1980,1980,2640,1980,1980,2640,1980,1980,2640,1980,1980,2640],
    ['Service 2','SC', 1452,1452,1496,1452,1452,1496,1452,1452,1496,1452,1452,1496],
    ['Service 3','SP', 0,0,0,0,0,0,0,0,0,0,0,0],
    ['Service 3','SC', 1650,1650,1700,1650,1650,1700,1980,1980,2040,1650,1650,1700],
  ]; // รวม 250.00M
  budSheet.getRange(2,1,budRows.length,14).setValues(budRows);

  // Sheet: sa_bud
  var saSheet = ss.insertSheet('sa_bud');
  saSheet.getRange('A1:B1').setValues([['sales_name','budget']]);
  saSheet.getRange('A1:B1').setFontWeight('bold').setBackground('#1a3a5c').setFontColor('#ffffff');
  var saRows = [
    ['จีรนันท์',50000],['ธนาวุฒิ',50000],['ประเสริฐ',50000],
    ['เจนจิรา',50000],['พงษ์ศักดิ์',50000],['ธราภัท',10000]
  ];
  saSheet.getRange(2,1,saRows.length,2).setValues(saRows);

  Logger.log('สร้าง Config Sheet แล้ว: ' + ss.getUrl());
  return ss;
}

// ── getDataForClient: google.script.run ─────────────────
// ส่ง data + config พร้อมกัน
function getDataForClient(empIdHint, nameHint) {
  // log activity (Load Data) — เวลาไทย + update LastActive
  try {
    if (empIdHint) {
      var sh = getUsersSheet();
      var dat = sh.getDataRange().getValues();
      var now = _thaiTime();
      for (var i = 1; i < dat.length; i++) {
        if (String(dat[i][0]).trim() === String(empIdHint).trim()) {
          sh.getRange(i+1, 8).setValue(now);
          _logActivity(dat[i][0], dat[i][1], 'Load Data');
          break;
        }
      }
    }
  } catch(e) {}
  var dataResult = getFilesFromDrive();
  var metaResult = getMetaFromDrive();
  var cfgResult  = getConfig();
  if (metaResult.ok) dataResult.meta = metaResult.meta;
  if (cfgResult.ok)  dataResult.config = cfgResult.config;
  return JSON.stringify(dataResult);
}

// ── getDataForClientTx: ส่งเฉพาะ bjh_tx.json.gz + config (ปุ่ม Refresh — เร็ว) ──
function getDataForClientTx(empIdHint, nameHint) {
  try {
    // log activity
    try {
      if (empIdHint) {
        var sh = getUsersSheet();
        var dat = sh.getDataRange().getValues();
        var now = _thaiTime();
        for (var i = 1; i < dat.length; i++) {
          if (String(dat[i][0]).trim() === String(empIdHint).trim()) {
            sh.getRange(i+1, 8).setValue(now);
            _logActivity(dat[i][0], dat[i][1], 'Refresh');
            break;
          }
        }
      }
    } catch(e) {}
    // [C30] cache-first — เดิม getDataAsString() 3.26 MB จาก Drive = 11-20s (แกว่ง 2 เท่า)
    var _t0 = Date.now();
    var txContent = _bjhReadDriveCached(SMARTFLOW_TX_FILE, 'TX');
    if (txContent == null) return JSON.stringify({ ok: false, error: 'ยังไม่มีไฟล์ ' + SMARTFLOW_TX_FILE + ' — รัน smartflowSyncToDrive() ก่อน' });
    var meta = _bjhMetaCached();
    Logger.log('[C30] TX content พร้อม | ' + (Date.now() - _t0) + 'ms');
    var cfgResult = getConfig();
    return JSON.stringify({
      ok: true,
      files: { 'bjh_tx.json.gz': txContent },
      compressed: false,
      compressedFiles: ['bjh_tx.json.gz'],
      uncompressedFiles: [],
      meta: meta,
      config: cfgResult.ok ? cfgResult.config : null
    });
  } catch(err) {
    return JSON.stringify({ ok: false, error: err.message });
  }
}

// ── getDataForClientMaster: ส่งเฉพาะ bjh_master.json.gz (client เก็บลง IndexedDB) ──
// [v290] getDataForClientMaster: base64(gzip bytes) + ScriptCache 20min
function getDataForClientMaster() {
  // [C30] เดิมมี ScriptCache แต่ guard `if (masterContent.length <= 100000)` -> ไฟล์เป็น MB -> sc.put() ไม่เคยถูกเรียก
  //   -> cache ไม่เคยทำงานเลย ทุก user อ่าน Drive สดทุกครั้ง
  //   ตอนนี้ใช้ _bjhReadDriveCached() (chunk 90KB) แทน
  try {
    var _t0 = Date.now();
    var masterContent = _bjhReadDriveCached(SMARTFLOW_MASTER_FILE, 'MASTER');
    if (masterContent == null) return JSON.stringify({ ok: false, error: 'ยังไม่มีไฟล์ ' + SMARTFLOW_MASTER_FILE + ' — รัน smartflowDailySyncToDrive() ก่อน' });
    var _m = _bjhMetaCached();
    Logger.log('[C30] MASTER content พร้อม | ' + (Date.now() - _t0) + 'ms');
    return JSON.stringify({
      ok: true,
      content: masterContent,
      filename: SMARTFLOW_MASTER_FILE,
      timestamp: (_m && _m.timestamp) || new Date().toISOString()
    });
  } catch (err) {
    return JSON.stringify({ ok: false, error: String(err) });
  }
}

function _getDataForClientMaster_OLD() {
  var CACHE_KEY = 'bjh_master_b64_v2';
  var CACHE_META_KEY = 'bjh_master_meta_v2';
  try {
    var folder = getOrCreateFolder();
    var masterIter = folder.getFilesByName(SMARTFLOW_MASTER_FILE);
    if (!masterIter.hasNext()) return JSON.stringify({ ok: false, error: 'ยังไม่มีไฟล์ ' + SMARTFLOW_MASTER_FILE + ' — รัน smartflowDailySyncToDrive() ก่อน' });
    // [v312] getDataAsString() — bjh_master.json.gz เก็บเป็น base64 TEXT บน Drive (smartflowFetchAndSave_ → base64Encode → createFile PLAIN_TEXT)
    //   v290 base64Encode(getBytes()) = DOUBLE base64 → client atob ได้ base64 → pako พัง → '_applyMasterData error: undefined' → install 0
    var masterContent = masterIter.next().getBlob().getDataAsString();
    var meta = {};
    var metaIter = folder.getFilesByName(META_FILE_NAME);
    if (metaIter.hasNext()) { try { meta = JSON.parse(metaIter.next().getBlob().getDataAsString()) || {}; } catch(e) {} }
    var masterMeta = (meta.fileMeta && meta.fileMeta[SMARTFLOW_MASTER_FILE]) || {};
    var ts = masterMeta.timestamp || meta.timestamp || new Date().toISOString();
    // บันทึก cache (ScriptCache จำกัด 100KB/key — ถ้า master > 100KB แบ่ง chunk)
    try {
      if (masterContent.length <= 100000) {
        sc.put(CACHE_KEY, masterContent, 1200); // 20 นาที
        sc.put(CACHE_META_KEY, ts, 1200);
      }
    } catch(ce) { /* cache fail ไม่ร้ายแรง */ }
    return JSON.stringify({
      ok: true,
      content: masterContent,
      filename: SMARTFLOW_MASTER_FILE,
      timestamp: ts
    });
  } catch(err) {
    return JSON.stringify({ ok: false, error: err.message });
  }
}

// ── getConfigForClient: google.script.run ────────────────
// ส่ง config อย่างเดียว (Update Config)
function getCustomerProvince() {
  // [v313] อ่านไฟล์ customer_province.json บน Drive (Eak อัปเอง) → CUS_ID→จังหวัด
  //   ไฟล์เป็น JSON text ปกติ (ไม่ gzip/base64) — อัปผ่าน uploadCustomerProvince() หรือวางใน folder เอง
  try {
    var folder = getOrCreateFolder();
    var it = folder.getFilesByName(CUSTOMER_PROVINCE_FILE);
    if (!it.hasNext()) {
      return JSON.stringify({ ok: false, error: 'ยังไม่มีไฟล์ ' + CUSTOMER_PROVINCE_FILE + ' บน Drive — อัปก่อน' });
    }
    var content = it.next().getBlob().getDataAsString();
    return JSON.stringify({ ok: true, content: content });
  } catch (err) {
    return JSON.stringify({ ok: false, error: err.message });
  }
}

function uploadCustomerProvince(jsonText) {
  // [v313] อัป/ทับไฟล์ customer_province.json บน Drive (เรียกจาก config UI ตอน import Excel)
  try {
    var folder = getOrCreateFolder();
    var old = folder.getFilesByName(CUSTOMER_PROVINCE_FILE);
    while (old.hasNext()) old.next().setTrashed(true);
    folder.createFile(CUSTOMER_PROVINCE_FILE, jsonText, MimeType.PLAIN_TEXT);
    var obj = {}; try { obj = JSON.parse(jsonText); } catch(e){}
    return JSON.stringify({ ok: true, count: Object.keys(obj).length });
  } catch (err) {
    return JSON.stringify({ ok: false, error: err.message });
  }
}

// ════════════════════════════════════════════════════════
// [v485] getBootBundle — รวม 5 server call เป็น "1 execution"
//   วัดจริง V484: config=14.6s actual=2.3s lowfc=2.7s manualEdits+notes=3.4s
//   -> ทุก google.script.run เสีย overhead 2-4s (cold start + โหลด Code.gs 450KB + เปิด Sheet)
//   -> ยิง 4 call พร้อมกันยิ่งแย่: TX (3.25MB) แย่ง server ทำให้ config พุ่งจาก 4.2s -> 14.6s
//   รวมเป็น call เดียว = จ่าย overhead ครั้งเดียว + เปิด Spreadsheet ครั้งเดียว
//
//   ⚠️ Code.gs เปลี่ยน -> ต้อง Deploy -> New Version
//   client มี fallback: ถ้า getBootBundle ไม่มี -> ยิง 3 call แยกเหมือนเดิม
// ════════════════════════════════════════════════════════
function getBootBundle(year) {
  var out = { ok: true };
  var t0 = Date.now();
  try { out.config = getConfigForClient(); } catch (e) { out.config = null; out.e_config = String(e); }
  try { out.actual = loadSalesActual(year); } catch (e) { out.actual = null; out.e_actual = String(e); }
  try { out.low    = getLowProspects();     } catch (e) { out.low    = null; out.e_low    = String(e); }
  try { out.edits  = getManualEdits();      } catch (e) { out.edits  = null; out.e_edits  = String(e); }
  try { out.notes  = getNotes();            } catch (e) { out.notes  = null; out.e_notes  = String(e); }
  var _n = function (x) { return (x || '').length; };
  Logger.log('[BOOT] bundle ' + (Date.now() - t0) + 'ms | config=' + _n(out.config)
    + ' actual=' + _n(out.actual) + ' low=' + _n(out.low)
    + ' edits=' + _n(out.edits) + ' notes=' + _n(out.notes) + ' chars');
  return JSON.stringify(out);
}

function getConfigForClient() {
  return JSON.stringify(getConfig());
}

// ════════════════════════════════════════════════════════
//  DRIVE — Upload / Download
// ════════════════════════════════════════════════════════

function getOrCreateFolder() {
  var folders = DriveApp.getFoldersByName(FOLDER_NAME);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(FOLDER_NAME);
}

function uploadChunk(payload) {
  var cache = CacheService.getScriptCache();
  var key   = 'raw_' + payload.fileIndex + '_' + payload.chunkIndex;
  var MAX   = 90000;
  var d     = payload.data;
  if (d.length > MAX) {
    var n = Math.ceil(d.length / MAX);
    cache.put(key + '_n', String(n), 21600);
    for (var i = 0; i < n; i++)
      cache.put(key + '_' + i, d.substring(i * MAX, (i+1) * MAX), 21600);
  } else {
    cache.put(key + '_n', '1', 21600);
    cache.put(key + '_0', d, 21600);
  }
  cache.put('file_' + payload.fileIndex + '_name',   payload.fileName,            21600);
  cache.put('file_' + payload.fileIndex + '_chunks', String(payload.totalChunks), 21600);
  cache.put('total_files', String(payload.fileCount || (payload.fileIndex + 1)),   21600);
  return { ok: true };
}

function finalizeUpload(payload) {
  var cache      = CacheService.getScriptCache();
  var totalFiles = parseInt(cache.get('total_files') || String(payload.fileCount || 1));
  var folder     = getOrCreateFolder();
  var timestamp  = new Date().toISOString();
  var totalBytes = 0;
  var compressed = payload.compressed || false;

  // Only trash files we are about to overwrite. Other data files (bjh_data, install_data, customer_data) stay.
  var _toRemove = {};
  for (var _fi = 0; _fi < totalFiles; _fi++) {
    var _nm = cache.get('file_' + _fi + '_name');
    if (_nm) _toRemove[_nm] = 1;
  }
  if (!Object.keys(_toRemove).length) {
    if      (payload.fileType === 'install')  _toRemove['install_data.json.gz']  = 1;
    else if (payload.fileType === 'customer') _toRemove['customer_data.json.gz'] = 1;
    else                                       _toRemove['bjh_data.json.gz']      = 1;
  }
  var allFiles = folder.getFiles();
  while (allFiles.hasNext()) {
    var f = allFiles.next();
    if (f.getName() !== META_FILE_NAME && _toRemove[f.getName()]) f.setTrashed(true);
  }

  for (var fi = 0; fi < totalFiles; fi++) {
    var fname   = cache.get('file_' + fi + '_name');
    var nChunks = parseInt(cache.get('file_' + fi + '_chunks') || '0');
    if (!fname || !nChunks) continue;
    var text = '';
    for (var ci = 0; ci < nChunks; ci++) {
      var key = 'raw_' + fi + '_' + ci;
      var n   = parseInt(cache.get(key + '_n') || '1');
      for (var si = 0; si < n; si++) text += (cache.get(key + '_' + si) || '');
    }
    folder.createFile(fname, text, MimeType.PLAIN_TEXT);
    totalBytes += text.length;
    for (var ci2 = 0; ci2 < nChunks; ci2++) {
      var k2 = 'raw_' + fi + '_' + ci2;
      var n2 = parseInt(cache.get(k2 + '_n') || '1');
      for (var si2 = 0; si2 < n2; si2++) cache.remove(k2 + '_' + si2);
      cache.remove(k2 + '_n');
    }
    cache.remove('file_' + fi + '_name');
    cache.remove('file_' + fi + '_chunks');
  }
  cache.remove('total_files');

  var meta = { timestamp: timestamp, uploadedBy: payload.uploadedBy || 'Admin',
               totalBytes: totalBytes, fileCount: totalFiles, compressed: compressed };
  var existingMeta = folder.getFilesByName(META_FILE_NAME);
  while (existingMeta.hasNext()) existingMeta.next().setTrashed(true);
  folder.createFile(META_FILE_NAME, JSON.stringify(meta), MimeType.PLAIN_TEXT);
  return { ok: true, timestamp: timestamp, totalBytes: totalBytes };
}

function getFilesFromDrive() {
  try {
    var folder = getOrCreateFolder();
    var compressed = false;
    var uncompressedFiles = [];
    var compressedFiles = [];
    var metaFiles = folder.getFilesByName(META_FILE_NAME);
    if (metaFiles.hasNext()) {
      try {
        var _m = JSON.parse(metaFiles.next().getBlob().getDataAsString());
        compressed = _m.compressed || false;
        if (Array.isArray(_m.uncompressedFiles)) uncompressedFiles = _m.uncompressedFiles;
        if (Array.isArray(_m.compressedFiles)) compressedFiles = _m.compressedFiles;
      }
      catch(e) {}
    }
    var allFiles = folder.getFiles();
    var files = {};
    while (allFiles.hasNext()) {
      var f = allFiles.next();
      var name = f.getName();
      if (name === META_FILE_NAME) continue;
      // [v291] ข้าม master file — โหลดแยกผ่าน getDataForClientMaster (กัน 34MB เข้า TX payload)
      if (name === SMARTFLOW_MASTER_FILE) continue;
      files[name] = f.getBlob().getDataAsString();
    }
    if (!Object.keys(files).length)
      return { ok: false, error: 'ยังไม่มีข้อมูล กรุณา Upload ก่อน' };
    return { ok: true, files: files, compressed: compressed, uncompressedFiles: uncompressedFiles, compressedFiles: compressedFiles };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

function getMetaFromDrive() {
  try {
    var folder = getOrCreateFolder();
    var files  = folder.getFilesByName(META_FILE_NAME);
    if (!files.hasNext()) return { ok: false, error: 'ยังไม่มีข้อมูล' };
    return { ok: true, meta: JSON.parse(files.next().getBlob().getDataAsString()) };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// ════════════════════════════════════════════════════════
//  SMARTFLOW — Auto Sync to Drive (server-side triggers)
//  Credentials: Script Properties → SMARTFLOW_USER / SMARTFLOW_PWD
//
//  ไฟล์ใน Drive (folder: BJH_Dashboard_Data)
//    bjh_tx.json.gz     — Hourly  : SC_BILL, SpareParts, Quotation, Quotation_SP
//    bjh_master.json.gz — Daily   : CONTRACT, CUSTOMER, INSTALLATION, MC_STATUS_HISTORY
//    bjh_meta.json      — metadata (timestamp ต่อไฟล์)
// ════════════════════════════════════════════════════════

var SMARTFLOW_TOKEN_URL_GAS  = 'https://smartflow.bjc.co.th/SMARTFLOW/GET-API-TOKEN/';
var SMARTFLOW_DATA_URL_GAS   = 'https://smartflow.bjc.co.th/SMARTFLOW/CREATE_JSON_FILE_RAW_API/';
var SMARTFLOW_TX_FILE        = 'bjh_tx.json.gz';
var SMARTFLOW_MASTER_FILE    = 'bjh_master.json.gz';
var CUSTOMER_PROVINCE_FILE   = 'customer_province.json'; // [v313] Eak อัปเอง: CUS_ID→จังหวัด (จาก Customer Master)
var SMARTFLOW_TX_DATASETS    = 'RAW_SC_BILL,RAW_SpareParts,RAW_Quotation,RAW_Quotation_SP,RAW_MC_STATUS_HISTORY';
var SMARTFLOW_MASTER_DATASETS= 'RAW_CONTRACT,RAW_CUSTOMER,RAW_INSTALLATION';

// ════════════════════════════════════════════════════════
// [v480.1] SLIM PAYLOAD — ตัด field ที่ dashboard ไม่ใช้ ที่ต้นทาง (SmartFlow API)
//   param SF: ex_col=  (ชื่อ field ล้วน, ไม่มี TABLE. นำหน้า)
//   ขอบเขต : ตัดทุก dataset ใน request นั้น (global) + nested arrays, case-insensitive
//   ผลจริง  : JSON 131.5 MB -> 67.3 MB (ลด 49%)
//
//   [v480.1 FIX] Apps Script UrlFetch จำกัด URL 2048 chars
//     - v480.0 ส่ง 107 fields รวมกัน + encodeURIComponent เต็ม -> URL 2101 chars -> ชน limit
//     - v480.1 แก้ 2 จุด:
//         (1) แยกรายการต่อกลุ่ม (TX 74 / MASTER 36) - ส่งเฉพาะ field ที่มีจริงในกลุ่มนั้น
//         (2) ไม่ encode comma (comma ถูกกฎใน query string) - ประหยัด 2 chars/comma
//       -> URL: TX 1395 chars (headroom 653) / MASTER 669 chars (headroom 1379)
//     - ผลลด 49% เท่าเดิม (field ที่ไม่มีในกลุ่มนั้นจะถูก SF ข้ามอยู่แล้ว)
//
//   ⚠️ ห้ามใส่เด็ดขาด (จะพังทันที):
//     INSTALL_STATUS    -> script_main filter ==='0'  -> Install Base ว่างหมด
//     MC_STATUS_HISTORY -> SalesProspect 6 จุด        -> popup ประวัติ MC พัง
//     QH_SUBJECT_EMAIL  -> SalesProspect ค้นหา SN     -> ค้นซีเรียลไม่เจอ
//     CUS_ID            -> join จังหวัด               -> จังหวัดหายหมด
//     NOTE_LOG          -> SalesProspect/DailySales   -> หา "X ปี" ไม่ได้
//     PROVINCE          -> Territory Map              -> แผนที่พัง
//
//   ROLLBACK: ตั้ง BJH_EX_COL_OFF = true -> Deploy -> รัน smartflowSyncToDrive() + smartflowDailySyncToDrive()
//   อ้างอิงรายการเต็ม: BJH_Data_Dictionary.xlsx (ชีต "ex_col param")
// ════════════════════════════════════════════════════════
var BJH_EX_COL_OFF    = false;   // <- true = ปิด slim (กลับไปดึงเต็ม)
var BJH_URL_MAX       = 2000;    // guard: เพดานจริงของ UrlFetch = 2048
var BJH_EX_COL_TX     = 'ADMIN_PROCESS_NAME,ADMIN_VER_DATETIME,ADMIN_VER_HEAD_DATETIME,ADMIN_VER_HEAD_NAME,ADMIN_VER_NAME,APP_DATETIME,APP_NAME,AvaliableQty,BILL_JOB_ACK_BY,BILL_JOB_ACK_DATETIME,BILL_JOB_CN_REF_ID,BILL_JOB_ID,BILL_JOB_PRINT_BY,BILL_JOB_RECEIVE_ACTION_BY,BILL_JOB_RECEIVE_BY,BILL_JOB_RECEIVE_DATETIME,BILL_JOB_RETURN_CFD_DATETIME,BILL_JOB_RETURN_DATETIME,BUDGET_YEAR,BatchNumber,CHANGED_BY,CHANGED_BY_NAME,CON_REMARK_NEW,CUSTOMER_ID,CUSTOMER_TYPE_NAME,DOC_NUMBER_SAP,ENG_APP_HEAD_DATETIME,ENG_APP_HEAD_NAME,ENG_APP_NAME,ENG_PR_COMPLETED_DATETIME,ENG_PR_COMPLETED_NAME,ENG_REQ_HEAD_DATETIME,ENG_REQ_HEAD_NAME,ENG_REQ_NAME,ENG_VER_DATETIME,ENG_VER_HEAD_DATETIME,ENG_VER_HEAD_NAME,ENG_VER_NAME,FINAL_APP_DATETIME,FINAL_APP_NAME,LOG_ID,MaterialNumber,ModifiedDate,OnOrderStock,PARTS_READY_HEAD_DATETIME,PARTS_READY_HEAD_NAME,PARTS_READY_NAME,PARTS_TYPE,PARTS_TYPE_IDX,PARTS_TYPE_NAME,QD_PRICE_PER_UNIT,QD_SELLING_QUANTITY,QH_DOC_VERSION,QH_DOC_VERSION_ACTIVE,QH_GP_STD,QH_GP_VALUE,QUOTATION_DETAIL,RECEIVE_HEAD_DATETIME,RECEIVE_HEAD_NAME,RECEIVE_NAME,REQ_HEAD_TEAM,REQ_HEAD_TEAM_NEW,REQ_NAME,REQ_TEAM_NEW,ReservedStock,SPARE_PARTS_HEAD_ID_KEY,SP_DT_ID,SP_ID,STATUS_ID,VER_DATETIME,VER_NAME,quotation_detail,spare_parts,timestamp_history';
var BJH_EX_COL_MASTER = 'BILL_AGE,BUDGET_YEAR,CONTRACT_CONDITION_SPECIAL,CONTRACT_DIDX,CONTRACT_PRICE_DISCOUNT,CON_SIGN_DATE,CON_START_LENGHT,CON_STATUS_COMPLETED,CUSTOMER_TEMP,CUSTOMER_TYPE_NAME,CUS_SHORT_NAME,CUS_TITLE_NAME,CUS_TYPE_NAME,DEP_NAME,ENG_NAME,ID_KEY,INSTALL_CONTRACT_ADD,INSTALL_CONTRACT_ID,INSTALL_DT_ACCESSSORY,INSTALL_DT_REMARK,MODEL_TEMP,PAYMENT_CONDITION,QH_DOC_NUMBER_SALE,QH_ID,QH_ID_KEY,QH_ID_KEY_CREATE,QH_ID_SALE,SOLD_TO_CODE,SV_CARE,SV_ID_REF,WAITING_TIME,WAITING_TIME_AGO,file_count,timestamp_history';

// เลือกรายการ ex_col ตามไฟล์ปลายทาง (ไฟล์อื่น = ไม่ตัด เพื่อความปลอดภัย)
function _bjhExColFor_(filename) {
  if (BJH_EX_COL_OFF) return '';
  if (filename === SMARTFLOW_MASTER_FILE) return BJH_EX_COL_MASTER;
  if (filename === SMARTFLOW_TX_FILE)     return BJH_EX_COL_TX;
  return '';
}
var SMARTFLOW_TRIGGER_HOURLY = 'smartflowSyncToDrive';
var SMARTFLOW_TRIGGER_DAILY  = 'smartflowDailySyncToDrive';

// ── ขอ Token (POST ตาม API spec) — cache ใน ScriptCache อายุ 23 ชม. ──
function smartflowGetToken_() {
  var cache = CacheService.getScriptCache();
  var cached = cache.get('SF_TOKEN');
  if (cached) return cached;

  var props = PropertiesService.getScriptProperties();
  var user  = props.getProperty('SMARTFLOW_USER');
  var pwd   = props.getProperty('SMARTFLOW_PWD');
  if (!user || !pwd) throw new Error('ยังไม่ได้ตั้งค่า SMARTFLOW_USER / SMARTFLOW_PWD ใน Script Properties');

  var resp = UrlFetchApp.fetch(SMARTFLOW_TOKEN_URL_GAS, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ username: user, password: pwd, client_name: 'BJH-Dashboard' }),
    muteHttpExceptions: true
  });
  var code = resp.getResponseCode();
  if (code < 200 || code >= 300) throw new Error('GET-API-TOKEN HTTP ' + code + ': ' + resp.getContentText().substring(0, 200));

  var data = JSON.parse(resp.getContentText());
  if (!data.status || !data.token) throw new Error('Token ไม่ถูกต้อง: ' + resp.getContentText().substring(0, 200));

  // cache 23 ชม. (token อายุ 1 วัน — เผื่อ drift)
  cache.put('SF_TOKEN', data.token, 23 * 3600);
  return data.token;
}

// ── ล้าง cached token (เรียกเมื่อเจอ 401) ──
function smartflowClearToken_() {
  CacheService.getScriptCache().remove('SF_TOKEN');
}

// ── ดึงข้อมูลจาก SmartFlow API → base64(gzip bytes) → เขียนไฟล์ใน Drive ──
function smartflowFetchAndSave_(datasets, filename) {
  var token = smartflowGetToken_();
  // [v480.1] comma ถูกกฎใน query string -> ไม่ต้อง encode (encode เต็มจะชน URL limit 2048)
  var _q = function(s){ return encodeURIComponent(s).replace(/%2C/g, ','); };
  var url = SMARTFLOW_DATA_URL_GAS + '?datasets=' + _q(datasets) + '&format=gzip';
  var exCol = _bjhExColFor_(filename);
  if (exCol) url += '&ex_col=' + _q(exCol);

  // [v480.1] guard: UrlFetch จำกัด URL 2048 chars -> fail ชัดเจนพร้อมวิธีแก้ ดีกว่า Exception ดิบ
  if (url.length > BJH_URL_MAX) {
    throw new Error('[SLIM] URL ยาว ' + url.length + ' chars (เพดาน UrlFetch 2048) — '
      + 'ลดจำนวน field ใน BJH_EX_COL_' + (filename === SMARTFLOW_MASTER_FILE ? 'MASTER' : 'TX')
      + ' หรือตั้ง BJH_EX_COL_OFF = true');
  }
  Logger.log('[SLIM] fetch ' + filename
    + ' | ex_col=' + (exCol ? exCol.split(',').length + ' fields' : 'OFF')
    + ' | URL=' + url.length + '/' + BJH_URL_MAX + ' chars');
  var resp = UrlFetchApp.fetch(url, {
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + token },
    muteHttpExceptions: true
  });
  var code = resp.getResponseCode();
  if (code === 401) {
    // token หมดอายุ → ล้าง cache แล้วลองใหม่ครั้งเดียว
    smartflowClearToken_();
    token = smartflowGetToken_();
    resp = UrlFetchApp.fetch(url, {
      method: 'get',
      headers: { 'Authorization': 'Bearer ' + token },
      muteHttpExceptions: true
    });
    code = resp.getResponseCode();
  }
  if (code === 401 || code === 403) throw new Error('SmartFlow auth ล้มเหลว (HTTP ' + code + ') — ตรวจ user/pwd');
  if (code < 200 || code >= 300) throw new Error('CREATE_JSON_FILE_RAW_API HTTP ' + code + ': ' + resp.getContentText().substring(0, 200));

  // API ส่ง gzip binary กลับมา → base64 encode ก่อนเขียน Drive (client: atob → pako.inflate → JSON)
  var content = Utilities.base64Encode(resp.getBlob().getBytes());

  var folder = getOrCreateFolder();
  var existing = folder.getFilesByName(filename);
  while (existing.hasNext()) existing.next().setTrashed(true);
  folder.createFile(filename, content, MimeType.PLAIN_TEXT);

  // [v480] log ขนาดจริง → ใช้ยืนยันว่า slim ทำงาน (เทียบกับ baseline ก่อน slim)
  Logger.log('[SLIM] saved ' + filename + ' | base64=' + (content.length / 1048576).toFixed(2) + ' MB'
             + ' (baseline: bjh_tx=5.74MB / bjh_master=5.08MB)');

  return { filename: filename, bytes: content.length, timestamp: new Date().toISOString() };
}

// ── อัปเดต meta (per-file timestamp) ──
function smartflowUpdateMeta_(fileResult) {
  var folder = getOrCreateFolder();
  var meta = {};
  var metaFiles = folder.getFilesByName(META_FILE_NAME);
  if (metaFiles.hasNext()) {
    try { meta = JSON.parse(metaFiles.next().getBlob().getDataAsString()) || {}; } catch (e) { meta = {}; }
  }
  // เก็บ timestamp ต่อไฟล์
  if (!meta.fileMeta) meta.fileMeta = {};
  meta.fileMeta[fileResult.filename] = { timestamp: fileResult.timestamp, bytes: fileResult.bytes };
  // timestamp รวม = ล่าสุดในทุกไฟล์
  meta.timestamp = fileResult.timestamp;
  meta.uploadedBy = 'SmartFlow Auto';
  // ทุกไฟล์ที่ sync มาเป็น compressed เสมอ
  var cf = Array.isArray(meta.compressedFiles) ? meta.compressedFiles : [];
  [SMARTFLOW_TX_FILE, SMARTFLOW_MASTER_FILE].forEach(function(n) {
    if (cf.indexOf(n) < 0) cf.push(n);
  });
  meta.compressedFiles = cf;
  // ลบของเก่าที่อาจเคยเป็น uncompressed
  if (Array.isArray(meta.uncompressedFiles)) {
    meta.uncompressedFiles = meta.uncompressedFiles.filter(function(n) {
      return n !== SMARTFLOW_TX_FILE && n !== SMARTFLOW_MASTER_FILE;
    });
  }
  var oldMeta = folder.getFilesByName(META_FILE_NAME);
  while (oldMeta.hasNext()) oldMeta.next().setTrashed(true);
  folder.createFile(META_FILE_NAME, JSON.stringify(meta), MimeType.PLAIN_TEXT);
  return meta;
}

// ── Hourly sync: TX datasets (ตัวเลข/transaction) ──
function smartflowSyncToDrive() {
  var r = smartflowFetchAndSave_(SMARTFLOW_TX_DATASETS, SMARTFLOW_TX_FILE);
  var meta = smartflowUpdateMeta_(r);
  // [C30] ไฟล์ใหม่ -> bump version (cache key เปลี่ยน) -> warm ทันที
  //   trigger รันเบื้องหลัง ไม่มีใครรอ -> user ไม่ต้องอ่าน Drive อีกเลย
  try { _bjhBumpVer('TX'); } catch (e) {}
  try { _bjhReadDriveCached(SMARTFLOW_TX_FILE, 'TX'); _bjhMetaCached(); } catch (e) { Logger.log('[C30] warm TX: ' + e); }
  return { ok: true, file: r.filename, timestamp: meta.timestamp, bytes: r.bytes };
}

// ── Daily sync: Master datasets (ข้อมูลหลัก) ──
function smartflowDailySyncToDrive() {
  var r = smartflowFetchAndSave_(SMARTFLOW_MASTER_DATASETS, SMARTFLOW_MASTER_FILE);
  var meta = smartflowUpdateMeta_(r);
  try { _bjhBumpVer('MASTER'); } catch (e) {}
  try { _bjhReadDriveCached(SMARTFLOW_MASTER_FILE, 'MASTER'); } catch (e) { Logger.log('[C30] warm MASTER: ' + e); }
  return { ok: true, file: r.filename, timestamp: meta.timestamp, bytes: r.bytes };
}

// ── client เรียกขอ token ──
function getSmartflowTokenForClient() {
  try {
    return JSON.stringify({ ok: true, token: smartflowGetToken_() });
  } catch (err) {
    return JSON.stringify({ ok: false, error: err.message });
  }
}

// ── Trigger: Hourly (ทุก 1 ชม.) ──
function createSmartflowHourlyTrigger() {
  removeSmartflowHourlyTrigger();
  ScriptApp.newTrigger(SMARTFLOW_TRIGGER_HOURLY).timeBased().everyHours(1).create();
  return { ok: true };
}
function removeSmartflowHourlyTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  var n = 0;
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === SMARTFLOW_TRIGGER_HOURLY) {
      ScriptApp.deleteTrigger(triggers[i]); n++;
    }
  }
  return { ok: true, removed: n };
}

// ── Trigger: Daily (วันละครั้ง เที่ยงคืน–1 น.) ──
function createSmartflowDailyTrigger() {
  removeSmartflowDailyTrigger();
  ScriptApp.newTrigger(SMARTFLOW_TRIGGER_DAILY).timeBased().everyDays(1).atHour(0).create();
  return { ok: true };
}
function removeSmartflowDailyTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  var n = 0;
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === SMARTFLOW_TRIGGER_DAILY) {
      ScriptApp.deleteTrigger(triggers[i]); n++;
    }
  }
  return { ok: true, removed: n };
}

// ── ลง/ถอน trigger ทั้งคู่พร้อมกัน ──
function createAllSmartflowTriggers() {
  createSmartflowHourlyTrigger();
  createSmartflowDailyTrigger();
  return { ok: true };
}
function removeAllSmartflowTriggers() {
  removeSmartflowHourlyTrigger();
  removeSmartflowDailyTrigger();
  return { ok: true };
}

// ── saveConfigSection: บันทึก config แต่ละ section ลง Sheet ──
function saveConfigSection(payloadStr) {
  try { _bjhBumpVer('CFG'); } catch (e) {}   // [C30] config เปลี่ยน -> cache หมดอายุทันที
  try {
    var payload = JSON.parse(payloadStr);
    var section = payload.section;
    var data    = payload.data;
    var ss      = getSpreadsheet();

    // [B8] Note ต่อเครื่อง (SN) — { SN: 'ข้อความ', ... } ส่วนกลาง
    if (section === 'note_sn') {
      _ckvWriteSection(ss, 'note_sn', (data && typeof data==='object') ? data : {});
      return JSON.stringify({ ok: true });
    }
    // [B10] พื้นที่รับผิดชอบเซลล์ (region ใต้ชื่อ) — { ชื่อ: 'region', ... } ส่วนกลาง
    // [V535] ใครเห็นตัวเลือก Mobile — { empId: 1, ... }
    if (section === 'mobile_users') {
      _ckvWriteSection(ss, 'mobile_users', (data && typeof data==='object') ? data : {});
      return JSON.stringify({ ok: true });
    }
    if (section === 'sales_region') {
      _ckvWriteSection(ss, 'sales_region', (data && typeof data==='object') ? data : {});
      return JSON.stringify({ ok: true });
    }
    // [V562] Parts Status Mapping — { 'STATUS_DT_NAME': 'ordering'|'pending'|'skip', ... }
    if (section === 'parts_status') {
      _ckvWriteSection(ss, 'parts_status', (data && typeof data==='object') ? data : {});
      return JSON.stringify({ ok: true });
    }
    // [C37] Summary status filter — array pill id ที่ ON (ส่วนกลาง · แยกจาก Service Commercial Orders)
    if (section === 'sum_status') {
      _ckvWriteSection(ss, 'sum_status', { ids: Array.isArray(data) ? data : [] });
      return JSON.stringify({ ok: true });
    }

    // [V506] ลิงก์ภายนอกสำหรับหน้า Mobile — { contact:'https://...', key2:'...' }
    if (section === 'mobile_links') {
      _ckvWriteSection(ss, 'mobile_links', (data && typeof data==='object') ? data : {});
      return JSON.stringify({ ok: true });
    }

    // [V521] sales ประจำ รพ. ในกรุงเทพฯ — { 'ชื่อโรงพยาบาล': 'ชื่อ sales', ... }
    //   กรุงเทพฯ กำหนดรายจังหวัดไม่ได้ (province_rep ล็อกเป็น "ดูแลร่วมกัน") จึงต้องตั้งรายโรงพยาบาล
    if (section === 'bkk_sales') {
      _ckvWriteSection(ss, 'bkk_sales', (data && typeof data==='object') ? data : {});
      return JSON.stringify({ ok: true });
    }

    // [C17] กลุ่มประเภทสัญญา — CONTRACT_TYPE_NAME -> กลุ่ม
    //   data = { 'สัญญาบริการ (ไม่รวมอะไหล่)': 'noparts', ... }
    if (section === 'ctype') {
      _ckvWriteSection(ss, 'ctype', data || {});
      return JSON.stringify({ ok: true });
    }

    if (section === 'fad') {
      var sheet = ss.getSheetByName('fad') || ss.insertSheet('fad');
      sheet.clearContents();
      sheet.getRange('A1:B1').setValues([['month','value_exvat']]);
      var rows = [];
      for (var mo = 1; mo <= 12; mo++) {
        rows.push([mo, parseFloat(data[String(mo)]) || 0]); // 1-indexed
      }
      sheet.getRange(2,1,rows.length,2).setValues(rows);
      return JSON.stringify({ok:true});
    }

    if (section === 'spfix') {
      var sheet = ss.getSheetByName('spfix') || ss.insertSheet('spfix');
      sheet.clearContents();
      sheet.getRange('A1:B1').setValues([['month','value_exvat']]);
      var rows = [];
      for (var mo = 1; mo <= 12; mo++) {
        rows.push([mo, data[String(mo)] || 0]);
      }
      sheet.getRange(2,1,rows.length,2).setValues(rows);
      return JSON.stringify({ok:true});
    }

    if (section === 'fcfad') {
      // ใหม่: เขียน _config_kv (รวม fcsp+fcfad+display_config)
      var fcfadMap = {};
      for (var moF = 1; moF <= 12; moF++) {
        fcfadMap[String(moF)] = data[String(moF)] || 0;
      }
      _ckvWriteSection(ss, 'fcfad', fcfadMap);
      return JSON.stringify({ok:true});
    }

    if (section === 'fcsp') {
      // ใหม่: เขียน _config_kv (รวม fcsp+fcfad+display_config)
      var fcspMap = {};
      for (var moFCS = 1; moFCS <= 12; moFCS++) {
        fcspMap[String(moFCS)] = data[String(moFCS)] || 0;
      }
      _ckvWriteSection(ss, 'fcsp', fcspMap);
      return JSON.stringify({ok:true});
    }

    if (section === 'api_config') {
      // เขียน _config_kv section='api_config' — key/value pairs
      // data = { show_load_data, show_load_api, username, client_name }
      var apiMap = {};
      if (data && typeof data === 'object') {
        Object.keys(data).forEach(function(k){
          apiMap[k] = (data[k] == null ? '' : String(data[k]));
        });
      }
      _ckvWriteSection(ss, 'api_config', apiMap);
      return JSON.stringify({ok:true});
    }

    if (section === 'unassigned_overrides') {
      // ใหม่: เขียน _qn_overrides (team column)
      // data = [{qn, team}, ...] หรือ {qn: team, ...}
      var teamMap = {};
      if (Array.isArray(data)) {
        data.forEach(function(r){
          var qn = String(r.qn||'').trim();
          var tm = String(r.team||'').trim();
          if (qn && tm) teamMap[qn] = tm;
        });
      } else if (data && typeof data === 'object') {
        Object.keys(data).forEach(function(qn){
          var tm = String(data[qn]||'').trim();
          if (qn && tm) teamMap[qn] = tm;
        });
      }
      _qnoWriteCategory(ss, 'team', teamMap);
      return JSON.stringify({ok:true});
    }

    if (section === 'brand_overrides') {
      // ใหม่: เขียน _qn_overrides (brand column)
      var brandMap = {};
      if (Array.isArray(data)) {
        data.forEach(function(r){
          var qn = String(r.qn||'').trim();
          var br = String(r.brand||'').trim();
          if (qn && br) brandMap[qn] = br;
        });
      } else if (data && typeof data === 'object') {
        Object.keys(data).forEach(function(qn){
          var br = String(data[qn]||'').trim();
          if (qn && br) brandMap[qn] = br;
        });
      }
      _qnoWriteCategory(ss, 'brand', brandMap);
      return JSON.stringify({ok:true});
    }

    if (section === 'tab_permissions') {
      // [v225] เขียน _config_kv (section='tab_permissions') encoded "A,M,S"
      // วนตาม data ที่ frontend ส่งมา (ไม่ hardcode key list) -> รองรับ key ใหม่ (nav_ds, nav_mdcol) + ลบ key เก่า (issues)
      // admin ตามค่าจริง (ไม่ force true) — ทุกอย่างตาม config
      var tpMap = {};
      Object.keys(data || {}).forEach(function(tab){
        var p = data[tab] || {};
        tpMap[tab] = _tpEncode({
          admin:   !!p.admin,
          manager: !!p.manager,
          sales:   !!p.sales
        });
      });
      _ckvWriteSection(ss, 'tab_permissions', tpMap);
      return JSON.stringify({ok:true});
    }

    if (section === 'fcsp_team') {
      // data = [{team, type, months:[12]}]
      var sheetFS = ss.getSheetByName('fcsp_team') || ss.insertSheet('fcsp_team');
      sheetFS.clearContents();
      var hdr = ['team','type','m1','m2','m3','m4','m5','m6','m7','m8','m9','m10','m11','m12'];
      sheetFS.getRange(1,1,1,14).setValues([hdr]);
      var rowsFS = (Array.isArray(data)?data:[]).map(function(r){
        var arr=[r.team||'', r.type||''];
        for(var ii=0;ii<12;ii++) arr.push(Number((r.months||[])[ii]||0));
        return arr;
      });
      if(rowsFS.length) sheetFS.getRange(2,1,rowsFS.length,14).setValues(rowsFS);
      return JSON.stringify({ok:true});
    }

    if (section === 'fcfad_team') {
      var sheetFF = ss.getSheetByName('fcfad_team') || ss.insertSheet('fcfad_team');
      sheetFF.clearContents();
      var hdr2 = ['team','type','m1','m2','m3','m4','m5','m6','m7','m8','m9','m10','m11','m12'];
      sheetFF.getRange(1,1,1,14).setValues([hdr2]);
      var rowsFF = (Array.isArray(data)?data:[]).map(function(r){
        var arr=[r.team||'', r.type||''];
        for(var ii=0;ii<12;ii++) arr.push(Number((r.months||[])[ii]||0));
        return arr;
      });
      if(rowsFF.length) sheetFF.getRange(2,1,rowsFF.length,14).setValues(rowsFF);
      return JSON.stringify({ok:true});
    }

    if (section === 'budget') {
      // Multi-year: รับ payload {yr: '2027', data: {team: {SC, SP}}}
      //             หรือ legacy {team: {SC, SP}} → assume current year
      var sheet = ss.getSheetByName('budget') || ss.insertSheet('budget');
      var yrTarget, budData;
      if (data && data.yr && data.data) {
        yrTarget = String(data.yr);
        budData = data.data;
      } else {
        yrTarget = String(new Date().getFullYear());
        budData = data || {};
      }
      // อ่าน rows เดิม → keep rows ของปีอื่น
      var existing = sheet.getDataRange().getValues();
      var hasYrCol = (existing.length > 0 && String(existing[0][0]||'').trim().toLowerCase() === 'yr');
      var keepRows = [];
      for (var ei = 1; ei < existing.length; ei++) {
        var er = existing[ei];
        if (hasYrCol) {
          var eyr = String(er[0]||'').trim();
          if (eyr && eyr !== yrTarget) {
            keepRows.push([eyr, er[1], er[2]].concat(er.slice(3, 15)));
          }
        }
        // ถ้าเป็น legacy schema (no yr) → migrate เป็นปี 2026
        else if (er[0]) {
          if (yrTarget !== '2026') {
            // เก็บ row เก่าเป็นปี 2026
            keepRows.push(['2026', er[0], er[1]].concat(er.slice(2, 14)));
          }
        }
      }
      // Build new rows for target year
      var newRows = [];
      Object.keys(budData||{}).forEach(function(team) {
        ['SP','SC'].forEach(function(type) {
          if (budData[team] && budData[team][type]) {
            newRows.push([yrTarget, team, type].concat(budData[team][type]));
          }
        });
      });
      // Write all rows
      sheet.clearContents();
      sheet.getRange(1,1,1,15).setValues([['yr','team','type','jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']]);
      var allRows = keepRows.concat(newRows);
      if (allRows.length) sheet.getRange(2,1,allRows.length,15).setValues(allRows);
      return JSON.stringify({ok:true});
    }

    if (section === 'actual_fad') {
      // Multi-year: รับ payload {yr: '2027', data: {team: {SC, SP}}}
      var sheet = ss.getSheetByName('actual_fad') || ss.insertSheet('actual_fad');
      var yrTarget, afData;
      if (data && data.yr && data.data) {
        yrTarget = String(data.yr);
        afData = data.data;
      } else {
        yrTarget = String(new Date().getFullYear());
        afData = data || {};
      }
      var existing = sheet.getDataRange().getValues();
      var hasYrCol = (existing.length > 0 && String(existing[0][0]||'').trim().toLowerCase() === 'yr');
      var keepRows = [];
      for (var ei = 1; ei < existing.length; ei++) {
        var er = existing[ei];
        if (hasYrCol) {
          var eyr = String(er[0]||'').trim();
          if (eyr && eyr !== yrTarget) {
            keepRows.push([eyr, er[1], er[2]].concat(er.slice(3, 15)));
          }
        } else if (er[0]) {
          if (yrTarget !== '2026') {
            keepRows.push(['2026', er[0], er[1]].concat(er.slice(2, 14)));
          }
        }
      }
      var newRows = [];
      Object.keys(afData||{}).forEach(function(team) {
        ['SP','SC'].forEach(function(type) {
          if (afData[team] && afData[team][type]) {
            newRows.push([yrTarget, team, type].concat(afData[team][type]));
          }
        });
      });
      sheet.clearContents();
      sheet.getRange(1,1,1,15).setValues([['yr','team','type','jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']]);
      var allRows = keepRows.concat(newRows);
      if (allRows.length) sheet.getRange(2,1,allRows.length,15).setValues(allRows);
      return JSON.stringify({ok:true});
    }

    if (section === 'sa_bud') {
      // Multi-year: รับ payload {yr: '2027', data: {sales: amount}}
      var sheet = ss.getSheetByName('sa_bud') || ss.insertSheet('sa_bud');
      var yrTarget, saData;
      if (data && data.yr && data.data) {
        yrTarget = String(data.yr);
        saData = data.data;
      } else {
        yrTarget = String(new Date().getFullYear());
        saData = data || {};
      }
      var existing = sheet.getDataRange().getValues();
      var hasYrCol = (existing.length > 0 && String(existing[0][0]||'').trim().toLowerCase() === 'yr');
      var keepRows = [];
      for (var ei = 1; ei < existing.length; ei++) {
        var er = existing[ei];
        if (hasYrCol) {
          var eyr = String(er[0]||'').trim();
          if (eyr && eyr !== yrTarget) {
            keepRows.push([eyr, er[1], er[2]]);
          }
        } else if (er[0]) {
          if (yrTarget !== '2026') {
            keepRows.push(['2026', er[0], er[1]]);
          }
        }
      }
      var newRows = Object.keys(saData||{}).map(function(n){ return [yrTarget, n, saData[n]]; });
      sheet.clearContents();
      sheet.getRange(1,1,1,3).setValues([['yr','sales_name','budget']]);
      var allRows = keepRows.concat(newRows);
      if (allRows.length) sheet.getRange(2,1,allRows.length,3).setValues(allRows);
      return JSON.stringify({ok:true});
    }

    if (section === 'hm_stage') {
      // ใหม่: เขียน _config_kv
      var hmMap = {};
      Object.keys(data||{}).forEach(function(s){
        hmMap[s] = String(data[s]||'').toUpperCase();
      });
      _ckvWriteSection(ss, 'hm_stage', hmMap);
      return JSON.stringify({ok:true});
    }

    if (section === 'price_table') {
      // [v403] ตารางราคาสัญญาบริการ: key = 'brand||model', value = object (JSON blob)
      //   { y: {'1':[a,b,c], ...,'10+':[a,b,c]}, excl: 'ยกเว้น...' }
      //   _ckvWriteSection แปลง object -> JSON string, _ckvReadAll parse กลับให้อัตโนมัติ
      var ptMap = {};
      Object.keys(data||{}).forEach(function(k){ ptMap[k] = data[k]; });
      _ckvWriteSection(ss, 'price_table', ptMap);
      return JSON.stringify({ok:true});
    }

    if (section === 'price_groups') {
      // [v433] ตารางราคาแบบกลุ่ม: key = groupId, value = {name, brand, models:[...], y:{...}}
      var pgMap = {};
      Object.keys(data||{}).forEach(function(k){ pgMap[k] = data[k]; });
      _ckvWriteSection(ss, 'price_groups', pgMap);
      return JSON.stringify({ok:true});
    }

    if (section === 'qsp_exceptions') {
      // [v448] list เลขที่ใบ QSP23/24 ที่ยกเว้นไม่ให้ filter ออกจาก window.D (key = doc number, value = true)
      var qeMap = {};
      Object.keys(data||{}).forEach(function(k){ qeMap[k] = data[k]; });
      _ckvWriteSection(ss, 'qsp_exceptions', qeMap);
      return JSON.stringify({ok:true});
    }

    if (section === 'frequent_parts') {
      // [v433] list อะไหล่เสียบ่อย (key = brand, value = array ชื่ออะไหล่) — แยกตามแบรนด์
      var fpMap = {};
      Object.keys(data||{}).forEach(function(k){ fpMap[k] = data[k]; });
      _ckvWriteSection(ss, 'frequent_parts', fpMap);
      return JSON.stringify({ok:true});
    }

    if (section === 'qf_chips') {
      var qfMap = {};
      Object.keys(data||{}).forEach(function(k){ qfMap[k] = String(data[k]); });
      _ckvWriteSection(ss, 'qf_chips', qfMap);
      return JSON.stringify({ok:true});
    }

    if (section === 'display_config') {
      // ใหม่: เขียน _config_kv (รวม fcsp+fcfad+display_config)
      var dispMap = {};
      Object.keys(data||{}).forEach(function(k){
        dispMap[k] = data[k] ? 'true' : 'false';
      });
      _ckvWriteSection(ss, 'display_config', dispMap);
      return JSON.stringify({ok:true});
    }

    if (section === 'province_rep') {
      // [v314] override จังหวัด→ผู้แทน (Sales Areas map) — เก็บ _config_kv ราย จังหวัด
      var prMap = {};
      Object.keys(data||{}).forEach(function(prov){
        var rep = String(data[prov]||'').trim();
        if (prov && rep) prMap[prov] = rep;
      });
      _ckvWriteSection(ss, 'province_rep', prMap);
      return JSON.stringify({ok:true});
    }

    if (section === 'model_group') {
      // ใหม่: เขียน _config_kv (model → group name)
      var mgMap = {};
      Object.keys(data||{}).forEach(function(m){
        var v = String(data[m]||'').trim();
        if (v) mgMap[m] = v;  // ค่าว่าง = เอาออกจากกลุ่ม (ไม่เขียน)
      });
      _ckvWriteSection(ss, 'model_group', mgMap);
      return JSON.stringify({ok:true});

    }

    // [V479] Sales Retention — config แยกฝ่ายขาย (รุ่น→กลุ่ม / รพ.→กลุ่ม)
    if (section === 'sales_model_group' || section === 'sales_hosp_group'
        || section === 'sa_hosp_group' || section === 'sa_area_override'
        || section === 'quote_notes') {
      var srMap = {};
      Object.keys(data||{}).forEach(function(k){
        var v = String(data[k]||'').trim();
        if (v) srMap[k] = v;
      });
      _ckvWriteSection(ss, section, srMap);
      return JSON.stringify({ok:true});
    }

    if (section === 'status_group') {
      // ใหม่: เขียน _config_kv
      var sgMap = {};
      Object.keys(data||{}).forEach(function(s){
        sgMap[s] = String(data[s]||'').toLowerCase();
      });
      _ckvWriteSection(ss, 'status_group', sgMap);
      return JSON.stringify({ok:true});
    }

    if (section === 'email_req') {
      _ckvWriteSection(ss, 'email_req', data || {});
      return JSON.stringify({ok:true});
    }

    if (section === 'contract_track') {
      _ckvWriteSection(ss, 'contract_track', data || {});
      return JSON.stringify({ok:true});
    }

    if (section === 'sp_track') {
      _ckvWriteSection(ss, 'sp_track', data || {});
      return JSON.stringify({ok:true});
    }

    if (section === 'ar_cfg') {
      _ckvWriteSection(ss, 'ar_cfg', data || {});
      return JSON.stringify({ok:true});
    }

    if (section === 'ar_paid') {
      _ckvWriteSection(ss, 'ar_paid', data || {});
      return JSON.stringify({ok:true});
    }

    if (section === 'sp_merge_map') {
      _ckvWriteSection(ss, 'sp_merge_map', data || {});
      return JSON.stringify({ok:true});
    }

    if (section === 'sp_alert_quo_map') {
      _ckvWriteSection(ss, 'sp_alert_quo_map', data || {});
      return JSON.stringify({ok:true});
    }

    return JSON.stringify({ok:false, error:'Unknown section: '+section});
  } catch(err) {
    return JSON.stringify({ok:false, error:err.message});
  }
}
// ── saveForecast: บันทึก Revenue Forecast ลง Sheet (merge mode) ──
function saveForecast(payloadStr) {
  try {
    var newRows = JSON.parse(payloadStr);
    var ss      = getSpreadsheet();
    var sheet   = ss.getSheetByName('Forecast');
    if (!sheet) sheet = ss.insertSheet('Forecast');

    var headers = ['DOC_NUMBER','ลูกค้า','Brand','Model','Sales','TYPE','Stage','สถานะ','ประเภทสัญญา','มูลค่ารวม','งวดที่','เดือนคาดเก็บ','มูลค่างวด','manual_override','updated_at'];

    // ── อ่านข้อมูลเดิมจาก sheet ──────────────────────────────
    var existingMap = {}; // key = DOC_NUMBER + '|' + งวดที่
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var existing = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
      existing.forEach(function(row) {
        var key = (row[0]||'') + '|' + (row[10]||'');
        existingMap[key] = {
          doc:      row[0],  cust:    row[1],  brand:   row[2],
          model:    row[3],  sales:   row[4],  type:    row[5],
          stage:    row[6],  status:  row[7],  ctype:   row[8],
          amt:      row[9],  inst:    row[10], ym:      row[11],
          instAmt:  row[12], manual:  row[13], updated: row[14]
        };
      });
    }

    var now = new Date().toISOString();

    // ── Merge: รับ rows ใหม่ → merge กับของเดิม ─────────────
    // COL: 0=DOC_NUMBER,1=ลูกค้า,2=Brand,3=Model,4=Sales,
    //      5=TYPE,6=Stage,7=สถานะ,8=ประเภทสัญญา,9=มูลค่ารวม,
    //      10=งวดที่,11=เดือนคาดเก็บ,12=มูลค่างวด,13=manual_override
    var mergedMap = {};
    newRows.forEach(function(nr) {
      var key = (nr[0]||'') + '|' + (nr[10]||'');
      mergedMap[key] = [
        nr[0],                            // DOC_NUMBER
        nr[1],                            // ลูกค้า
        nr[2],                            // Brand
        nr[3],                            // Model
        nr[4],                            // Sales
        nr[5],                            // TYPE
        nr[6],                            // Stage (อัพเดทเสมอ)
        nr[7],                            // สถานะ (อัพเดทเสมอ)
        nr[8],                            // ประเภทสัญญา
        nr[9],                            // มูลค่ารวม
        nr[10],                           // งวดที่
        nr[11],                           // เดือนคาดเก็บ — ใช้ค่าที่ย้ายเสมอ (manual เปลี่ยนได้)
        nr[12],                           // มูลค่างวด
        nr[13]||'N',                      // manual_override
        now                               // updated_at
      ];
    });

    // ── เก็บ rows ที่อยู่ใน sheet เดิมแต่ไม่ได้ส่งมา ─────────
    // (เช่น Won ที่ client filter ออก แต่ยังต้องเก็บไว้)
    Object.keys(existingMap).forEach(function(key) {
      if (!mergedMap[key]) {
        var ex = existingMap[key];
        mergedMap[key] = [
          ex.doc, ex.cust, ex.brand, ex.model, ex.sales,
          ex.type, ex.stage, ex.status, ex.ctype, ex.amt,
          ex.inst, ex.ym, ex.instAmt, ex.manual, ex.updated||now
        ];
      }
    });

    // ── Sort: DOC_NUMBER → งวดที่ ────────────────────────────
    var finalRows = Object.values(mergedMap).sort(function(a, b) {
      if (a[0] < b[0]) return -1;
      if (a[0] > b[0]) return 1;
      return (parseInt(a[10])||0) - (parseInt(b[10])||0);
    });

    // ── เขียนกลับ ────────────────────────────────────────────
    sheet.clearContents();
    sheet.getRange(1,1,1,headers.length).setValues([headers]);
    sheet.getRange(1,1,1,headers.length).setFontWeight('bold').setBackground('#1a3a5c').setFontColor('#ffffff');
    if (finalRows.length) {
      sheet.getRange(2,1,finalRows.length,headers.length).setValues(finalRows);
    }
    sheet.setFrozenRows(1);

    // ── สี manual rows ────────────────────────────────────────
    for (var i = 0; i < finalRows.length; i++) {
      if (String(finalRows[i][13]||'').toUpperCase() === 'Y') {
        sheet.getRange(i+2, 12, 1, 1).setBackground('#1a3a1a').setFontColor('#22c55e');
      }
    }

    return JSON.stringify({ ok: true, rows: finalRows.length, merged: Object.keys(existingMap).length });
  } catch(err) {
    return JSON.stringify({ ok: false, error: err.message });
  }
}

// ── loadForecast: อ่าน Sheet 'Forecast' → คืน overrides (group by DOC_NUMBER) ──
function loadForecast() {
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName('Forecast');
    if (!sheet) return JSON.stringify({ ok:true, overrides:{} });
    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) return JSON.stringify({ ok:true, overrides:{} });
    // COL: 0=DOC_NUMBER 10=งวดที่ 11=เดือนคาดเก็บ(ym) 12=มูลค่างวด(amt) 13=manual
    var vals = sheet.getRange(2, 1, lastRow-1, 14).getValues();
    var byDoc = {};
    vals.forEach(function(row){
      var doc = row[0]; if(!doc) return;
      var inst = parseInt(row[10]) || 0;     // งวดที่ (1-based)
      var ym   = row[11] || '';
      var amt  = Number(row[12]) || 0;
      var manual = String(row[13]||'').toUpperCase()==='Y';
      if(!byDoc[doc]) byDoc[doc] = { items:[], manual:false };
      byDoc[doc].items.push({ inst:inst, ym:ym, amt:amt });
      if(manual) byDoc[doc].manual = true;
    });
    // แปลงเป็น { DOC: { bars:[ym...], amts:[amt...], manual:bool } } เรียงตามงวดที่
    var overrides = {};
    Object.keys(byDoc).forEach(function(doc){
      var o = byDoc[doc];
      o.items.sort(function(a,b){ return a.inst - b.inst; });
      overrides[doc] = {
        bars: o.items.map(function(x){ return x.ym; }),
        amts: o.items.map(function(x){ return x.amt; }),
        manual: o.manual
      };
    });
    return JSON.stringify({ ok:true, overrides:overrides });
  } catch(err) {
    return JSON.stringify({ ok:false, error:err.message, overrides:{} });
  }
}
// ════════════════════════════════════════════════════════


// ── [v159] Sales Actual รายเดือน: Sheet 'SalesActual' (Sales, Year, Month(1-12), Amount, UpdatedAt) ──
function saveSalesActual(payloadStr) {
  try {
    var rows = JSON.parse(payloadStr); // [{sales, year, month, amount}] ; amount '' = ลบ
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName('SalesActual');
    if (!sheet) {
      sheet = ss.insertSheet('SalesActual');
      sheet.getRange(1,1,1,5).setValues([['Sales','Year','Month','Amount','UpdatedAt']]);
    }
    var lastRow = sheet.getLastRow();
    var map = {}; // key sales|year|month -> rowIndex(1-based)
    if (lastRow > 1) {
      var ex = sheet.getRange(2,1,lastRow-1,3).getValues();
      for (var i=0;i<ex.length;i++) map[ex[i][0]+'|'+ex[i][1]+'|'+ex[i][2]] = i+2;
    }
    var now = new Date().toISOString();
    rows.forEach(function(r){
      if (!r || !r.sales || !r.year || !r.month) return;
      var key = r.sales+'|'+r.year+'|'+r.month;
      var amt = (r.amount===''||r.amount==null) ? '' : Number(r.amount)||0;
      if (map[key]) {
        sheet.getRange(map[key],4,1,2).setValues([[amt, now]]);
      } else if (amt !== '') {
        sheet.appendRow([r.sales, r.year, r.month, amt, now]);
        map[key] = sheet.getLastRow();
      }
    });
    return JSON.stringify({ ok:true });
  } catch (e) {
    return JSON.stringify({ ok:false, error: e.message });
  }
}

function loadSalesActual(year) {
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName('SalesActual');
    if (!sheet) return JSON.stringify({ ok:true, data:{} });
    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) return JSON.stringify({ ok:true, data:{} });
    var vals = sheet.getRange(2,1,lastRow-1,4).getValues();
    var out = {}; // { 'sales': { '1': amt, ... } }
    var yr = parseInt(year)||0;
    vals.forEach(function(row){
      var sa=String(row[0]||'').trim(), y=parseInt(row[1])||0, mo=parseInt(row[2])||0;
      var amt=row[3];
      if (!sa || !mo) return;
      if (yr && y!==yr) return;
      if (amt===''||amt==null) return;
      if (!out[sa]) out[sa]={};
      out[sa][mo]=Number(amt)||0;
    });
    return JSON.stringify({ ok:true, data: out });
  } catch (e) {
    return JSON.stringify({ ok:false, error: e.message });
  }
}

function getUsersSheet() {
  var ss = getSpreadsheet();
  var sh = ss.getSheetByName('users');
  if (!sh) {
    sh = ss.insertSheet('users');
    sh.getRange(1,1,1,8).setValues([['EmpID','Name','Role','PasswordHash','MustChange','Email','LastLogin','LastActive']]);
    sh.getRange(1,1,1,8).setFontWeight('bold').setBackground('#1a3a5c').setFontColor('#ffffff');
    sh.setFrozenRows(1);
    // สร้าง admin default: EmpID=admin, pwd=admin (SHA-256)
    // SHA-256 of 'admin' = 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
    sh.getRange(2,1,1,8).setValues([['admin','System Admin','admin','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','FALSE','','','']]);
  } else {
    // Auto-migrate: ถ้ายังไม่มี column LastActive (column 8) ให้เพิ่ม
    var lastCol = sh.getLastColumn();
    if (lastCol < 8) {
      sh.getRange(1, 8).setValue('LastActive');
      sh.getRange(1, 8).setFontWeight('bold').setBackground('#1a3a5c').setFontColor('#ffffff');
    }
  }
  return sh;
}

// ── เวลาไทย (UTC+7) format ────────────────
function _thaiTime() {
  return Utilities.formatDate(new Date(), 'Asia/Bangkok', 'yyyy-MM-dd HH:mm:ss');
}

// ── log activity (รวมเข้า _log) ────────────────
function _logActivity(empId, name, action) {
  _logAppend('activity', String(name||''), String(action||''), String(empId||''));
}

//  [V535] user คนนี้เห็นตัวเลือก Mobile ไหม — อ่าน _config_kv ตรง ๆ
//    ต้องคำนวณฝั่ง server เพราะ client ยังไม่มี _LAST_CONFIG ตอน login
function _bjhCanMobile_(empId, role) {
  try {
    var cfg = _ckvReadSection(getSpreadsheet(), 'mobile_users') || {};
    var keys = Object.keys(cfg);
    if (!keys.length) return String(role||'').toLowerCase() === 'sales';   // ยังไม่เคยตั้ง -> default
    return !!cfg[String(empId||'')];
  } catch (e) {
    return String(role||'').toLowerCase() === 'sales';
  }
}

function loginUser(payloadStr) {
  try {
    var p   = JSON.parse(payloadStr);
    var sh  = getUsersSheet();
    var dat = sh.getDataRange().getValues();
    for (var i = 1; i < dat.length; i++) {
      var row = dat[i];
      if (String(row[0]).trim() === String(p.empId).trim()) {
        if (String(row[3]).trim() !== String(p.passwordHash).trim())
          return JSON.stringify({ ok: false, error: 'รหัสผ่านไม่ถูกต้อง' });
        // อัพเดท LastLogin + LastActive (เวลาไทย)
        var now = _thaiTime();
        sh.getRange(i+1, 7).setValue(now);
        sh.getRange(i+1, 8).setValue(now);
        _logActivity(row[0], row[1], 'Login');
        var mustChange = String(row[4]).toUpperCase() === 'TRUE' || String(row[4]) === '1';
        return JSON.stringify({
          ok: true,
          mustChange: mustChange,
          user: { empId: String(row[0]), name: String(row[1]), role: String(row[2]), email: String(row[5]||''),
                  canMobile: _bjhCanMobile_(String(row[0]), String(row[2])) }   // [V535]
        });
      }
    }
    return JSON.stringify({ ok: false, error: 'ไม่พบรหัสพนักงาน' });
  } catch(e) {
    return JSON.stringify({ ok: false, error: e.message });
  }
}

function changePassword(payloadStr) {
  try {
    var p  = JSON.parse(payloadStr);
    var sh = getUsersSheet();
    var dat = sh.getDataRange().getValues();
    for (var i = 1; i < dat.length; i++) {
      if (String(dat[i][0]).trim() === String(p.empId).trim()) {
        sh.getRange(i+1, 4).setValue(p.passwordHash); // PasswordHash
        sh.getRange(i+1, 5).setValue('FALSE');          // MustChange = false
        return JSON.stringify({ ok: true });
      }
    }
    return JSON.stringify({ ok: false, error: 'ไม่พบ user' });
  } catch(e) {
    return JSON.stringify({ ok: false, error: e.message });
  }
}

function resetPasswordRequest(payloadStr) {
  try {
    var p  = JSON.parse(payloadStr);
    var sh = getUsersSheet();
    var dat = sh.getDataRange().getValues();
    for (var i = 1; i < dat.length; i++) {
      if (String(dat[i][0]).trim() === String(p.empId).trim()) {
        var email = String(dat[i][5]||'').trim();
        if (!email) return JSON.stringify({ ok: false, error: 'ไม่มี Email สำหรับ account นี้ กรุณาติดต่อ Admin' });
        // reset เป็น empId (default pwd = empId) → hash ต้องทำ client side ไม่ได้ → set flag MustChange
        // ส่ง temp pwd = empId กลับทาง email
        var tmpPwd = String(dat[i][0]).trim();
        // hash SHA-256 ใน GAS ไม่ได้โดยตรง → ใช้ Utilities.computeDigest
        var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, tmpPwd, Utilities.Charset.UTF_8);
        var hash  = bytes.map(function(b){ return (b < 0 ? b+256 : b).toString(16).padStart(2,'0'); }).join('');
        sh.getRange(i+1, 4).setValue(hash);
        sh.getRange(i+1, 5).setValue('TRUE'); // MustChange
        MailApp.sendEmail({
          to: email,
          subject: '[BJH Dashboard] Reset รหัสผ่าน',
          body: 'รหัสผ่านชั่วคราวของคุณคือ: ' + tmpPwd + '\n\nกรุณาเข้าสู่ระบบและเปลี่ยนรหัสผ่านทันที\n\nBJH Revenue Dashboard'
        });
        return JSON.stringify({ ok: true });
      }
    }
    return JSON.stringify({ ok: false, error: 'ไม่พบรหัสพนักงาน' });
  } catch(e) {
    return JSON.stringify({ ok: false, error: e.message });
  }
}

function getUsers() {
  try {
    var sh  = getUsersSheet();
    var dat = sh.getDataRange().getValues();
    var users = [];
    for (var i = 1; i < dat.length; i++) {
      if (!dat[i][0]) continue;
      users.push({
        empId:      String(dat[i][0]),
        name:       String(dat[i][1]),
        role:       String(dat[i][2]),
        mustChange: String(dat[i][4]).toUpperCase() === 'TRUE',
        email:      String(dat[i][5]||''),
        lastLogin:  String(dat[i][6]||'')
      });
    }
    return JSON.stringify({ ok: true, users: users });
  } catch(e) {
    return JSON.stringify({ ok: false, error: e.message });
  }
}

function saveUser(payloadStr) {
  try {
    var p  = JSON.parse(payloadStr);
    var sh = getUsersSheet();
    var dat = sh.getDataRange().getValues();
    // หาว่ามี empId นี้แล้วไหม
    for (var i = 1; i < dat.length; i++) {
      if (String(dat[i][0]).trim() === String(p.empId).trim()) {
        // update
        sh.getRange(i+1, 2).setValue(p.name  || dat[i][1]);
        sh.getRange(i+1, 3).setValue(p.role  || dat[i][2]);
        sh.getRange(i+1, 6).setValue(p.email || dat[i][5]);
        if (p.resetPwd) {
          var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(p.empId), Utilities.Charset.UTF_8);
          var hash  = bytes.map(function(b){ return (b < 0 ? b+256 : b).toString(16).padStart(2,'0'); }).join('');
          sh.getRange(i+1, 4).setValue(hash);
          sh.getRange(i+1, 5).setValue('TRUE');
        }
        return JSON.stringify({ ok: true, action: 'updated' });
      }
    }
    // เพิ่มใหม่ — default pwd = empId
    var bytes2 = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(p.empId), Utilities.Charset.UTF_8);
    var hash2  = bytes2.map(function(b){ return (b < 0 ? b+256 : b).toString(16).padStart(2,'0'); }).join('');
    sh.appendRow([p.empId, p.name||'', p.role||'sales', hash2, 'TRUE', p.email||'', '']);
    return JSON.stringify({ ok: true, action: 'created' });
  } catch(e) {
    return JSON.stringify({ ok: false, error: e.message });
  }
}

// ════════════════════════════════════════════════════════
//  SALES NOTES — Phase 3
// ════════════════════════════════════════════════════════

function getNotesSheet() {
  var ss = getSpreadsheet();
  var sh = ss.getSheetByName('salesnotes');
  if (!sh) {
    sh = ss.insertSheet('salesnotes');
    var headers = ['QN','Customer','SalesID','SalesName','Month','Year','Note','Confirmed_At','Status','IP','Override_Applied'];
    sh.getRange(1,1,1,headers.length).setValues([headers]);
    sh.getRange(1,1,1,headers.length).setFontWeight('bold').setBackground('#1a3a5c').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  }
  return sh;
}

function saveNotes(payloadStr) {
  try {
    var rows = JSON.parse(payloadStr);
    var sh   = getNotesSheet();
    var now  = new Date().toISOString();
    // อ่าน existing เพื่อ merge (QN+Month+Year = key)
    var lastRow = sh.getLastRow();
    var existMap = {};
    if (lastRow > 1) {
      var existing = sh.getRange(2, 1, lastRow-1, 11).getValues();
      existing.forEach(function(r, i) {
        var key = String(r[0])+'|'+String(r[4])+'|'+String(r[5]);
        existMap[key] = i+2; // row number
      });
    }
    rows.forEach(function(r) {
      var key = String(r.qn)+'|'+String(r.month)+'|'+String(r.year);
      var rowData = [r.qn||'', r.customer||'', r.salesId||'', r.salesName||'',
        r.month||'', r.year||'', r.note||'', now, r.status||'', r.ip||'', 'Y'];
      if (existMap[key]) {
        sh.getRange(existMap[key], 1, 1, 11).setValues([rowData]);
      } else {
        sh.appendRow(rowData);
      }
    });
    return JSON.stringify({ ok: true, saved: rows.length });
  } catch(e) {
    return JSON.stringify({ ok: false, error: e.message });
  }
}

function getNotes() {
  try {
    var sh = getNotesSheet();
    var lastRow = sh.getLastRow();
    if (lastRow < 2) return JSON.stringify({ ok: true, notes: [] });
    var dat = sh.getRange(2, 1, lastRow-1, 11).getValues();
    var notes = dat.map(function(r) {
      return { qn: String(r[0]), customer: String(r[1]), salesId: String(r[2]),
        salesName: String(r[3]), month: r[4], year: r[5], note: String(r[6]),
        confirmedAt: String(r[7]), status: String(r[8]), ip: String(r[9]), overrideApplied: String(r[10]) };
    }).filter(function(r){ return r.qn; });
    return JSON.stringify({ ok: true, notes: notes });
  } catch(e) {
    return JSON.stringify({ ok: false, error: e.message });
  }
}
function cancelNote(payloadStr) {
  try {
    var rows = JSON.parse(payloadStr);
    var sh = getNotesSheet();
    var lastRow = sh.getLastRow();
    if (lastRow < 2) return JSON.stringify({ ok: true });
    var dat = sh.getRange(2, 1, lastRow-1, 11).getValues();
    rows.forEach(function(p) {
      for (var i = 0; i < dat.length; i++) {
        // [v237] match รายงวด: qn + month + year (ถ้าส่งมา) — เดิม match qn -> ยกเลิกทั้งใบ
        var _mOk = (p.month==null || p.month==='' || String(dat[i][4]).trim() === String(p.month).trim());
        var _yOk = (p.year==null  || p.year==='' || String(dat[i][5]).trim() === String(p.year).trim());
        if (String(dat[i][0]).trim() === String(p.qn).trim() && _mOk && _yOk) {
          sh.getRange(i+2, 11).setValue('Cancelled');
          sh.getRange(i+2, 8).setValue(new Date().toISOString()+' [Cancelled by '+p.salesName+']');
        }
      }
    });
    return JSON.stringify({ ok: true });
  } catch(e) {
    return JSON.stringify({ ok: false, error: e.message });
  }
}
// ════════════════════════════════════════════════════════
//  MANUAL EDIT STATUS — sync editStatus modal → sheet
// ════════════════════════════════════════════════════════

function getManualEditSheet() {
  var ss = getSpreadsheet();
  var sh = ss.getSheetByName('sales_manual_edit');
  if (!sh) {
    sh = ss.insertSheet('sales_manual_edit');
    var headers = ['QN','Customer','EditorID','EditorName','OldStatus','NewStatus','NewMonth','NewYear','NewIP','SalesName','EditedAt','Cancelled'];
    sh.getRange(1,1,1,headers.length).setValues([headers]);
    sh.getRange(1,1,1,headers.length).setFontWeight('bold').setBackground('#1a3a5c').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  }
  return sh;
}

function saveManualEdit(payloadStr) {
  try {
    var rows = JSON.parse(payloadStr);
    var sh   = getManualEditSheet();
    var now  = new Date().toISOString();
    var lastRow = sh.getLastRow();
    var existMap = {};
    if (lastRow > 1) {
      // column 13 = rowKey (เฉพาะแถว) — match ด้วย rowKey
      var existing = sh.getRange(2, 1, lastRow-1, 13).getValues();
      existing.forEach(function(r, i) {
        var k = String(r[12]||''); // rowKey
        if (k) existMap[k] = i+2;
      });
    }
    rows.forEach(function(r) {
      var rowData = [r.qn||'', r.customer||'', r.editorId||'', r.editorName||'',
        r.oldStatus||'', r.newStatus||'', r.newMonth||'', r.newYear||'',
        r.newIp||'', r.salesName||'', now, '', r.rowKey||''];
      var k = String(r.rowKey||'');
      if (k && existMap[k]) {
        sh.getRange(existMap[k], 1, 1, 13).setValues([rowData]);
      } else {
        sh.appendRow(rowData);
      }
    });
    return JSON.stringify({ ok: true, saved: rows.length });
  } catch(e) {
    return JSON.stringify({ ok: false, error: e.message });
  }
}

function getManualEdits() {
  try {
    var sh = getManualEditSheet();
    var lastRow = sh.getLastRow();
    if (lastRow < 2) return JSON.stringify({ ok: true, edits: [] });
    var dat = sh.getRange(2, 1, lastRow-1, 13).getValues();
    var edits = dat.map(function(r) {
      return { qn: String(r[0]), customer: String(r[1]), editorId: String(r[2]),
        editorName: String(r[3]), oldStatus: String(r[4]), newStatus: String(r[5]),
        newMonth: r[6], newYear: r[7], newIp: String(r[8]), salesName: String(r[9]),
        editedAt: String(r[10]), cancelled: String(r[11]), rowKey: String(r[12]||'') };
    }).filter(function(r){ return r.qn && r.cancelled !== 'Cancelled'; });
    return JSON.stringify({ ok: true, edits: edits });
  } catch(e) {
    return JSON.stringify({ ok: false, error: e.message });
  }
}

function cancelManualEdit(payloadStr) {
  try {
    var rows = JSON.parse(payloadStr);
    var sh = getManualEditSheet();
    var lastRow = sh.getLastRow();
    if (lastRow < 2) return JSON.stringify({ ok: true });
    var dat = sh.getRange(2, 1, lastRow-1, 13).getValues();
    rows.forEach(function(p) {
      for (var i = 0; i < dat.length; i++) {
        // match ด้วย rowKey (เฉพาะแถว) ถ้ามี, fallback qn (ข้อมูลเก่า)
        var rowK = String(dat[i][12]||'').trim();
        var match = p.rowKey ? (rowK === String(p.rowKey).trim()) : (String(dat[i][0]).trim() === String(p.qn).trim());
        if (match) {
          sh.getRange(i+2, 12).setValue('Cancelled');
          sh.getRange(i+2, 11).setValue(new Date().toISOString()+' [Cancelled by '+(p.editorName||'')+']');
        }
      }
    });
    return JSON.stringify({ ok: true });
  } catch(e) {
    return JSON.stringify({ ok: false, error: e.message });
  }
}

// ════════════════════════════════════════════════════════
//  LOW PROSPECT — sync Send to FC → sheet
// ════════════════════════════════════════════════════════

function getLowProspectSheet() {
  var ss = getSpreadsheet();
  var sh = ss.getSheetByName('sales_low_prospect');
  if (!sh) {
    sh = ss.insertSheet('sales_low_prospect');
    var headers = ['QN','Customer','Brand','Sales','Amount','Year','Month','IsSP','CreatedAt','Cancelled'];
    sh.getRange(1,1,1,headers.length).setValues([headers]);
    sh.getRange(1,1,1,headers.length).setFontWeight('bold').setBackground('#1a3a5c').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  } else {
    // migrate: ถ้า sheet เดิมไม่มี column IsSP → แทรกที่ตำแหน่ง 8
    try {
      var hdrLastCol = sh.getLastColumn();
      var hdrs = sh.getRange(1,1,1,hdrLastCol).getValues()[0];
      if (hdrs.indexOf('IsSP') < 0) {
        sh.insertColumnBefore(8);
        sh.getRange(1,8).setValue('IsSP').setFontWeight('bold').setBackground('#1a3a5c').setFontColor('#ffffff');
      }
    } catch(e) {}
  }
  return sh;
}

function saveLowProspect(payloadStr) {
  try {
    var rows = JSON.parse(payloadStr);
    var sh   = getLowProspectSheet();
    var now  = new Date().toISOString();
    var lastRow = sh.getLastRow();
    var existMap = {};
    if (lastRow > 1) {
      var existing = sh.getRange(2, 1, lastRow-1, 10).getValues();
      existing.forEach(function(r, i) {
        existMap[String(r[0])] = i+2;
      });
    }
    rows.forEach(function(r) {
      var rowData = [r.qn||'', r.cu||'', r.brand||'', r.sa||'',
        r.amt||0, r.yr||0, r.mo||12, (r.isSP?1:0), now, ''];
      if (existMap[String(r.qn)]) {
        sh.getRange(existMap[String(r.qn)], 1, 1, 10).setValues([rowData]);
      } else {
        sh.appendRow(rowData);
      }
    });
    return JSON.stringify({ ok: true, saved: rows.length });
  } catch(e) {
    return JSON.stringify({ ok: false, error: e.message });
  }
}

function getLowProspects() {
  try {
    var sh = getLowProspectSheet();
    var lastRow = sh.getLastRow();
    if (lastRow < 2) return JSON.stringify({ ok: true, items: [] });
    var dat = sh.getRange(2, 1, lastRow-1, 10).getValues();
    var items = dat.map(function(r) {
      return { qn: String(r[0]), cu: String(r[1]), brand: String(r[2]),
        sa: String(r[3]), amt: parseFloat(r[4])||0, yr: parseInt(r[5])||0,
        mo: parseInt(r[6])||12, isSP: (parseInt(r[7])||0)===1,
        createdAt: String(r[8]), cancelled: String(r[9]) };
    }).filter(function(r){ return r.qn && r.cancelled !== 'Cancelled'; });
    return JSON.stringify({ ok: true, items: items });
  } catch(e) {
    return JSON.stringify({ ok: false, error: e.message });
  }
}

function removeLowProspect(payloadStr) {
  try {
    var rows = JSON.parse(payloadStr);
    var sh = getLowProspectSheet();
    var lastRow = sh.getLastRow();
    if (lastRow < 2) return JSON.stringify({ ok: true });
    var dat = sh.getRange(2, 1, lastRow-1, 10).getValues();
    rows.forEach(function(p) {
      for (var i = 0; i < dat.length; i++) {
        if (String(dat[i][0]).trim() === String(p.qn).trim()) {
          sh.getRange(i+2, 10).setValue('Cancelled');
          sh.getRange(i+2, 9).setValue(new Date().toISOString()+' [Removed]');
        }
      }
    });
    return JSON.stringify({ ok: true });
  } catch(e) {
    return JSON.stringify({ ok: false, error: e.message });
  }
}

// ════════════════════════════════════════════════════════
//  MIGRATION — แก้ records เก่าใน sales_low_prospect
//  ให้ใช้สูตรใหม่ (netAmt = QH_TOTAL_AMT - QH_TOTAL_DISCOUNT, IsSP, /yr)
//
//  วิธีรัน:
//  1. เปิด Apps Script editor
//  2. เลือก function migrateLowProspectAmounts
//  3. กด Run
//  4. ดู Execution log (View → Logs)
// ════════════════════════════════════════════════════════

function migrateLowProspectAmounts() {
  var sh = getLowProspectSheet();
  var lastRow = sh.getLastRow();
  if (lastRow < 2) {
    Logger.log('No records to migrate');
    return;
  }
  // อ่าน raw quotation จาก client cache (สมมุติว่ามี sheet 'raw_quotation_cache')
  // ถ้าไม่มี → ต้องให้ client ยิงเข้ามา หรือ admin paste data ลง sheet
  // วิธีง่ายที่สุด: รับ data จาก global var (Apps Script Properties)
  var quoMap = _loadQuotationMapForMigration();
  if (!quoMap || Object.keys(quoMap).length === 0) {
    Logger.log('❌ ไม่พบข้อมูล quotation map');
    Logger.log('   กรุณารัน loadQuotationMapFromClient() ก่อน หรือเรียก migrateLowProspectAmountsWithData(payloadStr) แทน');
    return;
  }
  _runMigration(sh, lastRow, quoMap);
}

// alternative: รับ payload จาก client โดยตรง
// client ส่ง: {QN: {amt, disc, yr, contractType}}
function migrateLowProspectAmountsWithData(payloadStr) {
  try {
    var quoMap = JSON.parse(payloadStr);
    var sh = getLowProspectSheet();
    var lastRow = sh.getLastRow();
    if (lastRow < 2) return JSON.stringify({ ok: true, migrated: 0, message: 'No records to migrate' });
    var result = _runMigration(sh, lastRow, quoMap);
    return JSON.stringify({ ok: true, migrated: result.migrated, skipped: result.skipped, errors: result.errors });
  } catch(e) {
    return JSON.stringify({ ok: false, error: e.message });
  }
}

function _loadQuotationMapForMigration() {
  // ลอง load จาก ScriptProperties (set ผ่าน admin tool)
  try {
    var props = PropertiesService.getScriptProperties();
    var raw = props.getProperty('MIGRATION_QUO_MAP');
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return null;
}

function _runMigration(sh, lastRow, quoMap) {
  var dat = sh.getRange(2, 1, lastRow-1, 10).getValues();
  var migrated = 0, skipped = 0, errors = [];
  var updates = []; // {row, amt, isSP}

  dat.forEach(function(r, i) {
    var qn = String(r[0]||'').trim();
    var cancelled = String(r[9]||'').trim();
    if (!qn || cancelled === 'Cancelled') { skipped++; return; }

    var quo = quoMap[qn];
    if (!quo) {
      // ไม่มีใน raw → ใช้แค่ตรวจ isSP จาก QN prefix
      var isSP_only = (qn.substring(0,3) === 'QSP') ? 1 : 0;
      updates.push({row: i+2, amt: null, isSP: isSP_only, note: 'no_quo'});
      return;
    }

    var totalAmt = parseFloat(quo.amt||0);
    var disc     = parseFloat(quo.disc||0);
    var netAmt   = totalAmt - disc;
    var yr       = parseFloat(quo.yr||0); // ปีสัญญา (จาก _parseYear)
    var isSP     = (qn.substring(0,3) === 'QSP') ? 1 : 0;

    // คำนวณ amt ตามสูตรใหม่
    var newAmt;
    if (isSP) {
      newAmt = netAmt; // SP: ใช้ netAmt เต็ม (spFcSendLow จะไม่หาร 4)
    } else if (yr >= 1) {
      newAmt = netAmt / yr; // SC + สัญญา >= 1 ปี: ราคาต่อปี
    } else {
      newAmt = netAmt; // SC + สัญญา < 1 ปี: netAmt เต็ม
    }

    updates.push({row: i+2, amt: newAmt, isSP: isSP});
    migrated++;
  });

  // เขียนกลับ sheet (batch)
  updates.forEach(function(u) {
    try {
      if (u.amt !== null) {
        sh.getRange(u.row, 5).setValue(Math.round(u.amt)); // Amount column
      }
      sh.getRange(u.row, 8).setValue(u.isSP); // IsSP column
    } catch(e) {
      errors.push('row '+u.row+': '+e.message);
    }
  });

  Logger.log('✅ Migration done: migrated='+migrated+', skipped='+skipped+', errors='+errors.length);
  if (errors.length) Logger.log('Errors: '+errors.join('; '));
  return {migrated: migrated, skipped: skipped, errors: errors};
}

  // ════════════════════════════════════════════════════════
//  LOA — เอกสาร LOA (PDF → Anthropic extract → Drive → Sheet)
//  เพิ่มต่อท้าย Code.gs (ไม่ทับ function เดิม)
//
//  ต้องตั้งค่าใน Project Settings → Script Properties:
//    ANTHROPIC_API_KEY = sk-ant-...
//
//  Sheet: BJH_Config (เดิม) → tab 'LOA'
//    A=id B=company_from C=company_to D=expiry_date E=brand
//    F=language G=status H=pdf_file_id I=pdf_filename J=created_at
//
//  PDF เก็บใน Drive folder 'BJH_LOA_PDF' (แยกจาก data เดิม)
// ════════════════════════════════════════════════════════

var LOA_SHEET_NAME   = 'LOA';
var LOA_PDF_FOLDER   = 'BJH_LOA_PDF';
var LOA_HEADERS      = ['id','company_from','company_to','expiry_date','brand','language','status','pdf_file_id','pdf_filename','created_at'];
var ANTHROPIC_MODEL  = 'claude-opus-4-8';

// ── Sheet helper ──
function getLoaSheet_() {
  var ss = getSpreadsheet();
  var sh = ss.getSheetByName(LOA_SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(LOA_SHEET_NAME);
    sh.getRange(1, 1, 1, LOA_HEADERS.length).setValues([LOA_HEADERS]);
    sh.getRange(1, 1, 1, LOA_HEADERS.length).setFontWeight('bold').setBackground('#1a3a5c').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  }
  return sh;
}

// ── PDF folder helper ──
function getLoaPdfFolder_() {
  var folders = DriveApp.getFoldersByName(LOA_PDF_FOLDER);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(LOA_PDF_FOLDER);
}

// ── เรียก Anthropic API อ่าน PDF → คืน JSON fields ──
function loaCallAnthropic_(pdfBase64) {
  var key = PropertiesService.getScriptProperties().getProperty('ANTHROPIC_API_KEY');
  if (!key) throw new Error('ยังไม่ได้ตั้งค่า ANTHROPIC_API_KEY ใน Script Properties');

  var prompt =
    'คุณคือผู้ช่วยอ่านเอกสาร LOA (Letter of Authorization / หนังสือแต่งตั้งตัวแทนจำหน่าย) ' +
    'อ่านไฟล์ PDF แล้วสกัดข้อมูลต่อไปนี้ ตอบกลับเป็น JSON object เท่านั้น ห้ามมีข้อความอื่นหรือ markdown:\n' +
    '{\n' +
    '  "company_from": "บริษัทต้นทาง (ผู้ออก/ผู้แต่งตั้ง เช่น manufacturer)",\n' +
    '  "company_to": "บริษัทปลายทาง (ผู้ได้รับแต่งตั้ง/ตัวแทน) ถ้ามีหลายบริษัท ให้คืนทุกบริษัทคั่นด้วยเครื่องหมาย ; (semicolon)",\n' +
    '  "expiry_date": "วันหมดอายุ รูปแบบ YYYY-MM-DD ถ้าไม่พบใส่ \\"-\\"",\n' +
    '  "brand": "ยี่ห้อ/แบรนด์สินค้า",\n' +
    '  "language": "ภาษาหลักของเอกสาร เช่น ไทย หรือ English",\n' +
    '  "status": "Active หากยังไม่หมดอายุเทียบกับวันนี้, Expired หากหมดแล้ว, ถ้าประเมินไม่ได้ใส่ \\"-\\""\n' +
    '}\n' +
    'ถ้าฟิลด์ใดหาไม่พบ ให้ใส่ "-" ห้ามเดา';

  var body = {
    model: ANTHROPIC_MODEL,
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: [
        { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 } },
        { type: 'text', text: prompt }
      ]
    }]
  };

  var resp = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'x-api-key': key,
      'anthropic-version': '2023-06-01'
    },
    payload: JSON.stringify(body),
    muteHttpExceptions: true
  });

  var code = resp.getResponseCode();
  var text = resp.getContentText();
  if (code < 200 || code >= 300) throw new Error('Anthropic API HTTP ' + code + ': ' + text.substring(0, 300));

  var data = JSON.parse(text);
  var out = '';
  if (data && Array.isArray(data.content)) {
    data.content.forEach(function(blk) { if (blk && blk.type === 'text') out += blk.text; });
  }
  out = String(out || '').trim();
  // strip markdown fences ถ้ามี
  out = out.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/```\s*$/, '').trim();

  var fields;
  try { fields = JSON.parse(out); }
  catch (e) {
    var m = out.match(/\{[\s\S]*\}/);
    if (m) fields = JSON.parse(m[0]);
    else throw new Error('แปลงผลลัพธ์ AI เป็น JSON ไม่ได้: ' + out.substring(0, 200));
  }
  return fields;
}

// ── loaExtract: รับ PDF base64 → AI อ่าน → save Drive + Sheet ──
function loaExtract(payloadStr) {
  try {
    var p = JSON.parse(payloadStr);
    var filename = String(p.filename || 'LOA.pdf');
    var b64 = String(p.pdfBase64 || '');
    if (!b64) return JSON.stringify({ ok: false, error: 'ไม่มีข้อมูล PDF' });

    // 0) ตรวจชื่อไฟล์ซ้ำก่อน (ข้ามถ้าซ้ำ — ประหยัด API call)
    var sh = getLoaSheet_();
    var lastRowChk = sh.getLastRow();
    if (lastRowChk > 1) {
      var existNames = sh.getRange(2, 9, lastRowChk - 1, 1).getValues();
      for (var ci = 0; ci < existNames.length; ci++) {
        if (String(existNames[ci][0]) === filename) {
          return JSON.stringify({ ok: true, duplicate: true, filename: filename });
        }
      }
    }

    // 1) AI extract
    var f = loaCallAnthropic_(b64);

    // 2) save PDF ลง Drive
    var bytes = Utilities.base64Decode(b64);
    var blob = Utilities.newBlob(bytes, 'application/pdf', filename);
    var folder = getLoaPdfFolder_();
    var file = folder.createFile(blob);
    var fileId = file.getId();

    // 3) append row ลง Sheet
    var id = 'LOA-' + new Date().getTime();
    var now = new Date().toISOString();
    sh.appendRow([
      id,
      String(f.company_from || '-'),
      String(f.company_to || '-'),
      String(f.expiry_date || '-'),
      String(f.brand || '-'),
      String(f.language || '-'),
      String(f.status || '-'),
      fileId,
      filename,
      now
    ]);

    return JSON.stringify({ ok: true, id: id, fileId: fileId, fields: f });
  } catch (err) {
    return JSON.stringify({ ok: false, error: String(err.message || err) });
  }
}

// ── loaList: อ่านทุกแถวจาก tab LOA ──
function loaList() {
  try {
    var sh = getLoaSheet_();
    var lastRow = sh.getLastRow();
    if (lastRow <= 1) return JSON.stringify({ ok: true, rows: [] });
    var vals = sh.getRange(2, 1, lastRow - 1, LOA_HEADERS.length).getValues();
    var rows = vals.map(function(r) {
      return {
        id:           String(r[0] || ''),
        company_from: String(r[1] || ''),
        company_to:   String(r[2] || ''),
        expiry_date:  String(r[3] || ''),
        brand:        String(r[4] || ''),
        language:     String(r[5] || ''),
        status:       String(r[6] || ''),
        pdf_file_id:  String(r[7] || ''),
        pdf_filename: String(r[8] || ''),
        created_at:   String(r[9] || '')
      };
    }).filter(function(r) { return r.id; });
    return JSON.stringify({ ok: true, rows: rows });
  } catch (err) {
    return JSON.stringify({ ok: false, error: String(err.message || err), rows: [] });
  }
}

// ── loaUpdate: แก้ไข 5 ช่อง (company_from, company_to, expiry_date, brand, language) ตาม id ──
//   ไม่แตะ status / pdf_file_id / pdf_filename / created_at
function loaUpdate(payloadStr) {
  try {
    var p = typeof payloadStr === 'string' ? JSON.parse(payloadStr) : payloadStr;
    var id = String((p && p.id) || '');
    if (!id) return JSON.stringify({ ok: false, error: 'ไม่มี id' });

    var sh = getLoaSheet_();
    var lastRow = sh.getLastRow();
    if (lastRow <= 1) return JSON.stringify({ ok: false, error: 'ไม่พบข้อมูล' });

    var ids = sh.getRange(2, 1, lastRow - 1, 1).getValues();
    var rowIdx = -1;
    for (var i = 0; i < ids.length; i++) {
      if (String(ids[i][0] || '') === id) { rowIdx = i + 2; break; }
    }
    if (rowIdx < 0) return JSON.stringify({ ok: false, error: 'ไม่พบรายการ id นี้' });

    // เขียนทับเฉพาะคอลัมน์ B..F (company_from, company_to, expiry_date, brand, language)
    sh.getRange(rowIdx, 2, 1, 5).setValues([[
      String((p.company_from != null ? p.company_from : '')),
      String((p.company_to   != null ? p.company_to   : '')),
      String((p.expiry_date  != null ? p.expiry_date  : '')),
      String((p.brand        != null ? p.brand        : '')),
      String((p.language     != null ? p.language     : ''))
    ]]);

    return JSON.stringify({ ok: true, id: id });
  } catch (err) {
    return JSON.stringify({ ok: false, error: String(err.message || err) });
  }
}

// ── loaDownload: คืน PDF base64 ตาม fileId ──
function loaDownload(fileId) {
  try {
    if (!fileId) return JSON.stringify({ ok: false, error: 'ไม่มี fileId' });
    var file = DriveApp.getFileById(fileId);
    var blob = file.getBlob();
    var b64 = Utilities.base64Encode(blob.getBytes());
    return JSON.stringify({ ok: true, base64: b64, filename: file.getName() });
  } catch (err) {
    return JSON.stringify({ ok: false, error: String(err.message || err) });
  }
}
// ════════════════════════════════════════════════════════
//  EXPORT SOURCE — ดึง source code ทุกไฟล์ในโปรเจกต์
//  เพิ่มต่อท้าย Code.gs (ไม่ทับ function เดิม)
//
//  ใช้ scope: https://www.googleapis.com/auth/script.projects.readonly (มีอยู่แล้ว)
//  คืน string รวมทุกไฟล์ มี separator ชัดเจน ให้ดาวน์โหลดเป็น .txt
// ════════════════════════════════════════════════════════

function exportProjectSource() {
  try {
    var scriptId = ScriptApp.getScriptId();
    var token = ScriptApp.getOAuthToken();
    var url = 'https://script.googleapis.com/v1/projects/' + scriptId + '/content';
    var resp = UrlFetchApp.fetch(url, {
      method: 'get',
      headers: { 'Authorization': 'Bearer ' + token },
      muteHttpExceptions: true
    });
    var code = resp.getResponseCode();
    var text = resp.getContentText();
    if (code < 200 || code >= 300) {
      return JSON.stringify({ ok: false, error: 'API HTTP ' + code + ': ' + text.substring(0, 300) });
    }
    var data = JSON.parse(text);
    var files = (data && data.files) || [];

    // เรียง: appsscript.json ก่อน, แล้ว .gs (SERVER_JS), แล้ว HTML
    var order = { 'JSON': 0, 'SERVER_JS': 1, 'HTML': 2 };
    files.sort(function(a, b) {
      var oa = order[a.type] != null ? order[a.type] : 9;
      var ob = order[b.type] != null ? order[b.type] : 9;
      if (oa !== ob) return oa - ob;
      return String(a.name).localeCompare(String(b.name));
    });

    var ext = { 'SERVER_JS': '.gs', 'HTML': '.html', 'JSON': '.json' };
    var out = '';
    out += '// ═══════════════════════════════════════════════════════\n';
    out += '// BJH Sales Dashboard — Project Source Export\n';
    out += '// Exported: ' + new Date().toISOString() + '\n';
    out += '// Files: ' + files.length + '\n';
    out += '// ═══════════════════════════════════════════════════════\n\n';

    files.forEach(function(f) {
      var fname = f.name + (ext[f.type] || '');
      out += '\n// ===== FILE: ' + fname + ' =====\n';
      out += (f.source || '');
      out += '\n';
    });

    return JSON.stringify({ ok: true, content: out, count: files.length });
  } catch (err) {
    return JSON.stringify({ ok: false, error: String(err.message || err) });
  }
}
// ════════════════════════════════════════════════════════════════
//  TEST: วัดว่า server (trigger) ดึง SmartFlow ได้ไหม + gzip ช่วยไหม
//  วิธีใช้: วางท้าย Code.gs → เลือกฟังก์ชัน testSmartflowFetchSize → Run
//  → ดูผลใน Execution log (View → Logs / Ctrl+Enter)
//  *** เป็นแค่ test ไม่กระทบโค้ดจริง ลบทิ้งได้หลังทดสอบ ***
// ════════════════════════════════════════════════════════════════
function testSmartflowFetchSize() {
  var log = [];
  function L(s){ log.push(s); Logger.log(s); }

  L('=== TEST SmartFlow Fetch Size ===');

  // 1) ขอ token
  var token;
  try {
    token = smartflowGetToken_();
    L('✅ ได้ token (len=' + token.length + ')');
  } catch (e) {
    L('❌ ขอ token ไม่ได้: ' + e.message);
    return log.join('\n');
  }

  // 2) ลองดึงแบบขอ gzip (Accept-Encoding)
  var t0 = new Date().getTime();
  var resp;
  try {
    resp = UrlFetchApp.fetch(SMARTFLOW_DATA_URL_GAS, {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept-Encoding': 'gzip'        // ★ ขอให้ SF บีบอัด
      },
      muteHttpExceptions: true
    });
  } catch (e) {
    L('❌ UrlFetchApp.fetch THROW (น่าจะ response ใหญ่เกิน limit): ' + e.message);
    L('→ สรุป: trigger ดึงตรงไม่ได้ ต้องใช้วิธีอื่น (pagination / external service)');
    return log.join('\n');
  }
  var t1 = new Date().getTime();

  // 3) วัดผล
  var code = resp.getResponseCode();
  L('HTTP code: ' + code);
  L('fetch ใช้เวลา: ' + (t1 - t0) + ' ms');

  var headers = resp.getAllHeaders();
  L('Content-Encoding (header): ' + (headers['Content-Encoding'] || headers['content-encoding'] || '(ไม่มี)'));

  // ขนาดหลังคลาย (สิ่งที่ Apps Script ต้องอุ้มในหน่วยความจำ)
  var blob, sizeBytes;
  try {
    blob = resp.getBlob();
    sizeBytes = blob.getBytes().length;
    L('✅ ขนาด response (หลัง decode): ' + (sizeBytes/1024/1024).toFixed(2) + ' MB');
  } catch (e) {
    L('❌ getBlob THROW: ' + e.message);
    return log.join('\n');
  }

  // 4) ลอง gzip ดูว่าจะเหลือเท่าไหร่ (จำลองขั้น zip ก่อนลง Drive)
  try {
    var gz = Utilities.gzip(blob);
    var gzSize = gz.getBytes().length;
    L('ถ้า gzip ก่อนลง Drive: ' + (gzSize/1024/1024).toFixed(2) + ' MB');
    L('base64 หลัง gzip (ขนาดจริงบน Drive): ' + (gzSize*1.34/1024/1024).toFixed(2) + ' MB');
  } catch (e) {
    L('⚠ gzip ไม่ได้ (อาจ memory เต็ม): ' + e.message);
  }

  // 5) สรุป
  L('');
  if (sizeBytes/1024/1024 > 45) {
    L('🔴 response > 45MB — เสี่ยงติด limit / memory แม้บางครั้งผ่าน ไม่เสถียรพอทำ trigger');
  } else {
    L('🟢 response ≤ 45MB — trigger น่าจะทำได้! (gzip response ช่วยลดขนาดได้จริง)');
  }
  return log.join('\n');
}

// ════════════════════════════════════════════════════════════════
//  TEST 2: ตรวจว่า 50MB ที่ได้มา "ครบ" หรือ "ถูกตัด (truncate)"
//  วิธีใช้: วางท้าย Code.gs → เลือก testSmartflowComplete → Run → ดู Logs
//  เทียบจำนวน record ที่คาดไว้:
//    RAW_SpareParts≈1724  RAW_Quotation≈5463  RAW_SC_BILL≈2710  RAW_CONTRACT≈1467
// ════════════════════════════════════════════════════════════════
function testSmartflowComplete() {
  var log = [];
  function L(s){ log.push(s); Logger.log(s); }
  L('=== TEST 2: ข้อมูลครบไหม ===');

  var token = smartflowGetToken_();
  var resp = UrlFetchApp.fetch(SMARTFLOW_DATA_URL_GAS, {
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + token, 'Accept-Encoding': 'gzip' },
    muteHttpExceptions: true
  });
  L('HTTP: ' + resp.getResponseCode());

  var text = resp.getContentText();
  L('ขนาด text: ' + (text.length/1024/1024).toFixed(2) + ' MB (' + text.length + ' chars)');

  // ตรวจว่า JSON ปิดท้ายสมบูรณ์ไหม (ถ้า truncate จะไม่จบด้วย } หรือ ])
  var tail = text.substring(text.length - 80);
  L('80 ตัวอักษรท้ายสุด: ' + tail);
  var lastCh = text.charAt(text.length - 1);
  L('ตัวอักษรสุดท้าย: "' + lastCh + '" ' + (lastCh === '}' || lastCh === ']' ? '✅ ดูจบสมบูรณ์' : '🔴 ดูเหมือนถูกตัดกลางคัน!'));

  // ลอง parse
  var data, parseOk = false;
  try {
    data = JSON.parse(text);
    parseOk = true;
    L('✅ JSON.parse สำเร็จ → ข้อมูลครบ ไม่ถูกตัด');
  } catch (e) {
    L('🔴 JSON.parse ล้มเหลว → ข้อมูลถูกตัดกลางคัน (truncate ที่ 50MB): ' + e.message);
  }

  if (parseOk) {
    var payload = (data && data.data) ? data.data : data;
    ['RAW_SC_BILL','RAW_SpareParts','RAW_Quotation','RAW_CONTRACT'].forEach(function(k){
      var arr = payload[k];
      L('  ' + k + ': ' + (Array.isArray(arr) ? arr.length + ' records' : '(ไม่มี/ไม่ใช่ array)'));
    });
    L('');
    L('→ เทียบกับที่คาด: SpareParts≈1724 Quotation≈5463 SC_BILL≈2710 CONTRACT≈1467');
    L('→ ถ้าตัวเลขตรง = ครบ! / ถ้าน้อยกว่ามาก = ถูกตัด');
  }

  return log.join('\n');
}
// ─── MD Collection - Service: บันทึกผล reconciliation ลง tab MD_Collection ───
// payload = { header:[...], rows:[[...],...], fileName:'...' }
// save แบบ replace-by-month: ลบเฉพาะแถวของ payMonth นั้น แล้วเขียนใหม่ (เดือนอื่นคงไว้)
// payload = { payMonth:'2026-05', header:[...], rows:[[...]], fileName:'...' }
// header[0] ต้องเป็น 'Pay Month' และทุก row[0] = payMonth
function saveMDCollection(payload) {
  try {
    if (!payload || !payload.rows || !payload.header || !payload.months || !payload.months.length) {
      return { ok: false, error: 'payload ไม่ถูกต้อง (ต้องมี months/header/rows)' };
    }
    var ss = getSpreadsheet();
    var existed = !!ss.getSheetByName('MD_Collection');
    var sh = ss.getSheetByName('MD_Collection') || ss.insertSheet('MD_Collection');  // สร้างครั้งเดียว
    var header = payload.header;
    var newRows = payload.rows || [];
    var ncol = header.length;

    // เดือนที่กำลังบันทึก (replace ทั้งหมดในชุดนี้)
    var saveMonths = {};
    payload.months.forEach(function (m) { saveMonths[String(m)] = 1; });

    var lastRow = sh.getLastRow();

    // (A) อ่านของเดิม → เก็บเฉพาะเดือนที่ "ไม่ได้" อยู่ในชุดที่บันทึก (เดือนอื่น)
    var kept = [];
    if (existed && lastRow > 1) {
      // เช็คคอลัมน์ Pay Month ก่อนว่ามีเดือนอื่นไหม
      var monthsCol = sh.getRange(2, 1, lastRow - 1, 1).getValues();
      var hasOther = false;
      for (var i = 0; i < monthsCol.length; i++) {
        var v = String(monthsCol[i][0]).trim();
        if (v && !saveMonths[v]) { hasOther = true; break; }
      }
      if (hasOther) {
        kept = sh.getRange(2, 1, lastRow - 1, ncol).getValues()
          .filter(function (r) {
            var pm = String(r[0]).trim();
            return pm && !saveMonths[pm];   // เก็บเฉพาะเดือนอื่น
          });
      }
    }

    var merged = kept.concat(newRows);
    var all = [header].concat(merged);
    var newTotal = all.length;

    // (B) เขียน block เดียว + ลบส่วนเกินท้าย (ไม่ clear ทั้ง sheet)
    if (ncol > 0 && newTotal > 0) {
      sh.getRange(1, 1, newTotal, ncol).setValues(all);
      if (lastRow > newTotal) {
        sh.getRange(newTotal + 1, 1, lastRow - newTotal, Math.max(ncol, sh.getLastColumn())).clearContent();
      }
    }

    // (C) format เฉพาะตอนสร้างใหม่
    if (!existed) {
      try { sh.getRange(1, 1, 1, ncol).setFontWeight('bold'); sh.setFrozenRows(1); } catch (eF) {}
    }

    // metadata + raw header
    try {
      var ts = Utilities.formatDate(new Date(), 'Asia/Bangkok', 'yyyy-MM-dd HH:mm:ss');
      sh.getRange(1, ncol + 2, 1, 2).setValues([['last_saved', ts]]);
      sh.getRange(2, ncol + 2, 1, 2).setValues([['months', payload.months.join(',')]]);
    } catch (e2) {}
    try {
      if (payload.rawHeader && payload.rawHeader.length) {
        PropertiesService.getScriptProperties().setProperty('MDCOL_RAW_HEADER', JSON.stringify(payload.rawHeader));
      }
    } catch (e3) {}
    return { ok: true, count: newRows.length, months: payload.months, total: merged.length };
  } catch (e) {
    return { ok: false, error: String(e && e.message || e) };
  }
}

// load: คืน header + rows ทั้งหมด + รายชื่อเดือนที่มี (สำหรับ dropdown) + เดือนล่าสุด
function loadMDCollection() {
  try {
    var ss = getSpreadsheet();
    var sh = ss.getSheetByName('MD_Collection');
    if (!sh) return { ok: true, header: [], rows: [], months: [], latest: '' };
    var lastRow = sh.getLastRow(), lastCol = sh.getLastColumn();
    if (lastRow < 1) return { ok: true, header: [], rows: [], months: [], latest: '' };
    var values = sh.getRange(1, 1, lastRow, lastCol).getValues();
    var header = values[0];
    // ตัด metadata columns (หลัง header จริง) — ใช้จำนวนคอลัมน์ที่ header ไม่ว่าง
    var hlen = 0;
    for (var c = 0; c < header.length; c++) { if (String(header[c]).trim() !== '') hlen = c + 1; else break; }
    header = header.slice(0, hlen);
    // แปลง Date object → 'YYYY-MM-DD' (google.script.run ส่ง Date ใน nested array ไม่ได้ → จะคืน undefined)
    function _cell(v){
      if (v instanceof Date) {
        if (isNaN(v)) return '';
        var y=v.getFullYear(), m=('0'+(v.getMonth()+1)).slice(-2), d=('0'+v.getDate()).slice(-2);
        return y+'-'+m+'-'+d;
      }
      return v;
    }
    var rows = [];
    var monthSet = {};
    for (var i = 1; i < values.length; i++) {
      var row = values[i].slice(0, hlen).map(_cell);
      var pm = String(row[0] || '').trim();
      if (!pm) continue;
      rows.push(row);
      monthSet[pm] = 1;
    }
    var months = Object.keys(monthSet).sort();
    var latest = months.length ? months[months.length - 1] : '';
    var rawHeader = [];
    try {
      var rh = PropertiesService.getScriptProperties().getProperty('MDCOL_RAW_HEADER');
      if (rh) rawHeader = JSON.parse(rh);
    } catch (e4) {}
    return { ok: true, header: header, rows: rows, months: months, latest: latest, rawHeader: rawHeader };
  } catch (e) {
    return { ok: false, error: String(e && e.message || e) };
  }
}


// ============================================================
// ===== MA After Sales System (merged) — prefix ma / MA_ =====
// ============================================================
/**
 * MA After Sales System — Code.gs (รวม Setup + Core + PDF ในไฟล์เดียว)
 * Single-page web app: doGet เสิร์ฟ Index.html ไฟล์เดียว สลับหน้าด้วย JS
 * ยังไม่กั้นสิทธิ์ (จะไปทำ user control ที่ระบบใหญ่ภายหลัง)
 *
 * ขั้นตอน: วางไฟล์นี้ + Index.html -> รัน maSetupSheets() ครั้งเดียว -> Deploy เป็น Web App
 */

// ====== ตั้งค่ากลาง ======
var MA_SHEET_ID = '1Hhzodn_hWrANgpY7wN_x9UDPtysgAUYpaEMLayBHCyg';
var MA_TAB_REQUESTS  = 'Requests';
var MA_TAB_MACHINES  = 'Machines';
var MA_TAB_MODELS    = 'Models';
var MA_TAB_TEMPLATES = 'Templates';
var MA_TAB_USERS     = 'Users';
var MA_TAB_PRICES    = 'Prices';
var MA_TAB_SETTINGS  = 'Settings';   // ข้อความ default กลาง (key -> value)
var MA_PDF_FOLDER_ID = ''; // ว่าง = root ของ Drive

// ====== Entry point ======


// =====================================================================
// SETUP — รันครั้งเดียว สร้าง tab + header + ข้อมูลตัวอย่าง
// =====================================================================
function maSetupSheets() {
  var ss = SpreadsheetApp.openById(MA_SHEET_ID);
  maEnsureSheetWithHeader(ss, MA_TAB_REQUESTS, [
    'request_id','status','created_at','created_by_email','created_by_name',
    'hospital_name','sale_price','project_title','present_types','warranty_years',
    'ma_years','note_overall','pm_times_per_year','exclude_items',
    'verified_by_email','verified_at','approved_by_email','approved_at','pdf_url','attach_urls',
    'ov_clause1','ov_clause2','ov_clause3','ov_clause4','ov_clause5','ov_clause6','ov_notes'
  ]);
  maEnsureSheetWithHeader(ss, MA_TAB_MACHINES, ['request_id','row_no','brand','model','qty','note','spec_pulled']);
  maEnsureSheetWithHeader(ss, MA_TAB_MODELS, ['brand','model','spec_description']);
  maEnsureSheetWithHeader(ss, MA_TAB_TEMPLATES, ['level','level_name','type','y1','y2','y3','y4','y5','y6','y7','y8','y9','y10']);
  maEnsureSheetWithHeader(ss, MA_TAB_PRICES, ['request_id','type','contract_year','amount','in_warranty']);
  maEnsureSheetWithHeader(ss, MA_TAB_USERS, ['email','name','role']);
  maEnsureSheetWithHeader(ss, MA_TAB_SETTINGS, ['key','value']);
  maSeedSettings(ss);
  maSeedSampleData(ss);
  Logger.log('maSetupSheets เสร็จแล้ว');
}

function maEnsureSheetWithHeader(ss, name, headers) {
  var sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  var first = sh.getRange(1,1).getValue();
  if (first === '' || first === null) {
    sh.getRange(1,1,1,headers.length).setValues([headers]);
    sh.getRange(1,1,1,headers.length).setFontWeight('bold').setBackground('#e8eef7');
    sh.setFrozenRows(1);
  }
  return sh;
}

// ข้อความ default เริ่มต้น (ใช้ตอน seed ครั้งแรก) — แก้ภายหลังได้ที่หน้า Config
function maDefaultClauses(){
  return {
    clause1: 'รายละเอียดเครื่อง||{PROJECT}',
    clause2: 'ระยะเวลาในการบริการดูแลรักษาตรวจสอบและบำรุงรักษาเครื่องเป็นระยะเวลา {YEARS} ปี นับตั้งแต่วันทำสัญญาถึงวันสิ้นสุดสัญญา ซึ่งบริษัทฯ จะส่งวิศวกรที่มีความชำนาญในการบริการดูแลรักษาตรวจสอบและบำรุงรักษาเครื่องจำนวน {PM} ครั้ง/ปี ซึ่งมีกำหนดการให้บริการ ดังนี้\n{ROUNDS}',
    clause3: '3.1 Unlimited Call-in Support: บริการผ่านทางโทรศัพท์โดยสามารถติดต่อตลอด 24 ชั่วโมง ช่วงวันที่ให้บริการ วันจันทร์ - วันอาทิตย์ ซึ่งบริษัทฯจะดำเนินการติดต่อกลับทันทีที่รับเรื่อง\n3.2 On-Site Service Support: การบริการ ณ สถานที่ติดตั้งผลิตภัณฑ์หรือระบบ บริษัทฯ ยินดีให้ส่งเจ้าหน้าที่ เพื่อให้บริการแก้ไขปัญหาภายใน 48 ชั่วโมง หลังจากได้รับแจ้ง',
    clause4: '4.1 รายงานการแก้ปัญหา (Resolve Job Report)\n4.2 รายงานการเปลี่ยนชิ้นส่วนอะไหล่ของตัวอุปกรณ์\n4.3 รายงานการเข้าบำรุงรักษา (Preventive Maintenance Report) ตามรอบระยะเวลาการกำหนด ส่งทุกๆ {PM_STEP} เดือน ประกอบด้วย\n    4.3.1 รายงานการตรวจวัดสอบเทียบค่ามาตรฐาน (Calibration)\n    4.3.2 รายงานการตรวจสอบการทำงานของอุปกรณ์',
    clause5: '5.1 หมายเลขผลิตภัณฑ์ถูกดึงหรือถูกขีดฆ่าหรือลบออก\n5.2 ความเสียหายที่เกิดการเสื่อมสภาพ ตามอายุการใช้งาน หรือขาดการสนับสนุนชิ้นส่วนอะไหล่จากผู้ผลิต (Supplier) หรืออีกนัยหนึ่งคือ รุ่นของผลิตภัณฑ์ สิ้นสุดอายุของรอบการผลิตในกลุ่มสินค้า\n5.3 ความผิดปกติที่เกิดจากอุบัติเหตุ สาเหตุภายนอกของผลิตภัณฑ์ เช่น การใช้งานที่ผิดวิธี ไฟไหม้ น้ำท่วม ฟ้าผ่า ความผันผวนของพลังงานไฟฟ้าหรือเหตุการณ์ เหตุสุดวิสัยจากภัยธรรมชาติ หรือเหตุการณ์ทางการเมือง เป็นต้น\n5.4 การซ่อมแซมหรือพยายามซ่อมแซมจากบุคคลไม่ได้รับอนุญาตจากบริษัทผู้ผลิตหรือบริษัทตัวแทนจำหน่าย\n5.5 การติดตั้งผลิตภัณฑ์ ในสิ่งแวดล้อมไม่เหมาะสมหรือไม่ได้รับความเห็นชอบจากช่างผู้ชำนาญที่ได้รับสิทธิ์จากผู้ผลิต\n5.6 ความเสียหายที่เกิดจากการใช้อุปกรณ์หรือชิ้นส่วนอะไหล่ที่ไม่สอดคล้องหรือไม่ได้อยู่ภายใต้ข้อกำหนดมาตรฐานของการใช้งานอุปกรณ์หรือชิ้นส่วนอะไหล่ที่ถูกต้องตามกฎหมายหรือข้อกำหนดจากหน่วยงานรัฐหรือไม่ได้รับอนุญาตจากบริษัทผู้ผลิตหรือบริษัทตัวแทนจำหน่าย',
    clause6: 'หากทางโรงพยาบาลหรือลูกค้า ต้องการติดต่อประสานงาน หรือ ต้องการคำปรึกษาจากเจ้าหน้าที่ ที่รับผิดชอบตาม หรือขอใช้บริการต่างๆในช่วงระหว่างการการรับประกัน หรือติดต่อประสานงานเรื่องข้อมูลบริการการบำรุงรักษา สามารถติดต่อทางผู้ประสานงานของทางบริษัทฯได้ที่\nService Call Center ติดต่อ 061-410-4999',
    notes: 'ค่าบริการข้างต้นเป็นราคาที่รวมภาษีมูลค่าเพิ่ม 7%\nบริษัทฯ ขอสงวนสิทธิ์ราคาต่อไปนี้ เฉพาะเมื่อทำสัญญาบริการหลังจากเครื่องหมดประกันทันที ต่อเนื่อง 3 ปี โดยไม่มีการเปลี่ยนแปลงหรือยกเลิกสัญญา\nอะไหล่ราคาสูง (รวมภาษีมูลค่าเพิ่ม 7%) ยืนราคา 1 ปี นับจากวันหมดระยะเวลารับประกัน',
    contact: 'หากต้องการข้อมูลเพิ่มเติมติดต่อขอรายละเอียดได้ที่\nโทร. 02-146-5044, 02-146-5046',
    titleMain: 'ข้อเสนอการให้บริการตรวจเช็คสภาพเครื่องและการซ่อมบำรุง (หลังหมดประกัน)',
    excludeOptions: 'Generator\nX-Ray tube (หลอดเอกซเรย์)\nDetector\nBattery\nชุดอ่านผลของรังสีแพทย์ Diagnostic Workstation',
    // ตัวเลือกหน้า request (Sales) — ตั้งได้ใน Config
    optPresentTypes: 'ไม่รวมอะไหล่\nรวมอะไหล่ยกเว้น\nรวมอะไหล่ทุกชิ้น',
    optWarrantyYears: '1,2,3',          // ปีรับประกันที่เลือกได้
    maxTotalYears: '10',                // เพดานจำนวนปีบริการรวม (ปรับได้)
    companyName: 'BJH',                 // ชื่อบริษัทบนหัวกระดาษ
    logoUrl: '',                        // URL โลโก้ (เว้นว่าง = ใช้สัญลักษณ์สามเหลี่ยม)
    // รายการยกเว้นต่อ Level (Product เลือก Level ไหน ดึงของ Level นั้น)
    excludeLevel1: '',
    excludeLevel2: '',
    excludeLevel3: '',
    excludeLevel4: '',
    excludeLevel5: ''
  };
}

function maSeedSettings(ss){
  var sh=ss.getSheetByName(MA_TAB_SETTINGS);
  if(sh.getLastRow()>=2) return; // มีข้อมูลแล้ว ไม่ทับ
  var dc=maDefaultClauses();
  var rows=Object.keys(dc).map(function(k){return [k,dc[k]];});
  sh.getRange(2,1,rows.length,2).setValues(rows);
}

function maSeedSampleData(ss) {
  var u = ss.getSheetByName(MA_TAB_USERS);
  if (u.getLastRow() < 2) {
    u.getRange(2,1,3,3).setValues([
      ['sales@example.com','สมชาย (Sales)','sales'],
      ['product@example.com','ปรียา (Product)','product'],
      ['manager@example.com','วิชัย (Manager)','manager']
    ]);
  }
  var m = ss.getSheetByName(MA_TAB_MODELS);
  if (m.getLastRow() < 2) {
    m.getRange(2,1,3,3).setValues([
      ['Ziehm','Vision RFD','เครื่องเอกซเรย์ฟลูออโรสโคปเคลื่อนที่แบบซีอาร์ม ขนาด 25 kW ชุดรับภาพชนิดแฟลตพาแนล'],
      ['GE Healthcare','Vivid E95','Ultrasound System 4D Cardiac รับประกันมาตรฐาน 12 เดือน'],
      ['Philips','Affiniti 70','Ultrasound General Imaging รับประกัน 12 เดือน']
    ]);
  }
  var t = ss.getSheetByName(MA_TAB_TEMPLATES);
  if (t.getLastRow() < 2) {
    var rows=[]; var names={1:'เครื่องเล็ก',2:'เครื่องกลาง',3:'เครื่องใหญ่',4:'เครื่องเฉพาะทาง',5:'ราคาสูงพิเศษ'};
    for (var lv=1; lv<=5; lv++){
      var sample={none:[180000,192000,200000,216000,232000,0,0,0,0,0],
                  partial:[680000,730000,780000,840000,900000,0,0,0,0,0],
                  full:[1180000,1320000,1480000,1650000,1820000,0,0,0,0,0]};
      ['none','partial','full'].forEach(function(tp){
        var vals=(lv===2)?sample[tp]:[0,0,0,0,0,0,0,0,0,0];
        rows.push([lv,names[lv],tp].concat(vals));
      });
    }
    t.getRange(2,1,rows.length,13).setValues(rows);
  }
}

// =====================================================================
// SHEET HELPERS
// =====================================================================
function maSs_(){ return SpreadsheetApp.openById(MA_SHEET_ID); }

// หา tab ถ้าไม่มีให้สร้าง + ใส่ header (กัน error เมื่อยังไม่ได้รัน maSetupSheets)
function maGetOrCreateSheet(name, headers){
  var ss=maSs_(); var sh=ss.getSheetByName(name);
  if(!sh){
    sh=ss.insertSheet(name);
    if(headers&&headers.length){
      sh.getRange(1,1,1,headers.length).setValues([headers]);
      sh.getRange(1,1,1,headers.length).setFontWeight('bold').setBackground('#e8eef7');
      sh.setFrozenRows(1);
    }
  }
  return sh;
}

function maReadSheet(tabName){
  var sh = maSs_().getSheetByName(tabName);
  if (!sh) return [];
  var lastRow = sh.getLastRow(), lastCol = sh.getLastColumn();
  if (lastRow < 2 || lastCol < 1) return [];   // มีแต่ header หรือว่าง
  var data = sh.getRange(1,1,lastRow,lastCol).getValues();
  if (!data || data.length < 2) return [];
  var headers = data[0] || []; var out=[];
  for (var r=1;r<data.length;r++){
    var obj={}; for(var c=0;c<headers.length;c++) obj[headers[c]]=maSafeVal(data[r][c]);
    obj._row=r+1; out.push(obj);
  }
  return out;
}

/** แปลงค่าจาก Sheet ให้ปลอดภัยต่อการส่งกลับ HTML (Date -> string, อื่นๆ -> string/number) */
function maSafeVal(v){
  if (v === null || v === undefined) return '';
  if (Object.prototype.toString.call(v) === '[object Date]') {
    return Utilities.formatDate(v, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm');
  }
  if (typeof v === 'number' || typeof v === 'boolean') return v;
  return String(v);
}

function maAppendRow(tabName,obj){
  var lock=LockService.getScriptLock(); lock.waitLock(20000);
  try{
    var sh=maSs_().getSheetByName(tabName);
    var headers=sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0];
    sh.appendRow(headers.map(function(h){return obj[h]!==undefined?obj[h]:'';}));
    return true;
  } finally { lock.releaseLock(); }
}

function maUpdateRowByRequestId(tabName,requestId,patchObj){
  var lock=LockService.getScriptLock(); lock.waitLock(20000);
  try{
    var sh=maSs_().getSheetByName(tabName);
    var data=sh.getDataRange().getValues(); var headers=data[0];
    var idCol=headers.indexOf('request_id');
    for(var r=1;r<data.length;r++){
      if(String(data[r][idCol])===String(requestId)){
        for(var key in patchObj){var c=headers.indexOf(key); if(c>=0) sh.getRange(r+1,c+1).setValue(patchObj[key]);}
        return true;
      }
    }
    return false;
  } finally { lock.releaseLock(); }
}

function maNewRequestId(){
  var rows=maReadSheet(MA_TAB_REQUESTS); var n=rows.length+1;
  return 'SR-'+(new Date().getFullYear())+'-'+('0000'+n).slice(-4);
}

// =====================================================================
// API — Models / Templates / Requests
// =====================================================================
function maGetCurrentUser(){
  var email=Session.getActiveUser().getEmail();
  if(!email) return null;
  var rows=maReadSheet(MA_TAB_USERS);
  for(var i=0;i<rows.length;i++){
    if(String(rows[i].email).toLowerCase()===email.toLowerCase())
      return {email:email,name:rows[i].name,role:rows[i].role};
  }
  return {email:email,name:'',role:'sales'};
}

function maApiGetModelSpec(brand,model){
  var rows=maReadSheet(MA_TAB_MODELS);
  for(var i=0;i<rows.length;i++){
    if(String(rows[i].brand).trim().toLowerCase()===String(brand).trim().toLowerCase() &&
       String(rows[i].model).trim().toLowerCase()===String(model).trim().toLowerCase())
      return rows[i].spec_description;
  }
  return '';
}

function maApiGetTemplate(level){
  var rows=maReadSheet(MA_TAB_TEMPLATES); var out={none:[],partial:[],full:[]};
  rows.forEach(function(r){
    if(String(r.level)===String(level)){
      var arr=[]; for(var y=1;y<=10;y++) arr.push(Number(r['y'+y])||0);
      out[r.type]=arr;
    }
  });
  return out;
}

function maApiGetAllTemplates(){
  var rows=maReadSheet(MA_TAB_TEMPLATES); var out={};
  rows.forEach(function(r){
    var lv=String(r.level);
    if(!out[lv]) out[lv]={level:lv,level_name:r.level_name,none:[],partial:[],full:[]};
    var arr=[]; for(var y=1;y<=10;y++) arr.push(Number(r['y'+y])||0);
    out[lv][r.type]=arr; out[lv].level_name=r.level_name;
  });
  return out;
}

function maApiSaveTemplates(payload){
  var lock=LockService.getScriptLock(); lock.waitLock(20000);
  try{
    var sh=maGetOrCreateSheet(MA_TAB_TEMPLATES,["level","level_name","type","y1","y2","y3","y4","y5","y6","y7","y8","y9","y10"]);
    if(sh.getLastRow()>1) sh.deleteRows(2,sh.getLastRow()-1);
    var rows=[];
    for(var lv=1;lv<=5;lv++){
      var d=payload[lv]||payload[String(lv)]||{};
      var name=d.level_name||('Level '+lv);
      ['none','partial','full'].forEach(function(tp){
        var vals=d[tp]||[]; var r=[lv,name,tp];
        for(var y=0;y<10;y++) r.push(Number(String(vals[y]||0).replace(/,/g,''))||0);
        rows.push(r);
      });
    }
    sh.getRange(2,1,rows.length,13).setValues(rows);
    return true;
  } finally { lock.releaseLock(); }
}

function maApiGetModels(){
  return maReadSheet(MA_TAB_MODELS).map(function(r){return {brand:r.brand,model:r.model,spec_description:r.spec_description};});
}

function maApiSaveModels(list){
  var lock=LockService.getScriptLock(); lock.waitLock(20000);
  try{
    var sh=maGetOrCreateSheet(MA_TAB_MODELS,["brand","model","spec_description"]);
    if(sh.getLastRow()>1) sh.deleteRows(2,sh.getLastRow()-1);
    var rows=(list||[]).filter(function(m){return m.brand||m.model;})
      .map(function(m){return [m.brand||'',m.model||'',m.spec_description||''];});
    if(rows.length) sh.getRange(2,1,rows.length,3).setValues(rows);
    return true;
  } finally { lock.releaseLock(); }
}

function maApiCreateRequest(payload){
  var user=maGetCurrentUser(); var reqId=maNewRequestId();
  maAppendRow(MA_TAB_REQUESTS,{
    request_id:reqId,status:'pending',created_at:new Date(),
    created_by_email:user?user.email:'',created_by_name:user?user.name:'',
    hospital_name:payload.hospital_name,sale_price:payload.sale_price,
    project_title:payload.project_title,present_types:(payload.present_types||[]).join(','),
    warranty_years:payload.warranty_years,ma_years:payload.ma_years,
    note_overall:payload.note_overall,attach_urls:(payload.attach_urls||[]).join(',')
  });
  (payload.machines||[]).forEach(function(m,idx){
    maAppendRow(MA_TAB_MACHINES,{request_id:reqId,row_no:idx+1,brand:m.brand,model:m.model,qty:m.qty,note:m.note,spec_pulled:maApiGetModelSpec(m.brand,m.model)});
  });
  return reqId;
}

function maApiSaveVerify(payload){
  var user=maGetCurrentUser();
  var patch={
    status:'verifying',pm_times_per_year:payload.pm_times_per_year,
    exclude_items:payload.exclude_items,project_title:payload.project_title,
    verified_by_email:user?user.email:'',verified_at:new Date()
  };
  if(payload.present_types!==undefined) patch.present_types=payload.present_types; // แบบที่ Product เลือกเสนอ
  if(payload.ma_years!==undefined) patch.ma_years=payload.ma_years; // ปีที่ Product ปรับ
  if(payload.warranty_years!==undefined) patch.warranty_years=payload.warranty_years; // ปีประกันที่ Product แก้
  // Product แก้ข้อมูล Sales ได้ (เผื่อกรอกผิด)
  if(payload.hospital_name!==undefined) patch.hospital_name=payload.hospital_name;
  if(payload.sale_price!==undefined) patch.sale_price=payload.sale_price;
  if(payload.note_overall!==undefined) patch.note_overall=payload.note_overall;
  // override ข้อความรายใบ (ข้อ 3,4,5,6 + หมายเหตุ)
  ['ov_clause1','ov_clause2','ov_clause3','ov_clause4','ov_clause5','ov_clause6','ov_notes'].forEach(function(k){
    if(payload[k]!==undefined) patch[k]=payload[k];
  });
  maUpdateRowByRequestId(MA_TAB_REQUESTS,payload.request_id,patch);
  maSavePrices(payload.request_id,payload.prices);
  return true;
}

/** สร้าง PDF เพื่อ preview (ไม่เปลี่ยนสถานะเป็น approved) */
function maApiPreviewPdf(requestId){
  return maGeneratePdf(requestId);
}

/** คืน HTML ตัวอย่าง (ไม่สร้าง PDF/ไม่บันทึก Drive) — เร็ว สำหรับ modal preview */
function maApiPreviewHtml(requestId){
  var data=maApiGetRequest(requestId);
  if(!data) throw new Error('ไม่พบคำขอ '+requestId);
  return maBuildPdfHtml(data, true);  // true = preview (เว็บฟอนต์ + กล่อง A4)
}

// ====== CONFIG API: Settings (ข้อความ default กลาง) ======
function maApiGetSettings(){
  var rows=maReadSheet(MA_TAB_SETTINGS); var out={};
  rows.forEach(function(r){ out[r.key]=r.value; });
  // เติม default ถ้าขาด
  var dc=maDefaultClauses();
  Object.keys(dc).forEach(function(k){ if(out[k]===undefined||out[k]==='') out[k]=dc[k]; });
  return out;
}

function maApiSaveSettings(obj){
  var lock=LockService.getScriptLock(); lock.waitLock(20000);
  try{
    var sh=maGetOrCreateSheet(MA_TAB_SETTINGS,['key','value']);
    if(sh.getLastRow()>1) sh.deleteRows(2,sh.getLastRow()-1);
    var rows=Object.keys(obj).map(function(k){return [k,obj[k]];});
    if(rows.length) sh.getRange(2,1,rows.length,2).setValues(rows);
    return true;
  } finally { lock.releaseLock(); }
}

function maSavePrices(requestId,prices){
  var lock=LockService.getScriptLock(); lock.waitLock(20000);
  try{
    var sh=maSs_().getSheetByName(MA_TAB_PRICES);
    var data=sh.getDataRange().getValues();
    for(var r=data.length-1;r>=1;r--){ if(String(data[r][0])===String(requestId)) sh.deleteRow(r+1); }
    (prices||[]).forEach(function(p){ sh.appendRow([requestId,p.type,p.contract_year,p.amount,p.in_warranty?'Y':'']); });
  } finally { lock.releaseLock(); }
}

function maApiApprove(requestId){
  var user=maGetCurrentUser();
  var pdfUrl=maGeneratePdf(requestId);
  maUpdateRowByRequestId(MA_TAB_REQUESTS,requestId,{
    status:'approved',approved_by_email:user?user.email:'',approved_at:new Date(),pdf_url:pdfUrl
  });
  return pdfUrl;
}

function maApiListRequests(statusFilter){
  var rows=maReadSheet(MA_TAB_REQUESTS) || [];
  if(statusFilter) rows=rows.filter(function(r){return r.status===statusFilter;});
  return rows;
}

/**
 * รันฟังก์ชันนี้เองใน editor เพื่อตรวจว่า Sheet พร้อมใช้งานไหม
 * ดูผลใน Execution log (View > Logs)
 */
function maDiagnose(){
  var ss; 
  try { ss = SpreadsheetApp.openById(MA_SHEET_ID); }
  catch(e){ Logger.log('เปิด Sheet ไม่ได้: '+e.message+' — ตรวจ MA_SHEET_ID'); return; }
  var tabs=[MA_TAB_REQUESTS,MA_TAB_MACHINES,MA_TAB_MODELS,MA_TAB_TEMPLATES,MA_TAB_USERS,MA_TAB_PRICES,MA_TAB_SETTINGS];
  tabs.forEach(function(t){
    var sh=ss.getSheetByName(t);
    if(!sh) Logger.log('✗ ไม่มี tab: '+t+'  -> ต้องรัน maSetupSheets()');
    else Logger.log('✓ tab '+t+' : '+sh.getLastRow()+' แถว');
  });
  Logger.log('อีเมลที่ล็อกอิน: '+(Session.getActiveUser().getEmail()||'(ว่าง)'));
}

function maApiGetRequest(requestId){
  var reqs=maReadSheet(MA_TAB_REQUESTS).filter(function(r){return String(r.request_id)===String(requestId);});
  if(!reqs.length) return null;
  var req=reqs[0];
  req.machines=maReadSheet(MA_TAB_MACHINES).filter(function(m){return String(m.request_id)===String(requestId);});
  req.prices=maReadSheet(MA_TAB_PRICES).filter(function(p){return String(p.request_id)===String(requestId);});
  return req;
}

// =====================================================================
// PDF — สร้าง PDF ภาษาไทย (ฝัง Sarabun webfont)
// =====================================================================
function maGeneratePdf(requestId){
  var data=maApiGetRequest(requestId);
  if(!data) throw new Error('ไม่พบคำขอ '+requestId);
  var html=maBuildPdfHtml(data);
  var blob=HtmlService.createHtmlOutput(html).getBlob().getAs('application/pdf').setName('ServiceQuotation_'+requestId+'.pdf');
  var folder=MA_PDF_FOLDER_ID?DriveApp.getFolderById(MA_PDF_FOLDER_ID):DriveApp.getRootFolder();
  var file=folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW);
  return file.getUrl();
}

function maBuildPdfHtml(d, forPreview){
  var warranty=Number(d.warranty_years)||0;
  var totalYears=Number(d.ma_years)||0;          // ตอนนี้ = ปีรวมทั้งหมด (รวมประกัน)
  var maYears=Math.max(0, totalYears - warranty); // ปีที่คิดราคา MA จริง
  var pm=Number(d.pm_times_per_year)||0;
  var pmStepEarly=pm>0?Math.round(12/pm):0;
  // ข้อความ: ใช้ override รายใบก่อน ถ้าว่างใช้ default กลางจาก Settings
  var S=maApiGetSettings();
  function pick(ovKey,defKey){ var ov=d[ovKey]; return (ov!==undefined&&ov!==null&&String(ov).trim()!=='')?String(ov):String(S[defKey]||''); }
  var txt3=pick('ov_clause3','clause3');
  var txt4=pick('ov_clause4','clause4').replace(/\{PM_STEP\}/g, pmStepEarly);
  var txt5=pick('ov_clause5','clause5');
  var txt6=pick('ov_clause6','clause6');
  var txtNotes=pick('ov_notes','notes');
  var txtContact=String(S['contact']||'');
  var titleMain=String(S['titleMain']||'ข้อเสนอการให้บริการตรวจเช็คสภาพเครื่องและการซ่อมบำรุง (หลังหมดประกัน)');
  var companyName=String(S['companyName']||'BJH');
  var logoUrl=String(S['logoUrl']||'').trim();
  // หัวกระดาษ: ถ้ามี logo URL ใช้รูป ไม่งั้นใช้สามเหลี่ยม + ชื่อ
  // [PDF-LOGO-FIX v145] logoUrl ว่าง -> ใช้โลโก้ BJC ฝัง base64 (fallback เดิม tri+ชื่อ ถ้าไม่มี base64)
  var logoHtml = logoUrl
    ? '<img src="'+maEscapeHtml(logoUrl)+'" style="height:34px;vertical-align:middle">'
    : (BJC_LOGO_B64
        ? '<img src="data:image/png;base64,'+BJC_LOGO_B64+'" style="height:40px;vertical-align:middle">'
        : '<span class="tri"></span><span class="bjc">'+maEscapeHtml(companyName)+'</span>');
  var headerHtml='<div class="pagehead">'+logoHtml+'</div>';
  // แปลงข้อความหลายบรรทัด -> sub divs (เว้นวรรคหน้า = subsub)
  function linesToHtml(t){
    return String(t).split(/\r?\n/).filter(function(s){return s.trim()!=='';}).map(function(ln){
      var indent=/^\s{2,}/.test(ln); // ขึ้นต้นด้วยเว้นวรรค = ย่อย
      return '<div class="'+(indent?'subsub':'sub')+'">'+maEscapeHtml(ln.trim())+'</div>';
    }).join('');
  }
  function notesToHtml(t){
    return '<ul>'+String(t).split(/\r?\n/).filter(function(s){return s.trim()!=='';}).map(function(ln){return '<li>'+maEscapeHtml(ln.trim())+'</li>';}).join('')+'</ul>';
  }
  function contactToHtml(t){
    return String(t).split(/\r?\n/).filter(function(s){return s.trim()!=='';}).map(function(ln,i){return '<div'+(i>0?' style="font-weight:700"':'')+'>'+maEscapeHtml(ln.trim())+'</div>';}).join('');
  }
  var projLines=String(d.project_title||'').split(/\r?\n/).filter(function(s){return s.trim()!=='';});
  var projHtml=projLines.map(function(l){return maEscapeHtml(l);}).join('<br>');
  var projOneLine=projLines.join(' ');
  // present_types = แบบที่ Product เลือก "จะเสนอ" (ถ้าว่าง = เสนอทุกแบบที่มีราคา)
  var presentTypes=String(d.present_types||'').split(',').map(function(s){return s.trim();}).filter(Boolean);
  var typeMap={'ไม่รวมอะไหล่':'none','รวมอะไหล่ยกเว้น':'partial','รวมอะไหล่':'partial','รวมอะไหล่ทุกชิ้น':'full'};
  var typeTitle={none:'แบบไม่รวมอะไหล่',partial:'แบบรวมอะไหล่',full:'แบบรวมอะไหล่ทุกชิ้น'};
  var selectedTypes={}; presentTypes.forEach(function(pt){ if(typeMap[pt]) selectedTypes[typeMap[pt]]=true; });
  var priceByType={none:{},partial:{},full:{}};
  (d.prices||[]).forEach(function(p){ if(!priceByType[p.type]) priceByType[p.type]={}; priceByType[p.type][String(p.contract_year)]=p.amount; });

  // นับว่าจะเสนอกี่ตาราง เพื่อจัด page-break
  var offerCount=0;
  ['none','partial','full'].forEach(function(tp){
    var picked=(presentTypes.length===0)?true:!!selectedTypes[tp];
    if(picked) offerCount++;
  });

  var priceSection=''; var sub=1;
  ['none','partial','full'].forEach(function(tp){
    // เสนอเฉพาะแบบที่ Product เลือก (ถ้าไม่เลือกอะไรเลย = เสนอทุกแบบ)
    var picked = (presentTypes.length===0) ? true : !!selectedTypes[tp];
    if(!picked) return;
    var title=typeTitle[tp];
    if(tp==='partial'&&d.exclude_items) title+=' <span style="font-weight:400;font-size:12.5px">(ยกเว้น '+maEscapeHtml(maJoinThaiAnd(d.exclude_items))+')</span>';

    // สร้างรายการราคารายปี แล้วยุบช่วงที่ราคาเท่ากัน
    var items='';
    // ช่วงในประกัน
    if(warranty>0){
      var winLabel=(warranty===1)?'ปีที่ 1':('ปีที่ 1 - '+warranty);
      items+='<div class="prow"><span class="py">'+winLabel+'</span><span class="pv">ในประกัน</span></div>';
    }
    // ไล่ปี MA ยุบช่วงราคาเท่ากัน
    var seg=[]; // {start,end,amt}
    for(var k=1;k<=maYears;k++){
      var cy=warranty+k; var amt=priceByType[tp][String(cy)];
      var amtNum = amt ? Number(String(amt).replace(/,/g,'')) : 0;
      if(seg.length>0 && seg[seg.length-1].amt===amtNum){
        seg[seg.length-1].end=cy; // ราคาเท่าเดิม ขยายช่วง
      } else {
        seg.push({start:cy,end:cy,amt:amtNum});
      }
    }
    seg.forEach(function(s){
      var yl=(s.start===s.end)?('ปีที่ '+s.start):('ปีที่ '+s.start+' - '+s.end);
      var vv=(s.amt>0)?('ปีละ '+maFormatNum(s.amt)+' บาท'):'-';
      items+='<div class="prow"><span class="py">'+yl+'</span><span class="pv">'+vv+'</span></div>';
    });

    var blkClass = (offerCount===3 && sub===3) ? 'price-block breakbefore' : 'price-block';
    priceSection+='<div class="'+blkClass+'"><div class="ph">7.'+sub+' '+title+'</div><div class="plist">'+items+'</div></div>';
    sub++;
  });
  if(priceSection==='') priceSection='<div style="color:#888">— ยังไม่มีราคาที่เสนอ —</div>';

  var roundMonths=[];
  if(pm>0){var step=12/pm; for(var i=1;i<=pm;i++) roundMonths.push(Math.round(step*i));}
  var roundsHtml=roundMonths.map(function(mo,i){return '<div class="rnd">ครั้งที่ '+(i+1)+' ครบกำหนดระยะ '+mo+' เดือน นับจากวันทำสัญญา</div>';}).join('');
  var pmStep=pmStepEarly;

  // ข้อ 1: รูปแบบ "หัวข้อ||เนื้อหา" — เนื้อหารองรับ {PROJECT}
  var txt1raw=pick('ov_clause1','clause1');
  var c1parts=txt1raw.split('||');
  var c1head=maEscapeHtml((c1parts[0]||'รายละเอียดเครื่อง').trim());
  var c1body=maEscapeHtml((c1parts[1]!==undefined?c1parts[1]:'{PROJECT}').replace(/\{PROJECT\}/g, projOneLine).trim());
  var clause1Html='<div class="lead">'+c1head+'</div><div>'+c1body+'</div>';

  // ข้อ 2: ประโยคนำ รองรับ {YEARS} {PM} {ROUNDS}
  var txt2raw=pick('ov_clause2','clause2');
  var ROUNDS_PH='@@ROUNDS@@';
  var clause2Html=maEscapeHtml(txt2raw.replace(/\{YEARS\}/g,warranty).replace(/\{PM\}/g,pm).replace(/\{ROUNDS\}/g,ROUNDS_PH))
                    .replace(/\n/g,'<br>')
                    .split(ROUNDS_PH).join(roundsHtml);

  // [PDF-FONT-FIX v145] PDF ฝังฟอนต์ base64 (Google PDF renderer ไม่รองรับ @import); preview ใช้ @import
  var fontCss = forPreview
    ? '@import url("https://fonts.googleapis.com/css2?family=Sarabun:wght@400;700&display=swap");'
    : '@font-face{font-family:"Sarabun";font-style:normal;font-weight:400;src:url(data:font/truetype;charset=utf-8;base64,'+SARABUN_REGULAR_B64+') format("truetype")}'+
      '@font-face{font-family:"Sarabun";font-style:normal;font-weight:700;src:url(data:font/truetype;charset=utf-8;base64,'+SARABUN_BOLD_B64+') format("truetype")}';
  // CSS จำลองหน้า A4 (เฉพาะ preview)
  var previewCss = forPreview
    ? 'body{background:#525659;padding:20px 0}'+
      '.doc{background:#fff;width:210mm;min-height:297mm;margin:0 auto 18px auto;padding:18mm 16mm;box-shadow:0 4px 16px rgba(0,0,0,.3);position:relative}'+
      '.doc+.doc{margin-top:0}'+
      '.pgnum{position:absolute;bottom:8mm;right:16mm;font-size:11px;color:#999}'
    : '';

  // เนื้อหาแบ่งเป็นกลุ่มหน้า (ตาม breakbefore: ข้อ1-4 | ข้อ5-7)
  var titleBlock='<div class="title"><div class="main">'+maEscapeHtml(titleMain)+'</div>'+
    '<div class="proj">'+projHtml+'</div><div class="hosp">'+maEscapeHtml(d.hospital_name)+'</div></div>';
  var clauses1to4=
    '<div class="clause"><div class="no">1.</div><div>'+clause1Html+'</div></div>'+
    '<div class="clause"><div class="no">2.</div><div>'+clause2Html+'</div></div>'+
    '<div class="clause"><div class="no">3.</div><div><div class="lead">การบริการบำรุงรักษา (Maintenance Service) ประกอบด้วยการบริการและเงื่อนไข ดังต่อไปนี้</div>'+linesToHtml(txt3)+'</div></div>'+
    '<div class="clause"><div class="no">4.</div><div><div class="lead">ทางบริษัทจะทำการจัดส่งเอกสารรายงาน (Report) เพื่อแจ้งให้ลูกค้าทราบ ตามเงื่อนไขดังนี้</div>'+linesToHtml(txt4)+'</div></div>';
  var clause5='<div class="clause"><div class="no">5.</div><div><div class="lead">เงื่อนไขการบริการ จะไม่ครอบคลุม อันเนื่องมาจากเหตุการณ์ดังต่อไปนี้</div>'+linesToHtml(txt5)+'</div></div>';
  var clause6='<div class="clause"><div class="no">6.</div><div><div class="lead">การติดต่อประสานงานหรือการขอใช้บริการต่าง ๆ</div>'+contactToHtml(txt6)+'</div></div>';
  var clause7='<div class="clause"><div class="no">7.</div><div><div class="lead">ราคาค่าบริการหลังหมดระยะรับประกัน พร้อม PM/MA '+pm+' ครั้ง/ปี/เครื่อง/ชุด</div>'+
    '<div style="font-size:12.5px;color:#444;margin-bottom:14px">(ภายใต้การใช้งานปกติ เฉพาะผลิตภัณฑ์ตามที่ระบุเท่านั้น)</div>'+priceSection+
    '<div class="notes"><div class="nh">หมายเหตุ :</div>'+notesToHtml(txtNotes)+
    '<div class="contact">'+contactToHtml(txtContact)+'</div></div></div></div>';

  var bodyInner;
  if(forPreview){
    // หลายกล่อง A4 แต่ละกล่องมีหัวกระดาษ (จำลอง PDF)
    var page1=headerHtml+titleBlock+clauses1to4;
    var page2=headerHtml+clause5+clause6+clause7;
    bodyInner='<div class="doc"><div class="pgnum">หน้า 1</div>'+page1+'</div>'+
              '<div class="doc"><div class="pgnum">หน้า 2</div>'+page2+'</div>';
  } else {
    // PDF จริง: table thead ซ้ำหัวทุกหน้า
    bodyInner='<table class="doc"><thead><tr><td class="headcell">'+headerHtml+'</td></tr></thead>'+
      '<tbody><tr><td>'+titleBlock+clauses1to4+
      '<div class="breakbefore"></div>'+clause5+clause6+clause7+
      '</td></tr></tbody></table>';
  }

  return ''+
'<!DOCTYPE html><html lang="th"><head><meta charset="UTF-8"><style>'+
fontCss+
'*{box-sizing:border-box;margin:0;padding:0;font-family:"Sarabun",sans-serif}'+
'body{color:#1a1d24;font-size:13px;line-height:1.65;padding:14px 18px}'+
'table.doc{width:100%;border-collapse:collapse}'+
'table.doc thead{display:table-header-group}'+  // ซ้ำ thead ทุกหน้า
'table.doc tfoot{display:table-footer-group}'+
'.pagehead{display:flex;align-items:center;gap:12px;border-bottom:1.5px solid #3d6b35;padding-bottom:6px;margin-bottom:16px}'+
'.headcell{padding:0}'+
'.bjc{font-size:22px;font-weight:700;color:#3d6b35}'+
'.tri{display:inline-block;width:0;height:0;border-left:14px solid transparent;border-right:14px solid transparent;border-bottom:28px solid #3d6b35;vertical-align:middle;margin-right:7px}'+
'.title{text-align:center;margin-bottom:26px}.title .main{font-weight:700;font-size:15px;margin-bottom:7px}'+
'.title .proj{font-weight:700;font-size:13.5px;line-height:1.7}.title .hosp{font-weight:700;font-size:13.5px;margin-top:2px}'+
'.clause{display:flex;gap:8px;margin-bottom:13px}.clause .no{font-weight:700;min-width:18px}.clause .lead{font-weight:700;margin-bottom:4px}'+
'.sub{padding-left:20px;margin-bottom:5px}.sub .sh{font-weight:700}.subsub{padding-left:54px;margin-bottom:4px}.rnd{padding-left:42px;margin-bottom:3px}'+
'.price-block{margin-bottom:18px}.price-block .ph{font-weight:700;margin-bottom:7px;font-size:13.5px}'+
'.plist{padding-left:22px}.prow{display:flex;margin-bottom:5px}.prow .py{min-width:130px}.prow .pv{}'+
'.notes{margin-top:12px;border-top:1px solid #d8dce2;padding-top:12px;font-size:12.5px}.notes .nh{font-weight:700;text-decoration:underline;margin-bottom:6px}'+
'.notes ul{padding-left:20px}.notes li{margin-bottom:5px}.contact{text-align:center;margin-top:18px;line-height:1.8}'+
'.callcenter{font-weight:700;margin-top:4px}.breakbefore{page-break-before:always}'+
previewCss+
'</style></head><body>'+
bodyInner+
'</body></html>';
}

function maFormatNum(n){ n=Number(String(n).replace(/,/g,''))||0; return n.toLocaleString('en-US'); }
function maEscapeHtml(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
// รวมรายการเป็นข้อความไทย: "a, b, c และ d"
function maJoinThaiAnd(csv){
  var arr=String(csv||'').split(',').map(function(s){return s.trim();}).filter(Boolean);
  if(arr.length<=1) return arr.join('');
  return arr.slice(0,-1).join(', ')+' และ '+arr[arr.length-1];
}

function _testMG() {
  var r = saveConfigSection(JSON.stringify({section:'model_group', data:{'TestModel':'TestGroup'}}));
  Logger.log(r);
}
