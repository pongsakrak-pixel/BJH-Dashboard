# BJH Sales Dashboard — STATE

> อัปเดตล่าสุด: **22 ก.ค. 2569**

---

# 📦 VERSION

| | |
|---|---|
| **เวอร์ชันปัจจุบัน** | **V558.0** |
| **🆕 วิธีจัดการโค้ด** | **git + clasp** (`C:\bjh-dashboard`) — **เลิกใช้ bundle JSON แล้ว** |
| **Bundle สุดท้าย** | `BJH_Sales_Dashboard_Tools__108_UPDATED.json` (V554.0) — **เก็บไว้อ้างอิงเท่านั้น ห้ามใช้ทำงานต่อ** |
| **Base เริ่มต้น** | V479.75 (`__29_`) |
| **เช็คเวอร์ชัน** | `_BUILD_VER` ใน `overrides.html` · หรือ badge `#ver-stamp` มุมซ้ายบน |
| **ไฟล์ STATE** | `STATE_V558.md` — **ชื่อไฟล์มี version เสมอ** |
| **Deploy ปัจจุบัน** | **@851** (`clasp create-deployment -i AKfycbzO7...`) |
| **GitHub** | `https://github.com/pongsakrak-pixel/BJH-Dashboard` (main) |

> ⚠️ **เปลี่ยนวิธีทำงานตั้งแต่ 22 ก.ค. 2569** — ดูหัวข้อ **🚀 MIGRATION: git + clasp** ด้านล่าง
> ไม่ต้องส่ง/รับ bundle JSON อีกแล้ว · ไม่ต้อง Ctrl+S ทีละไฟล์ · ย้อนกลับได้ด้วย git

## 📂 ไฟล์ที่เปลี่ยนจาก base (12 ไฟล์ — ต้องอัปครบ)

| ไฟล์ | แก้ล่าสุดที่ | Deploy |
|---|---|---|
| **`Code.gs`** | **V521.0** ⚠️ | ⚠️ **Deploy → New Version** |
| **`Index.html`** | **V520.0** ⚠️ (ย้าย Mobile) | ⚠️ **Deploy → New Version** |
| 🆕 **`Mobile.html`** | **V520.0** ✅ ใช้ได้แล้ว | Ctrl+S |
| `libs.html` | V481.0 | Ctrl+S |
| `script_main.html` | **V547.0** | Ctrl+S |
| **V548.0** | 🖥 ปุ่ม **Present** ฉายบล็อก STORY เต็มจอ | Dashboard · overrides |
| **V549.0** | Present + **แถบตัวกรอง** (ยังกดเปลี่ยนได้) | Dashboard · overrides |
| **V550.0** | Achievement: ตัวเลขใหญ่ขึ้น · H1/H2 แถบบาง · เดือนอนาคตโชว์ Ordered | Dashboard · overrides |
| **V551.0** | 🎨 Achievement **ออกแบบใหม่ทั้งบล็อก** + กราฟแท่ง | Dashboard · overrides |
| **V552.0** | ตัวเลขกำกับบนแท่งกราฟ · เดือนอนาคต = **Ordered** | Dashboard · overrides |
| **V553.0** | แท่ง ordered แยก **confirm / order** 2 ระดับสี | Dashboard · overrides |
| **V554.0** | 📱 Mobile: **5 เมนูอังกฤษ · ปุ่มใหญ่ · โหลดอัตโนมัติ** | Mobile · script_main · overrides |
| **V546.0** | ❌ ยกเลิก นับเฉพาะเดือนนี้ ไม่เอา carry | Home · overrides |
| **V547.0** | ✏️ แก้ไข Status — แสดงค่าเดิม + **ปุ่มคืนค่าเดิม** | script_main · overrides |
| **V544.0** | 🌏 เขตต่างประเทศ **1 รพ. / 1 บรรทัด** | Dashboard · overrides |
| **V545.0** | mblinks→sys · จัดกลุ่ม/แก้พื้นที่ **ไม่ใช้ popup** · +Retention perm | script_main · config_modal · Dashboard · overrides |
| **V542.0** | 🔴 **FIX** Mobile จอเล็กผิดปกติ (breakpoint 600px บีบเกิน) | Mobile · overrides |
| **V543.0** | 🔴 **FIX** Sales กทม. dropdown/checkbox กรองไม่ได้ + แสดงไม่ครบ | script_main · overrides |
| **V540.0** | 🔒 ซ่อนหมวด **Daily Board** จาก sales — เหลือหมวดเดียว | config_modal · overrides |
| **V541.0** | ⚙ Config มุมขวาบน = admin only · Top 10 **2 คอลัมน์** | script_main · Dashboard · overrides |
| **V536.0** | 🏆 เขต กทม. **Top 10 ตามยอดบิลทั้งปี** + ปุ่มดูทั้งหมด | Dashboard · overrides |
| **V537.0** | Top 10 **ไม่โชว์มูลค่า** เหลือลำดับ+ชื่อ | Dashboard · overrides |
| **V538.0** | 📋 "ดูทั้งหมด" เปลี่ยนเป็น **ตาราง** หัวค้าง + scroll | Dashboard · overrides |
| **V539.0** | 🔴 **FIX** sales เห็นหมวด Sales Areas แต่ไม่มีปุ่ม tab | script_main · overrides |
| **V534.0** | 🔴 **FIX** แก้พื้นที่/จัดกลุ่ม รพ. กดบันทึกแล้วไม่ติด | Dashboard · overrides |
| **V535.0** | 📱 **Config สิทธิ์ Mobile** + responsive Mobile | **Code.gs** · script_main · config_modal · Mobile · overrides |
| **V532.0** | 🏥 เขต กทม. แสดง รพ. ที่ดูแล**ครบทุกแห่ง** (เดิมเฉพาะที่มีบิล) | Dashboard · overrides |
| **V533.0** | 🔽 Sales กทม. + **dropdown กรองผู้แทน** (มีตัวเลขนับต่อคน) | config_modal · script_main · overrides |
| **V527.0** | 🎯 การ์ด **CONFIRMED + ORDER** อ่านตาม pill ที่ติ๊ก | Dashboard · overrides |
| **V528.0** | 🔴 **FIX** filter ไม่ครอบ `SC Ordered`/`SC Carry` + การ์ดย่อยเคารพ filter | Dashboard · overrides |
| **V529.0** | 🔴 **FIX** `fmo` ไม่ย้ายตาม → Monthly นับซ้ำ 2 เดือน | overrides · confirm_billing |
| **V530.0** | 🔓 **Config Areas** เปิดให้ทุก role แก้ได้ 4 หัวข้อ | script_main · overrides |
| **V531.0** | 🔌 เอา `RES_SALES_NAME`/`RES_SERVICE_NAME` กลับมาจาก API | **Code.gs** · script_main · Dashboard · overrides |
| **V525.0** | **ย้ายเดือนจริง** ตอน Confirm + **โน้ตที่เดียวกัน** | overrides · confirm_billing |
| **V526.0** | 🎯 **Monthly Forecast = Summary** นับเท่ากัน (ยุบ Actual FAD) | script_main · overrides |
| **`overrides.html`** | **V554.0** ← version stamp | Ctrl+S |
| `Home.html` | **V502.0** | Ctrl+S |
| `Dashboard.html` | **V528.0** | Ctrl+S |
| **V525.0** | **ย้ายเดือนจริง** ตอน Confirm + **โน้ตที่เดียวกัน** | overrides · confirm_billing |
| **V526.0** | 🎯 **Monthly Forecast = Summary** นับเท่ากัน (ยุบ Actual FAD) | script_main · overrides |
| `SalesProspect.html` | **V522.0** | Ctrl+S |
| **V523.0** | 🗑 **ถอนยืนยัน** ใน popup Sales Confirm | overrides |
| **V524.0** | รวมปุ่ม **⚙ Config Areas** + 🏙 Sales กทม. เป็น tab + FIX `\n` | config_modal · script_main · Dashboard · overrides |
| `config_modal.html` | **V545.0** | Ctrl+S |
| **V546.0** | ❌ ยกเลิก นับเฉพาะเดือนนี้ ไม่เอา carry | Home · overrides |
| **V547.0** | ✏️ แก้ไข Status — แสดงค่าเดิม + **ปุ่มคืนค่าเดิม** | script_main · overrides |
| **V536.0** | 🏆 เขต กทม. **Top 10 ตามยอดบิลทั้งปี** + ปุ่มดูทั้งหมด | Dashboard · overrides |
| **V537.0** | Top 10 **ไม่โชว์มูลค่า** เหลือลำดับ+ชื่อ | Dashboard · overrides |
| **V538.0** | 📋 "ดูทั้งหมด" เปลี่ยนเป็น **ตาราง** หัวค้าง + scroll | Dashboard · overrides |
| **V539.0** | 🔴 **FIX** sales เห็นหมวด Sales Areas แต่ไม่มีปุ่ม tab | script_main · overrides |
| **V534.0** | 🔴 **FIX** แก้พื้นที่/จัดกลุ่ม รพ. กดบันทึกแล้วไม่ติด | Dashboard · overrides |
| **V535.0** | 📱 **Config สิทธิ์ Mobile** + responsive Mobile | **Code.gs** · script_main · config_modal · Mobile · overrides |
| **V525.0** | **ย้ายเดือนจริง** ตอน Confirm + **โน้ตที่เดียวกัน** | overrides · confirm_billing |
| **V526.0** | 🎯 **Monthly Forecast = Summary** นับเท่ากัน (ยุบ Actual FAD) | script_main · overrides |
| `confirm_billing.html` | V485.0 | Ctrl+S |

> **ไม่เปลี่ยน:** `style` · `body_app_top` · `body_app_bottom` · `DailySales` · `LOA` · `MA` · `MDCollection` · `QuotationCheck` · `Territory map interactive` · `Seedbudgetsales2026` · `appsscript`

## 🕘 Version history

| Ver | เรื่อง | ไฟล์ที่แก้ |
|---|---|---|
| **V479.75** | *(base ที่ Eak ส่งมา)* | — |
| V480.0 | **SLIM** — `ex_col=` ตัด 107 fields ที่ต้นทาง (JSON 131.5→67.3 MB) | Code · script_main · overrides |
| V480.1 | FIX: URL ยาวเกิน 2048 → แยก ex_col ต่อกลุ่ม + ไม่ encode comma | Code · overrides |
| V481.0 | FIX: `pako is not defined` race · master โหลดซ้ำ 2 รอบ | libs · script_main · overrides |
| V482.0 | รัน config/actual/lowfc **ขนาน** · TX sub-timing (41.8s → 27.8s) | script_main · overrides |
| V483.0 | FIX: วัด TX ผิด branch · `_etlDoneOK` ไม่เคยถูก set | script_main · overrides |
| V484.0 | Prefetch TX · ตัด "โหลดหลุด" 4 call หลังเสร็จ · แสดงเวลาโหลด | script_main · overrides |
| V485.0 | **`getBootBundle()`** — รวม 5 call → 1 (config 14.6s → bundle 5.3s) | Code · script_main · confirm_billing · overrides |
| V486.0 | **HTTP fast path** — `doGet` endpoint + memoize `getSpreadsheet()` | Code · script_main · overrides |
| V487.0 | **C1–C8** (UI 8 เคส) | Home · SalesProspect · script_main · config_modal · Dashboard · overrides |
| V488.0 | FIX: HTTP ต้องใช้ `/exec` (`/dev` โดน CORS) + `bjhSaveExecUrl()` | Code · Index · script_main · overrides |
| V489.0 | **C9** สถานะ SR บนการ์ดทีม + FIX `PO/Contract Completed` นับผิด | Home · overrides |
| V490.0 | Config กว้าง 720 → **1400px** + จัดแถบหมวด | config_modal · script_main · overrides |
| V491.0 | FIX: ปุ่ม 🗾 เขตจังหวัด ใส่ผิด toolbar | Dashboard · overrides |
| **V492.0** | Config **เต็มจอ** (97vw × 94vh) · STATE ใส่ version ในชื่อไฟล์ | config_modal · overrides |
| **V493.0** | **C10–C21 (12 เคส)** | Code ⚠️ · script_main · overrides · Home · Dashboard · config_modal |
| **V494.0** | **C22–C29 (7 เคส)** | Home · Dashboard · SalesProspect · overrides |
| **V494.1** | 🔴 **FIX C22b** — `_cdBuildV2` เป็น closure ใน `spRenderAlert()` | Home · overrides |
| **V495.0** | **C30–C33** — ⚡ **CACHE LAYER** · ย่อหน้า · กดตัวเลขดูบิล · NEW/RENEW | Code ⚠️ · script_main · Home · Dashboard · overrides |
| **V496.0** | **C34** — 📑 **Contract Pipeline** (แทน Renewal) | SalesProspect · overrides |
| **V497.0** | **C35** — หัวสรุป popup ทีม `SC x · SP y` | Home · overrides |
| **V498.0** | **C36** — ช่วง dropdown +รายไตรมาส/รายเดือน | Dashboard · overrides |
| ~~V499.0~~ | ~~C37 status filter~~ 🔴 **ถอนออก** (ไปชนกับ popup ของ Service Commercial Orders) | — |
| **V506.0** | **M1** — 📱 Mobile shell + BJH Contact (ไฟล์ใหม่ `Mobile.html`) | Code ⚠️ · Index ⚠️ · Mobile 🆕 · script_main · config_modal · overrides |
| **V507.0** | **M7** — เลือก Mobile/Desktop หลัง login (แทน auto-detect) + Mobile ข้ามโหลดข้อมูล | Mobile · script_main · overrides |
| **V508.0** | **N1** — 📝 คอลัมน์โน้ตใน Contract & PO · สั่ง SP · เข้า SC | SalesProspect · overrides |
| **V509.0** | 🔴 FIX Mobile จอดำ (1) — `#boot-loading` z-index สูงสุดบัง | Mobile · script_main · overrides |
| **V510.0** | **M2** — ซ่อม import MD 6 format + 🗑️ ลบหน้า MDCollection | SalesProspect · script_main · overrides · Index ⚠️ · body_app_top |
| **V511.0** | **M5** — 📱 Mobile 9 เมนูทำงานจริง | Mobile · overrides |
| **V512.0** | 🔴 FIX 4 tab ว่างเปล่า — `</div>` ขาดตั้งแต่ V496 | SalesProspect · overrides |
| **V513.0** | **N2** — เพิ่มคอลัมน์ "เลขที่ SR" ในหน้า 📥 เข้า SC | SalesProspect · overrides |
| **V514.0** | 🔴 FIX Mobile จอดำ (2) — `<style>` อยู่ใน `<div>` | Mobile · overrides |
| **V515.0** | 🔍 Mobile debug บนจอ + Export FAD +เลขบิล +ประเภทสัญญา | Mobile · script_main · Dashboard · overrides |
| **V516.0** | ถามเลือกจอทุกครั้ง + FIX ปุ่มเขตจังหวัด | Code ⚠️ · Dashboard · script_main · overrides |
| **V517.0** | 🆘 ทางหนีจอดำ — `?view=` + fallback | script_main · overrides |
| **V518.0** | Export FAD +วันที่บิล | Dashboard · overrides |
| **V519.0** | 🔴 Export **ปุ่มเขียว** +เลขบิล/วันที่/ประเภทสัญญา ✅ | script_main · overrides |
| **V520.0** | 🔴 **FIX Mobile จอดำ** (Mobile อยู่ใน `#app`) ✅ **ใช้ได้แล้ว** | Index ⚠️ · Mobile · script_main · overrides |
| **V521.0** | 🏙 Sales ประจำ รพ. กทม. + แนะนำชื่อคล้ายเฉพาะ กทม. | Code ⚠️ · Dashboard · script_main · overrides |
| **V522.0** | ✅ **Sales Confirm รายบรรทัด** + chip Prospect ใน เข้า SC | SalesProspect · overrides |

## 📈 ผลด้านความเร็ว
```
V479.75 (base)  30-60s   ← cache ปิด, 7 call, payload 131 MB
V481.0          41.8s    (วัด breakdown ได้ครั้งแรก)
V482.0          27.8s    ← sheets ขนาน
V487.0          29.1s    ← bootBundle 5→1 call ✅
V488.0 + /exec  ~10s     ← ⏳ รอตั้ง BJH_EXEC_URL
```

---

---

# 🚀 MIGRATION: bundle JSON → git + clasp (V554.1 · 22 ก.ค. 2569)

**สถานะ: ✅ เสร็จสมบูรณ์ ทดสอบครบวงจรแล้ว**

## สภาพแวดล้อมบนเครื่อง Eak (Windows 11 — ติดสิทธิ์ ลงโปรแกรมไม่ได้ ใช้ portable ทั้งหมด)

| เครื่องมือ | เวอร์ชัน | ที่อยู่ |
|---|---|---|
| Node.js | v24.18.0 | `C:\Users\pongsakr\Downloads\node\node` (portable zip) |
| Git | 2.55.0 | `C:\Users\pongsakr\Downloads\PortableGit\cmd` (portable) |
| clasp | 3.3.0 | `%USERPROFILE%\.npm-global` |
| Claude Code | **1.0.100** ⚠️ | `%USERPROFILE%\.npm-global` |

- **repo:** `C:\bjh-dashboard` (23 ไฟล์จาก `clasp clone`)
- **บัญชี Google:** `pongsak.rak@gmail.com`
- **SCRIPT_ID:** `1GPlrkx4Zvq3CLVAdGeJ9EzQEsxNssnjU0b1oCcrUYbZo6N16_bXjwoMl`
- **npm prefix:** ตั้งเป็น `%USERPROFILE%\.npm-global` (เพราะเขียน Program Files ไม่ได้)

## 🔴 ห้าม `npm update @anthropic-ai/claude-code` เด็ดขาด

Claude Code **v2.x ใช้ Bun → crash ทันที** (`Segmentation fault at 0x18FB0`)
สาเหตุ: **Trend Micro** (`TmUmEvt64.dll` + `tmmon64.dll` โผล่ใน stack ทุกครั้ง) hook ชนกับ Bun
ลองแล้วไม่ได้ผล: `BUN_JSC_useJIT=0` · `BUN_INSTALL_BASELINE=0` · รัน `cli-wrapper.cjs` ผ่าน node

**→ ต้องอยู่ที่ `@1.0.100` (ตัวสุดท้ายที่รันด้วย Node) จนกว่า IT จะใส่ AV exception ให้**
```
npm i -g @anthropic-ai/claude-code@1.0.100
```
ถ้าจะอัปเกรด ต้องขอ IT exclude จาก Trend Micro real-time scan:
`C:\Users\pongsakr\.npm-global` และ `C:\bjh-dashboard`

## ไฟล์ที่สร้างใหม่ใน repo (ไม่ push ขึ้น GAS — clasp มองเป็น untracked)

| ไฟล์ | หน้าที่ |
|---|---|
| `start.ps1` | เซ็ต PATH (node/git/npm-global) + Bypass ExecutionPolicy + โชว์เวอร์ชัน + `_BUILD_VER` + git status |
| `CLAUDE.md` | กติกาทั้งหมดกลั่นจาก STATE.md ให้ Claude Code อ่านทุกครั้ง (**workflow แบบ B**) |
| `.gitignore` | กัน `.clasp.json` (มี scriptId) · `node_modules` · bundle เก่า |

## 🔁 วงจรทำงานใหม่

```
เปิด PowerShell
  → .\start.ps1                      (ทุกครั้ง — path เป็น portable ไม่ถาวร)
  → claude                            (แก้โค้ด) หรือแก้เอง
  → node --check <ไฟล์>
  → git diff                          ← ตรวจก่อนเสมอ
  → clasp push                        (= Ctrl+S ทุกไฟล์ในคำสั่งเดียว)
  → git add -A ; git commit -m "V555.0: ..."
```

| | เดิม | ใหม่ |
|---|---|---|
| แก้โค้ด | ส่ง bundle JSON ให้ Claude → รอไฟล์กลับ | Claude Code แก้ในเครื่อง |
| อัปขึ้น GAS | Ctrl+S ทีละไฟล์ | `clasp push` |
| Deploy `Code.gs` | กด Deploy → New Version ในเว็บ | `clasp create-deployment` |
| ดูว่าเปลี่ยนอะไร | ดูไม่ออก | `git diff` |
| ย้อนกลับ | หาไฟล์เก่าเอง | `git checkout -- <file>` / `git revert` |

## 🐛 บั๊กที่เจอระหว่าง migration (สำคัญ — อย่าซ้ำ)

**`Set-Content -Encoding UTF8` เติม BOM ที่หัวไฟล์**
Windows PowerShell 5 เขียน UTF-8 **พร้อม BOM เสมอ** → `git diff` โชว์บรรทัดแรกเปลี่ยนทั้งที่ไม่ได้แก้:
```
-<script></script>
+﻿<script></script>
```
เสี่ยงทำ JS พังตอน GAS รวมไฟล์ → **ห้ามใช้กับไฟล์โปรเจกต์**

✅ วิธีที่ถูก:
```powershell
$p = "C:\bjh-dashboard\overrides.html"
$t = [IO.File]::ReadAllText($p)
$t = $t.Replace("<เดิม>", "<ใหม่>")
[IO.File]::WriteAllText($p, $t, (New-Object Text.UTF8Encoding($false)))
git diff --stat        # ต้องเปลี่ยนเฉพาะบรรทัดที่ตั้งใจเท่านั้น
```

**อื่น ๆ**
- PowerShell here-string `@' ... '@` **กินโค้ดบล็อก ``` ที่อยู่ข้างใน** → CLAUDE.md ขาด 2 ส่วน ต้องเขียนซ่อมรอบสอง
- `warning: LF will be replaced by CRLF` — **ปกติของ Windows ไม่ต้องสนใจ**
- `clasp clone` เปลี่ยน `Code.gs` → `Code.js` — ปกติ ตอน push กลับเป็น `.gs` เอง

## ✅ ผลทดสอบครบวงจร

| ขั้น | ผล |
|---|---|
| `clasp clone` 23 ไฟล์ | ✅ |
| ยืนยัน `_BUILD_VER` = V554.0 ตรงกับ GAS จริง | ✅ **baseline ถูกต้อง ไม่มีไฟล์หลุด** |
| `clasp status` — tracked 22 / untracked 5 | ✅ ไฟล์ dev ไม่ขึ้น GAS |
| `clasp push` (ยังไม่แก้) | ✅ `Script is already up to date.` |
| แก้ `_BUILD_VER` → V554.1 → `git diff` | ✅ 1 insertion / 1 deletion สะอาด |
| `clasp push` 22 ไฟล์ | ✅ |
| **เปิด GAS editor เห็น `V554.1` · ไทยไม่เพี้ยน · emoji ปกติ** | ✅ **ยืนยันสายตา** |
| `git checkout --` ย้อน BOM | ✅ ย้อนได้จริง |

## 📜 git history

```
def5947  docs: add BOM pitfall to CLAUDE.md
5403860  V554.1: verify clasp push pipeline (no logic change)
c845b3a  docs: fix CLAUDE.md missing code blocks
8da4845  docs: add CLAUDE.md (rules distilled from STATE.md)
a0b7e08  chore: add start.ps1 + .gitignore
41814bf  baseline: V554.0 clasp clone from GAS live
```

## ⏭️ ยังไม่ได้ทำ (ต่อได้เมื่อพร้อม)

- **ยังไม่มี GitHub remote** — ถ้าอยากใช้ Claude Code on the Web / สำรองนอกเครื่อง ต้อง push ขึ้น private repo ก่อน
- **ยังไม่ได้ทดสอบ `clasp create-deployment`** (ยังไม่ได้แก้ `Code.js` เลยตั้งแต่ migrate)
- **ยังไม่มี shortcut ดับเบิลคลิก** — ตอนนี้ต้องพิมพ์ `.\start.ps1` เอง
- **ยังไม่มี `test/` script** รวม `node --check` + jsdom เป็นคำสั่งเดียว
- **ยังไม่ได้ตั้ง subagent** (planner/patcher/tester) — v1.0.100 อาจไม่รองรับ `/agents`

---

---

# 📅 งานวันที่ 22 ก.ค. 2569 (รอบเย็น) — V555 → V558

## V555.0 — ข้อความหน้า loading เป็นอังกฤษ

แก้ **2 หน้า** ให้สอดคล้องกัน (เดิมไทยผสมอังกฤษ ดูเหมือน debug log)

| ไฟล์ | overlay |
|---|---|
| `body_app_top.html` | Boot — ตอนเปิดหน้าครั้งแรก (6 ขั้น) |
| `script_main.html` | FULL RELOAD — ตอนกด Update (7 ขั้น) |

ข้อความใหม่: `System configuration` · `Master data · Install base and contracts` · `Transactions · Bills and quotations` · `Processing records` · `Actual FAD by representative` · `Forecast pipeline` · `Building your dashboard` · `Preparing your workspace…` · `Loading · ` · `Ready ✓`

**ไม่แตะ** error message (ยังเป็นไทย เพราะเวลาพังต้องอ่านเข้าใจทันที) · console log

## V556.0 → V557.1 — ✓ ไล่ลงตามลำดับ ไม่เด้งข้าม

**ปัญหา:** บางขั้นรัน**ขนาน** (V482) → `actual`/`lowfc` เสร็จก่อน `master`/`tx`
→ ติ๊ก ✓ ที่ข้อ 1, 5, 6 ทั้งที่ 2-4 ยังว่าง = ดูสับสน

**V556.0** ลองซ่อนขั้นที่ยังไม่ถึง → **ผู้ใช้ไม่ชอบ** (อยากเห็นว่าต้องผ่านอะไรบ้าง)

**V557.0 = ทางออกที่ใช้จริง** — แสดงครบทุกขั้นเสมอ แต่ติ๊กไล่จากบนลงล่าง:
```js
var ok      = i < doneCount;          // ติ๊กตามจำนวนที่เสร็จ ไม่ใช่ตามคีย์
var active  = (i === doneCount);      // ขั้นที่กำลังทำ
var opacity = ok ? '1' : (active ? '1' : '0.45');
```
- ✓ เขียว `#7ee2b8` · active `#93a4c0` (สว่างกว่า) · รอ `#5a6478` opacity 0.45
- transition `opacity 0.35s, color 0.35s`

> ⚠️ ชื่อขั้นที่ติ๊กอาจไม่ตรงกับที่เสร็จจริง — **ตั้งใจ** ผู้ใช้ไม่รู้และไม่สนใจ เห็นแค่ว่าคืบหน้า

**V557.1** ลบ `margin-bottom` ที่ V556 ใส่ไว้ — ซ้ำกับ `gap:9px/10px` ของกล่อง ทำให้ห่างเกิน

---

# ⚡ PERFORMANCE — 29s → 14.1s (เร็วขึ้น 52%)

## ขั้นที่ 1: ตั้ง `BJH_EXEC_URL` (V488 ค้างมานาน) → 18.5s

รัน `bjhSetExecUrl()` ใน **GAS editor** (clasp รันฟังก์ชันไม่ได้)
ยืนยันจาก console: **`[C14] HTTP FAST PATH (ยิงตรง ไม่ probe)`** ✅

## ขั้นที่ 2: V558.0 ข้าม auto-migrate → 14.1s

**Root cause:** `_getConfig_()` เรียก 3 ฟังก์ชัน migrate **ทุกครั้งที่โหลด** ทั้งที่เป็นงานย้ายข้อมูลครั้งเดียวที่ทำเสร็จนานแล้ว — แต่ละตัวอ่าน `getDataRange().getValues()` หลาย Sheet
→ นี่คือเหตุผลที่ `config` กิน **14.6s** และเวลาแกว่ง 5.7 ↔ 19.4s

**Fix (`Code.js` ~บรรทัด 731):**
```js
var _mgP = PropertiesService.getScriptProperties();
if (!_mgP.getProperty('BJH_MIG_DONE')) {
  try { _ckvAutoMigrate(ss); } catch(e){}
  try { _logAutoMigrate(ss); } catch(e){}
  try { _qnoAutoMigrate(ss); } catch(e){}
  try {
    var _lg=['fcsp','fcfad','display_config','hm_stage','status_group','tab_permissions',
             'access_log','activity_log','unassigned_overrides','brand_overrides'];
    var _left=0; for (var _z=0;_z<_lg.length;_z++){ if (ss.getSheetByName(_lg[_z])) _left++; }
    if (_left===0) _mgP.setProperty('BJH_MIG_DONE','1');
  } catch(e){}
}
```

> 🔑 **ธงตั้งเฉพาะเมื่อ legacy sheet ทั้ง 10 ตัวหายหมด** — ถ้ายังมีเหลือ = รันปกติทุกครั้งเหมือนเดิม ปลอดภัย
> 🔙 **ย้อนกลับ:** ลบ Script Property **`BJH_MIG_DONE`** ใน GAS (หรือ `git revert`)

## ผลวัดจริง

| | ก่อน | หลัง EXEC_URL | หลัง V558 |
|---|---|---|---|
| **รวม** | 29s | 18.5s | **14.1s** |
| sheets | — | 7.3s | **4.7s** |
| master | — | 1.0s | 0.8s |
| tx | — | 2.2s | 1.8s |
| etl | — | 4.6s | 3.9s |
| render | — | 0.2s | 0.1s |

ตรวจแล้ว: `config keys: 31` · `Actual FAD preloaded: 5 sales` · `[SLIM GUARD] ครบทุกตัว` — ข้อมูลไม่หาย ✅

**ยังลดได้อีก:** `sheets 4.7s` + `etl 3.9s` = 8.6s จาก 14.1s

---

# ✅ DECISION (สรุปแล้ว อย่ารื้อซ้ำ)

## ❌ ไม่เปิด cache กลับ
`V479.59` ปิดไว้**ถูกแล้ว** — เปิดแล้วแต่ละคนเห็นข้อมูลไม่ตรงกัน อันตรายกว่าช้า **ปิดถาวร**

## ❌ `NOTE_LOG` ตัดไม่ได้ — ตรวจแล้วมีใช้จริง 4 จุด

| ที่ใช้ | ทำอะไร | ถ้าตัด |
|---|---|---|
| `DailySales` | `parseLastNote()` | คอลัมน์โน้ตว่าง |
| `SalesProspect` | `_fcParseYearsFromFields()` หา "X ปี" | **จำนวนปีผิด → เงินผิด** |
| `SalesProspect` | `_fcParseTimesPerYear()` หา "X ครั้ง" | ครั้ง/ปีผิด |
| `SalesProspect` | ค้น SN (`snHayC`) | ค้นซีเรียลไม่เจอ |
| `script_main` | popup ประวัติโน้ต | ประวัติหาย |

**และโค้ดบีบให้แล้ว** — `o.NOTE_LOG.slice(-1)` เก็บโน้ตล่าสุดอันเดียว = 96% ที่ตั้งใจประหยัด **ทำไปแล้ว ไม่ต้องทำอะไรเพิ่ม**

## ✅ ไม่ต้องเช็ค V535–V554
ทีมใช้มาแล้วไม่มีใครแจ้งปัญหา = ถือว่าปกติ

## ✅ `low` / `edits` ใน `getBootBundle` ตัดไม่ได้
เคยคิดจะตัดเพราะ log บอก "ตัด getLowProspects ที่ซ้ำ" แต่ตรวจแล้ว:
- `confirm_billing.html:433` ใช้ `window._bootBundle.edits`
- `script_main.html:10576` ใช้ `B.low`

---

# 🔐 GITHUB (ตั้งใหม่ 22 ก.ค. 2569)

```
https://github.com/pongsakrak-pixel/BJH-Dashboard   (branch: main)
```

- remote ตั้งแล้ว · push ครั้งแรกสำเร็จ (90 objects)
- **ตรวจความปลอดภัยก่อน public แล้ว:** `SMARTFLOW_USER` / `SMARTFLOW_PWD` อ่านจาก **Script Properties** ไม่มีรหัสฝังในไฟล์ · token ดึงสดทุกครั้ง cache 23 ชม. ✅
- ⚠️ **อย่าลืม `git push` ท้ายทุกครั้งที่ deploy** ไม่งั้น GitHub ล้าหลัง

---

# 🛠 เครื่องมือที่เพิ่มเข้ามา

| ไฟล์ | ทำอะไร |
|---|---|
| `start.ps1` | เซ็ต PATH + โชว์เวอร์ชัน + **guard เตือนถ้า Claude Code ไม่ใช่ 1.0.100** |
| `helper.ps1` | ฟังก์ชัน **`err`** — ก็อป output ล่าสุดเข้า clipboard (พิมพ์ `err` แล้ว Ctrl+V ในแชท) |
| `.gitignore` | กัน `.clasp.json` · `node_modules` · bundle เก่า |
| **Desktop shortcut** | `BJH Dashboard.lnk` — ดับเบิลคลิกเปิดห้องทำงานพร้อมใช้ |

## ⚠️ Claude Code เด้งกลับเป็น 2.x ได้เอง
เจอ 2 ครั้งใน 1 วัน (npm ทับตอนลง package อื่น) → **Bun crash ทันที** (Trend Micro)
**แก้:** `npm i -g @anthropic-ai/claude-code@1.0.100`
`start.ps1` เตือนให้แล้ว — แต่ต้องเปิด shortcut ใหม่ถึงจะเห็น

## ⚠️ Claude Code เขียนไฟล์ภาษาไทยเพี้ยน
ลองให้เขียน STATE เอง → ได้ `�ปเดต�า�ด` ทั้งไฟล์ + ลบตัวเก่าทิ้ง (2,825 → 167 บรรทัด)
**`git revert` กู้คืนได้** → **อย่าให้ Claude Code เขียนไฟล์ที่มีภาษาไทยเยอะ**

## 🐛 บทเรียนการแพตช์
- **anchor ต้องมาจากไฟล์จริงในเครื่อง ไม่ใช่ bundle เก่า** — V557 พลาดรอบแรกเพราะเยื้อง/ช่องว่างต่างกัน
- แก้แล้วด้วย **regex ยืดหยุ่น** `[\s\S]*?` แทนการเทียบตรงตัว
- คำสั่งยาวหลายบรรทัดใน PowerShell **ขาดกลางคันตอน copy** → ใช้ **บรรทัดเดียว + base64** แทน
- `err` ต้องมี `Start-Sleep 2` ก่อน ไม่งั้นก็อปไม่ทัน output

---

# 🚦 กติกาการทำงาน (อ่านก่อนทุกครั้ง — ห้ามข้าม)

## 1. Workflow **แบบ B** (ผ่อนตามขนาดงาน — ตกลงกัน 22 ก.ค. 2569)

> เปลี่ยนจากเดิมที่ต้อง confirm ทุกครั้ง เพราะตอนนี้มี **git คุมแล้ว** ย้อนกลับได้ทันที

**งานเล็ก → ลงมือได้เลย แล้วรายงาน**
แก้สี / ข้อความ / spacing / label · ไฟล์เดียวไม่แตะ logic · fix typo

**งานใหญ่ → สรุปแผน + รอ confirm ก่อนเสมอ**
- แตะ **2 ไฟล์ขึ้นไป**
- แตะ **`Code.gs`** (ต้อง `clasp create-deployment`)
- แตะ **classify chain / filter logic / HM config**
- เพิ่ม/ลบ tab · เพิ่ม status ใหม่
- **งาน UI ใหญ่ → ทำ mockup ให้ดูก่อน**

**❌ ห้ามเดา** — ไม่ชัดต้องถาม
**✅ ทุกงาน: `git diff` ก่อน commit เสมอ**

## 2. CASE LIST ต้องอยู่ใน STATE.md เสมอ
ทุกครั้งที่ Eak แจ้งเคสใหม่ → **เขียนลง CASE LIST ด้านล่างทันที** (ไม่รอจบงาน)
→ เปิดแชทใหม่แล้วงานไม่หาย

## 3. ก่อน commit
- `node --check` ทุกไฟล์ที่แก้
- ทดสอบ logic ด้วย `vm` / jsdom (โดยเฉพาะโค้ดที่ generate ด้วย JS)
- bump `_BUILD_VER` ใน `overrides.html`
- **`git diff` ตรวจว่าเปลี่ยนแค่ที่ตั้งใจ** (ระวัง BOM — ดูหัวข้อ MIGRATION)
- `git commit -m "V5NN.0: <สิ่งที่ทำ>"`
- **อัปเดต STATE.md ทุกรอบ**

> ~~ส่ง bundle `*_UPDATED.json`~~ — **เลิกแล้ว** ใช้ git commit แทน

## 4. Deploy
| แก้อะไร | คำสั่ง |
|---|---|
| HTML อย่างเดียว | `clasp push` **แล้ว** `clasp create-deployment -i <ID>` |
| `Code.js` / `Index.html` | เหมือนกัน (จำเป็นเสมอ) |

> ⚠️ **`clasp push` อย่างเดียวไม่พอ** — `/exec` เสิร์ฟจาก deployment ที่ pin ไว้ ต้อง `create-deployment -i` ทับตัวเดิม ไม่งั้น URL เปลี่ยน ทีมเข้าไม่ได้

**คำสั่ง deploy เต็ม:**
```powershell
clasp push
clasp create-deployment -i AKfycbzO7LW1DPUOzosAxpZsJPvX8PoW4eJ8rDHuZI-GXwHpT9yXDERnrEdPVvdOoffQLVF-kw -d "V5NN.0 ..."
git add -A; git commit -m "V5NN.0: ..."; git push
```

**เตือน user เสมอ:**
- แก้ `Code.js` → ไม่ทำ `create-deployment` = ของเก่ายังทำงานอยู่
- แก้ classify / HM config → ต้องกด **Load Data สด** (cache ไม่ re-classify)
- ทุกกรณี user ต้อง **Ctrl+Shift+R**

---

# 📋 CASE LIST

## ⏳ รอ confirm / รอทำ

| # | เคส | สถานะ |
|---|---|---|
| **M3** | เมนู Mobile: **งานใหม่ SR** | ⛔ **บล็อค** — ส่วนกลางยังไม่กำหนดช่องทางส่ง · **field ที่จะส่ง: เลข FR · ชื่อโรงพยาบาล · ชื่อผู้ติดต่อ · อาการเสีย** · ดราฟ UI พร้อมแล้วใน `Mobile.html` |
| **M8** | 🔴 **Mobile จอดำ — ยังไม่จบ** | V515 ใส่ตัวแสดง error บนจอแล้ว **รอ Eak ถ่ายรูปหน้าจอส่งมา** |
| — | **SP reconcile** | ✅ ยืนยันแล้วว่าทำได้ (`RAW_SpareParts` มี `BILL_NUMBER`/`BILL_JOB_PRICE`/`BILL_PRINT_DATE`) — ยังไม่เริ่ม |
| — | Renewal Prediction Dashboard (`Renewal.html`) | ⏳ คิวเดิม |
| — | ServiceMix analysis (`ServiceMix.html`) | ⏳ รอยืนยัน field |

## ✅ V554.0 — Mobile ปรับใหญ่ (เมนู · ขนาด · โหลดอัตโนมัติ)

### 1️⃣ เมนู 9 → 5 ปุ่ม (ภาษาอังกฤษ)
| เก็บ | สถานะ | ตัดออก |
|---|---|---|
| **New SR** | ⏳ Coming soon | ~~ใบเสนอราคา~~ (ดู SmartFlow ตรงกว่า) |
| **Alert** | ✅ ดึงข้อมูลจริง | ~~ลูกค้าของฉัน~~ (รู้อยู่แล้ว) |
| **SP Stock In** | ✅ ดึงข้อมูลจริง | ~~สัญญาใกล้หมด~~ (ไม่เร่งด่วนบนมือถือ) |
| **SN History** | ⏳ Coming soon | ~~งานที่รับแล้ว~~ (ซ้อนกับ SP Stock In) |
| **BJH Contact** | ✅ ข้อมูลนิ่ง | |

> เมนู Coming soon → `mbGo()` แสดง toast แทนการเข้าหน้าเปล่า
> **ฟังก์ชัน `mbSn*` เดิมยังอยู่ครบ** รอออกแบบใหม่แล้วเปิดใช้

### 2️⃣ ขยายขนาด (มือถือจริงดูจิ๋วมาก)
**หน้าเลือก View** — เดิมการ์ดถูกล็อก `max-width:200px` + เรียงข้างกัน บนจอ 390px เหลือใบละ ~180px
→ **เรียงบน-ล่าง กินความกว้างเต็ม** · ไอคอน **38→76px** · ชื่อ **15→30px**

**หน้าเมนู** — ช่วง 360–599px (มือถือส่วนใหญ่) **ไม่มี media query เลย** ตกไปใช้ค่า default ที่ออกแบบเผื่อจอเล็ก
→ grid **3→2 คอลัมน์** · ปุ่มเป็นสี่เหลี่ยม `aspect-ratio` · ไอคอน **25→40px** · ตัวอักษร **14→18px**

### 3️⃣ โหลดข้อมูลอัตโนมัติ + progress bar
**เดิม (V507):** เข้า Mobile = ข้ามโหลดข้อมูล (เพื่อความเร็ว)
**ปัญหา:** พอเหลือ 5 เมนู มี 2 เมนูที่ต้องใช้ข้อมูล (Alert · SP Stock In) → เข้ามาเจอค่าว่าง

**ใหม่:** `_mbAutoLoad()` โหลดทันทีพร้อม overlay บอกความคืบหน้า
- เดินหน้าอัตโนมัติ **หยุดที่ 92%** รอข้อมูลจริงมาแล้วกระโดด 100%
- label บอกขั้นตอน: เชื่อมต่อ → อ่านข้อมูลงาน → Install Base → อะไหล่ → จัดกลุ่ม
- **มีข้อมูลอยู่แล้ว (สลับกลับจาก desktop) → ข้ามเลย ไม่โหลดซ้ำ**
- ปุ่ม **"ข้ามไปก่อน"** สำหรับคนที่จะดูแค่ BJH Contact
- **กันค้างถาวร: timeout 75 วินาที** · กันเปิด overlay ซ้อน · ปิดแล้วล้าง timer ทั้ง 2 ตัว

### ✅ ทดสอบ (1710 เคส ผ่านหมด)
V554 ใหม่ 58 — เมนู/ขนาด/progress + **รันจริงด้วย DOM**
🎯 5 เมนู ลำดับถูก · **ชื่ออังกฤษหมด ไม่มีไทยหลง** · coming soon 2 ตัว (sr, sn)
🎯 render 5 ปุ่ม · 2 ปุ่มจาง + มีบรรทัด Coming soon · Alert ไม่จาง
🎯 progress หยุด 92% · timeout 75s · z-index สูงกว่า picker · ล้าง timer ครบ
✅ ของเดิมไม่พัง: `mbShow` `mbAlertRows` `mbStockRows` `mbSwitchToDesktop` `bjhPickView` ลิงก์หนี desktop (V517)

> **เทสต์เก่า 27 เคสคาดหวังโครงเดิม** (9 เมนู · 3 คอลัมน์ · ไม่โหลดข้อมูล) → อัปเดตให้ตรง V554
> ตรวจแล้วทุกจุดเป็น *เปลี่ยนโดยตั้งใจ* ไม่ใช่บั๊ก — เช่น "key ซ้ำ" จริง ๆ คือ assertion hardcode `===9` ไว้
> `test_inst.js` อ้าง bundle 91 ที่ลบไปแล้ว → เปลี่ยนเป็นหา bundle เลขสูงสุดอัตโนมัติ

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`Mobile.html` · `script_main.html` (+ `overrides.html` version stamp)
**ไม่ต้อง Deploy New Version** (ไม่ได้แตะ Code.gs)

---

## ✅ V553.0 — แท่ง ordered แยก CONFIRM / ORDER

### ⚠️ โครงสร้างข้อมูลที่ต้องรู้ (ตรวจจาก Dashboard.html ~บรรทัด 998)
```
monthlyOrdered  =  monthlyBacklog  +  monthlyOrderSC
   (ทั้งหมด)        (CONFIRM)         (ORDER)
```
**`monthlyBacklog` เป็น subset ของ `monthlyOrdered` อยู่แล้ว**
→ ถ้าบวกเพิ่มเข้าไป **ยอดจะเบิ้ล** จึงใช้วิธี *แตกแท่งเดิม* ไม่ใช่เพิ่มแท่งใหม่

### ✅ ที่ทำ
แท่งส้ม 1 แท่ง → แตกเป็น 2 ระดับ (ความสูงรวมเท่าเดิมเป๊ะ)

| ส่วน | ตำแหน่ง | ความเข้ม | ความหมาย |
|---|---|---|---|
| **CONFIRM** | ล่าง (ติดยอด actual) | `opacity .8` เข้ม | Backlog + Backlog (Confirmed) — ใกล้เป็นเงินจริง |
| **ORDER** | บน | `opacity .38` จาง | SC Ordered / Carry |

`Math.min()` cap ไม่ให้ confirm ล้นเกิน ordered · legend เพิ่มสัญลักษณ์สี 2 อัน

### ✅ ทดสอบ (1626 เคส ผ่านหมด)
V553 ใหม่ 23 — **render จริง เทียบความสูงพิกเซล**
🎯 **confirm + order สูงรวม = ordered เดิมทุกเดือน** (ตรวจทีละเดือน คลาดเคลื่อน < 0.5px)
🎯 **ยอดหัวแท่งเท่าเดิม ฿8.4M — ไม่บวกซ้ำ**
🎯 confirm อยู่ล่าง order อยู่บน · confirm ติดยอด actual ไม่มีช่องว่าง
✅ เคสเสี่ยง: **ไม่มี monthlyBacklog → order ล้วน ไม่พัง** · **confirm > ordered → cap ไม่ล้นแท่ง** · confirm = ordered → ไม่มีแท่งว่าง

> `test_v551/552` เช็ค `opacity .5` เดิม → อัปเป็น `.8`/`.38` (เปลี่ยนตั้งใจ ไม่ใช่บั๊ก)

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`Dashboard.html` · `overrides.html`

---

## ✅ V552.0 — ตัวเลขกำกับบนแท่งกราฟ

### ปัญหา
V551 มีแต่แท่งกราฟ **ไม่มีตัวเลขบอกว่ากี่บาท** ต้องกะเอาจากแกน Y

### ✅ แก้
ใส่ตัวเลขบนหัวแท่งทุกเดือน

| เดือน | แสดง | สี |
|---|---|---|
| อดีต + ปัจจุบัน | **Actual** | ตามผลงาน (เขียว/น้ำเงิน/เหลือง/แดง) |
| **อนาคต** | **Ordered** | 🟠 ส้ม |

- ตัวเลขวางเหนือหัวแท่งบนสุด (รวมแท่ง ordered ถ้ามี) ไม่ทับกัน
- เพิ่ม `PT` 14→26 และ `H` 290→300 เผื่อที่ ไม่ให้ตัวเลขหลุดขอบบน
- ยอด ฿0 ไม่แสดง (เดือนอนาคตที่ไม่มี ordered จะว่าง)

> เดือนปัจจุบัน (ก.ค.) มีทั้ง actual ฿9.5M และ ordered ฿3.1M → **แสดง actual**
> เพราะเดือนนี้ยังเก็บยอดได้อีก ไม่ใช่เดือนที่จบแล้ว

### ✅ ทดสอบ (1603 เคส ผ่านหมด)
V552 ใหม่ 23 — **render จริง**
🎯 ครบ 12 เดือน · Jan ฿16.7M (actual) · **Aug ฿8.4M · Dec ฿5.9M (ordered สีส้ม)**
🎯 เดือนอนาคตสีส้มทุกตัว · อดีตสีตามผลงาน · **ตัวเลขไม่หลุดขอบบน**
🎯 ตัวเลข ordered อยู่เหนือแท่ง ordered จริง (ไม่ทับ)
✅ ไม่มี ordered → เหลือ 7 ตัวเลข ไม่โชว์ ฿0 · เดือน 12 → ไม่มีสีส้มเลย

> `test_v551.js` เช็ค viewBox 290 → อัปเป็น 300 (เปลี่ยนตั้งใจ ไม่ใช่บั๊ก)

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`Dashboard.html` · `overrides.html`

---

## ✅ V551.0 — Achievement ออกแบบใหม่ทั้งบล็อก

### 🎨 เลย์เอาต์ใหม่ — ลำดับชั้นชัดเจน
```
┌──────────┬──────────────────────────┐
│ FULL     │  H1 ฿104.3M ▓▓▓ 92.7%    │
│ YEAR     │  H2 ฿9.5M   ▓    6.9%    │
│ ฿113.8M  ├──────────────────────────┤
│ 45.5%    │  Q1   Q2   Q3   Q4       │
├──────────┴──────────────────────────┤
│  ▉ ▉ ▉ ▉ ▉ ▉ ▉ ░ ░ ░ ░ ░  (กราฟแท่ง) │
└─────────────────────────────────────┘
```

**เงินเป็นตัวเอก · ไล่ขนาดตามลำดับชั้น** ปี `46px` > ครึ่งปี `30px` > ไตรมาส `24px`
(เดิม % ใหญ่กว่าเงิน · ทุกระดับขนาดพอกัน ไม่มีลำดับ)

### 📊 เดือน → กราฟแท่งจริง (SVG)
- แท่งสีตามผลงาน (เขียว/น้ำเงิน/เหลือง/แดง) · **เส้นประ = budget** พาดด้านบน
- เดือนอนาคต = **แท่งส้มจาง = Ordered รอส่งมอบ** ซ้อนบนยอดจริง
- แกน Y ปัดขึ้นทีละ ฿5M อัตโนมัติ · เดือนปัจจุบันตัวหนา

### 🌗 ตามธีมผู้ใช้ (ตามที่เลือก "ข้อ ก")
ใช้ `var(--sur)` `var(--bd)` `var(--mu)` + `currentColor` ในกราฟ **ทั้งหมด ไม่ hardcode สีพื้น**
→ สลับ light/dark ที่ปุ่มธีมเดิม แล้ว Achievement เปลี่ยนตามเอง

### 📐 การ์ด FULL YEAR
แถบเดียวแยก 2 สี (เข้ม=Actual · ส้มจาง=Ordered) + สรุป 3 บรรทัด
`Ordered ฿46.0M` · `With ordered 63.9%` · `Gap to target ฿90.2M`

### ✅ ทดสอบ (1580 เคส ผ่านหมด)
V551 ใหม่ 47 — **render จริงด้วยตัวเลขจากหน้าจอ**
🎯 โครง 2 บล็อก · grid `1fr 2.1fr` · ขวามี HALF บน/QUARTER ล่าง · **เดือนเต็มกว้าง**
🎯 ตัวเลขตรงทุกตัว: ปี ฿113.8M · Gap ฿90.2M · H1 92.7% · Q1 100% · YTD ฿113.8M/฿135.3M
🎯 **ลำดับชั้น 46 > 30 > 24** · กราฟ 13 แท่ง (7 actual + 6 ordered) · เส้นประ budget
🎯 **ไม่มีสีพื้น hardcode เลย** — ตรวจด้วย regex `background:#0xxxxx` = 0 รายการ
✅ เคสขอบ: ไม่มี ordered → เหลือ 7 แท่ง · **ไม่มีข้อมูลเลย → ไม่ error** · เดือน 1/12 → ปกติ

> `test_v550.js` ตรวจโครงเก่าที่ถูกออกแบบใหม่ทับ → ปรับให้เหลือเฉพาะ ordered pipeline ที่ยังใช้จริง

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`Dashboard.html` · `overrides.html`

---

## ✅ V550.0 — Achievement จัดใหม่ (ตัวใหญ่ · ไม่เปลืองพื้นที่ · โชว์ Ordered)

### 1️⃣ ขยายตัวเลขทุกจุด (สำหรับโปรเจกเตอร์)
| จุด | เดิม | ใหม่ |
|---|---|---|
| Q % | 24px | **30px** |
| Q ป้าย / A-B | 11 / 9px | **13 / 12px** |
| H % | 26px | 26px (แถบบาง) |
| เดือน % | 18px | **25px** |
| เดือน ป้าย / A-B | 9 / 8px | **12 / 11px** |
| หัวข้อ | 10px | **12px** |

### 2️⃣ H1/H2 — การ์ดสูง → แถบบางแนวนอน
เดิมเป็นกล่องแยกที่มีการ์ดสูง 2 ใบ **ว่างเยอะมาก** (แค่ 2 ตัวเลขแต่กินความสูงเท่า Q 4 ใบ)

**ใหม่:** แถบบางแนวนอน `H1 · ม.ค.-มิ.ย. · 92.7% · [progress bar] · ฿104M/฿112M`
- ลดความสูง **~110px → ~40px**
- ลดจำนวนกล่อง **3 → 2** (ย้ายเข้าไปอยู่ในกล่อง QUARTERLY)
- เพิ่ม progress bar เห็นความคืบหน้าครึ่งปีได้ทันที

### 3️⃣ เดือนอนาคตแสดง Ordered
เดิมเดือนอนาคตขึ้น `0%` · `A: ฿0` จาง ๆ **ดูเหมือนไม่มีอะไรเลย**

**ใหม่:** เพิ่มบรรทัด `O: ฿8.40M` สีส้ม (จาก `stats.monthlyOrdered` ที่มีอยู่แล้ว)
- **% ยังเป็น Actual/Budget เหมือนเดิมทุกช่อง** → เทียบกันได้ตรง ๆ ไม่สับสน
- เดือนอนาคตที่มี ordered → `opacity 0.9` (ไม่จาง) เพราะมีของรอส่งมอบจริง
- ท้ายตารางเพิ่ม **`Ordered รอส่งมอบ: ฿46.00M`**

### ✅ ทดสอบ (1573 เคส ผ่านหมด)
V550 ใหม่ 44 — **render จริงด้วยตัวเลขจากหน้าจอ**
🎯 เหลือ 2 กล่อง · Q1=100.2% Q2=85.8% Q3=13.3% H1=92.7% H2=6.9% **ตรงกับหน้าจอจริงทุกตัว**
🎯 progress bar H1=92.7% เขียว · H2=6.9% แดง · ขนาดตัวอักษรครบทุกจุด
🎯 ส.ค./ธ.ค. มี `O:` · เดือนอดีตไม่มี · opacity 0.9 · ยอดรวม ฿46.00M
✅ **เคสไม่มี ordered** → ไม่โชว์ `O:` เลย จางเหมือนเดิม · **ไม่มี `monthlyOrdered`** → ไม่ error

> 🐛 ระหว่างทางเจอ `</div>` เกินท้ายลูป Q ทำให้ HALF หลุดออกนอกกล่อง — jsdom จับได้ (ได้ 2 กล่องแทน 1)

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`Dashboard.html` · `overrides.html`

---

## ✅ V549.0 — Present + แถบตัวกรอง (กดเปลี่ยนได้)

### ที่ทำ
โหมด Present เอา **แถบตัวกรองติดไปด้วย** (Year · Sales · ช่วง) → ระหว่างฉายรู้ว่ากำลังดูข้อมูลชุดไหน
และ **ยังกดเปลี่ยนได้จริง** — สลับดูรายคน/รายปีขณะประชุมโดยไม่ต้องออกจาก Present

**ซ่อนปุ่มที่ไม่ได้ใช้ตอนฉาย:** Export · Budget & Forecast · Sales Areas · Budget Sales · Analysis · Present เอง · ตัวคั่น
คง `select` ทั้ง 5 ไว้ครบ

### 🔧 วิธีที่ใช้ — ย้าย ไม่ใช่ copy
Fullscreen API ฉาย **element เดียว** เท่านั้น → ถ้าแถบอยู่นอก `.story-hdr` จะไม่ปรากฏเลย

**ย้าย DOM node จริงเข้าไป** (`insertBefore`) ไม่ใช่ `cloneNode`
→ event `onchange` เดิมติดไปด้วย = **กดเปลี่ยนแล้วตัวเลขอัปเดตทันที**

ออกจาก Present → ย้ายกลับตำแหน่งเดิมด้วยจุดยึด `#db-filterbar-anchor` (เพิ่มใหม่)

### ✅ ทดสอบ (1529 เคส ผ่านหมด)
V549 ใหม่ 33 — **รันจริงด้วย DOM**
🎯 Present → แถบย้ายเข้า `.story-hdr` อยู่บนสุด · **select ยัง fire event ได้ (พิสูจน์ว่าไม่ใช่ clone)**
🎯 ออก/กดซ้ำ/**ESC** → แถบกลับตำแหน่งเดิมทุกทาง (หลัง anchor)
✅ fallback (iframe บล็อก) แถบก็ย้ายเข้าด้วย · **เข้า-ออก 3 รอบ แถบยังมีตัวเดียว ไม่ซ้ำไม่หาย**
✅ ไม่มีแถบ → ยัง present ได้ ไม่ error

### 📎 Mockup
`mockup_V549_present.html` — กด Present แล้วลองเปลี่ยน Sales ดู ข้อความบนจอเปลี่ยนตามจริง

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`Dashboard.html` · `overrides.html`

---

## ✅ V548.0 — ปุ่ม 🖥 Present (ฉายโปรเจกเตอร์)

### ที่ทำ
ปุ่ม **`🖥 Present`** ข้างปุ่ม Sales Areas → ฉาย **เฉพาะบล็อก STORY** เต็มจอ
(BUDGET · CONFIRMED · ORDER · PIPELINE · CHALLENGE · Year Progress) — ส่วนอื่นของหน้าหายหมด

**ขยายอัตโนมัติตามขนาดจอ** ด้วย `vw` — ยิ่งจอใหญ่ตัวเลขยิ่งใหญ่ ไม่ต้องซูม
- ตัวเลข Budget: `calc(2.3vw + 12px)` · การ์ดหลัก: `calc(1.75vw + 10px)`

**ออกได้ 3 ทาง:** ESC · ปุ่ม `✕` มุมขวาบน · กดปุ่ม Present ซ้ำ

### ⚠️ จุดที่ต้องระวัง — iframe ของ Apps Script
แอปรันใน iframe ที่เราคุมไม่ได้ **ถ้า iframe ไม่มี `allow="fullscreen"` เบราว์เซอร์จะบล็อก Fullscreen API**

→ ใส่ **fallback** ไว้แล้ว: ถ้า fullscreen ใช้ไม่ได้ (ไม่มี API / ถูก reject) จะเปลี่ยนเป็น
`position:fixed; inset:0; z-index` สูง → **เต็มหน้าต่างเบราว์เซอร์แทน**

> ผลลัพธ์ที่เห็นอาจเป็นแบบ fallback (เต็มหน้าต่าง ไม่ใช่เต็มจอจริง)
> ถ้าอยากได้เต็มจอจริง ๆ ให้กด **F11** ที่เบราว์เซอร์ก่อนแล้วค่อยกด Present

### ✅ ทดสอบ (1496 เคส ผ่านหมด)
V548 ใหม่ 35 — **จำลองทั้ง 3 สถานการณ์**
✅ เบราว์เซอร์รองรับ → เรียก `requestFullscreen` ไม่ใช้ fallback
✅ **iframe บล็อก (ไม่มี API)** → ใช้ fallback · **fullscreen ถูก reject** → มี `.catch` รองรับ
✅ ESC ทั้งตอน fullscreen (จับ `fullscreenchange`) และตอน fallback (จับ `keydown`) · ปุ่มอื่นไม่หลุด
✅ กดซ้ำ = ออก · ไม่มี `.story-hdr` → ไม่ error + แจ้งผู้ใช้

### 📎 Mockup
`mockup_V548_present.html` — CSS + JS ของจริง กดลองได้เลย

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`Dashboard.html` · `overrides.html`

---

## ✅ V547.0 — ✏️ แก้ไข Status: คืนค่าเดิมได้

### สิ่งที่เพิ่ม
เมื่อรายการ**เคยถูกแก้ status มาแล้ว** modal จะโชว์กล่องสีเหลืองบอกค่าเดิม พร้อมปุ่มย้อนกลับ

```
┌─────────────────────────────────────────┐
│ ค่าเดิมก่อนแก้                            │
│ Backlog  · พ.ค. 2026      [↺ คืนค่าเดิม] │
└─────────────────────────────────────────┘
```

> ระบบ**เก็บ `_orig_st/_orig_mo/_orig_yr/_orig_fmo/_orig_fyr/_orig_ip` ไว้อยู่แล้ว**
> ตั้งแต่ตอน edit ครั้งแรก — แค่ยังไม่มี UI ให้ใช้ ไม่ต้องแก้โครงข้อมูลเลย

### กดคืนค่าเดิมแล้วเกิดอะไร
1. คืน **status · เดือน · ปี · fmo/fyr · ip** กลับทั้งหมด
2. ล้าง `_orig_*` และ `_manual_edit` → รายการกลับเป็น "ไม่เคยถูกแก้" (ป้ายเดือนที่ถูกย้ายก็หายไป)
3. รีเฟรชหน้าจอ `buildSummary(); af();` (+ `renderBVF` ถ้าอยู่หน้านั้น)
4. **บันทึกลงชีต** ผ่าน `saveManualEdit` — `oldStatus` = ค่าก่อนคืน · `newStatus` = ค่าที่คืนกลับไป

### ✅ ทดสอบ (1452 เคส ผ่านหมด)
V547 ใหม่ 37 — **รัน `rollbackEditStatus` จริงกับ record จำลอง**
🎯 คืน status/เดือน/ปี/ip ครบ · ล้าง `_orig_*` + `_manual_edit` · ปิด modal · รีเฟรช
✅ ไม่เคยแก้ → ไม่เปลี่ยนอะไร · id ไม่มีจริง → ไม่ error
✅ `_stLabel`: เจอ/ไม่เจอใน ST_LIST · ค่าว่าง → `—` · `null` ไม่ error
✅ `_origWhen`: **แสดงเดือนไทย** (`· พ.ค. 2026`) · fallback ไป `_orig_mo` · ไม่มีข้อมูล → ว่าง
✅ กล่องค่าเดิม escape ชื่อ status · ไม่เคยแก้ไม่โชว์กล่อง

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`script_main.html` · `overrides.html`

---

## ✅ V546.0 — ❌ ยกเลิก นับเฉพาะเดือนนี้

### 🎯 สาเหตุ
ตอน classify งาน **SC Carry** ถูก**ย้ายเดือนมาเป็นเดือนปัจจุบัน** (`mo=CUR_MO`) เพื่อให้เห็นงานค้าง
แต่ `om`/`oy` ยังเก็บ**เดือนต้นทางจริง**ไว้

→ การ์ดทีม Service นับ `_inMonthWork` (ดู `mo`) → **งานยกเลิกจากเดือนก่อน ๆ ถูกลากมานับในเดือนนี้ด้วย**

### ✅ แก้
เพิ่ม `_isCarryIn(r)` — เทียบ `om`/`oy` กับเดือนที่กำลังดู
bucket `cancel` ถ้าเป็น carry → **ไม่นับ**

| กลุ่ม | carry จากเดือนก่อน |
|---|---|
| ยังไม่จบ | ✅ ยังนับ (ต้องเห็นงานค้าง) |
| จบแล้ว | ✅ ยังนับ |
| **❌ ยกเลิก** | **❌ ไม่นับแล้ว** |

> ไม่มี `om`/`oy` → ถือว่าเป็นงานเดือนนี้ (นับปกติ) — กันข้อมูลเก่าที่ไม่มีฟิลด์นี้หายไป

### ✅ ทดสอบ (1415 เคส ผ่านหมด)
V546 ใหม่ 22 — **รัน `_isCarryIn` จริง**: เดือนนี้ · carry เดือนก่อน · **carry ข้ามปี** · ไม่มี om/oy · `om=0` · `null`
**จำลองการนับ:** ยกเลิก 5 ใบ (เดือนนี้ 2 · carry 3) → **นับ 2** · จบแล้ว/ยังไม่จบ carry **ยังนับเหมือนเดิม**

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`Home.html` · `overrides.html`

---

## ✅ V545.0 — 3 งานรวบเดียว

### 1️⃣ `☎️ ลิงก์มือถือ` → หมวด ⚙ ระบบ & ข้อมูล
**เดิมไม่อยู่ใน `CFG_GROUPS` เลย** → `cfgGrpOf` ตกไป default `'sys'` แต่ไม่ถูกซ่อนตอนสลับหมวด
→ **โผล่ในแถบ tab ของทุกหมวด** รวมทั้ง Sales Areas ที่ไม่เกี่ยวกัน

**แก้:** ใส่เข้าหมวด `sys` (อยู่กับ `📱 สิทธิ์ Mobile`)

> 🐛 **เจอรอยรั่วต่อทันที** — `mblinks` ไม่มี class `cfg-tab-adminonly`
> พอย้ายเข้าหมวด `sys` เลย**ลากหมวด "ระบบ & ข้อมูล" โผล่ให้ sales** (V540 เพิ่งปิดไป)
> เทสต์ V539/V540 จับได้ → ใส่ `adminonly` ปิดเรียบร้อย
> **รูปแบบเดิมกับ `pending`** — ปุ่มที่ไม่มีเกราะของตัวเอง รั่วทันทีที่บริบทเปลี่ยน

### 2️⃣ จัดกลุ่ม รพ. / แก้พื้นที่ รพ. → แสดงในหน้า ไม่เด้ง popup
ทำให้เหมือน 🏙 Sales กทม. ตามที่สั่ง

| | เดิม | ใหม่ |
|---|---|---|
| หน้า Config | ปุ่ม "เปิดตัวจัดกลุ่ม" → popup | **UI จริงอยู่ในหน้าเลย** |
| ปุ่มในหน้าแผนที่ | เปิด popup | **เข้า Config หน้านั้น** |
| รายการยาว | popup สูง 88vh | **scroll ในกรอบ** (420/460px) |

**ใช้ `id` เดิมทั้งหมด** (`sa-hg-*` · `sa-ov-*`) → ฟังก์ชัน render/save เดิมทำงานได้ทันที ไม่ต้องเขียนใหม่
`cfgTab` init ให้ตอนเปิด tab · save แล้วข้อความ "✓ บันทึกแล้ว" ค้างไว้ (เดิมอาศัย popup ปิดเป็นสัญญาณ)

### 3️⃣ Tab Permissions: +`🔄 Sales Retention Report`
**เดิมไม่มีในลิสต์เลย → คุมสิทธิ์ไม่ได้ ทุก role เห็นหมด**

เพิ่มครบทุกชั้น: ลิสต์ · `_TAB_PERM_KEYS` · default · **โค้ดซ่อน/แสดงจริง** (`tool-retention`)
ค่าเริ่มต้น **admin + manager เห็น · sales ไม่เห็น** (เหมือน 💵 ตั้งราคาสัญญาบริการ)

**+ แยกหัวข้อ `━━ 🛠 Tools ━━`** คั่นก่อน 4 เมนู tool (แถวหัวข้อไม่มี checkbox)

### ✅ ทดสอบ (1393 เคส ผ่านหมด)
V545 ใหม่ 45 — **รัน `saOvRenderList` จริงกับ DOM ของ pane**: render ได้ · ตัวที่ตั้งแล้วขึ้นก่อน · ค้นหากรองได้
**ตาราง perm จริง:** แถว Retention มี checkbox 3 อัน · admin/manager ติ๊ก · **sales ไม่ติ๊ก** · หัวข้อ Tools ไม่มี checkbox และอยู่ก่อน tool แรก
**ยืนยันกับปุ่มจริงจากไฟล์:** sales เห็นหมวดเดียว = `area`

### ⚠️ Deploy — Ctrl+S 4 ไฟล์
`script_main.html` · `config_modal.html` · `Dashboard.html` · `overrides.html`

### 🔑 บทเรียน
- **tab ที่ไม่อยู่ในหมวดไหนเลย = โผล่ทุกหมวด** — `cfgGrpOf` มี default fallback ที่ซ่อนปัญหาไว้
- **ย้าย tab เข้าหมวด = ต้องเช็คเกราะของ tab นั้นด้วย** ไม่งั้นลากทั้งหมวดโผล่ตาม

---

## ✅ V544.0 — เขตต่างประเทศ 1 รพ. ต่อบรรทัด

### ปัญหา
`listCol` ใช้ `column-count:3` — ชื่อ รพ. ต่างประเทศยาวมาก
(`ARYU International Hospital Yangon`) เลยถูกบีบเป็น 2 คอลัมน์แล้ว **ตัดขึ้นบรรทัดใหม่กลางชื่อ** = อ่านยาก

### ✅ แก้
เพิ่มพารามิเตอร์ `cols` ให้ `listCol` (default 3) → **ต่างประเทศส่ง 1**
พร้อม `white-space:nowrap` เมื่อเป็น 1 คอลัมน์ → ไม่ตัดคำกลางชื่ออีก

> **จังหวัดยังเป็น 3 คอลัมน์เหมือนเดิม** — ชื่อสั้น ไม่มีปัญหา ไม่แตะ

### ✅ ทดสอบ (1348 เคส ผ่านหมด)
V544 ใหม่ 20 — **render จริงด้วย DOM**
🎯 ต่างประเทศ `column-count:1` · ครบ 4 รายการ · ทุกแถว `nowrap` · **ชื่อเต็มไม่ถูกตัด**
🎯 จังหวัดยังเป็น 3 คอลัมน์ · ไม่มี `nowrap` · ครบ 9 จังหวัด
✅ ว่าง → ข้อความ empty · **escape XSS**

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`Dashboard.html` · `overrides.html`

---

## ✅ V543.0 — 🔴 FIX Sales กทม. ตัวกรองใช้ไม่ได้

### 🔍 อาการ
`— ยังไม่ตั้ง — (650)` แต่สถิติบอก `ระบบไม่มีค่า 487` · เลือกชื่อผู้แทนแล้ว **ไม่มีอะไรขึ้น** · ติ๊ก checkbox ก็ไม่เปลี่ยน

### 🎯 สาเหตุ 1: กรองผิดตัว
ตัวกรองดูแต่ **"ค่าที่ตั้งเอง"** (`_bksWork`) — แต่สภาพจริง **ตั้งเองแล้ว 0 รายการ**
→ เลือกชื่อใครก็ได้ **0 แถว** · เลือก "ยังไม่ตั้ง" ก็ได้ **ทั้ง 650** = เหมือนตัวกรองพัง

ทั้งที่ระบบจับได้ **163 รายการ** (`RES_SALES_NAME`) แต่ dropdown มองไม่เห็นเลย

**แก้:** ใช้ **"ค่าที่มีผลจริง"** `eff = ตั้งเอง || ระบบจับได้`

| จุด | เดิม | ใหม่ |
|---|---|---|
| นับใน dropdown | เฉพาะตั้งเอง (ทุกช่อง = 0) | ตาม `eff` |
| เลือกชื่อผู้แทน | เทียบ `mine` | เทียบ `eff` |
| — ยังไม่ตั้ง — | ไม่ได้ตั้งเอง = 650 | **ไม่มีทั้ง 2 ค่า = 487** ✅ ตรงกับสถิติ |
| ☑ ยังไม่ตั้ง | ไม่ได้ตั้งเอง | ไม่มีค่าเลย |
| ☑ ต่างจากระบบ | ตั้งเอง ≠ ระบบ | **คงเดิม** (ต้องตั้งเองถึงจะต่างได้) |

### 🎯 สาเหตุ 2: แสดงไม่ครบ เงียบ ๆ
`list.slice(0,500)` ตัดที่ 500 → **650 รพ. เห็นแค่ 500** โดยไม่บอกอะไรเลย

**แก้:** ยกเป็น 1000 + ถ้าโดนตัดขึ้นข้อความเตือนพร้อมบอกจำนวนจริง

### ✅ ทดสอบ (1328 เคส ผ่านหมด)
V543 ใหม่ 29 — **จำลองสภาพจริง 650 รพ. · ระบบจับได้ 163 · ตั้งเอง 0**
🎯 ยังไม่ตั้ง = **487 ตรงกับภาพจริงเป๊ะ** · เลือกผู้แทนได้แถวจริง · จำนวนตรงกับที่ dropdown บอก
✅ แสดงครบ 650 · ตั้งเองทับระบบยังชนะ · "ต่างจากระบบ" ยังถูก · 1200 รายการ → เตือน

> เทสต์เก่า 3 ตัว (V524/V533) ยืนยันนิยาม "ยังไม่ตั้ง" แบบเดิม → อัปเดตตามนิยามใหม่

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`script_main.html` · `overrides.html`

### 🔑 บทเรียน
- **ตัวกรองต้องใช้เกณฑ์เดียวกับตัวเลขที่โชว์** — สถิติบอก "ระบบไม่มีค่า 487" แต่ dropdown นับ "ตั้งเอง" คนละเกณฑ์ = ผู้ใช้สับสนทันที
- **การตัดรายการต้องบอกผู้ใช้เสมอ** — `slice()` เงียบ ๆ ทำให้เข้าใจผิดว่าข้อมูลหาย

---

## ✅ V542.0 — 🔴 FIX Mobile หน้าจอเล็กมาก

### 🎯 สาเหตุ: breakpoint ที่ผมใส่เองใน V535
```css
@media (min-width:600px){ .mb-wrap{max-width:560px; margin:auto} }
```
ตั้งใจกัน "จอใหญ่ยืดจนไอคอนห่างเกิน" **แต่ 600px ต่ำเกินไป** →
มือถือแนวนอน · แท็บเล็ต · มือถือจอใหญ่ เข้าเงื่อนไขหมด → ถูกบีบเหลือ **560px กลางจอ** = เล็กผิดปกติ มีขอบว่างซ้ายขวาเยอะ

| อุปกรณ์ | กว้าง | เดิม | ใหม่ |
|---|---|---|---|
| iPhone แนวนอน | 844 | ❌ บีบ 560 | ✅ layout แนวนอน 4-5 คอลัมน์ |
| iPad แนวตั้ง | 768 | ❌ บีบ 560 | ✅ เต็มจอ + ไอคอนใหญ่ขึ้น |
| iPhone 14 | 390 | ✅ ปกติ | ✅ ปกติ |
| เดสก์ท็อป | 1440 | บีบ 560 | บีบ **720** (กว้างขึ้น) |

### ✅ แก้
1. ขยับเพดานบีบ **600px → 900px** และกรอบ **560 → 720px**
2. เพิ่มช่วงจอกลาง (600–899px) — **ไม่บีบ** แต่ขยายไอคอน 28px / ตัวอักษร 12.5px
3. จอกว้าง (≥900px) ขยายไอคอน 30px / ตัวอักษร 13px

**หลักคิดที่เปลี่ยน:** จอใหญ่ขึ้น → **ขยายไอคอน** แทนการบีบกรอบให้แคบ

### ✅ ทดสอบ (1299 เคส ผ่านหมด)
V542 ใหม่ 22 — จำลองทุกขนาดจอ: iPhone SE/14 · **iPhone แนวนอน** · **iPad แนวตั้ง** · จอเล็ก 320 · เดสก์ท็อป
✅ ไม่มีตัวไหนโดนบีบ 560 อีก · ยืนยัน `.mb-wrap` ไม่มี `max-width` แบบ base

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`Mobile.html` · `overrides.html`

> 📱 หลังอัปให้ **ปิดแท็บมือถือแล้วเปิดใหม่** (CSS cache)

### 🔑 บทเรียน
- **breakpoint 600px ไม่ใช่ "จอใหญ่" อีกแล้ว** — มือถือแนวนอนก็เกิน 800px · ต้องดู 900px+ ถึงจะเป็นเดสก์ท็อปจริง
- responsive ที่ตั้งใจ "กันยืด" กลายเป็น "บีบ" ได้ง่าย — ควรขยาย element แทนการหดกรอบ

---

## ✅ V541.0 — Config ทางเข้าเดียว + Top 10 สองคอลัมน์

### 1️⃣ ปุ่ม ⚙ Config (มุมขวาบน) → admin เท่านั้น
เดิม V530 เปิดให้ทุก role → sales เข้า Config Areas ได้ **2 ทาง** (ปุ่มมุมขวาบน + ปุ่มในหน้าแผนที่) = ซ้ำซ้อน

**ใหม่:** non-admin เข้าทาง **⚙ Config Areas ในหน้า Sales Areas ทางเดียว**

| role | ปุ่มมุมขวาบน | ปุ่มในแผนที่ |
|---|---|---|
| admin | ✅ เห็น | ✅ |
| manager / sales | ❌ ซ่อน | ✅ **ทางเข้าเดียว** |

> guard ใน `openConfig` + `CFG_OPEN_TABS` **ไม่แตะ** → กดจากแผนที่ยังเข้าได้ครบ 4 tab เหมือนเดิม

### 2️⃣ Top 10 เขต กทม. → 2 คอลัมน์แนวตั้ง
```
 1. จุฬาลงกรณ์            6. พญาไท นวมินทร์
 2. ภูมิพลอดุลยเดช         7. ลาดพร้าว
 3. ซีจีเอช พหลโยธิน        8. บี แคร์ เมดิคอลเซ็นเตอร์
 4. จุฬาภรณ์               9. ทหารอากาศ(สีกัน)
 5. ดวงตา สภากาชาดไทย    10. สัตว์เล็ก จุฬาลงกรณ์ฯ
```
แบ่งด้วย `Math.ceil(n/2)` → ถ้ามีน้อยกว่า 10 ก็ยังแบ่งสวย (3 รายการ → ซ้าย 2 ขวา 1 · 1 รายการ → คอลัมน์เดียว)

### ✅ ทดสอบ (1277 เคส ผ่านหมด)
V541 ใหม่ 29 — **รันจริงด้วย DOM**
✅ sales กดปุ่มในแผนที่ → เปิดได้ เห็นครบ 4 tab
🔒 ไม่เห็น Users/Pending · `openConfig('users')` ตรง ๆ ยังเปิดไม่ได้
✅ Top 10: ซ้าย 1–5 · ขวา 6–10 · เรียงยอดถูก · ไม่มีตัวเลขเงิน · **escape XSS**
✅ เคสขอบ: 3 รายการ → 2/1 · 1 รายการ → คอลัมน์เดียว · ว่าง → "ยังไม่มีบิลปีนี้"

> เทสต์เก่า 2 ตัว (V530/V539) ยืนยันพฤติกรรม "ปุ่ม Config โชว์ทุก role" ซึ่ง V541 เปลี่ยนโดยตั้งใจ → อัปเดต assertion

### 📎 Mockup
`mockup_V541.html` — โค้ด `repContent()` จริง + รายชื่อ รพ. จริง 67 แห่ง

### ⚠️ Deploy — Ctrl+S 3 ไฟล์
`script_main.html` · `Dashboard.html` · `overrides.html`

---

## ✅ V540.0 — ซ่อนหมวด Daily Board จาก sales

### 🔍 ปัญหา
หลัง V539 sales เห็น 2 หมวด: **🏁 Daily Board** และ **🗺 Sales Areas**
แต่ Daily Board ไม่ควรให้ sales แก้

**สาเหตุ:** หมวด `home` มี tab เดียวคือ `pending` (📋 Pending) ซึ่งอยู่แถว `cfg-tabs-main`
และ **ไม่มี class `cfg-tab-adminonly`** → `_cfgTabOK` ปล่อยผ่าน → หมวดโผล่

> เป็นรอยรั่วแบบเดียวกับ `users`/`tabperm` ที่เจอใน V539 — เดิมไม่มีใครสังเกตเพราะ sales เปิด Config ไม่ได้เลยก่อน V530

### ✅ แก้
ใส่ `cfg-tab-adminonly` ให้ปุ่ม `pending`
→ `_cfgTabOK` คืน `false` สำหรับ non-admin
→ `cfgGrp` **ซ่อนปุ่มหมวด Daily Board อัตโนมัติ** (เพราะไม่เหลือ tab ที่มองเห็นได้)

**ผลลัพธ์:** sales เห็น **หมวดเดียว = Sales Areas** · admin เห็นครบเหมือนเดิม

### 🔍 ตรวจทุก tab แล้ว — ไม่มีรั่วอีก
สแกนทั้ง 6 หมวด 17 tab: ทุกตัวถูกปิดจาก sales ยกเว้น 4 ตัวใน `CFG_OPEN_TABS`

### ✅ ทดสอบ (1248 เคส ผ่านหมด)
V540 ใหม่ 42 — **จำลอง DOM จริงทั้ง 3 role**
✅ **sales เห็นหมวดเดียว = Sales Areas** + ครบ 4 tab
🔒 ไม่เห็น Daily Board · Service Orders · Sales Prospect · ชื่อ&สถานะ · ระบบ&ข้อมูล · ปุ่ม Pending
🔒 `openConfig('pending')` ตรง ๆ ก็เปิดไม่ได้ (guard V530 ยังทำงาน)
✅ admin เห็นครบทุกหมวด + ปุ่ม Pending · manager ไม่เห็น Daily Board

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`config_modal.html` · `overrides.html`

### 🔑 บทเรียน
- **ปุ่มที่ไม่มี class ป้องกันของตัวเอง = รอยรั่วรอวันโผล่** — ตอนที่ sales เปิด Config ไม่ได้เลย มันไม่เป็นปัญหา พอปลดล็อกก็หลุดทันที
- หลังเปลี่ยนกติกาสิทธิ์ ควร **สแกนทุก tab ทีเดียว** ไม่ใช่แก้ทีละตัวที่เห็น

---

## ✅ V539.0 — 🔴 FIX sales ไม่เห็นปุ่ม 4 tab

### 🔍 อาการ
sales เปิด ⚙ Config → เห็นหมวด **Sales Areas** และเนื้อหาข้างในถูกต้อง
แต่ **ไม่มีปุ่ม tab ทั้ง 4 ให้กดสลับ** (เขตจังหวัด · Sales กทม. · จัดกลุ่ม รพ. · แก้พื้นที่ รพ.)

### 🎯 สาเหตุ: ล็อกชั้นที่ **6** ที่ V530 พลาดไป
V530 ปลดล็อก 5 ชั้นแล้ว แต่ตกไป 1 จุด — ท้ายฟังก์ชัน `cfgGrp()`:
```js
if(rid==='cfg-tabs-admin' && !_adm){ row.style.display='none'; return; }  // non-admin: ซ่อนตลอด
```
`openConfig()` โชว์แถวให้ sales แล้ว → แต่ `cfgGrp()` รัน**ทีหลัง** ซ่อนทั้งแถวซ้ำ
→ ปุ่มทั้ง 4 อยู่ในแถวนั้น = หายหมด

### ✅ แก้
ตัดสินจาก **"ยังมีปุ่มที่มองเห็นอยู่ในแถวไหม"** แทนการเช็ค role
(ปุ่มแต่ละตัวคุมด้วย `_cfgTabOK` อยู่แล้ว → ไม่รั่ว · แถวว่างก็ยังซ่อนอัตโนมัติ)

### 🐛 เทสต์จับรอยรั่วเพิ่มได้ 1 จุด
พอเลิกซ่อนทั้งแถว พบว่า **`users` และ `tabperm` ไม่มี class `cfg-tab-adminonly`**
— เดิมอาศัยการซ่อนแถวเป็นเกราะชั้นเดียว → sales จะเห็น "จัดการ Users"

**แก้:** `_cfgTabOK` ใช้ `b.closest('#cfg-tabs-admin')` แทน `parentElement` ตรง ๆ
ปุ่มในแถว admin ที่ไม่อยู่ใน `CFG_OPEN_TABS` → admin เท่านั้น (ครอบทุกตัว ไม่ต้องพึ่ง class)

### ✅ ทดสอบ (1206 เคส ผ่านหมด)
V539 ใหม่ 27 — **จำลอง DOM จริงทั้ง 3 role**
✅ sales เห็นครบ 4 tab + หมวด Sales Areas
🔒 **กันรั่ว:** sales ไม่เห็น Users · Tab Permissions · Quick Filter · Data Query · สิทธิ์ Mobile · กลุ่มประเภทสัญญา · หมวด "ระบบ & ข้อมูล"
✅ admin/manager ยังทำงานเหมือนเดิม · แถวที่ไม่มีปุ่มเหลือยังซ่อนอัตโนมัติ

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`script_main.html` · `overrides.html`

### 🔑 บทเรียน
- **ปลดล็อกสิทธิ์ต้องไล่ให้ครบทุกชั้น** — V530 ปลด 5 ชั้น แต่มีชั้นที่ 6 ซ่อนอยู่ท้ายฟังก์ชันอื่น
- **การซ่อนทั้งแถวเป็นเกราะที่มองไม่เห็น** — พอเอาออก ปุ่มที่ไม่มี class ป้องกันของตัวเองจะหลุดทันที ต้องคุมรายตัวเสมอ

---

## ✅ V538.0 — "ดูทั้งหมด" เปลี่ยนเป็นตาราง

### เหตุผล
Top 10 ใช้ present ได้ดี แต่ตอนกดขยาย 67 แห่งเป็น **3 คอลัมน์ตัวเล็ก** อ่านยาก ไม่เหมาะโชว์บนจอ

### ✅ เปลี่ยนเป็นตาราง
| ก่อน | หลัง |
|---|---|
| 3 คอลัมน์ · เรียงตามตัวอักษร | **ตาราง 2 คอลัมน์** (`#` · โรงพยาบาล) |
| แยกสีมีบิล/ไม่มีบิล | สีเดียว สะอาด |
| ดันหน้ายาว | **สูงสุด 340px + scroll ในกล่อง** |
| — | **หัวตารางค้าง** (sticky) · แถวสลับสี |

**เรียงตามยอดบิลรวมทั้งปี** เหมือน Top 10 — **ไม่โชว์ตัวเลขและสถานะ** ตามที่สั่ง
ลำดับต่อเนื่อง 1–67 ทำให้เห็นว่าดูอยู่ตรงไหนของรายการ

🧹 ลบ `ktmRows` / `hospNames` (เรียงตามตัวอักษร) ที่ไม่ได้ใช้แล้ว — กันโค้ดตาย

### ✅ ทดสอบ (1179 เคส ผ่านหมด)
V538 ใหม่ 30 — **render จริงด้วย DOM 67 แถว**: หัว 1 แถว · แถวแรก = ยอดสูงสุด · ลำดับ 1→67 ครบ · **ไม่มี ฿ ในตาราง** · 2 คอลัมน์ · ว่าง→"ไม่มีข้อมูล" · **escape XSS**

> เทสต์เก่า 2 ตัวใน V532/V536 อ้างพฤติกรรมที่ V538 เปลี่ยนโดยตั้งใจ (แยกสี · เรียงชื่อ) → อัปเดต assertion ไม่ใช่บั๊ก

### 📎 Mockup
`mockup_V538.html` — โค้ด `repContent()` + `_ktmToggle()` **จริง** + รายชื่อ รพ. **จริง 67 แห่ง** ของจีรนันท์
ทดสอบแล้ว: กดปุ่ม → ตาราง 67 แถว ปุ่มเปลี่ยนเป็น "▴ ย่อกลับ (Top 10)"

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`Dashboard.html` · `overrides.html`

---

## ✅ V537.0 — Top 10 ไม่โชว์มูลค่า

ตัดตัวเลขยอดเงินออกจากรายการ Top 10 เหลือ **ลำดับ + ชื่อ รพ.**
**ยังเรียงตามยอดบิลรวมทั้งปีเหมือนเดิม** — แค่ไม่แสดงตัวเลข

```
เขตกรุงเทพมหานคร              67 แห่ง · มีบิลแล้ว 14
──────────────────────────────────────────
 1. จุฬาลงกรณ์
 2. ภูมิพลอดุลยเดช
 3. ซีจีเอช พหลโยธิน
 ...
10. ลาดพร้าว

        [ ▾ ดูทั้งหมด 67 แห่ง ]
```

เอาฟังก์ชัน `_kAmt()` (ย่อเงิน) ออกด้วย ไม่ได้ใช้แล้ว — กันโค้ดตาย

### ✅ ทดสอบ (1149 เคส ผ่านหมด)
เช็คว่าไม่มี `_kAmt` หลงเหลือ · แถว Top ไม่มี span สียอด (`#7dd3fc`) · ยังมีลำดับ + ชื่อ escape · ยังเรียงตามยอด

### 📎 Mockup
`mockup_V537.html` — สร้างจากโค้ด `repContent()` + `_ktmToggle()` **จริง** ที่ดึงออกมาจาก `Dashboard.html`
พร้อมรายชื่อ รพ. **จริง 67 แห่ง** ของจีรนันท์จาก `_SR_DATA` · กดปุ่มสลับได้จริง
> แผนที่เป็นกล่องเทาเพราะ SVG อยู่คนละฟังก์ชัน (`provinceMapHTML`) ไม่เกี่ยวกับส่วนที่แก้

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`Dashboard.html` · `overrides.html`

---

## ✅ V536.0 — เขตกรุงเทพฯ Top 10 + ปุ่มดูทั้งหมด

### สิ่งที่ทำ
V532 โชว์ครบทุกแห่งเรียงตามตัวอักษร → **ยาวเกินไป** (ธนาวุฒิ 101 แห่ง) อ่านไม่รู้ว่าใครสำคัญ

**ใหม่:** โชว์ **Top 10 เรียงตามยอดบิลรวมทั้งปี** พร้อมตัวเลข + ปุ่มขยายดูครบ

```
เขตกรุงเทพมหานคร              67 แห่ง · มีบิลแล้ว 14
──────────────────────────────────────────
 1. จุฬาลงกรณ์                    ฿2.40M
 2. ภูมิพลอดุลยเดช                 ฿1.85M
 3. ซีจีเอช พหลโยธิน                ฿940K
 ...
10. ลาดพร้าว                       ฿120K

        [ ▾ ดูทั้งหมด 67 แห่ง ]
```

กดปุ่ม → ขยายเป็นรายชื่อครบเรียงตามตัวอักษร (มีบิล=สว่าง · ยังไม่มีบิล=จาง) กดซ้ำย่อกลับ
**ขยายในที่เดิม ไม่เด้ง popup**

### รายละเอียด
| จุด | พฤติกรรม |
|---|---|
| ยอดที่ใช้เรียง | **บิลรวมทั้งปี** — `ktmV` ไม่ได้กรองเดือนอยู่แล้ว (ตรวจยืนยันในเทสต์) |
| รพ. ยอด ฿0 | ไม่ติด Top 10 · เห็นตอนกดดูทั้งหมด |
| มีบิลน้อยกว่า 10 | โชว์เท่าที่มี ปุ่มยังบอกจำนวนทั้งหมดตามจริง |
| ไม่มีบิลเลย | ขึ้น "ยังไม่มีบิลปีนี้" + ปุ่มดูทั้งหมด |
| ย่อเงิน | `฿2.40M` · `฿940K` · `฿850` |

### ✅ ทดสอบ (1149 เคส ผ่านหมด)
V536 ใหม่ 34 — **toggle จริงด้วย DOM**: กดสลับไปกลับ · ปุ่มเปลี่ยนข้อความถูก · id ไม่มีจริงไม่ error
**เคสขอบ:** มีบิล 14→Top 10 · มีบิล 4→Top 4 · ไม่มีบิลเลย→ว่างแต่ยังมีปุ่ม · ยอด ฿0 ไม่ติดอันดับ
**ยืนยันรวมทั้งปี:** สแกน `topHosp` ไม่พบการกรอง `r.mo`/`r.fmo`/`CUR_MO`

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`Dashboard.html` · `overrides.html`

> 💡 ถ้ายังเห็น "14 แห่ง" แปลว่า `Dashboard.html` ยังเป็นเวอร์ชันก่อน V532 — อัปไฟล์นี้แล้วจะเห็น 67

---

## ✅ V535.0 — Config สิทธิ์ Mobile + ปรับขนาดหน้าจอ

### 1️⃣ Config: ใครเห็นตัวเลือก Mobile
tab ใหม่ **📱 สิทธิ์ Mobile** ใน Config → หมวด **ระบบ & ข้อมูล** (admin เท่านั้นที่ตั้งได้)

รายชื่อดึงจาก `getUsers()` → **คนใหม่โผล่อัตโนมัติ** ไม่ต้องมาแก้โค้ด
มีช่องค้นหา · ปุ่ม เลือกทั้งหมด / ล้างทั้งหมด · แสดง role ต่อคน

| ติ๊ก | ผล |
|---|---|
| ☑ | login แล้วเจอหน้าเลือก 📱 / 🖥️ |
| ☐ | เข้า desktop ตรง ไม่ต้องเลือก |

**ค่าเริ่มต้น (ยังไม่เคยตั้ง):** sales เห็น · **manager/admin ไม่เห็น** (ตามที่ตกลง — manager ไม่ต้องใช้)

> 🚪 `?view=mobile` ยังใช้ได้เสมอ — guard วางไว้**หลัง** การเช็ค query string จึงไม่บล็อกทางหนีฉุกเฉิน

### ⚙️ ลำดับการตัดสิน (`_mbuCanMobile`)
```
1. _LAST_CONFIG.mobile_users   ← admin เพิ่งกดบันทึก (ยังไม่ re-login)
2. _currentUser.canMobile      ← server คำนวณให้ตอน login
3. default ตาม role            ← sales = เห็น
```
**ทำไมต้องคำนวณที่ server:** boot guard ทำงาน**ก่อน** `_LAST_CONFIG` โหลดเสร็จ (config มาหลัง Load Data)
ถ้าพึ่ง `_LAST_CONFIG` อย่างเดียว ค่าที่ admin ตั้งไว้จะไม่มีผลตอน login → จึงเพิ่ม `_bjhCanMobile_()` ใน `loginUser`

### 2️⃣ Responsive Mobile (ยังไม่เคยทำมาก่อน)
เดิม grid 3 คอลัมน์ตายตัว ไม่มี breakpoint เลย เพิ่ม 4 ระดับ:

| จอ | ปรับ |
|---|---|
| **< 360px** | ลดขนาดไอคอน/ตัวอักษร/ระยะห่าง กันล้น |
| **≥ 600px** | จำกัดกว้างสูงสุด 560px + จัดกลาง (ไม่ยืดจนไอคอนห่าง) |
| **แนวนอน เตี้ย** | grid **4 คอลัมน์** + ลดขนาด |
| **แนวนอน ≥ 820px** | grid **5 คอลัมน์** |

### ✅ ทดสอบ (1115 เคส ผ่านหมด)
V535 ใหม่ 53 — **รัน `_mbuCanMobile` จริงครบทุกเส้นทาง**: ยังไม่ตั้ง→sales เห็น/manager ไม่เห็น · config ชนะ session · ไม่ติ๊ก→ไม่เห็นแม้เป็น sales · manager ติ๊ก→เห็น · config ว่างตกไป role · trim empId
**Config pane จริงด้วย DOM:** โหลด users · default ถูก · ติ๊ก/ล้าง/เลือกทั้งหมด · บันทึก+sync `_LAST_CONFIG` · ค้นหา · **escape XSS**
**กันรั่ว:** `mbusers` ไม่อยู่ใน `CFG_OPEN_TABS` → sales เปิดตั้งเองไม่ได้ · `?view=mobile` ยังทะลุได้

> 🐛 เทสต์เขียนผิดเอง 4 จุด (`mbuSet(el,id)` ไม่ใช่ `(id,val)` · landscape ใช้ `repeat(4,1fr)`) — แก้ assertion ให้ตรงโค้ดจริง ไม่ใช่บั๊กในระบบ

### ⚠️ Deploy — ทำ 2 ขั้น
1. **Ctrl+S 4 ไฟล์:** `script_main.html` · `config_modal.html` · `Mobile.html` · `overrides.html`
2. **`Code.gs` → Deploy → New Version** ⚠️ (Ctrl+S อย่างเดียวไม่พอ — `loginUser` เปลี่ยน)

> ต้อง **ออกจากระบบแล้ว login ใหม่** ค่า `canMobile` จึงจะติดมากับ session

### 🔑 บทเรียน
- **boot-time guard พึ่ง config ที่โหลดช้าไม่ได้** — `_LAST_CONFIG` มาหลัง Load Data ต้องให้ server คำนวณส่งมาตอน login แทน
- ดึงรายชื่อจาก `getUsers()` แทน hardcode — คนเข้าใหม่ไม่ต้องแก้โค้ด

---

## ✅ V534.0 — 🔴 FIX แก้พื้นที่ รพ. / จัดกลุ่ม รพ. บันทึกไม่ติด

### 🔍 อาการ
🗺 **แก้พื้นที่โรงพยาบาล** → เลือก "ต่างจังหวัด" → กด 💾 บันทึก → ขึ้น "✓ บันทึกแล้ว"
แต่เปิดใหม่ **ค่ากลับไปเหมือนเดิม**

### 🎯 สาเหตุ
`_saLoadConfig()` อ่านค่าจาก `window._LAST_CONFIG` และถูกเรียก**ทุกครั้งที่เปิด popup**
แต่ `saOvSave` / `saHgSave` บันทึกขึ้น server แล้ว **ไม่อัปเดต `_LAST_CONFIG`**

```
กดบันทึก → server ✅   _SA_AREA_OVERRIDE ✅   _LAST_CONFIG ❌ (ยังเป็นของเก่า)
เปิดใหม่  → _saLoadConfig() ทับด้วย _LAST_CONFIG เก่า → ค่าที่เพิ่งตั้งหาย
```

> เทียบกับ `bksSave` (Sales กทม.) ที่ทำงานได้ — มีบรรทัด `window._LAST_CONFIG.bkk_sales = data` ส่วน 2 ตัวนี้ไม่มี

### ✅ แก้ที่ helper กลาง `_saSaveConfig()`
เพิ่ม `_syncLast()` เขียน `window._LAST_CONFIG[section] = data` หลังบันทึก
→ **ครอบทุก section ที่ใช้ helper นี้** ทั้งของเดิมและที่จะเพิ่มในอนาคต (ไม่ต้องไล่แก้ทีละตัว)

| กระทบ | เดิม | ใหม่ |
|---|---|---|
| 🗺 แก้พื้นที่ รพ. (`sa_area_override`) | ❌ ไม่ติด | ✅ |
| ⚙ จัดกลุ่ม รพ. (`sa_hosp_group`) | ❌ ไม่ติด | ✅ |

**`err()` ก็ sync ด้วย** — ถ้า server ล้มเหลว ค่ายังค้างใน local ไม่เด้งกลับทันที (ตรงกับข้อความ "⚠ เก็บ local")

### ✅ ทดสอบ (1062 เคส ผ่านหมด)
V534 ใหม่ 21 — **จำลองวงจรเต็ม**: บันทึก → รีเซ็ตตัวแปร → `_saLoadConfig()` → **ค่ายังอยู่** ✅
ครอบทั้ง `sa_area_override` และ `sa_hosp_group` · save ล้มเหลวยังค้างค่า · **ลบค่าออกแล้วไม่กลับมา** · ไม่มี backend ก็ sync local

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`Dashboard.html` · `overrides.html`

> หลังอัป: ตั้ง **เทคนิคการแพทย์ มหาวิทยาลัยเชียงใหม่ · เทคโนโลยีสุรนารี · มหาวิทยาลัยเทคโนโลยีสุรนารี · สัตว์ทองหล่อ (สาขารังสิต)** เป็น "ต่างจังหวัด" ได้แล้ว (V532 หมายเหตุ)

### 🔑 บทเรียน
- **cache ฝั่ง client ต้อง sync ทุกครั้งที่เขียน** — บันทึกขึ้น server สำเร็จ แต่ถ้า cache ที่ใช้อ่านไม่อัปเดต ผู้ใช้จะเห็นเป็น "บันทึกไม่ติด"
- แก้ที่ **helper กลาง** ดีกว่าไล่แก้ทีละ caller — ครอบของที่จะเพิ่มในอนาคตด้วย

---

## ✅ V533.0 — Sales กทม. เพิ่ม dropdown กรองผู้แทน

### สิ่งที่ทำ
เพิ่ม **`ผู้แทน: ทั้งหมด ▾`** ข้างช่องค้นหาในหน้า 🏙 Sales กทม.
กรองตาม **ผู้แทนที่ตั้งไว้เอง** (ค่าใน dropdown ขวาของแต่ละแถว)

**ตัวเลือกในลิสต์ — มีตัวเลขนับสดให้ด้วย:**
```
ผู้แทน: ทั้งหมด
— ยังไม่ตั้ง — (23)
ธนาวุฒิ (อิฐ) — 8
พงษ์ศักดิ์ (เอก) — 5
จีรนันท์ (เหมย) — 12
ประเสริฐ (บอย) — 3
เจนจิรา (มายด์) — 0
```
→ เห็นภาระงานแต่ละคนทันทีโดยไม่ต้องเลือกดูทีละคน

### รายละเอียด
| จุด | พฤติกรรม |
|---|---|
| นับต่อคน | คำนวณสดทุกครั้งที่ filter — เปลี่ยนค่าในแถวแล้วตัวเลขอัปเดตทันที |
| `— ยังไม่ตั้ง —` | เท่ากับ checkbox "ยังไม่ตั้ง" แต่เลือกจาก dropdown ได้ |
| ใช้ร่วมกับตัวกรองอื่น | **AND** กับช่องค้นหา + checkbox ทั้ง 2 ตัว |
| ชื่อนอกลิสต์ผู้แทนหลัก | ถ้าเคยตั้งไว้ จะโผล่เป็นตัวเลือกด้วย (ไม่ตกหล่น) |
| คงค่าที่เลือก | หลัง rebuild ยังอยู่ที่เดิม · ถ้าค่านั้นหายไปแล้ว → กลับไป "ทั้งหมด" |

### ✅ ทดสอบ (1041 เคส ผ่านหมด)
V533 ใหม่ 31 — **รันจริงด้วย DOM**: เลือกจีรนันท์ → 2 แถว · ธนาวุฒิ → 1 · คนที่ไม่มีงาน → 0 · ยังไม่ตั้ง → 1
นับต่อคนถูก · แสดงชื่อเล่น · ผสมกับค้นหา/checkbox ได้ · เปลี่ยนค่าแล้วตัวเลขอัปเดต · คงค่าหลัง rebuild · **escape XSS ใน option**

### ⚠️ Deploy — Ctrl+S 3 ไฟล์
`config_modal.html` · `script_main.html` · `overrides.html`

---

## ✅ V532.0 — เขตกรุงเทพมหานคร แสดง รพ. ที่ดูแลครบทุกแห่ง

### 🔍 ปัญหา
หน้า Sales Areas เลือก **จีรนันท์** → "เขตกรุงเทพมหานคร **14 แห่ง**"
แต่จริง ๆ **ดูแล 67 แห่ง**

**สาเหตุ:** `ktmV` สร้างจาก `D[]` โดยกรอง
```js
if(String(r.st||'')!=='Billed') return;   // ต้องมีบิลแล้ว
if(!(amt>0)) return;                       // ต้องมียอด > 0
```
⇒ รพ. ที่ยังไม่เปิดบิลปีนี้ **ไม่ขึ้นเลย** — ตัวเลขจึงเป็น "รพ. ที่มีรายได้แล้ว" ไม่ใช่ "รพ. ที่ดูแล"

| ผู้แทน | ดูแลจริง | เดิมแสดง |
|---|---|---|
| ธนาวุฒิ | 101 | เฉพาะที่มีบิล |
| พงษ์ศักดิ์ | 71 | ″ |
| **จีรนันท์** | **67** | **14** |
| ประเสริฐ | 40 | ″ |
| เจนจิรา | 38 | ″ |

### ✅ แก้: ยึด `SR.hosp[rep]` เป็นหลัก
สร้าง `ktmAll` จาก**ลิสต์ รพ. ที่ดูแล** แล้ว merge ยอด billed เข้าไป

| กรณี | ผล |
|---|---|
| มีบิลแล้ว | ตัวอักษร**สว่าง** เรียงบนตามยอด |
| ยังไม่มีบิล | ตัวอักษร**จาง** ต่อท้าย |
| override = ต่างจังหวัด/ต่างประเทศ | ตัดออก (ไม่ใช่ กทม.) |
| ชื่อซ้ำที่ group ไว้ | รวมเป็นตัวเดียว |
| มีบิลแต่ไม่อยู่ในลิสต์ | เติมเข้าไปด้วย (ไม่ตกหล่น) |

**หัวข้อใหม่:** `เขตกรุงเทพมหานคร 67 แห่ง · มีบิลแล้ว 14`
→ เห็นทั้งจำนวนที่ดูแลและความคืบหน้าในตาเดียว

### ✅ ทดสอบ (1010 เคส ผ่านหมด)
V532 ใหม่ 28 — **จำลอง logic จริง**: รวมตัวที่ยังไม่มีบิล · เรียงยอดมาก→น้อย · override ตัดออกถูก · group ไม่ซ้ำ · รพ. นอกลิสต์ที่มีบิลถูกเติม
**เทียบข้อมูลจริงจาก `_SR_DATA`:** จีรนันท์ **67** (เดิม 14) · ธนาวุฒิ 101 · เจนจิรา 38 ✅

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`Dashboard.html` · `overrides.html`

### 💡 หมายเหตุ: 3 ชื่อที่อยู่ผิดพื้นที่
พบใน กทม. ของจีรนันท์ แต่จริง ๆ อยู่ต่างจังหวัด:
**เทคโนโลยีสุรนารี · มหาวิทยาลัยเทคโนโลยีสุรนารี** (นครราชสีมา) · **สัตว์ทองหล่อ (สาขารังสิต)** (ปทุมธานี)

หลุดมาเพราะจับคู่ชื่อใช้ substring match (`n.indexOf(k)>=0 || k.indexOf(n)>=0`)
**แก้เองได้:** Config → Sales Areas → 🗺 **แก้พื้นที่ รพ.** ตั้งเป็น "ต่างจังหวัด" (ระบบเช็ค override ก่อน substring)

### 🔑 บทเรียน
- **ตัวเลขนับ กับ ความหมายที่ผู้ใช้คาดหวัง อาจไม่ตรงกัน** — "14 แห่ง" ระบบหมายถึง "มีบิลแล้ว" แต่ผู้ใช้อ่านว่า "ที่ดูแล"
- ลิสต์ master (`SR.hosp`) ควรเป็นแหล่งความจริงของ "ขอบเขตงาน" ส่วน transaction (`D[]`) ใช้เติมสถานะ

---

## ✅ V531.0 — เอา RES_SALES_NAME / RES_SERVICE_NAME กลับมา

### 🔍 ปัญหา
SmartFlow มีชื่อผู้รับผิดชอบครบ (กรมแพทย์ทหารอากาศ → จีรนันท์ เหมย 1012722)
แต่ Data Query `RAW_CUSTOMER` ขึ้น **ว่างเปล่า** → คอลัมน์ "ระบบจับได้" ใน 🏙 Sales กทม. เป็น "— ไม่มี —" ทุกแถว

### 🎯 สาเหตุ: เราสั่งตัดเอง
V480 ทำ **slim payload** (JSON 131MB → 67MB) โดยส่ง `ex_col=` บอก API ว่าไม่ต้องส่ง field ไหน
`RES_SALES_NAME` + `RES_SERVICE_NAME` อยู่ในลิสต์ตัดทิ้ง → **API ไม่เคยส่งมาเลย** ข้อมูลไม่ได้ผิด

> ⚠️ **ตรวจแล้ว: RAW_CUSTOMER ไม่มี field ชื่อ sales ตัวอื่นเหลือ** — ที่เกี่ยวข้องมี 4 ตัวและถูกตัดหมด (`RES_SALES_NAME`, `RES_SERVICE_NAME`, `QH_DOC_NUMBER_SALE`, `QH_ID_SALE`) จึงต้องเปิดกลับมา ไม่มีทางอื่น

### ✅ แก้ 2 ส่วน
**1. `Code.gs`** — ลบ 2 ชื่อออกจาก `BJH_EX_COL_MASTER` (36 → 34 field · 502 ตัวอักษร ยังต่ำกว่าเพดาน URL 2000)
`BJH_EX_COL_TX` **ไม่ถูกแตะ** (74 field เท่าเดิม — เทสต์เทียบกับ bundle เดิมยืนยัน)

**2. คอลัมน์ "ระบบจับได้"** — `RES_SALES_NAME` ก่อน ถ้าว่าง fallback `RES_SERVICE_NAME`
> เหตุผล: ต้นทางกรอกแต่ช่อง **Responsible Service Users** ช่อง Sales ว่าง (ตามภาพจริง)
> ถ้าอ่านแค่ `RES_SALES_NAME` ก็จะยังว่างเหมือนเดิม

แสดงตัวห้อย **ᔆᵛ** เมื่อค่ามาจากช่อง Service + tooltip บอกที่มา

### ⚠️ สำคัญ: ชื่อ sales ในระบบ **ไม่ได้มาจาก field นี้**
| field | ระดับ | ใช้ที่ไหน |
|---|---|---|
| **`SALES_SERVICE_NAME`** | รายเอกสาร | **`r.sa` — ทุกตาราง ทุกยอดเงิน** (ไม่กระทบเลย) |
| `RES_SALES_NAME` / `RES_SERVICE_NAME` | รายลูกค้า | คอลัมน์ "ระบบจับได้" ใน Sales กทม. เท่านั้น |

### ✅ ทดสอบ (982 เคส ผ่านหมด)
V531 ใหม่ 34 — ex_col ไม่มี `RES_` เหลือ · field อื่นยังตัดครบ 34 ตัว · TX ไม่ถูกแตะ
**รัน `_bksRows` จริงด้วยเคสจากภาพ:** Sales ว่าง + Service มีค่า → ได้ "จีรนันท์ วางรัต ( เหมย )" · มีทั้งคู่ → ใช้ Sales · ว่างทั้งคู่ → "— ไม่มี —" · render ตัวห้อย ᔆᵛ + tooltip ถูก

### ⚠️ Deploy — ทำ 3 ขั้นตามลำดับ
1. **Ctrl+S 3 ไฟล์:** `script_main.html` · `Dashboard.html` · `overrides.html`
2. **`Code.gs` → Deploy → New Version** ⚠️ (Ctrl+S อย่างเดียวไม่พอ)
3. **รัน `smartflowDailySyncToDrive()` มือ** — master เป็นรอบวัน ไม่งั้นต้องรอถึงพรุ่งนี้
4. กลับมาแอป → **Load Data สด**

### 🔑 บทเรียน
- **field ว่างทั้งที่ต้นทางมีข้อมูล → เช็ค `ex_col` ก่อนเสมอ** (slim payload ตัด field เงียบ ๆ)
- ชื่อคนใน CRM มี 2 ระดับ: **รายเอกสาร** (`SALES_SERVICE_NAME`) กับ **รายลูกค้า** (`RES_*`) — อย่าสับสน

---

## ✅ V530.0 — 🔓 Config Areas เปิดให้ทุก role

### สิ่งที่ทำ
Sales/Manager กด **⚙ Config** เข้าไปแก้ได้เองทั้ง 4 หัวข้อในหมวด **Sales Areas**
> 🗾 เขตจังหวัด · 🏙 Sales กทม. · ⚙ จัดกลุ่ม รพ. · 🗺 แก้พื้นที่ รพ.

**หมวดอื่นยังล็อกเหมือนเดิม 100%** — sales เห็นเฉพาะหมวด Sales Areas หมวดเดียว (`cfgGrp` ซ่อนหมวดที่ไม่มี tab ให้อัตโนมัติ)

### 🔒 ล็อกเดิมมี **5 ชั้น** — ปลดครบทุกชั้น
| # | ล็อก | แก้ |
|---|---|---|
| 1 | ปุ่ม ⚙ Config `display = isAdmin() ? '' : 'none'` | โชว์ทุก role |
| 2 | `openConfig()` → `if(isSales()) return;` | ผ่านถ้า tab อยู่ใน allowlist |
| 3 | แถว `cfg-tabs-admin` ซ่อนทั้งแถว | โชว์ให้ sales ด้วย (ปุ่มในแถวยังคุมราย ๆ ตัว) |
| 4 | class `cfg-tab-adminonly` | ยกเว้น tab ใน allowlist |
| 5 | `_cfgTabOK()` เช็ค adminonly + แถว admin | `return true` ถ้าอยู่ใน allowlist |

**กลไก:** `window.CFG_OPEN_TABS = ['provrep','bkksales','hospgrp','areaovr']` — allowlist เดียว คุมทุกชั้น เพิ่ม/ลด tab ในอนาคตแก้ที่เดียว

**sales กด ⚙ Config เปล่า → เปิด `provrep`** (admin ยังได้ `pending` เหมือนเดิม)

### ✅ ทดสอบ (948 เคส ผ่านหมด)
V530 ใหม่ 35 — **รัน `_cfgTabOK` + `openConfig` จริงด้วย DOM จำลอง**
✅ sales เห็น/เปิดได้ทั้ง 4 tab · **🔒 กันรั่ว:** sales ไม่เห็น `users`/`qfchips`/`dataquery` · เปิด `users` ไม่ได้ (ไม่เรียก `cfgTab` เลย) · ปุ่ม `qfchips` ยังซ่อนแม้แถว admin โชว์ · admin เปิดได้หมดเหมือนเดิม · deprecated ยังซ่อน

> 🐛 **เทสต์จับบั๊กได้ 1 ตัว:** `openConfig()` เปล่า → `tab=undefined` ไม่ผ่าน allowlist ทำให้ sales กดปุ่มแล้วไม่มีอะไรเกิด — แก้โดย default `provrep` **ก่อน** เช็ค

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`script_main.html` · `overrides.html`

### 🔑 บทเรียน
- สิทธิ์ใน UI มักซ้อนหลายชั้น (ปุ่ม → guard ฟังก์ชัน → แถว → class → helper) — **ปลดชั้นเดียวไม่พอ** ต้องไล่ให้ครบ
- ใช้ **allowlist ตัวเดียว** แทนการแก้เงื่อนไขกระจาย — ปลอดภัยและแก้ทีหลังง่าย

---

## ✅ V529.0 — 🔴 FIX Monthly 4.25M แต่การ์ด/ตาราง 3.61M

### 🔴 บั๊ก: ย้ายเดือนแล้วลืม `fmo`
ติ๊กแค่ **Sales Confirmed** เดือน ก.ค. แต่ได้ 3 ค่า:
| ที่ | ค่า |
|---|---|
| Monthly Forecast | **4.25M** ⚠️ |
| การ์ด BL CONFIRM | 3.61M |
| ตาราง (17 รายการ Ex.VAT) | 3.61M |

**สาเหตุ: 2 ระบบอ่านคนละ field**
| | field เดือน |
|---|---|
| Monthly Forecast | **`r.fmo`** (forecast month) → fallback `r.mo` |
| getStats (การ์ด + ตาราง) | **`r.mo`** ล้วน |

V525 ย้ายเดือนตอน Sales Confirm แก้ `mo` · `yr` · `rbmo` · `rbyr` — **แต่ลืม `fmo`/`fyr`**
⇒ `mo` ไป ก.ย. แล้ว แต่ `fmo` ยังค้าง ก.ค. → **Monthly Forecast นับรายการนั้นทั้ง 2 เดือน**

### ✅ แก้ 3 จุด
| จุด | แก้อะไร |
|---|---|
| `_scfSave` | ย้าย `fmo`/`fyr`/`fm`/`fy` ตาม `mo` + เก็บ `_orig_fmo` ไว้ถอน |
| `_scfUndo` | คืน `fmo`/`fyr` (fallback ตาม `_orig_mo` ถ้าไม่มีค่าเก็บไว้) + rollback เมื่อ save พลาด |
| `_applyNotesOverride` | ย้าย `fmo`/`fyr` หลัง reload ด้วย |

> `fm`/`fy` เป็น alias ของ `fmo`/`fyr` (ใช้ใน `overrides` ~50/117/142) — sync ครบทั้ง 4 field

**Confirm Billing เดิม (ปุ่มส้ม) ไม่กระทบ** — มันไม่ย้ายเดือน แค่เปลี่ยน status

### ✅ ทดสอบ (913 เคส ผ่านหมด)
V529 ใหม่ 29 — **รัน `_scfSave` จริง**: ย้าย ก.ค.→ก.ย. แล้ว `mo`=9 **และ `fmo`=9** (เดิมค้าง 7) · `fm`/`fy` sync
**พิสูจน์ว่าไม่นับซ้ำ:** นับแบบ Monthly (`fmo`) vs แบบการ์ด (`mo`) → **ก.ค. เท่ากัน · ก.ย. เท่ากัน · รวมไม่เกิน** ✅
ถอนยืนยัน: คืน `mo`/`fmo`/`rbmo`/status ครบ · ไม่มี `_orig_fmo` → fallback ตาม `mo`

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`overrides.html` · `confirm_billing.html`

> หลังอัป: ถอนยืนยันรายการที่ confirm ไว้ก่อนหน้า แล้ว confirm ใหม่ (ของเก่า `fmo` ยังค้างเดือนเดิม)

### 🔑 บทเรียน
- **record มี 3 ชุดเดือน**: `mo`/`yr` (หลัก) · `rbmo`/`rbyr` (รอบบิล) · **`fmo`/`fyr` (forecast)** — ย้ายเดือนต้องแก้ให้ครบทุกชุด
- ไล่ตัวเลขไม่ตรง **4 ชั้น**: (V526) นิยาม chip → (V527) การ์ดไม่อ่าน chip → (V528) filter ไม่ครอบ status → **(V529) field เดือนคนละตัว**

---

## ✅ V528.0 — 🔴 FIX ไม่ติ๊ก status เลย แต่ SC ORDERED ยังโชว์ 174K

### 🔴 บั๊ก: filter ไม่ครอบ status จริง
`_sumStatusPass()` map status ไม่ครบ — เช็คแค่ `'Ordered'` แต่**ข้อมูลจริงคือ `'SC Ordered'`**

```js
else if(st==='Ordered') pid='ordered';   // ❌ ไม่เจอ 'SC Ordered'
...
if(!pid) return true;                    // ⚠️ map ไม่เจอ = ผ่าน filter เสมอ
```

| status จริง | เดิม | ผล |
|---|---|---|
| `SC Ordered` | ❌ ไม่มีในลิสต์ | **ผ่านเสมอ** |
| `SC Carry` | ❌ ไม่มี | **ผ่านเสมอ** |
| `SC Carry (Pending)` | ❌ ไม่มี | **ผ่านเสมอ** |

⇒ ไม่ติ๊ก status เลย การ์ด **SC ORDERED ยังโชว์ ฿174K**

**แก้:** เพิ่ม 3 status ให้ตรงกับ `_MFC_PILLS` (single source) · `SC Carry (Pending)` เช็ค**ก่อน** `SC Carry` ไม่งั้นถูกกินไป

### ✅ การ์ดย่อยเคารพ filter ด้วย
เดิมการ์ด ACTUAL+BILLED · BACKLOG · BL CONFIRM · SC ORDERED · SP ORDERED โชว์**ค่าดิบจาก `stats`** ไม่สนใจ filter
ตอนนี้ pill ไหนไม่ติ๊ก การ์ดนั้น = **0**

| การ์ด | bucket | เงื่อนไข |
|---|---|---|
| ACTUAL+BILLED | `sumAct` | ติ๊ก `billed` |
| BACKLOG | `sumBacklog` | ติ๊ก `backlog` |
| BL CONFIRM | `sumBacklogC` | ติ๊ก `backlog-conf` |
| SC ORDERED | `sumScOrd + sumScCarry` | ติ๊ก `ordered` / `co-ready` / `co-notready` |
| SP ORDERED | `sumSpOrdOnly + sumSpProcOnly` | ติ๊ก `spf-ord` / `spf-proc` |

**โหมด YTD / ไตรมาส / ครึ่งปี / ติ๊กครบ → โชว์เต็มเหมือนเดิม** (เช็ค `_sumStatusApplies()` ก่อน)

### ✅ ทดสอบ (884 เคส ผ่านหมด)
V528 ใหม่ 41 — **ไม่ติ๊กเลยแล้วรัน `_sumStatusPass` จริง**: `SC Ordered`/`SC Carry`/`SC Carry (Pending)`/`Billed`/`Offer` ถูกตัดหมด
**เทสต์กันหลุด:** ดึง status ทุกตัวจาก `_MFC_PILLS` มาวน — ต้องถูกตัดครบ ไม่มีหลุด
จำลองการ์ด: ไม่ติ๊ก → ทุกการ์ด 0 (**SC ORDERED = 0 แทน 174K**) · ติ๊กครบ → 6.84M / 0.174M · โหมดอื่นโชว์เต็ม

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`Dashboard.html` · `overrides.html`

### 🔑 บทเรียน
- **`if(!pid) return true` เป็นกับดัก** — fallback "ไม่รู้จัก = ปล่อยผ่าน" ทำให้ status ที่ map ไม่เจอเล็ดลอด filter เงียบ ๆ
- ลิสต์ status ควรมี **แหล่งเดียว** (`_MFC_PILLS`) — เขียนซ้ำใน `_sumStatusPass` ทำให้ตกหล่น
- ไล่ตัวเลขไม่ตรง 3 ชั้น: **(V526)** นิยาม chip ต่าง → **(V527)** การ์ดไม่อ่าน chip → **(V528)** filter ไม่ครอบ status

---

## ✅ V527.0 — การ์ด CONFIRMED + ORDER อ่านตาม pill

### ปัญหา (ต่อจาก V526): ยังไม่ตรง — 20.19M vs **19.72M**

V526 ทำ pill เท่ากันแล้ว แต่ยังต่าง เพราะ **การ์ดไม่ได้อ่าน pill เลย**

| | Monthly Forecast | การ์ด CONFIRMED + ORDER |
|---|---|---|
| ที่มาของยอด | ผลรวม **pill ที่ติ๊ก** | **สูตรตายตัว** `conf + order` |
| นิยาม | เปลี่ยนตามที่เลือก | `Actual+Billed + Backlog + BLConfirm` **+** `SCOrder+SCCarry + SPOrder+SPProc` |

⇒ ติ๊ก **SC Carry** ไว้ใน Monthly (0.47M) แต่การ์ดจัด Carry อยู่คนละก้อน → ต่าง 0.47M

### ✅ แก้ (เลือก ก): การ์ดอ่านตาม pill ที่ติ๊ก
เมื่ออยู่**โหมดรายเดือน + เลือก status ไม่ครบ** การ์ดจะบวกเฉพาะ pill ที่ติ๊ก

| pill | bucket |
|---|---|
| `billed` | `sumAct` (Actual FAD + Billed) |
| `backlog` | `sumBacklog` |
| `backlog-conf` | `sumBacklogC` |
| `ordered` | `sumScOrd` |
| `co-ready` / `co-notready` | `sumScCarry` (ก้อนเดียว — ติ๊กทั้งคู่ไม่นับซ้ำ) |
| `spf-ord` / `spf-proc` | `sumSpOrdOnly` / `sumSpProcOnly` |
| `pend` | `sumPros` |
| `fcsp` | `_spForecastShown` |

**`+ Pipeline` (cp) ไม่บวกซ้ำ** — ถ้า `pend`/`fcsp` ถูกนับใน co แล้ว จะไม่บวกเข้ามาอีก

**เงื่อนไขเปิดใช้:** `_sumStatusApplies()` เดิม (รายเดือน + เลือกไม่ครบ)
⇒ **โหมด YTD / ไตรมาส / ครึ่งปี / เลือกครบ ใช้สูตรเดิม 100%** ไม่กระทบ

### ✅ ทดสอบ (843 เคส ผ่านหมด)
V527 ใหม่ 31 — map ครบ 10 pill · **จำลองตัวเลขจริงจากภาพ**: ติ๊ก 3 ตัว → 19.54M · +SC Ordered → 19.71M · **+SC Carry → 20.18M (ตรง Monthly)** · ติ๊กครบ = การ์ด == Monthly · carry ติ๊กทั้งคู่ไม่นับซ้ำ · cp ไม่บวก pipeline ซ้ำ 3 เคส · โหมดอื่นไม่ override

### ⚠️ Deploy — Ctrl+S
**รอบนี้:** `Dashboard.html` · `overrides.html`
**ถ้ายังไม่เคยอัป:** `script_main.html` (V526) · `confirm_billing.html` (V525)

### 🔑 บทเรียน
- ตัวเลขไม่ตรงระหว่าง 2 หน้า ไล่มา 2 ชั้น: **(1)** นิยาม chip ต่างกัน (V526) **(2)** การ์ดไม่ได้อ่าน chip เลย (V527)
- การ์ดที่มี "สูตรตายตัว" กับ filter ที่ผู้ใช้ปรับได้ ต้องตัดสินใจให้ชัดว่าอันไหนคุมอันไหน

---

## ✅ V526.0 — 🎯 Monthly Forecast กับ Summary นับเท่ากัน

### ปัญหา: 20.19M (Monthly Forecast) ≠ 20.36M (Summary) — ต่าง 0.17M

เลือก status **เหมือนกัน 3 ตัว** (Billed · Sale Order · Sales Confirmed) แต่ได้คนละยอด

**สาเหตุ: จัดกลุ่ม `Actual FAD` คนละแบบ**
| | Monthly Forecast (`_MFC_PILLS`) | Summary (`_SUM_PILLS`) |
|---|---|---|
| Actual FAD | pill **แยกต่างหาก** (`id:'actual'`) | **ยุบเข้า** chip `billed` |
| จำนวน pill | **11** | **10** |

⇒ ติ๊ก "Billed" เท่ากัน แต่ Summary ได้ Actual FAD (0.17M) ติดมาด้วย · Monthly ไม่ได้ (ไม่ได้ติ๊ก pill `actual`)

### ✅ แก้: ยุบ `actual` เข้า `billed` ให้ Monthly เหมือน Summary

```js
// เดิม
{id:'actual', st:['Actual FAD','Actual FAD (Not Found)','Actual FAD (CN)']},
{id:'billed', st:['Billed']},
// ใหม่ [V526]
{id:'billed', st:['Billed','Actual FAD','Actual FAD (Not Found)','Actual FAD (CN)']},
```

**pill ทั้ง 2 หน้าตรงกัน 10 ตัว เรียงเหมือนกัน:**
`billed · backlog · backlog-conf · ordered · co-ready · spf-ord · spf-proc · co-notready · pend · fcsp`

**`_mfcMigrate()`** แปลงค่าเก่าที่เคยติ๊ก `'actual'` ไว้ → `'billed'` อัตโนมัติ (ไม่ซ้ำ) — ยอดไม่หาย

### 🐛 FIX แถม: Reset Default ขาด `backlog-conf`
`resetMFCFilter()` มี 5 ตัว แต่ default หลักมี 6 → กด **Reset Default** แล้ว **Sales Confirmed หายจากยอด**
(บั๊กเดิมมาก่อน V526 — ตอนนี้ default กับ reset ตรงกันแล้ว)

### ✅ ทดสอบ (812 เคส ผ่านหมด)
V526 ใหม่ 28 — pill 10 ตัวเท่ากัน id/ลำดับตรงกัน · `billed` ครอบ Actual FAD · default = reset · `_mfcMigrate` 6 เคส
**พิสูจน์ตัวเลขจริง:** record `Billed 20.19M` + `Actual FAD 0.17M` → เลือก Billed แล้ว **ทั้ง 2 หน้าได้ 20.36M เท่ากัน** 🎯

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`script_main.html` · `overrides.html`

> ⚠️ **V525 ยังไม่ได้อัป** (badge บนจอยังเป็น V524) — อัป `overrides.html` + `confirm_billing.html` ของ V525 ด้วย ไม่งั้นเลือกเดือนแล้วยังไม่จำ

### 🔑 บทเรียน
- `_MFC_PILLS` กับ `_SUM_PILLS` เป็น **คนละลิสต์** ที่ต้องแก้แยกกัน — เพิ่ม/ลบ status ต้องเช็คทั้งคู่เสมอ
- ตัวเลขไม่ตรงระหว่าง 2 หน้า มักไม่ใช่ bug การคำนวณ แต่เป็น **นิยาม chip ต่างกัน**

---

## ✅ V525.0 — ย้ายเดือนจริง + โน้ตที่เดียวกัน

### 1️⃣ เลือกเดือน = ย้ายรายการไปเดือนนั้นจริง

**ปัญหา:** V522 แก้แค่ `rbmo`/`rbyr` แต่ระบบใช้ `mo`/`yr` เป็น**เดือนหลัก** (กรอง/สรุป/forecast)
⇒ กด Confirm เลือกเดือน แต่คอลัมน์ "รอบบิล / ส่งมอบ" ในหน้า Service Commercial Orders ไม่ขยับ

**⚠️ ข้อจำกัดที่ต้องเลี่ยง:** `salesnotes` ใช้ key = `qn|month|year` และ `_applyNotesOverride` match ด้วย `qn|rbmo|rbyr`
ถ้าเปลี่ยนเดือนตรง ๆ แล้วส่งเดือนใหม่เป็น key → **reload แล้วหา record ไม่เจอ = สถานะยืนยันหาย**

**วิธีแก้:**
| จุด | ทำอะไร |
|---|---|
| `_scfSave` | แก้ `mo`/`yr` **และ** `rbmo`/`rbyr` → ย้ายทันทีทุกหน้า |
| payload | ส่ง **เดือนเดิม** เป็น key (`_scf_key_mo/yr`) — ไม่ทำ key พัง |
| note | ฝากเดือนใหม่เป็น tag **`[→9/2026]`** ต่อท้าย |
| `_applyNotesOverride` | อ่าน tag ตอน loadData → ย้ายเดือนกลับ (เดือนคงอยู่หลัง reload) |
| `_scfUndo` | คืน `_orig_mo`/`_orig_yr` + rollback เดือนถ้า save พลาด |

**ไม่แตะ `Code.gs`** — ใช้คอลัมน์ Note ที่มีอยู่

### 2️⃣ โน้ต = ตัวเดียวกับคอลัมน์ 📝 โน้ต
| เดิม | ใหม่ |
|---|---|
| popup เก็บ `salesnotes` · คอลัมน์เก็บ `quote_notes` — **คนละที่** | เขียนลง **`quote_notes`** ด้วย (ที่เดียวกับคอลัมน์) |
| เปิด popup ช่องโน้ตว่างเสมอ | **prefill โน้ตเดิม** มาให้แก้ต่อ |

tag เดือน `[→M/YYYY]` เก็บเฉพาะใน `salesnotes` (ใช้ภายใน) — `quote_notes` และช่องใน popup **ไม่มี tag** ให้เห็น (`_scfStripTag`)

### ✅ ทดสอบ (784 เคส ผ่านหมด)
V525 ใหม่ 44 — **รัน `_scfSave` จริง**: `mo` ย้าย 7→9 · `rbmo` ย้ายตาม · `_orig_mo`/`_scf_key_mo` เก็บ 7 · payload key = **7 (เดือนเดิม)** · note มี tag `[→9/2026]` · `quote_notes` เก็บ "รอ PO" ไม่มี tag · `_scfNoteOf` อ่านกลับได้
`_scfStripTag`/`_scfMakeTag` 6 เคส (ทับ tag เดิม/โน้ตว่าง/ไม่มี tag) · regex จับ tag ถูก · undo คืนเดือน + rollback

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`overrides.html` · `confirm_billing.html`

> ทดสอบ: กด ✓ ที่แถวใด → เลือกเดือนอื่น → ดูหน้า Service Commercial Orders ว่ารายการย้ายเดือนแล้ว

### 🔑 บทเรียน
- **key ของ salesnotes ผูกกับเดือน** — จะเปลี่ยนเดือนต้องคงค่า key เดิมไว้ ไม่งั้น match ไม่เจอตอน reload
- `mo/yr` (เดือนหลัก) กับ `rbmo/rbyr` (รอบบิล) เป็นคนละตัว — แก้ตัวเดียวไม่พอ

---

## ✅ V524.0 — รวมปุ่ม Config Areas + Sales กทม. เป็น tab

### 1️⃣ 🐛 FIX `\n` โผล่ใน UI
`config_modal.html` บรรทัด 49 มี **`\n` ตัวอักษรจริง** คาอยู่ระหว่างปุ่ม AR Monitor กับ ลิงก์มือถือ
(หลุดมาตั้งแต่ patch V506 — เขียน `\\n` ในสตริง Python แล้วไม่ถูกแปลง) → ลบทิ้ง

### 2️⃣ รวม 4 ปุ่มเหลือปุ่มเดียว
```
เดิม:  🗾 เขตจังหวัด   🏙 Sales กทม.   ⚙ จัดกลุ่ม รพ.   🗺 แก้พื้นที่ รพ.
ใหม่:  ⚙ Config Areas
```
กดแล้วเปิด Config → หมวด **Sales Areas** ซึ่งมีครบ 4 tab อยู่แล้ว — toolbar สะอาดขึ้น

`saOpenBkkDistrict()` เดิมยังเรียกได้ (redirect ไป tab ใหม่) กันโค้ด/บุ๊กมาร์กเก่าพัง

### 3️⃣ 🏙 Sales กทม. → tab ใน Config (ต่อจาก 🗾 เขตจังหวัด)
เปลี่ยนจาก overlay ลอย (V521) เป็น **pane เหมือนหน้าเขตจังหวัด**

| ส่วน | รายละเอียด |
|---|---|
| ค้นหา | ชื่อ รพ. · sales ที่ระบบจับได้ · sales ที่ตั้งเอง |
| ☑ **ยังไม่ตั้ง** | กรองเฉพาะที่ยังไม่ได้กำหนด sales ← **ที่ขอเพิ่ม** |
| ☑ ต่างจากระบบ | กรองเฉพาะที่ตั้งแล้วไม่ตรงกับระบบ |
| สรุปบนหัว | ทั้งหมด X รพ. · ตั้งเองแล้ว Y · ระบบไม่มีค่า Z · แสดง N |
| แถว | ชื่อ รพ. → **ระบบจับได้** (`RES_SALES_NAME`) → dropdown 5 sales |
| ไฮไลต์ | ตั้งต่างจากระบบ = ขอบฟ้า · ระบบไม่มีค่า = แดง |

**CFG_GROUPS:** `area` = `['provrep','bkksales','hospgrp','areaovr']` — bkksales อยู่อันดับ 2 ตามที่เลือก

### ✅ ทดสอบ (740 เคส ผ่านหมด)
V524 ใหม่ 44 — ไม่มี `\n` หลงเหลือ · toolbar เหลือปุ่มเดียว · tab/pane ลำดับถูก · **รัน logic จริง**: กรองเฉพาะ กทม. · dedupe · โหลดค่าเดิมจาก config · dropdown 5 sales · checkbox ทั้ง 2 ตัวกรองถูก · ค้นหาได้ · `bksSet` เก็บ/ล้างค่า · escape XSS · ไม่มีข้อมูลขึ้นเตือน

### ⚠️ Deploy — Ctrl+S 4 ไฟล์
`config_modal.html` · `script_main.html` · `Dashboard.html` · `overrides.html`

> Config → **Sales Areas** → 🏙 Sales กทม.

---

## ✅ V523.0 — 🗑 ถอนยืนยัน Sales Confirm

### ปัญหา
V522 กดยืนยันได้ แต่**ถอนไม่ได้** — ปุ่ม "ยกเลิก" ใน popup แค่ปิดหน้าต่างเฉย ๆ
ต้องไปเปิด ✅ Confirm Billing แล้วหาแถวนั้นถอนเอง

### ✅ สิ่งที่ทำ
เพิ่มปุ่ม **🗑 ถอนยืนยัน** (แดง ชิดซ้าย) ใน popup — โผล่**เฉพาะแถวที่ยืนยันแล้ว**

```
[ 🗑 ถอนยืนยัน ]              [ ปิด ]  [ 💾 บันทึก ]
```

| ขั้นตอน | รายละเอียด |
|---|---|
| ถามก่อน | `confirm()` แสดงว่าจะกลับเป็นสถานะอะไร |
| สิทธิ์ | `_scfCanConfirm()` เดิม — sales ถอนได้เฉพาะของตัวเอง · manager/admin ถอนได้หมด |
| คืนค่า | `r.st = r._orig_st \|\| 'SC Ordered'` · `_confirmed_billing = 0` · เคลียร์ `_search` |
| บันทึก | payload `{qn, month, year, cancelled:true, salesId, salesName}` → `saveNotes()` |
| ถ้าพลาด | **rollback** คืนสถานะเดิมกลับ — ไม่ให้จอกับ server ไม่ตรงกัน |

**ไม่แตะ backend** — `Code.gs` รองรับ `cancelled` อยู่แล้ว (กรอง `cancelled !== 'Cancelled'` ตอนอ่าน) กลไกเดียวกับ `cbCancelConfirm()` ของ Confirm Billing

**เปลี่ยนปุ่มเดิม "ยกเลิก" → "ปิด"** กันสับสนกับการถอนยืนยัน

### ✅ ทดสอบ (696 เคส ผ่านหมด)
V523 ใหม่ 29 — **รันจริง**: ถอนแล้วคืนสถานะเดิม · กด "ไม่" ไม่เปลี่ยนอะไร · sales ถอนของคนอื่นไม่ได้ (+ข้อความเตือน) · ถอนของตัวเองได้ · ไม่มี `_orig_st` → default `SC Ordered` · idx ผิดไม่ crash · rollback เมื่อ save พลาด

### ⚠️ Deploy — Ctrl+S 1 ไฟล์
`overrides.html`

---

## ✅ V522.0 — ✅ Sales Confirm รายบรรทัด + chip Prospect (เข้า SC)

### 1️⃣ ปุ่ม ✅ Confirm รายบรรทัด — 🛒 สั่ง SP · 📥 เข้า SC
ให้ sales กดยืนยันในหน้าที่ทำงานอยู่ **แทนการเปิด ✅ Confirm Billing แล้วติ๊กทีละอัน**

**ใช้กลไกเดิม 100% (ไม่แตะ backend):**
```
st -> 'Backlog (Confirmed)' · _confirmed_billing=1 · saveNotes(payload เดิม)
```
ต่างจากเดิมแค่ **เลือกเดือนที่จะลงได้** ตอนกด (payload มีช่อง month/year อยู่แล้ว)

| หัวข้อ | ค่าที่ใช้ |
|---|---|
| เดือน default | **เดือนที่ระบบจับได้เดิม** (`r.rbmo` → `r.mo`) |
| ช่วงเลือก | **ทั้งปี** ม.ค.–ธ.ค. + ปี (ปีนี้ ±1) |
| สิทธิ์ | **sales = เฉพาะแถวตัวเอง** (`r.sa === _spMyName`) · **manager/admin = ทุกแถว** |
| ยืนยันแล้ว | ปุ่มเป็น **✓ + ชื่อเดือน** สีเขียว · กดซ้ำเพื่อ**แก้เดือน**ได้ |
| แถวคนอื่น (sales) | แสดง `—` กดไม่ได้ |

หลังบันทึกสำเร็จ re-render `spRenderOrdSP` / `spRenderOrdSC` / `buildSummary` / `af()` อัตโนมัติ
โค้ดอยู่ใน `overrides.html`: `_scfCellHtml()` · `_scfOpen()` · `_scfSave()` · `_scfCanConfirm()`

### 2️⃣ 📥 เข้า SC — chip ใหม่ 2 ตัว
| chip | เกณฑ์ |
|---|---|
| 🟡 **Sales Confirm** | `st = Backlog (Confirmed)` |
| 🔵 **Prospect** (ต่อจาก Carry) | `st = Offer` — **เอาหมดทั้ง H/M/L** ไม่แยก Low |

`_ORDSC_DEFAULT` เพิ่ม `'Offer'` (ไม่งั้นไม่มี record ให้แสดง) · badge นับ + KPI เพิ่ม Prospect

### ✅ ทดสอบ (684 เคส ผ่านหมด)
V522 ใหม่ 47 — **รันจริงครบทุก role:** sales กดแถวตัวเองได้/แถวคนอื่นไม่ได้ · manager กดได้ทุกแถว · ยืนยันแล้วขึ้น ✓ และกดแก้ได้ · popup 12 เดือน · default = เดือนของ record · idx ไม่มีไม่ crash
**+ ตรวจ DOM จริง:** th=12 · td=12 · คอลัมน์สุดท้าย "Confirm" มีปุ่ม · Offer เข้าตารางแล้ว

### ⚠️ Deploy — Ctrl+S 2 ไฟล์
`SalesProspect.html` · `overrides.html`

> ℹ️ ปุ่ม ✅ Confirm Billing เดิมยังอยู่ ใช้ได้ปกติ — V522 เป็นทางลัดเพิ่ม ไม่ได้แทนที่

### ⏳ ยังค้าง
**"fill prospect" ในหน้า เข้า SC** — ยังไม่ได้ทำ รอ Eak ระบุว่าหมายถึง
(ก) คอลัมน์ FC ให้กรอกตัวเลขคาดการณ์ หรือ (ข) ปุ่มเพิ่ม record ใหม่ที่ยังไม่มีใน CRM

---

## ✅ V515.0 — 🔍 Mobile debug บนจอ + Export FAD 2 คอลัมน์ใหม่

### 🔴 จอดำรอบ 3 — "ดู error ไม่ได้เลย"
พบต้นเหตุที่ซ่อนอยู่: `_enterMobile()` เขียน `try { window.mbShow(); } catch(e){}` — **กลืน error ทิ้งทั้งหมด** ถ้า `mbShow()` พังข้างในจะได้จอดำเงียบ ๆ ไม่มีร่องรอย

**3 ชั้นกันจอดำเงียบ:**
| ชั้น | ทำอะไร |
|---|---|
| `_mbFatal()` | แสดง error **เต็มจอ** (title + stack) + ปุ่ม 🖥️ กลับ Desktop / ↻ ลองใหม่ |
| global `error` handler | จับ error ตอนอยู่หน้า Mobile → เรียก `_mbFatal` (ไม่กวน desktop) |
| `mbCssCheck()` | อ่าน `getComputedStyle('.mb-tile').borderRadius` — ไม่มี = CSS ถูกตัด → ขึ้นแถบแดงเตือน |

**+ inline style สำรองที่ `#mb-root`** (`position/inset/z-index/background/color/flex-direction`) ⇒ ต่อให้ style block ถูกตัด ก็ยังเห็นหน้าจอ

> 🔑 เลี่ยงเขียนคำว่า style-tag ในคอมเมนต์ — sanitizer อาจสับสน

### 📊 Export to FAD — 19 → 21 คอลัมน์
| คอลัมน์ใหม่ | จาก | ตำแหน่ง |
|---|---|---|
| **เลขบิล** | `r.bn` ← `BILL_NUMBER` | หลัง `PO/Contract number` (F) |
| **ประเภทสัญญา** | `r.ctn` ← `CONTRACT_TYPE_NAME`/`CONTRACT_NAME` | หลัง `Model` (J) |

- เลขบิลมีค่าเฉพาะที่**เปิดบิลแล้ว** — ยังไม่เปิด = ว่าง
- number format `I,J` → **`K,L`** · `COL_W` 21 ช่อง
- มีผลทั้ง sheet **Ordered** และ **Pipeline**

### ✅ ทดสอบ 474 เคส ผ่านหมด
V515 ใหม่ 44 (รัน `_buildRows` จริง ตรวจ index ทุกคอลัมน์) + regression 430

### ⚠️ Deploy — Ctrl+S 4 ไฟล์
`Mobile.html` · `script_main.html` · `Dashboard.html` · `overrides.html`
→ ถ้ายังดำ **ถ่ายรูป error บนจอส่งมา**

---

## ✅ V514.0 — 🔴 FIX Mobile จอดำ รอบ 2 (`<style>` อยู่ใน `<div>`)
`Mobile.html` วาง `<style>` ไว้ **ข้างใน** `<div id="mb-root">` ซึ่งผิด HTML spec → **HtmlService sanitize ตัดทิ้ง** → ไม่มี CSS → จอดำ
**แก้:** ย้าย style block ออกมาก่อน `<div>`
> ⚠️ jsdom ยอมให้ผ่าน — เทสต์ 342 เคสเลยไม่จับได้ **jsdom ไม่ใช่ตัวแทน HtmlService**

---

## ✅ V513.0 — N2 คอลัมน์ "เลขที่ SR" (📥 เข้า SC)
| คอลัมน์ | ตัวแปร | field |
|---|---|---|
| สถานะงาน | `r.sn` | SC→`JOB_STATUS` · SP→`SERVICE_JOB_STATUS` |
| **เลขที่ SR** | `r.sr` | `RAW_SC_BILL.SR` |

10 → 11 คอลัมน์ · ว่าง → `—`
> 🔑 นับ `<td>` ด้วย regex เชื่อไม่ได้ (มี td สร้างจาก IIFE) — ต้องนับจาก DOM (`row.cells.length`)

---

## ✅ V512.0 — 🔴 FIX 4 tab ว่างเปล่า
`<div id="spq-chips-qn">` ใน pane SP Quotation **ไม่มี `</div>` ปิด** → pane ที่ตามหลัง (Contract & PO · สั่ง SP · **เข้า SC** · เปิดบิล) ถูกดูดเข้าไปซ้อน → pane แม่ `display:none` ⇒ ว่างหมด

**ยืนยัน:** base `__57_` (V505) ก็มีปัญหานี้แล้ว ⇒ ติดมาตั้งแต่ **V496** ตอนแปลง SP QN filter chips→dropdown
> 🔑 tab ว่างทั้งหน้า → สงสัยโครง HTML ซ้อนผิดก่อน ตรวจด้วยการนับ `<div>` ต่อ pane

---

## ✅ V511.0 — M5 📱 Mobile 9 เมนูทำงานจริง
| เมนู | แหล่งข้อมูล |
|---|---|
| ⚠️ Alert | `_spInstallRows` + `_spMCHistory` |
| 📦 SP Stock In | `_jsupParts` |
| 📋 ใบเสนอราคา | `window.D` |
| 🔍 เช็ค SN | install + parts + history |
| 🏥 ลูกค้าของฉัน | `_spInstallRows` |
| 📄 สัญญาใกล้หมด | `CON_END_DATE` (30/60/90) |
| ✅ งานที่รับแล้ว | `_jsupParts.JOB_SR` |
| 🔔 งานใหม่ SR | **ดราฟรอ** |

**SP Stock In ใช้ `STATUS_DT_NAME` จริงตาม Data Dictionary:**
`Stock In`/`Parts Ready(WG2)`/`Admin Process`→✅ของถึง · `Wait Stock-In`→⏳รอเข้า · `อนุมัติสั่งซื้อ`/`PR Process(K2)`/`Requested`→🔄ดำเนินการ · `Canceled`/`Rejected`/`Engineer Receive`→ข้าม
\+ 🔴 ช้ากว่ากำหนด (`ETA_DATE` > `QH_SEND_TO_DATE`)

**โหลด on-demand** — Mobile ยังข้ามโหลดตอนเข้า มีปุ่ม ⟳ โหลดข้อมูลเลย
> 🐛 `rank[a.g] || 9` — `late:0` เป็น falsy กลายเป็น 9 **อย่าใช้ `||` กับค่าที่ 0 มีความหมาย**

---

## ✅ V510.0 — M2 ซ่อม import MD 6 format + ลบ MDCollection
**บั๊ก:** `spArImportMD` เดา sheet จากชื่อ (`/^Collection/i`) → Mar/Apr(`Sheet1`)/Jun(`MD`) ตกไปใช้ `SheetNames[0]` ซึ่ง Jun เป็น **pivot** → พังเงียบ

**แก้:** `_mdPickSheet()` เลือก sheet ที่ header (ใน 5 แถวแรก) มี `Billing Document` จริง + `_mdMapHeader()` case-insensitive + `_MD_EMP_MAP` map เลขพนักงาน→ชื่อ

**ทดสอบไฟล์จริง 6 เดือน:** Jan`Collection-Jan` Feb`Collection-Feb` Mar`Sheet1` Apr`Sheet1` May`Collection` Jun**`MD`** · รวม 8,953 บิล · เจอ 5 reps ครบ
ยอด Ex VAT (Jan+Jun): เหมย 4.71M · อั้ฐ 3.80M · มายด์ 3.78M · บอย 2.58M · เอก 2.15M

**`_AR_MD_ROWS`** เก็บต่อบิล: `emp/fn/ln/nick/nameOk/dc/amt/ex` (`_AR_PAID_BILLS` รูปแบบเดิมไม่เปลี่ยน)

**ลบ MDCollection:** Index include · เมนูหัว · route 2 จุด · ไฟล์ใน bundle (22→21) — `Code.gs` ไม่แตะ
> 🔑 อย่าเดา sheet จากชื่อ · ไฟล์ export บางเดือนมี pivot มาก่อน raw

---

## ✅ V509.0 — 🔴 FIX Mobile จอดำ รอบ 1 (z-index)
`#boot-loading` ตั้ง `z-index:2147483647` (สูงสุด) พื้นเกือบดำ — Mobile 99000 / picker 98000 ถูกบังหมด
**แก้:** ยกทั้งคู่เป็น `2147483000` + บังคับ `display:none` ทันที (ไม่รอ transition 260ms ของ `_hideBootLoading`)
\+ safety: ถ้าไม่มี `#mb-root` → alert บอกให้ Deploy New Version + กลับ desktop

---

## ✅ V508.0 — N1 📝 โน้ตใน Contract & PO / สั่ง SP / เข้า SC
ระบบโน้ต (`quote_notes`) ทำงานครบอยู่แล้ว แต่ถูกเรียกแค่ 2 หน้า (ใบเสนอราคา SC/SP) — 3 tab นี้**ไม่เคยมีคอลัมน์**
**แก้:** เพิ่มคอลัมน์โน้ตท้ายตาราง ใช้ `_qnLoadNotes()` + `_qnCellHtml(r.qn)` ผูก QN เดียวกัน (ไม่แตะ backend)
> 🔑 แถวที่คลิกได้ → cell ปุ่มต้อง `event.stopPropagation()` · ตารางที่ sort ได้ต้องเพิ่ม sort case ด้วย

---

## ✅ V507.0 — M7 เลือกมุมมองหลัง login
auto-detect (จอ≤820px + touch) เช็คยาก/ไม่แน่นอน → **ถามตรง ๆ** ด้วย picker 2 การ์ด 📱/🖥️ จำใน `localStorage['bjh_view_pref']`

```
_showApp()
  ├─ ยังไม่เลือก  -> _showViewPicker()   [ยังไม่โหลด]
  ├─ 'mobile'     -> _enterMobile()      [ข้าม buildSummary + bjhFullReload]
  └─ 'desktop'    -> _showAppDesktop()   [เดิมทุกอย่าง]
```
`_showApp()` เดิมเปลี่ยนชื่อเป็น `_showAppDesktop()` — ไม่แตะโค้ดโหลดข้อมูล
> ⚠️ สลับ Mobile→Desktop ต้อง `location.reload()` เพราะข้ามโหลดมา

---

## ✅ V506.0 — M1 📱 Mobile shell + BJH Contact
ไฟล์ใหม่ `Mobile.html` overlay เต็มจอ แยก DOM จาก desktop 100% · 9 ไอคอน grid 3×3 · bottom nav 4 ปุ่ม
**BJH Contact** อ่าน URL จาก config `mobile_links.contact` → `window.open` (validate `https://`)
**Config section ใหม่ `mobile_links`:** `Code.gs` (save+read) · tab ☎️ ลิงก์มือถือ ใน `config_modal` · `cfgMblInit/Save/Test`
> 🔑 ต้องลงทะเบียน pane ใหม่ใน array ของ `cfgTab()` ด้วย · anchor patch ห้าม hardcode escape (ดึงจากไฟล์จริง)

---

## ✅ V503.0 — B8-B12 (5 เคสรวด)

### B8 — Note ต่อ SN (Alert/Critical Down)
คอลัมน์ "Note" ก่อน "ประวัติ" · icon 📝(มี)/✚(ว่าง) กด → popup textarea → save ส่วนกลาง `note_sn` · อัปเดต cell in-place
- `_cdNoteCell(sn)` · `cdOpenNote/cdSaveNote/cdCloseNote` · load `window._NOTE_SN` ตอน boot

### B9 — SP QN filter → dropdown เหมือน SC
ยุบ 5 ปุ่ม chip → `<select id=sp-spq-qn>` (5 step เดิม) · `spSpqQnSel(v)` set `_spSpqQnFilter` → `spRenderSPQuote()` (reuse filter เดิม 100%)

### B10 — Config พื้นที่เซลล์ (region ใต้ชื่อ)
`_SR_DATA[].region` override จาก `_SALES_REGION` (config) · ปุ่ม ✎ (admin) ข้าง region → prompt → save `sales_region` → `dbRenderSalesRep()`
- `window._applySalesRegion()` เรียกตอน boot + หลังแก้

### B11 — ย้ายปุ่ม config 3 ตัว ไป Sales Areas
สร้างปุ่มใหม่ต่อขวา `← กลับ Dashboard` (🗾 เขตจังหวัด · ⚙ จัดกลุ่ม รพ. · 🗺 แก้พื้นที่ รพ.) เรียก `cfgTab('provrep'/'hospgrp'/'areaovr')` เดียวกับ config modal (ของเดิมเป็น admin tab ซ่อนอยู่แล้ว — ไม่ซ้ำ)

### B12 — legend มุมล่างซ้ายแผนที่
`provinceMapHTML()` (แผนที่หน้า Sales Areas จริง — คนละตัวกับ `mapHTML` ที่มี legend อยู่แล้ว) ห่อ `position:relative` + legend สี↔ชื่อ 5 คน + "ดูแลร่วมกัน" มุมล่างซ้าย

### 🔑 บทเรียน
- หน้า Sales Areas ใช้ `provinceMapHTML` **ไม่ใช่** `mapHTML` → legend เดิมไม่โผล่
- Alert table = `cols[]` array + `body=rows.map` → เพิ่มคอลัมน์ที่ array + cell template

### ✅ ทดสอบ
- vm: B10 override region · B8 note has/empty · B9 filter set
- static: ทุกเคส marker ครบ · B9 chips เดิมเหลือแค่ MC(brand) ไม่ใช่ QN
- node --check 5 ไฟล์ผ่าน

### ⚠️ Deploy
1. **`Code.gs` → Deploy → New Version** (sections `note_sn` + `sales_region` ใหม่)
2. Dashboard/SalesProspect/script_main/overrides → Ctrl+S
3. Ctrl+Shift+R → เทสต์: Alert มีคอลัมน์ Note · SP filter เป็น dropdown · Sales Areas มีปุ่ม 3 ตัว + legend แผนที่ + ปุ่ม ✎ แก้พื้นที่ (admin)

---

## ✅ V502.0 — B7 ตุ๊กตาการ์ด Service ใหญ่เด่น

ตุ๊กตา `hb-svc-eng` (SVG หมอ ในการ์ด Service 1/2/3 — คนละตัวกับ mascot-team ของ B6)
- `transform:scale(1.35)` + origin center-left + margin-right 6px
- ขยาย `hb-svc-card` min-height `126px → 150px` (กันตุ๊กตาล้น)
- CSS ล้วน · Ctrl+S พอ · node --check ผ่าน

---

## ✅ V501.0 — B6 Daily Board: หน้าแคบลง + ตุ๊กตาเด่น

**หน้า Home (Daily Board) — คนละหน้ากับ Summary**
| แก้ | เดิม | ใหม่ |
|---|---|---|
| **max-width หน้า** | `1660px` (กว้างเกือบเต็มจอ) | **`1400px`** (มีขอบซ้าย-ขวา) |
| **ตุ๊กตา mascot** (SVG 4 ตัว มุมขวา Daily Sales) | `scale(.7)` (ย่อ) | **`scale(1.15)`** (ขยายเด่น) + ขยับ right16/bottom10 |

- ปรับแค่ CSS 2 บรรทัด (max-width + transform scale) — ไม่รื้อ layout
- ไม่แตะ logic · node --check Home + overrides ผ่าน

**Deploy:** Home + overrides = HTML → **Ctrl+S** พอ (ไม่ต้อง New Version) แล้ว Ctrl+Shift+R

---

## ✅ V500.0 — FIX C37: SP ยังโผล่ + toolbar 2 บรรทัด

### 🔴 บั๊ก SP (สำคัญ)
เลือก 4 chip (Billed/Sale Order/Sales Confirmed/SC Ordered = SC ล้วน) แต่การ์ด **SP ORDERED ฿2.34M ยังโชว์**

**ต้นเหตุ:** `_sumStatusPass` เดิมพึ่ง `window._qfPillOf(r)` — แต่ `_qfPillOf` เช็ค `r.st==='SP Forward'` (ไม่มีวงเล็บ) ส่วนข้อมูลจริงเป็น `'SP Forward (Ordering)'` → **ไม่ match → return null → guard "null=ไม่ตัด" → SP รอด filter ทุกครั้ง**

**✅ แก้:** `_sumStatusPass` เลิกพึ่ง `_qfPillOf` → **map status ดิบ→chip เอง** (อิงลิสต์เดียวกับ getStats) ครอบ SP ครบ:
```
SP Ordered/Forward (Ordering)      -> spf-ord
SP Ordered/Forward (Pending Order) -> spf-proc
is_sp_fix=1                        -> fcsp
Actual FAD (ไม่ใช่ sp_fix)          -> billed  [แนวทาง ก]
```
→ เลือก 4 chip SC → spf-ord/spf-proc/fcsp ไม่อยู่ในลิสต์ → **SP ถูกตัด** ✅

### 📐 FIX toolbar 2 บรรทัด (B5)
`db-tab-dashboard` container `max-width:80% → 92%` → ปุ่มอยู่บรรทัดเดียว (คง flex-wrap กันจอเล็ก)

### ✅ ทดสอบ
- **vm 13 เคส:** SP Ordering/Pending/Forecast ถูกตัดเมื่อไม่เลือก · SC ที่เลือกผ่าน · เลือกครบ=ผ่านหมด · SC Carry PM/Bill ตัดถูก
- node --check Dashboard + overrides

### ⚠️ Deploy (ครั้งแรกของ C37 — ต้อง deploy Code.gs)
1. **`Code.gs` → Deploy → New Version** (section `sum_status`)
2. Dashboard/overrides/script_main → Ctrl+S
3. Ctrl+Shift+R → เทสต์: รายเดือน → ⚙ → เลือกแค่ SC → Apply → **การ์ด SP ORDERED หาย** · toolbar บรรทัดเดียว

---

## ✅ V499.0 — C37-ใหม่ Summary Status Filter (แยกจาก Service Commercial Orders 100%)

> 🔴 บทเรียนจาก C37 เดิม: popup `_mfcModal`/`_mfcFilter`/`openMFCFilter` = **ของ Service Commercial Orders** → รอบนี้แยกทุกอย่างใหม่

### สเปค
| | |
|---|---|
| ปุ่ม | ไอคอน `⚙` เปล่า (title "เลือก Status") · ข้าง dropdown ช่วง · **โผล่เฉพาะรายเดือน** (`db-sumst-btn`) |
| chips | **10 status ดิบ**: Billed · Sale Order · Sales Confirmed · SC Ordered · SC Carry(Bill) · SP Ordered · SP Pending · SC Carry(PM) · Prospect · 🔧 Forecast SP |
| ผล | การ์ด Summary (CONFIRMED/ORDER/PIPELINE) **เฉพาะรายเดือน** |
| default | ครบทุกตัว (เลือกครบ = ไม่ filter = การ์ดเหมือนเดิม) |
| save | ส่วนกลาง `_config_kv` key **`sum_status`** `{ids:[...]}` |

### 🔑 กลไก — reuse `window._qfPillOf(r)` (classifier ตัวจริง)
ไม่ map status ดิบเอง → เรียก `_qfPillOf(r).id` → เช็คว่า pill อยู่ใน filter ไหม (แม่น 100%)
```
hook ต้น getStats loop (@Dashboard):
  if(_sumStatusApplies() && !_sumStatusPass(r)) return;
_sumStatusApplies() = range เป็นเดือน AND เลือกไม่ครบ (ครบ=ไม่ filter)
_sumStatusPass(r)   = _qfPillOf(r).id อยู่ใน _sumStatusFilter
guard: _qfPillOf ไม่พร้อม / classify ไม่ได้ → ไม่ตัด (ปลอดภัย)
```

### ตัวแปร/ฟังก์ชัน (แยกใหม่หมด — ไม่แตะ `_mfcFilter`)
`_sumStatusFilter · _SUM_PILLS · _SUM_DEFAULT · _sumStatusApplies · _sumStatusPass · openSumStatusFilter · applySumStatus · resetSumStatus · _sumStSave · closeSumStatusFilter`

### 10 chips → pill id (จาก `_qfPillOf`)
`Billed→billed · Sale Order→backlog · Sales Confirmed→backlog-conf · SC Ordered→ordered · SC Carry(Bill)→co-ready · SP Ordered→spf-ord · SP Pending→spf-proc · SC Carry(PM)→co-notready · Prospect→pend · Forecast SP→fcsp`

### ✅ ทดสอบ
- **vm:** gate (เดือน+ไม่ครบ=filter · ครบ=ไม่ · ทั้งปี/H1/ไตรมาส=ไม่) · pass · roundtrip `{ids}` · 10 pills map
- **jsdom:** ปุ่ม ⚙ โผล่เฉพาะ m · popup เปิด/ปิด · chips render · toggle นับถูก
- **แยก MFC:** overrides `_mfcFilter` count ไม่เปลี่ยนจาก V498 ✅
- node --check 4 ไฟล์ผ่าน

### ⚠️ Deploy
1. **`Code.gs` → Deploy → New Version** (section `sum_status` ใหม่)
2. Dashboard/overrides/script_main → Ctrl+S
3. Ctrl+Shift+R → เทสต์: รายเดือน → ⚙ → เอา chip ออก → Apply → **การ์ด Summary เปลี่ยน** + refresh ค่าอยู่ + Service Commercial Orders ยังปกติ


## ⏳ ค้าง — ทำ C37 ใหม่แบบแยก (รอบหน้า)

**เป้า:** หน้า Summary มีปุ่มเลือก status + filter การ์ด (CONFIRMED/ORDER/PIPELINE) เฉพาะรายเดือน · save ส่วนกลาง
**บทเรียน 🔴:** popup `_mfcModal` / `_mfcFilter` / `openMFCFilter` = **ของหน้า Service Commercial Orders มาแต่เดิม** (คุม Monthly Forecast ในหน้านั้น) — **ห้าม reuse**
**ต้องทำใหม่:** popup + ตัวแปร filter ของหน้า Summary **แยกสิ้นเชิง** (เช่น `_sumStatusFilter`) — ไม่แตะ `_mfcFilter`
**+ ต้องหา engine จริง:** การ์ด Summary มาจาก `getStats()` (`stats.monthlyActual/Ordered/FCSP`) ที่ Dashboard @55221 — **ไม่ผ่าน `_mfcFilter`** → filter ต้อง hook ที่ getStats ไม่ใช่ `moMFC`/buildSummary
**ค้างถาม Eak:** การ์ดไหนควรเปลี่ยนตาม status · เลือกแล้วบวก/ลบยอดยังไง (ดู CASE B1–B4)

## ✅ V498.0 — C36 ช่วง +รายไตรมาส/รายเดือน (แนวทาง B)

dropdown: `ทั้งปี · H1 ครึ่งปีแรก · H2 ครึ่งปีหลัง · รายไตรมาส · รายเดือน`
- เลือกไตรมาส/เดือน → กล่องย่อยโผล่ · default = ปัจจุบัน (Q3/กรกฎาคม) · จำค่า (`data-touched`)
- helper กลาง `dbRangeLoHi/dbActiveRange/dbActiveLabel` — รวม logic 4 จุด (Story·popup·label·rate) · budget หารตามเดือนจริง
- ป้าย Actual: ชื่อเดือนเต็ม / ไตรมาส N
- ✅ vm ranges + jsdom (select 5/4/12, กล่องย่อย show/hide) + node --check

## ✅ V497.0 — C35 หัวสรุป popup ทีม `SC x · SP y`
`hbShowSvc`/`hbShowSvcSr` tag `_k:'sc'/'sp'` · sumLine นับ SC/SP · vm 6/6

## 🔴 V499.0 — C37 status filter (ถอนออกทั้งหมด)
**สาเหตุถอน:** เอา popup ของ Service Commercial Orders (`openMFCFilter`) มาผูกปุ่ม ⚙ ที่หน้า Summary + ใส่ save/gate → **ทำของเดิมหน้า Service Commercial Orders พัง** ("กดแล้วใช้ไม่ได้")
**rollback:** Code.gs + script_main กลับ V497 เป๊ะ · overrides ถอด gate · Dashboard เหลือแค่ C36
> **Code.gs + script_main = เหมือน V497 ที่ deploy อยู่แล้ว → ไม่ต้อง deploy ใหม่**


## ✅ V496.0 — C34 📑 Contract Pipeline (แทนแท็บ Renewal)

### 💰 หลักการสำคัญ: **เงินเข้าตอนเปิดบิล**
```
🔴 CONTRACT_PRICE_NET = ยอดเต็มสัญญา (2-3 ปี) -> สูงเกินจริง 29%
✅ ยอด = Σ BILL_PRICE งวดปีล่าสุด (ยอดบิลจริง/ปี)
   (สัญญา 3 ปี 39 ฉบับ · 2 ปี 9 ฉบับ)
```

### 📊 ตัวเลขจริง (ม.ค. 2026 → ม.ค. 2027 = ปัจจุบัน +6 เดือน)
| | ฉบับ | ยอด/ปี |
|---|---|---|
| ✅ **Active วันนี้** | 438 | **฿147.9M** |
| 🔄 **RENEW** (สัญญาบริการหมด) | 453 | **฿149.8M** |
| &nbsp;&nbsp;🔥 ยังไม่เสนอ | **164** | **฿41.0M** |
| &nbsp;&nbsp;✅ เสนอแล้ว | 261 | ฿105.4M |
| &nbsp;&nbsp;⛔ ไม่เสนอ | 28 | ฿3.4M |
| 🆕 **NEW** (เครื่องขาย · ประกันหมด) | **410 เครื่อง** | *ไม่นับยอด* |
| &nbsp;&nbsp;🔥 ยังไม่เสนอ SC | **330** (80.5%) 🔴 | — |

**🚨 ก.ย. 26 หมด 172 ฉบับ ฿78.2M = 52% ของทั้งช่วง**

### 🔮 Predict — **schedule รายสัญญา** (ไม่ใช่ curve เฉลี่ย)
```
1. ดึง schedule ปีล่าสุดของสัญญานั้น (offset งวด + ยอดต่องวด จาก BILL_MONTH/BILL_YEAR/BILL_PRICE)
2. สัญญาใหม่เริ่มเดือนถัดจากหมด (median gap จริง = 1 วัน · 74% ต่อเดือนเดียวกัน)
3. บิลใหม่ลงที่ offset เดิม
   -> 450/453 ฉบับ (99.3%) ใช้ schedule จริง · 3 ฉบับ fallback (3 งวด/4 เดือน)

รวม 17 เดือนข้างหน้า = ฿143.1M
ธ.ค.26 ฿11.4M · ม.ค.27 ฿16.2M · มี.ค.27 ฿17.8M · มิ.ย.27 ฿14.1M · ก.ย.27 ฿19.8M
```

### 🔑 ค้นพบสำคัญ
| | |
|---|---|
| `CONTRACT_END_DATE` ของ **สัญญาซื้อขาย** | = **วันหมดประกัน** (1-2 ปีหลังซื้อ) |
| `con_trigger_do_create_quotation` | `0`=ยังไม่เสนอ (4,201) · `1`=เสนอแล้ว (808) · `2`=ไม่เสนอ (411) |
| `RAW_SC_BILL.CON_ID` ↔ `RAW_CONTRACT.CON_ID` | link ได้ **99%** (4,442/4,488) |
| `BILL_ROUND` | ตัวนับต่อเนื่องข้ามปี — บิลทุก 3-4 เดือน (2-3 งวด/ปี) |

### ✅ ทดสอบ 15/15 (JS ให้ผลตรงกับ Python เป๊ะทุกตัว)

## ✅ V495.0 — C30–C33

### ⚡ C30 — CACHE LAYER (ตัวสำคัญสุด)
```
[v486] HTTP tx 11.3s → 20.3s (แกว่ง 2 เท่า!) สำหรับไฟล์ 3.26 MB
[FULL RELOAD] 44.8s
```
**🔴 ต้นเหตุ: `getDataAsString()` อ่าน Drive ฝั่ง server** — ไม่ใช่ network

**✅ แก้:**
| | |
|---|---|
| `_bjhCachePut/Get()` | chunk **90KB** (< เพดาน CacheService 100KB) · marker `_n` เขียนท้ายสุด = **atomic** |
| `_bjhReadDriveCached()` | **cache-first** — key = `bjhF_TX_<BJH_VER_TX>` |
| **version** | Script Properties · trigger เขียนไฟล์ใหม่ → **bump** → cache key เปลี่ยน → **ไม่มีทางได้ข้อมูลเก่า** |
| **trigger warm** | `smartflowSyncToDrive()` / `smartflowDailySyncToDrive()` → bump + **warm ทันที** |
| `getConfig()` | cache ด้วย (`BJH_VER_CFG`) · **`saveConfigSection()` → bump → หมดอายุทันที** |
| ฟังก์ชันมือ | `bjhWarmCache()` · `bjhClearCache()` · `bjhCacheStatus()` |

**🔴 ยังพบ:** `getDataForClientMaster()` เดิมมี ScriptCache แต่ guard `if (masterContent.length <= 100000)` → ไฟล์เป็น MB → **`sc.put()` ไม่เคยถูกเรียกเลย** → cache ไม่เคยทำงาน (แก้แล้ว)

**คาด: TX 20.3s → 1-3s · รวม 44.8s → ~12s**

### 📐 C31 — ย่อ Daily Board ทั้งหน้า
`~1,450px → ~860px` (−40%) · CSS override ท้ายไฟล์ (ลบบล็อก = กลับแบบเดิมทันที)
เงิน `60→34px` · sparkline `60→40px` · การ์ด Critical `180→132px` · ทีม `~340→126px` · Pending `~290px→เตี้ยลง`

### 🔍 C32 — กด Actual YTD → ดูรายการบิล
กดได้ทั้ง **แถวหลัก** และ **แถวย่อย** (SC / SP / Σ รวม)
คอลัมน์: `ลูกค้า · Brand · Model · QN 📋 · เลขบิล 📋 · เดือน · Type · มูลค่า (Ex.VAT)`
**หมายเหตุอัตโนมัติ:** ถ้ายอดบนตาราง ≠ บิลจริง → บอกเหตุผล (Actual FAD + Backlog)

### 🔄 C33 — แยกย่อยตาม NEW / RENEW
`r.cnr` = `RAW_SC_BILL.CON_TYPE_TYPE` (fill **100%**: RENEW 3,632 · NEW 832)
⚠️ **`RAW_SpareParts` ไม่มี field นี้** → SP เข้ากลุ่ม **"⚪ ไม่ระบุ" (สีจาง)** → ยอดรวมยังตรงเป๊ะ

### ✅ ทดสอบ 57/57
- **cache 3.26 MB → 38 chunks → get กลับมาตรงเป๊ะทุก byte**
- chunk หาย 1 ตัว → คืน `null` (ไม่ส่งข้อมูลพัง) ✅
- C32 key format 4 แบบ · C33 mapping 6 เคส

## ✅ V494.0 — C22–C29 (7 เคส)
| # | เคส | ทำอะไร |
|---|---|---|
| **C22** | 🔴 Critical Down บน Daily Board **ว่าง** | `_cdBuildV2()` ต้องใช้ `window._spInstallRows` ซึ่งมาจาก `_applyMasterData()` แบบ **chunked (async)**<br>ถ้า `homeRender()` วิ่งก่อน transform เสร็จ → ได้ `[]` แล้ว**ไม่ retry**<br>✅ **retry ทุก 700ms (สูงสุด 40 ครั้ง)** + **hook `_bjhMarkLazy('install')` → re-render ทันที**<br>+ แยกข้อความ `⏳ กำลังโหลด` vs `✅ ไม่มีเครื่องที่ต้องตาม` |
| **C23** | หัวข้อทีม Service | → `(ยังไม่จบ · จบแล้ว · ยกเลิก — กดดูรายการได้)` |
| **C24** | 🔴 **แถวย่อยไม่เท่ายอดทีม** (ขาด ฿8.03M) | **ต้นเหตุ:** แถวทีมใช้ `teamCONF` = **เดือนที่ผ่านมา → `ACTUAL_FAD` (กรอกมือ)** + เดือนนี้/อนาคต → actual+**backlog**<br>ส่วน `subAgg` มาจาก `D` เฉพาะ `status_group='actual'` → **ไม่มี backlog · ไม่มี FAD**<br>และ **FAD เป็นยอดรวม → แตกย่อยตามประเภทสัญญาไม่ได้เลย**<br>✅ **แก้ (A):** คำนวณ **สัดส่วน** จาก D → **scale ให้ผลรวม = ยอดทีมเป๊ะ**<br>+ คอลัมน์ **% = สัดส่วนของทีม** (สีฟ้า — ไม่ใช่ % ของงบ)<br>+ แถวหมายเหตุอธิบายชัดเจน |
| **C26** | SC Quotation แสดง `ยกเลิกสัญญา` | เพิ่ม `'ยกเลิกสัญญา'` · `'ยกเลิก'` · `'Cancelled'` ลง `_SCQ_DONE` |
| **C27** | dropdown **Brand ว่าง** | 🔴 **ไม่ใช่บั๊กโค้ด** — `RAW_Quotation.BRAND_NAME` **fill = 0.0%** (SmartFlow ไม่ส่งมา)<br>→ **ซ่อน dropdown ทิ้ง** |
| **C28** | filter **NEW / RENEW** | dropdown ใหม่ — field `CONTRACT_TYPE_TYPE_NAME` |
| **C29** | QN 5 chips → **dropdown** | `[Requested][Product Verify][Sales Verify][Admin Verify][Send to Customer]` → `<select>` |

### 🧮 พิสูจน์ C24 (ข้อมูลจริง Service 1)
```
ดิบจาก D:   SC 60.21M · SP 20.01M
ยอดทีมจริง:  SC 68.24M · SP 19.84M
      ↓ scale (kSC = 68.24/60.21 · kSP = 19.84/20.01)
Σ แถวย่อย:   SC 68.24M ✅ · SP 19.84M ✅ · Σ% = 100.0% ✅
```

### ⏱ ความเร็ว V493: **21.7s → 18.0s** (C14 ตัด probe ได้ผล ✅)

### 🔴 V494.1 — FIX C22b (บั๊กจริงของ Critical Down)

**C22 (retry) แก้ไม่ตรงจุด** — ปัญหาไม่ใช่ `_spInstallRows`

```js
window.spRenderAlert = function(){
  var today   = ...;          // ← closure
  var conBySN = {};           // ← closure
  var srStatusMap = ...;      // ← closure
  ...
  function _cdBuildV2(){ ...ใช้ closure ข้างบน... }
  window._cdBuildV2 = _cdBuildV2;   // ← expose แต่ผูกกับ closure
};
```

**`_cdBuildV2()` ถูกนิยาม "ข้างใน" `spRenderAlert()`**
→ `window._cdBuildV2` มีค่า **ก็ต่อเมื่อ `spRenderAlert()` เคยรันแล้ว**
→ เปิด **Daily Board ตรง ๆ** (ไม่เคยเข้า Sales Prospect › Alert) = **`undefined`** = **ว่างถาวร** 🔴
→ *(ตอนที่เห็น 7/5/0/1 = เพราะเคยกดเข้า Alert ในเซสชันนั้น)*

**✅ แก้:** `_hbRenderCD()` เรียก **`spRenderAlert()` เงียบ ๆ ก่อน** (เขียนลง `#sp-alert-body` ที่ซ่อนอยู่ — ไม่กระทบ UI)
· เรียกซ้ำได้จนกว่า `_cdBuildV2` จะโผล่ · พอโผล่แล้วไม่เรียกอีก (ไม่เปลืองแรง)
· แจ้งสาเหตุจริงตอน timeout · เพิ่ม **`window._bjhCdDebug()`** diagnose ใน Console

**ทดสอบ 14/14** (จำลอง closure จริง 5 เคส)

### ✅ ทดสอบ 30/30

## ✅ V493.0 — C10–C21 (12 เคส)
| # | เคส | ทำอะไร |
|---|---|---|
| **C10** | toolbar Sales Areas | เหลือแถวเดียว `[← กลับ] │ ┃Team│5 ชื่อ┃` (แบบ B)<br>ปุ่ม config 3 ตัว → **Config › 🗺 Sales Areas** · กด tab = เด้ง overlay ทันที (z-index 99999 ทับ Config) |
| **C11** | การ์ดทีม 1/2/3 | **3 กลุ่ม** · เน้น **ยังไม่จบ** (ตัวใหญ่ 36px)<br>`ยังไม่จบ` = Delegated + Pending* + ไม่มี SR · `จบแล้ว` = *Completed · `ยกเลิก` = Canceled<br>กดแต่ละกลุ่ม → popup รายการ |
| **C12** | Critical Down กดไม่ไป | 🔴 FIX: `go()` **ไม่มีจริง** → ใช้ **`sv('sp')`**<br>+ `cdKpi()` เป็น toggle → set `_cdKpiF` ตรงๆ + `spRenderAlert()` |
| **C13** | Critical Down card | **180px + รูป SVG เครื่องมือแพทย์** 4 แบบ (✕แดง / แว่นขยาย / นาฬิกาทราย / ตา+เรดาร์) |
| **C14** | HTTP probe | **ตัด `?action=ping`** — วัดจริง **3,409ms** (Apps Script cold start ล้วน)<br>ยิง 3 fetch เลย · fallback ครบทุกตัว |
| **C15** | กดแท่งกราฟ | `dailyMap[bd].rows` เก็บรายใบ → popup `เลขบิล 📋 · ลูกค้า · Brand · Model · QN 📋 · มูลค่า` |
| **C16** | ลำดับ Daily Board | `① กราฟ+เป้า → ② Critical Down → ③ ทีม Service → ④ Pending`<br>**ลบ "คอขวด" + "Activity"** (element ลบ · JS มี guard → ไม่พัง) |
| **C17** | Breakdown ประเภทสัญญา | `แยกย่อยตาม: [ประเภทสัญญา / Brand]` → แถวย่อยกดขยาย ▸<br>**5 กลุ่ม** (4 หลัก + **"อื่นๆ" สีจาง**) → ยอดรวมตรงเป๊ะ<br>`r.ctn` = `CONTRACT_TYPE_NAME` (SC) / `CONTRACT_NAME` (SP)<br>**Config › 🏷️ ชื่อ & สถานะ › 📑 กลุ่มประเภทสัญญา** (`_config_kv` section `ctype`) |
| **C18** | Config Pending | เอา **status chips** (dead — `_hbBrk()` มี `return ''` บรรทัดแรกตั้งแต่ v149) ออก |
| **C19** | 4 tab deprecated | 🔴 FIX regression จาก C7 — `CFG_DEPRECATED` ซ่อน `fad/spfix/fcfad/budget`<br>→ หมวด **📊 Summary หายไป** (แก้ที่ Dashboard inline edit แทน) |
| **C20** | `⬆ อัพเดท Data` | ซ่อน UI (เก็บโค้ด) · **default tab → `pending`** |
| **C21** | สถิติใช้งาน | default = **วันนี้** |

### 🗂 Config หลังแก้ — 6 หมวด
```
🏁 Daily Board     Pending                                       ← default
📦 Service Orders  Quick Filter
🎯 Sales Prospect  AR Monitor · Email เบิกอะไหล่
🗺 Sales Areas     จัดกลุ่ม รพ. · แก้พื้นที่ รพ. · เขตจังหวัด        [C10]
🏷️ ชื่อ & สถานะ    Status Group · HM Stage · กลุ่มประเภทสัญญา 🆕   [C17]
⚙️ ระบบ & ข้อมูล   Users · Tab Permissions · สถิติ · API · Data Query
```

### 📑 กลุ่มประเภทสัญญา (default)
| กลุ่ม | ประกอบด้วย |
|---|---|
| 🟢 รวมอะไหล่ | สัญญาบริการ (รวมอะไหล่) |
| 🟠 รวมอะไหล่ ยกเว้น | (รวมอะไหล่แบบยกเว้น) + (ไม่รวมอะไหล่แบบยกเว้น) |
| 🔵 ไม่รวมอะไหล่ | สัญญาบริการ (ไม่รวมอะไหล่) |
| 🟡 รายครั้ง | บริการแบบรายครั้งเดียว · Preventive Maintenance |
| ⚪ อื่นๆ | ไม่มีสัญญา · (ว่าง) · ซื้อขาย · เช่า · เช่าซื้อ · สาธิต · ประกัน · ยกเลิก |

### ✅ ทดสอบ 57/57

## ✅ ปิดแล้ว (V487–V492)
| # | เคส | เวอร์ชัน |
|---|---|---|
| C1 | `FAD Unmatched` ขึ้นทุกแถว → ปิด badge (`BJH_FAD_BADGE=false`) | V487 |
| C2 | 🏁 emoji ตัน (`background-clip:text` กิน emoji) | V487 |
| C3 | Daily Board + Critical Down (สรุป + กดเข้าดู) | V487 |
| C4 | การ์ดทีม 1/2/3 — SC = SR ไม่ Completed · SP = + Backlog | V487 |
| C5 | Critical Down `13 เครื่อง` ซ้ำ → เอา badge แดงออก | V487 |
| C6 | เขตจังหวัด → หน้า Sales Areas | V487 → **FIX V491** (ใส่ผิด toolbar) |
| C7 | Config ใหม่ แยกตามเมนู (6 หมวด) | V487 → **กว้าง 1400px V490** |
| C8 | คลิกเลข → copy (QN/SR/Contract/Serial/บิล) | V487 |
| C9 | การ์ดทีม แสดงสถานะ SR + **FIX** `PO/Contract Completed` นับผิด | V489 |

---

## ⚠️ ยังไม่ได้ทำ (สำคัญ)
| | |
|---|---|
| 🔌 **ตั้ง URL `/exec`** | `Apps Script Editor → bjhSaveExecUrl → ▶ Run`<br>→ HTTP fast path ทำงาน → **29s เหลือ ~10s** |
| 💎 `NOTE_LOG` แค่ entry ล่าสุด | ขอ SmartFlow เพิ่ม param → payload −49% |
| 🔄 Renewal Prediction Dashboard | ค้างจากเดิม |

---

## 🚀 รอบล่าสุด (V479.75 → V480.1): SLIM PAYLOAD

### สิ่งที่ทำ
ย้ายการตัด field จาก **ฝั่ง client (หลัง ETL)** → **ต้นทาง SmartFlow API (`ex_col=`)**

**ผลจริง (ทดสอบกับข้อมูลจริงแล้ว): JSON 131.5 MB → 67.3 MB (ลด 49%)**

### ไฟล์ที่แก้
| ไฟล์ | แก้อะไร |
|---|---|
| **`Code.gs`** | `BJH_EX_COL_TX` (74) + `BJH_EX_COL_MASTER` (36) + `BJH_EX_COL_OFF` + `_bjhExColFor_()` · เติม `&ex_col=` ใน URL · URL-length guard · log `[SLIM]` |
| **`script_main.html`** | เรียก `window._bjhSlimGuard(parsed)` ก่อน filter `RAW_INSTALLATION` |
| **`overrides.html`** | เพิ่ม `_bjhSlimGuard()` + `_BJH_SLIM_REQUIRED` · bump `_BUILD_VER = V480.1` |

---

## 🐛 บั๊กที่เจอ + แก้ (V480.0 → V480.1)

### `Exception: Limit Exceeded: URLFetch URL Length`
**Apps Script `UrlFetchApp` จำกัด URL ที่ 2,048 chars**

| | |
|---|---|
| **สาเหตุ** | V480.0 ส่ง `ex_col` 107 fields รวมกัน **+ `encodeURIComponent()` เต็ม** (comma → `%2C` = 3 เท่า) |
| | → TX URL = **2,101 chars** · MASTER = **2,060 chars** → **ชน limit ทั้งคู่** |
| **แก้ 2 จุด** | (1) **แยกรายการต่อกลุ่ม** — TX 74 fields / MASTER 36 fields (ส่งเฉพาะ field ที่มีจริงในกลุ่มนั้น) |
| | (2) **ไม่ encode comma** — comma ถูกกฎใน query string → `.replace(/%2C/g, ',')` |
| **ผลหลังแก้** | TX **1,395 chars** (headroom 653) · MASTER **669 chars** (headroom 1,379) ✅ |
| **ผลลด** | **เท่าเดิม 49%** — field ที่ไม่มีในกลุ่มนั้น SF ข้ามอยู่แล้ว (โผล่ใน `meta.unmatched_excluded_columns`) |

**เพิ่ม guard:** ถ้า URL > `BJH_URL_MAX` (2000) → `throw` พร้อมบอกวิธีแก้ ไม่ปล่อยให้ Exception ดิบ

### 🐛 guard เคยถูกต่อ *หลัง* `</script>`
`_bjhSlimGuard()` ใน `overrides.html` → **ไม่ทำงานเลย** → ย้ายเข้าใน `<script>` แล้ว ✅

---

## 🚀 V481.0 — แก้ pako race + master โหลดซ้ำ

### ✅ V480.1 ยืนยันสำเร็จแล้ว (จาก log จริง)
```
[SLIM] saved bjh_tx.json.gz     | base64=3.04 MB  (baseline 5.74MB)  -47%
[SLIM] saved bjh_master.json.gz | base64=2.32 MB  (baseline 5.08MB)  -54%
[SLIM GUARD] field วิกฤตครบทุกตัว                                     ✅
[v356] decompress OK: text len=23077120   (master JSON 23.1M chars, เดิม ~47M)  -51%
[DRIVE-BG] Install Base loaded: 10581     ✅ INSTALL_STATUS รอด
[spSync/etl] contracts=5421 quotations=5732  ✅ ครบ
[FULL RELOAD] เสร็จสมบูรณ์ 34356ms        ← ยังช้า!
```

### 🐛 บั๊ก 1: `pako is not defined` — race condition
```
stepMaster()  -> getDataForClientMaster()          <- fetch #1 (2.32 MB)
                 -> _decompress() -> 🔴 pako is not defined
                 -> _applyMasterData catch เงียบ -> onReady() -> stepMaster "resolve สำเร็จ"
                 -> ❌ master ว่างเปล่า แต่ chain เดินต่อ

stepTxEtl()   -> gasLoadData()
                 -> typeof pako === 'undefined' -> inject <script> CDN -> รอ onload
                 -> doLoad() -> getDataForClientMaster() ซ้ำ!  <- fetch #2 (2.32 MB) 🔴
                 -> คราวนี้ pako พร้อม -> สำเร็จ
```
**สาเหตุราก:** `pako` โหลด lazy อยู่ใน `gasLoadData` (stepTxEtl) ซึ่งรัน **หลัง** `stepMaster`

### 🐛 บั๊ก 2: master ถูกดาวน์โหลด **2 รอบ** (2.32 MB × 2 ทุกครั้งที่เปิดหน้า)
`stepMaster` ยิงครั้งหนึ่ง + `gasLoadData` ยิงซ้ำอีก (background master call เดิม)

### 🐛 บั๊ก 3: 7-step loader พังเงียบ
`_applyMasterData` catch error แล้วเรียก `onReady()` → `stepMaster` resolve ทั้งที่ล้มเหลว

---

### 🔧 แก้ 4 จุด

| ไฟล์ | แก้อะไร |
|---|---|
| **`libs.html`** | **preload `pako`** (cdnjs, blocking ใน `<head>`) → โหลดคู่ขนานกับ HTML/CSS → พร้อมก่อน JS ทุกตัวรัน |
| **`script_main.html`** | (1) **`stepPako()`** เป็น step 0 ใน chain — safety net เผื่อ CDN ล่ม (`_loadPako()` retry + timeout 10s) |
| | (2) **`stepMaster` fail-loud** — ตรวจ `_jsupContract.length` จริง ถ้า 0 → `reject()` พร้อมบอกสาเหตุ (pako / parse) |
| | (3) **`gasLoadData` ข้าม master fetch ซ้ำ** — guard `window._frRunning && _jsupContract.length` (กด Load Data เองนอก FULL RELOAD ยังดึงสดเหมือนเดิม) |
| | (4) **breakdown timing** — `_tMark[]` ต่อ step → log `[FULL RELOAD] breakdown: config=1.2s | master=10.3s | ...` |
| **`overrides.html`** | bump `_BUILD_VER = V481.0` |

### 📉 ผลที่คาด
- ไม่ต้องรอ CDN pako กลางทาง
- **ไม่ดาวน์โหลด master ซ้ำ** → ประหยัด **2.32 MB + หลายวินาที** ทุกครั้งที่เปิดหน้า
- **เห็นคอขวดชัด** จาก breakdown → รอบหน้าจะรู้ว่าต้องแก้ตรงไหน

### ⚠️ ที่ต้องดูใน console หลัง deploy
- ❌ **ห้ามเห็น** `pako is not defined`
- ❌ **ห้ามเห็น** `[v356] apply start` **2 ครั้ง** (แปลว่ายังโหลดซ้ำ)
- ✅ **ต้องเห็น** `[v481] master พร้อมแล้ว (5421 contracts) → ข้าม background fetch ซ้ำ`
- ✅ **ต้องเห็น** `[FULL RELOAD] breakdown: config=... | master=... | tx=... | etl=... | ...`  ← **ส่งบรรทัดนี้มา**

---

## 📊 V481.0 — ผลจริง (breakdown แรกที่วัดได้)

```
[FULL RELOAD] เสร็จสมบูรณ์ 41.8s
breakdown: config=4.9s | master=7.9s | tx=2.7s | etl=20.0s | actual=2.5s | lowfc=3.4s | render=0.2s
```

✅ บั๊กหายหมด: `pako is not defined` หาย · `apply start` เหลือ 1 ครั้ง · `[v481] ข้าม fetch ซ้ำ` ทำงาน

### 🔴 คอขวดที่เจอ
| Step | เวลา | สังเกต |
|---|---|---|
| **etl** | **20.0s (48%)** | TX fetch + inflate + parse(35MB) + classify — **ยังไม่รู้ว่าเสียตรงไหน** |
| master | 7.9s | 2.32 MB decompress + parse + transform |
| **config + actual + lowfc** | **10.8s (26%)** | 🔴 **Sheet fetch อิสระ 3 ตัว แต่รันเรียงกัน!** |

---

## 🚀 V482.0 — รันขนาน + วัด TX ละเอียด

### แก้ 1: `config` + `actual` + `lowfc` รันขนาน (ประหยัด ~6s)
```js
stepPako()
  .then(function(){ return Promise.all([ stepConfig(), stepActual(), stepLowFc() ]); })
  .then(stepMaster).then(stepTxEtl).then(stepRender)
```
`10.8s → max(4.9, 2.5, 3.4) ≈ 5s`

**ปลอดภัย 100%** (ตรวจ dependency แล้ว):
- `config` → ETL ต้องใช้ (`_LAST_CONFIG`) → `Promise.all` จบก่อน `stepMaster` ✓
- `actual` → ใช้แค่ตอน render ✓
- `lowfc` → `_spFcApplyLow()` มี guard `if(!window.D) return 0` → no-op ตอนนี้
  แล้ว `init()` ใน `overrides` เรียก `_spFcApplyLow()` ซ้ำหลัง ETL อยู่แล้ว ✓

### แก้ 2: TX sub-timing (วัดก่อน optimize)
```
[TX] fetch=?s  wrapParse=?s  decompress=?s  jsonParse=?s  ETL=?s  | payload=3.04 MB -> ?M chars
```
→ จะรู้ว่า 20s เสียที่ **network / inflate / JSON.parse / classify**

### แก้ 3: บอกว่า ETL จบด้วย flag ไหน
```
[FULL RELOAD] ETL จบด้วย: _etlDoneOK (ปกติ)  |  _etlDataReady + 3s backup ⚠️ เสียเวลาฟรี
```
`stepTxEtl` มี backup `(Date.now()-t0) > 3000` — ถ้าใช้ backup = เสีย 3s ฟรีทุกครั้ง

### 📉 คาด: 41.8s → **~33s**

---

## 🧭 อ่านผล `[TX]` ยังไง (รอบหน้า)

| ถ้า... | แปลว่า | แก้ยังไง |
|---|---|---|
| **`fetch` สูง** (>8s) | `google.script.run` transfer ช้า (3 MB ผ่าน iframe bridge) | Drive public link + `fetch()` ตรง · หรือ ScriptCache (แก้บั๊ก `length<=100000`) |
| **`decompress`+`jsonParse` สูง** | payload ใหญ่เกิน (35 MB) | 💎 **`NOTE_LOG` แค่ entry ล่าสุด** (TX 35→18 MB) · `bjh_agg` |
| **`ETL` สูง** | classify logic หนัก | ย้าย classify ไป server (`bjh_agg`) |

---

## 📊 V482.0 — ผลจริง: **41.8s → 27.8s** (เร็วขึ้น 14s) ✅

```
V481: 41.8s = config 4.9 | master 7.9 | tx 2.7 | etl 20.0 | actual 2.5 | lowfc 3.4 | render 0.2
V482: 27.8s = sheets 4.2 | master 5.4 | tx 1.7 | etl 16.3 | render 0.2
              sheets (ขนาน): config=4.2s  actual=2.6s  lowfc=3.6s   ← ขนานสำเร็จ
```

### 🔴 2 เรื่องที่เจอ
1. `[FULL RELOAD] ETL จบด้วย: _etlDataReady + 3s backup ⚠️` — **`_etlDoneOK` ไม่เคยถูก set**
2. **`[TX]` log ไม่โผล่** — วางผิด branch

**สาเหตุเดียวกัน:** boot ETL ใช้ path ใน `processData` (~บรรทัด 8174)
ไม่ใช่ Refresh path (`[PERF] Refresh ETL+init`, ~7600) ที่ V482 วางตัววัดไว้
→ `stepTxEtl` ต้องรอ BG block (`_etlDataReady`) แทนที่จะจบทันทีที่ `D` พร้อม

---

## 🚀 V483.0 — วัด TX ให้ถูก path + ปลดล็อก `_etlDoneOK`

**แก้ `script_main.html` จุดเดียว** — ที่ boot ETL path จริง:
```js
var _tE=Date.now();
var result = jsupETL(...);        // classify
_txT.classify = Date.now()-_tE;
var _tI=Date.now();
init(result.records, ...);        // build D + render
_txT.init = Date.now()-_tI;
console.log('[TX] fetch=... decompress=... jsonParse=... classify=... init=...');
window._etlDoneOK = true;         // ← ปลดล็อก stepTxEtl ทันที (ไม่รอ BG block)
```

### จะได้เห็น
```
[TX] fetch=?s  wrapParse=?s  decompress=?s  jsonParse=?s  classify=?s  init=?s  | payload=3.04 MB -> ?M chars
[FULL RELOAD] ETL จบด้วย: _etlDoneOK (ปกติ)   ← ต้องเป็นสีเขียว
```

---

## 🔄 ปุ่ม Update vs โค้ดใหม่ (ตอบคำถาม)

| ปุ่ม | ข้อมูลใหม่ | **โค้ดใหม่** |
|---|---|---|
| **Update** (`bjhFullReload`) | ✅ | 🔴 **ไม่ได้** — ไม่ reload หน้า |
| **🔄 รีเฟรช** (หน้า Home) | ✅ | ✅ `bjhHardRefresh()` → top-nav `/exec?v=<ts>` (cache-bust) |
| `Ctrl+Shift+R` | ✅ | ✅ |

**`bjhHardRefresh()` มีอยู่แล้ว** แต่: อยู่แค่ปุ่ม 🔄 ในหน้า Home · ต้อง user gesture · **user ไม่รู้ว่ามีโค้ดใหม่**

### 💡 รอทำ: Auto Version Check
```
Code.gs:  var BJH_CODE_VER = 'V483.0';  +  getCodeVer()
Client:   boot -> เทียบกับ _BUILD_VER ใน HTML -> ไม่ตรง = HTML เก่า
          -> banner ส้ม "🔄 มีเวอร์ชันใหม่ — กดเพื่ออัปเดต" -> คลิก -> bjhHardRefresh()
```
⚠️ **ต้องรู้ก่อน: ทีมขายเปิดจาก `/exec` หรือ `/dev`?**
- `/exec` = เสิร์ฟ**เวอร์ชันที่ deploy** → **ทุกครั้งที่ปล่อยของต้อง Deploy → New Version** (แม้แก้แค่ HTML)
- `/dev` = HEAD → Ctrl+S พอ แต่ user ต้อง reload หน้า

---

## 🚀 V484.0 — Prefetch TX + ตัด "โหลดหลุด" + แสดงเวลา

### 🔴 ต้นตอ "โหลดเสร็จแล้วยังหลุดโหลดต่อ"
`processData` มี `setTimeout(600ms)` → **ยิง server 4 call หลัง "เสร็จสมบูรณ์"** แถม**แก้ `D` → เลขเปลี่ยน**

| call | สถานะ |
|---|---|
| `getLowProspects()` | 🔴 **ซ้ำ** — `stepLowFc` ยิงไปแล้ว + `init()` เรียก `_spFcApplyLow()` (sync) ให้แล้ว |
| `getManualEdits()` | ✅ จำเป็น → **ย้ายเข้า chain** (`stepOverrides`) |
| `getNotes()` | ✅ จำเป็น → **ย้ายเข้า chain** |
| `gasUpdateConfig()` | 🔴 **ซ้ำ** — `stepConfig` โหลด+apply ไปแล้ว |

→ **ตัดทิ้ง 2 call ซ้ำ** · ย้าย 2 call เข้า chain → **"เสร็จสมบูรณ์" = เสร็จจริง ไม่มีอะไรโหลดต่อ**

### ⭐ Prefetch TX (ตัวใหญ่สุด)
```js
stepPako()
  .then(function(){
    stepPrefetchTx();                                    // ยิง getDataForClientTx() ที่ t=0 (ไม่รอ)
    return Promise.all([stepConfig(), stepActual(), stepLowFc()]);
  })
  .then(stepMaster).then(stepTxEtl).then(stepOverrides).then(stepRender)
```
- TX (3.04 MB) กับ master (2.32 MB) = network **อิสระ** ไม่ต้องรอกัน
- TX โหลด**ซ้อน**กับ sheets (4.2s) + master (5.4s) = **~10s ที่เคยเสียเปล่า**
- **ETL ยังรันหลัง master เสร็จเหมือนเดิม** (`resolveBM` ต้องใช้ contract/install) → ปลอดภัย 100%
  → เราแค่ย้าย **"การดาวน์โหลด"** ให้เริ่มเร็วขึ้น ไม่ได้ย้ายลำดับการประมวลผล
- prefetch fail → fallback ยิงเองตอน `stepTxEtl` (ทดสอบแล้ว)

### ⏱ แสดงเวลาบน badge (`#ver-stamp`)
```
V484.0 build: | 14 ก.ค. 14:00 | ⏱ 14:32:05 (21.3 วิ)
                                 ↑ เวลาที่โหลดเสร็จ + ใช้เวลากี่วินาที
```

### 📉 คาด: **27.8s → ~21s**
```
t=0     : TX prefetch (7s) ‖ config(4.2) ‖ actual(2.6) ‖ lowfc(3.6)
t=4.2s  : master (5.4s)          ← TX ยังโหลดอยู่ ซ้อนกัน
t=7s    : TX มาถึงแล้ว ✅
t=9.6s  : master เสร็จ → ETL เริ่มทันที (ไม่ต้องรอ network!)
t=~19s  : ETL เสร็จ
t=~21s  : overrides (ขนาน) + render → เสร็จจริง
```

### ⚠️ guard สำคัญ
BG block ใช้ `window._frRunning` **เท่านั้น** (ไม่ใช้ `_LAST_CONFIG`)
→ กด **Load Data เอง** นอก FULL RELOAD ยังดึง override + config ครบเหมือนเดิม (ทดสอบแล้ว)

---

## 💥 V484.0 — ผลจริง: **ค้นพบที่พลิกทุกสมมติฐาน**

```
[TX] fetch=8.8s  wrapParse=0.0s  decompress=0.6s  jsonParse=0.1s  classify=0.2s  init=0.1s
                 └────────── ประมวลผลข้อมูลทั้งหมด = 1.0 วินาที! ──────────┘
                 payload=3.25 MB -> 30.2M chars
```

### 🔴 สมมติฐานที่ผิดมาตลอด
| เคยคิด | ความจริง |
|---|---|
| `etl=20s` = parse 35MB + classify หนัก | ❌ **parse+classify = 1.0s** |
| ต้องลด payload (NOTE_LOG / bjh_agg) | 🟡 ช่วยแค่ network นิดเดียว |
| **คอขวดจริง** | ✅ **`google.script.run` — overhead ต่อ call 2-15s** |

### 🔴 prefetch ที่ t=0 ทำให้ **แย่ลง** (27.8s → 31.5s)
```
breakdown: sheets=14.6s | master=6.9s | tx=2.1s | etl=4.2s | override=3.4s | render=0.2s
sheets (ขนาน): config=14.6s ← เดิม 4.2s!  actual=2.3s  lowfc=2.7s
```
**ยิง 4 call พร้อมกัน → TX (3.25MB) แย่ง server → `config` พุ่ง 4.2s → 14.6s**
→ Apps Script **contend กัน — ยิ่งยิงเยอะยิ่งช้า**

---

## 🚀 V485.0 — รวม 5 call → 1 call + ลด concurrency

### 1️⃣ `Code.gs`: **`getBootBundle(year)`** ⚠️ ต้อง Deploy → New Version
รวม 5 sheet call เป็น **1 execution** (จ่าย overhead ครั้งเดียว + เปิด Spreadsheet ครั้งเดียว)
```js
getBootBundle() -> { config, actual, low, edits, notes }
```
- แต่ละตัวห่อ `try/catch` → ตัวหนึ่งพัง ตัวอื่นยังมา (ทดสอบแล้ว)
- Logger: `[BOOT] bundle ???ms | config=? actual=? low=? edits=? notes=? chars`

### 2️⃣ chain ใหม่ — ลด concurrency ที่ t=0
```js
stepPako()
  .then(stepBoot)                    // phase 1: 1 call
  .then(function(){
     stepPrefetchTx();               // phase 2: TX (8.8s) ‖ master (6.9s) — 2 Drive call ขนานกันเอง
     return stepMaster();
  })
  .then(stepTxEtl)                   // phase 3: ETL ~1s (วัดแล้ว!)
  .then(stepOverrides)               // ใช้ edits+notes จาก bundle -> 0 server call
  .then(stepRender)
```
**fallback:** ถ้า server ยังไม่มี `getBootBundle` → ยิง 3 call แยกเหมือนเดิม (ไม่พัง — ทดสอบแล้ว)

### 3️⃣ `confirm_billing.html`: 2 override ใช้ผลจาก `_bootBundle`
`_applyManualEditsOverride` / `_applyNotesOverride` → ถ้ามีผลใน `_bootBundle` → apply เลย ไม่ยิง server

### 📉 คาด: **31.5s → ~16-19s**
```
t=0     getBootBundle (1 call, ~6s)
t=6     master (6.9s) ‖ TX prefetch (8.8s)   ← 2 Drive call ขนาน ไม่แย่ง sheet
t=14.8  ทั้งคู่เสร็จ -> ETL (~1s)
t=16    overrides (local, 0 call) + render -> เสร็จจริง
```

### 📊 server call: **6 → 3**
| | V484 | V485 |
|---|---|---|
| sheets | 3 (config/actual/lowfc) | **1** (bootBundle) |
| overrides | 2 (edits/notes) | **0** (มาใน bundle) |
| Drive | 2 (master/TX) | 2 |
| **รวม** | **7** | **3** |

---

## 🏁 V486.0 — HTTP FAST PATH (ทางออกสุดท้าย)

### 🔬 คอขวดที่วัดได้แน่ชัด (ไม่ใช่เดา)
```
[TX] fetch=8.8s  decompress=0.6s  jsonParse=0.1s  classify=0.2s  init=0.1s
     ↑ network      └──── ประมวลผลข้อมูลทั้งหมด = 1.0 วินาที ────┘
```
**`google.script.run` = ~370 KB/s** — มันไม่ใช่ HTTP แต่เป็น **postMessage bridge ผ่าน iframe sandbox**
(serialize ทุก byte ข้าม origin) → ยิ่งยิงหลาย call ยิ่ง contend กันเอง

### 🔴 3 ตัวการ
| # | ปัญหา | เสีย |
|---|---|---|
| 1 | `getSpreadsheet()` **ไม่ memoize** → `getBootBundle` เปิด Spreadsheet **5 รอบ** | 5-8s |
| 2 | `getDataForClientTx` **เขียน Sheet ก่อนอ่าน Drive** (`_logActivity`) | 2-4s |
| 3 | `google.script.run` bridge = 370 KB/s | 8.8s + 6.9s |

### ✅ แก้ทั้ง 3

**`Code.gs`**
1. `var _BJH_SS_MEMO` — memoize `getSpreadsheet()` (openById 5 รอบ → 1)
2. `doGet` เพิ่ม HTTP endpoint (ใช้ `ContentService` ที่มีอยู่แล้ว):
   - `?action=ping`   → `pong` (probe)
   - `?action=boot`   → `getBootBundle(yr)`
   - `?action=master` → `getDataForClientMaster()`
   - `?action=tx`     → `getDataForClientTx('','')` ← ส่ง `''` = ข้าม `_logActivity` (2-4s)

**`script_main.html`**
3. `_bjhFetchText()` + `_bjhProbeHttp()` (probe ~300ms, cache ใน sessionStorage)
4. `_bjhStartHttp()` — ยิง **boot + master + tx ขนานผ่าน HTTP** (browser 6 concurrent)
5. `stepBoot` / `stepMaster` / TX prefetch → ใช้ผล HTTP ถ้ามี, **fallback `google.script.run` อัตโนมัติ**
6. `logAccess('Refresh')` แยก fire-and-forget → audit ยังครบ

### 🛡️ ไม่มีทางแย่ลง — ทดสอบครบ 3 เคส
| เคส | ผล |
|---|---|
| HTTP ใช้ได้ | boot+master+tx **ขนาน** · `script.run` = **0 call** ✅ |
| ยังไม่ Deploy (ตอบ HTML) | probe จับได้ → fallback ✅ |
| CORS block / fetch พัง | probe fail → fallback ✅ |

### 📉 คาด
| | |
|---|---|
| HTTP ใช้ได้ | **31.5s → ~5-8s** |
| fallback | ~12-18s (ยังได้ memoize + bundle) |

### 🔒 ความปลอดภัย
`?action=tx` เข้าถึงได้ด้วย `/exec` URL — **แต่ไม่ต่างจากเดิม**
เดิมใครมี URL ก็เปิดหน้าแล้วเรียก `google.script.run.getDataForClientTx()` ได้อยู่แล้ว (login เป็น client-side)
→ ถ้าต้องการเข้มขึ้น ต้องทำ server-side session (งานแยก)

### ⚠️ Deploy
**`Code.gs` เปลี่ยน → Deploy → New Version** (จำเป็น — ไม่งั้น `?action=ping` ตอบ HTML → fallback)

---

## 🎨 V487.0 — 8 เคส UI/UX (C1–C8)

| # | เคส | แก้ที่ | วิธี |
|---|---|---|---|
| **C1** | `FAD Unmatched` ขึ้นทุกแถว | `script_main` + `overrides` | `window.BJH_FAD_BADGE = false` → gate เฉพาะ**การแสดงผล** ไม่แตะ logic classify<br>**เหตุ:** `window.fadBills` ไม่เคยมีแหล่งข้อมูล — Sheet `fad`/`actual_fad` เก็บ**ยอดรายเดือน** ไม่มีเลขบิล 36xxx<br>ถ้าวันหลังมีข้อมูลจริง → ตั้ง `true` กลับได้ทันที |
| **C2** | 🏁 กลายเป็นบล็อกตัน | `Home` | `background-clip:text` ทำให้ตัวอักษรเป็น**หน้ากาก** ให้ gradient → **emoji สีโดนด้วย**<br>แก้: `<span class="hb-ico">🏁</span>` + คืน `-webkit-text-fill-color:initial` (ตัวหนังสือยัง gradient) |
| **C3** | Daily Board เพิ่ม Critical Down | `Home` | `_hbRenderCD()` — ใช้ `_cdBuildV2()` **ตัวเดียวกับหน้า Alert** → เลขตรงกันแน่นอน<br>4 การ์ด (ใช้ไม่ได้/ตรวจสอบ/EOL/เฝ้าระวัง) · กด → `hbGoCD()` เด้งไป Sales Prospect › Alert + กรองให้เลย |
| **C4** | การ์ดทีม Service 1/2/3 | `Home` | **SC** = SR ยังไม่ Completed · **SP** = SR ยังไม่ Completed **+ `Backlog`** (ไม่รวม `Backlog (Confirmed)`)<br>`r.sn` = JOB_STATUS (ค่าเดียวกับคอลัมน์ "สถานะงาน") · กดการ์ด → popup รายการ |
| **C5** | Critical Down `13` ซ้ำ | `SalesProspect` | เอา `<span id="cd-badge">` (badge แดง) ออก — เก็บ chip "ทั้งหมด" ไว้กดกรอง<br>JS มี `if(badge)` guard อยู่แล้ว → ไม่พัง |
| **C6** | เขตจังหวัด → Sales Areas | `Dashboard` + `script_main` | ซ่อน tab `provrep` จาก Config · เพิ่มปุ่ม **`⚙ เขตจังหวัด`** บนแท็บ Sales Areas → `openConfig('provrep')`<br>*(ไม่ย้าย HTML 20KB — เสี่ยงเกินจำเป็น)* |
| **C7** | Config ใหม่ แยกตามเมนู | `config_modal` + `script_main` | **แถบหมวด 6 กลุ่ม** เหนือ tab bar เดิม → `cfgGrp(g)` โชว์เฉพาะ tab ในหมวดนั้น<br>**ไม่รื้อ pane เดิมเลย** → `cfgTab()` ทำงานเหมือนเดิม 100% · role gate (`cfg-tab-adminonly`) ยังทำงาน |
| **C8** | คลิกเลข → copy | `overrides` | **event delegation ที่ document (capture phase)** → ครอบคลุมทุกตาราง/popup **โดยไม่แก้ render สักจุด**<br>hover = เส้นประ + cursor · click = copy + toast · `stopPropagation` กันไปเปิด popup แถว |

### 🗂 หมวด Config ใหม่ (C7)
```
🏁 Daily Board     Pending
📊 Summary         Budget · Actual FAD · Forecast Challenge · Forecast SP · SA Budget
📦 Service Orders  Quick Filter
🎯 Sales Prospect  AR Monitor · Email เบิกอะไหล่
🏷️ ชื่อ & สถานะ    Status Group · HM Stage
⚙️ ระบบ & ข้อมูล   อัพเดท Data · Users · Tab Permissions · สถิติ · API · Data Query
(ย้ายออก)          เขตจังหวัด → หน้า Sales Areas [C6]
```

### 🔍 C8 — pattern เลขที่ copy ได้
```
✅ QSC2510-14622 · QSP2504-012977 · RP26513-114570 · 36123456789 · ABC-1234567
❌ 2026-05-06 (วันที่) · ฿130,500.00 (เงิน) · 64% · Billed · HOLOGIC · ชื่อไทย
```
เกณฑ์: 6–32 ตัว · ไม่มีช่องว่าง · มีตัวเลข ≥4 ตัวติดกัน · charset `A-Z 0-9 . _ / -` · ไม่ใช่วันที่

### ✅ ทดสอบ (40/40 ผ่าน)
- `node --check` 6 ไฟล์
- **C8**: 15 pattern (6 ต้อง copy ได้ / 9 ต้องไม่)
- **C7**: 10 เคส (สลับหมวด · auto tab · provrep ซ่อน · role gate non-admin)
- **C4**: 5 เคส (SC/SP นับถูก · ไม่รวม `Backlog (Confirmed)` · case-insensitive)
- **C3**: 6 เคส (นับ 4 กลุ่ม · กดได้ · ไม่มีข้อมูล → empty state ไม่พัง)
- **C1/C5**: 4 เคส

---

## 🔌 V488.0 — HTTP fast path: ต้องใช้ `/exec` (ไม่ใช่ `/dev`)

### 🔴 สาเหตุที่ V486 HTTP ไม่ทำงาน
```
Access to fetch at 'https://script.google.com/macros/s/AKfyc.../dev?action=ping'
blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
```
`ScriptApp.getService().getUrl()` คืน **`/dev`** ตอนเปิดจาก `/dev`
→ `/dev` **ต้อง login Google** → ตอบหน้า auth ไม่ใช่ `ContentService` → **ไม่มี CORS header**
→ ต้องใช้ **`/exec`** (deployed, Access: Anyone) ซึ่ง `ContentService` ส่ง `ACAO: *` มาให้

### ✅ แก้
| ไฟล์ | แก้ |
|---|---|
| `Code.gs` | `_t.apiUrl` = Script Property **`BJH_EXEC_URL`** (ถ้าไม่มี และ `getUrl()` เป็น `/dev` → ปล่อยว่าง → fallback)<br>+ `bjhSaveExecUrl()` · `bjhSetExecUrl(url)` · `bjhShowUrls()` |
| `Index.html` | `window._API_URL='<?= apiUrl ?>'` |
| `script_main.html` | `_bjhFetchText` ใช้ `_API_URL` และ **ต้องมี `/exec`** ไม่งั้นปฏิเสธทันที (ไม่เสียเวลา probe) |

### 🔧 ตั้งค่า (ครั้งเดียว)
```
Apps Script Editor → เลือกฟังก์ชัน bjhSaveExecUrl → Run → ดู Logger
  ✅ "บันทึกแล้ว BJH_EXEC_URL = .../exec"   → เสร็จ
  ⚠️ ถ้าคืน /dev → รัน bjhSetExecUrl('https://script.google.com/macros/s/<DEPLOYMENT_ID>/exec')
```

### 📊 V487 breakdown (ก่อนแก้)
```
29.1s = sheets 5.8 | master 7.5 | tx 7.3 | etl 5.5 | override 0.0 | render 0.2
[v485] bootBundle 1 call = 5.3s (แทน 5 calls)        ← เดิม config อย่างเดียว 14.6s ✅
sheets (ขนาน): config=5.8 actual=5.8 lowfc=5.8       ← มาพร้อมกัน = 1 call จริง ✅
override=0.0s                                        ← edits+notes มาใน bundle = 0 call ✅
[TX] fetch=15.3s | decompress 0.6 | jsonParse 0.1 | classify 0.2 | init 0.1
```
**ประมวลผล = 1.0s · ที่เหลือ 20s = `google.script.run` ล้วนๆ** → HTTP กินตรงนี้

### 📉 คาดหลังตั้ง `/exec`
`master 7.5 + tx 7.3 + etl 5.5 (20.3s)` → **~3-5s** ⇒ รวม **~10-12s**

---

## 🔧 V489.0 — การ์ดทีม: แสดงสถานะงาน SR + แก้บั๊ก C4

### 🔴 บั๊กที่เจอตอนทำ (C4 ของ V487 นับผิด)
`JOB_STATUS` (`r.sn`) มีค่า **3 แบบที่แปลว่า "จบ"**:
```
Completed · PO Completed · Contract Completed   -> ✅ จบแล้ว
Canceled                                        -> ❌ ยกเลิก
Delegated                                       -> 👤 มอบหมายต่อ
อื่น ๆ                                           -> ⏳ กำลังทำ
ว่าง / None                                     -> —  ไม่มี SR
```
V487 เช็คแค่ `sn === 'completed'` → **`PO Completed` / `Contract Completed` ถูกนับเป็น "ยังไม่จบ"** 🔴
→ แก้เป็น `_srBucket()` — `indexOf('completed') >= 0`

### ✨ เพิ่ม: chips สถานะ SR บนการ์ด
```
Service 1  🩻 Imaging
  SC   2 ยังไม่จบ  / 5 งาน
  SP   2 ยังไม่จบ  / 2 BL
  ─────────────────────────
  ✅ 3   ⏳ 1   👤 1   ❌ 1   — 1      ← กดได้ (เปิด popup เฉพาะกลุ่ม)
  งานเดือนนี้ 7          จบแล้ว 43%
  [▓▓▓▓░░░░░░]
```
- **hover** = tooltip บอกชื่อสถานะจริง + จำนวน (เช่น `จบแล้ว — Completed (2) · PO Completed (1)`)
- **click** = `hbShowSvcSr(tm, bucket)` → popup รายการเฉพาะกลุ่มนั้น
- ขอบเขต = SC ทั้งหมด + SP `Backlog` (ตรงกับที่การ์ดนับ) → **ผลรวม chips = SC+SP เสมอ ไม่ตกหล่น**

### ✅ ทดสอบ 21/21
- bucket mapping 11 เคส (รวม `null`, `''`, `None`, `Cancelled`)
- FIX: `PO/Contract Completed` → นับเป็น "จบ" ✓
- `Backlog (Confirmed)` / `Ordered` → ไม่นับใน SP ✓
- ผลรวม chips = SC+SP ✓

---

## 📐 V490.0 — Config กว้างขึ้น + จัดแถบ

| แก้ | เดิม | ใหม่ |
|---|---|---|
| **ความกว้าง modal** | `min(720px, 96vw)` | **`min(1400px, 96vw)`** |
| ความสูง | `min(640px, 92vh)` | `min(820px, 92vh)` |
| **แถบหมวด** | `overflow-x:auto` → "ระบบ & ข้อมูล" โดนตัด | **`flex-wrap:wrap`** → เห็นครบ |
| **แถว tab** | แตกเป็น 2 บรรทัด มีเส้นคั่นกลาง | ซ่อนแถวที่ไม่เหลือปุ่ม · ตัดเส้นคั่นเมื่อโชว์ 2 แถว → **ดูเป็นแถบเดียว** |

### 🔴 บั๊กที่เจอตอนทดสอบ
`sgroup` / `hmstage` / `users` … **ไม่มี class `cfg-tab-adminonly`** แต่ถูกซ่อนเพราะอยู่ใน **แถว `cfg-tabs-admin`** (ซ่อนทั้งแถวตาม role)
→ V490 แรกนับเป็น "เห็นได้" → **non-admin เห็นหมวด "ชื่อ & สถานะ" ที่ว่างเปล่า**

**แก้:** `window._cfgTabOK(k, adm)` เช็ค **2 ชั้น**
```js
1) class cfg-tab-adminonly       (qfchips / dataquery / provrep)
2) parentElement.id === 'cfg-tabs-admin'   (sgroup / hmstage / users / …)
```

### ✅ ทดสอบ 14/14
- หมวด `sys` (ปุ่มอยู่ 2 แถว) → เชื่อมเป็นแถบเดียว
- หมวด `home` (แถว main) / `status` (แถว admin) → ซ่อนแถวว่าง ไม่มีเส้นลอย
- **non-admin** → แถว admin ซ่อนตลอด ✓ ไม่รั่ว · ซ่อนหมวดที่ไม่มี tab
- **admin** → เห็นครบ 6 หมวด

---

## 🗾 V491.0 — FIX C6: ปุ่ม "เขตจังหวัด" ใส่ผิดที่

### 🔴 บั๊ก (V487)
ผมใส่ปุ่มต่อจาก `db-fbtn-salesarea` — ซึ่งอยู่ใน **แถว filter ของ Dashboard**
แต่พอเข้าหน้า **Sales Areas** แถวนั้น**ถูกแทนที่**ด้วย toolbar ของตัวเอง:
```
[← กลับ Dashboard] [Service Commercial Team] ....... [⚙ จัดกลุ่ม รพ.] [🗺 แก้พื้นที่ รพ.]
```
→ **ปุ่มไม่โผล่**

### ✅ แก้
ย้ายไปสร้างใน `tbTop` (toolbar จริงของหน้า Sales Areas — generate ด้วย JS)
```
[← กลับ Dashboard] [Service Commercial Team] ... [⚙ จัดกลุ่ม รพ.] [🗺 แก้พื้นที่ รพ.] [🗾 เขตจังหวัด]
```
+ ลบปุ่ม `db-fbtn-provrep` เก่า + toggle ที่ไม่ใช้แล้วออก

### ✅ ทดสอบ 7/7
รัน generator `tbTop` จริงใน `vm` → ปุ่มครบ 5 ตัว · เรียก `openConfig('provrep')` · อยู่ขวาสุด

### 📌 บทเรียน
**ปุ่มบนหน้าที่ generate ด้วย JS ต้องใส่ในตัว generator ไม่ใช่ใน HTML static**
Dashboard มี toolbar 2 ชุด: แถว filter (static HTML) กับ `tbTop` (JS สร้างตอนเข้า Sales Areas)

---

## ⚠️ ต้องทำหลัง Deploy (สำคัญมาก)

1. **`Code.gs` เปลี่ยน → Deploy → New Version** (ไม่ใช่แค่ Ctrl+S)
2. **รัน `smartflowSyncToDrive()` ด้วยมือ 1 ครั้ง** (TX)
3. **รัน `smartflowDailySyncToDrive()` ด้วยมือ 1 ครั้ง** (MASTER)
   → ถ้าไม่รัน ไฟล์บน Drive ยังเป็นตัวเก่า (อ้วน) อยู่
4. เปิด dashboard → กด **Full Reload**
5. **เช็ค console:**
   - `[SLIM GUARD] field วิกฤตครบทุกตัว` (เขียว) = ✅ ผ่าน
   - `[SLIM GUARD] field วิกฤตหายไป N ตัว` (แดง) = 🔴 ตัดเกิน → เอาชื่อออกจาก `BJH_EX_COL`
6. **ทดสอบ:** Install Base · Territory Map (จังหวัด) · ค้นหา SN · popup ประวัติ MC · SalesProspect

### 🔙 Rollback
`BJH_EX_COL_OFF = true` ใน `Code.gs` → Deploy → รัน sync ทั้ง 2 ตัว

---

## 📊 ข้อเท็จจริงที่ยืนยันแล้ว (จากข้อมูลจริง)

| | ก่อน | หลัง slim |
|---|---|---|
| `bjh_tx.json.gz` (base64) | 5.74 MB | ~2.9 MB |
| `bjh_master.json.gz` (base64) | 5.08 MB | ~2.6 MB |
| **JSON ที่ client parse** | **131.5 MB** | **67.3 MB** |
| rows รวม | 43,747 | 43,747 (เท่าเดิม) |
| fields | 289 | 182 (ตัด 107) |
| **เปิดหน้า (คาด)** | 30–60s | **~15–25s** |

### จำนวน rows ต่อ table
`RAW_SC_BILL` 4,488 · `RAW_SpareParts` 3,376 · `RAW_Quotation` 5,731 · `RAW_Quotation_SP` 5,163 ·
`RAW_MC_STATUS_HISTORY` 996 · `RAW_CONTRACT` 5,420 · `RAW_CUSTOMER` 1,147 · `RAW_INSTALLATION` 17,426

---

## 🚨 6 field ห้ามใส่ใน `BJH_EX_COL` เด็ดขาด

| field | ใช้ที่ | ถ้าตัด |
|---|---|---|
| `INSTALL_STATUS` | `script_main` filter `==='0'` | Install Base ว่างหมด |
| `MC_STATUS_HISTORY` | SalesProspect (6 จุด) | popup ประวัติ MC พัง |
| `QH_SUBJECT_EMAIL` | SalesProspect ค้นหา SN | ค้นซีเรียลไม่เจอ |
| `CUS_ID` | join จังหวัด | จังหวัดหายหมด |
| `NOTE_LOG` | SalesProspect / DailySales | หา "X ปี" ไม่ได้ |
| `PROVINCE` | Territory Map | แผนที่พัง |

> **5 ตัวแรกเคยอยู่ใน `_SLIM_CUT_ARR` เดิม** — ไม่พังเพราะ slim ทำงาน *หลัง* ETL
> ย้ายไปต้นทางจะพังทันที → **`_bjhSlimGuard()` จับให้แล้ว**

---

## 🔑 API: SmartFlow `ex_col=`

```
GET /CREATE_JSON_FILE_RAW_API/?format=gzip&datasets=<...>&ex_col=<107 fields>
Authorization: Bearer <token>   (อายุ 1 วัน)
```

**สำคัญ:** SF ใช้ชื่อ param **`ex_col=`** (ไม่ใช่ `exclude=`)
- รูปแบบ: **ชื่อ field ล้วน** ไม่มี `TABLE.` นำหน้า
- ขอบเขต: ตัด **ทุก dataset พร้อมกัน** (global) + nested arrays · **case-insensitive**
- ✅ ตรวจแล้ว: **ไม่มี field ไหนที่ต้องตัดใน table หนึ่งแต่เก็บในอีก table** → global ปลอดภัย
- `meta.unmatched_excluded_columns` = ชื่อที่ส่งไปแต่ไม่มีจริง (ใช้ตรวจพิมพ์ผิด)

### ⚠️ URL length (เพดาน 2,048 chars — Apps Script UrlFetch)
- **ห้าม `encodeURIComponent()` เต็ม** กับ `ex_col` → comma กลายเป็น `%2C` (3 เท่า) → ชน limit
- ใช้ `encodeURIComponent(s).replace(/%2C/g, ',')`
- **แยกรายการต่อกลุ่ม** (TX/MASTER) ไม่ส่งรวม
- ถ้าจะเพิ่ม field ใน `BJH_EX_COL_*` → เช็ค log `[SLIM] ... URL=NNNN/2000 chars`

**อ้างอิงเต็ม:** `BJH_SmartFlow_API_Guide.md` · `BJH_Data_Dictionary.xlsx`

---

## ⏭️ งานถัดไป (เรียงตามผลลัพธ์)

### 1. 💎 `NOTE_LOG` บีบ 96% ← คุ้มสุด
| | |
|---|---|
| ขนาดรวม (3 tables) | **34.4 MB** |
| entries/row | เฉลี่ย **16.6** · สูงสุด **4,557** |
| **โค้ดใช้จริง** | **แค่ entry ล่าสุด** (`.slice(-1)`, `parseLastNote()`) |
| ถ้าส่งแค่ล่าสุด | **34.4 MB → 1.4 MB** |

**→ ขอ SF เพิ่ม param เช่น `note_log=last` / `note_log_limit=1`**
**→ รวมกับ ex_col: 131.5 MB → 33.9 MB (ลด 74%) → เปิดหน้า ~8–12s**

### 2. `bjh_agg.json.gz` — precompute (เฟส 3)
trigger คำนวณ stats/S-Curve/ranking ล่วงหน้า → ไฟล์ ~200 KB
→ **Dashboard เปิด 1–2s** + **ทุกคนอ่านก้อนเดียวกัน = เป็นไปไม่ได้ที่เลขจะต่างกัน**

### 3. Manifest + snapshot_id (เฟส 4)
`bjh_manifest.json` (~200B) + IndexedDB gate + badge "ข้อมูล ณ 14 ก.ค. 14:00"
→ เปิดครั้งที่ 2+ ของวัน = **~1s**

### 4. เลิกใช้ `customer_province.json`
`RAW_CUSTOMER.PROVINCE` มีข้อมูล **1,141/1,147 = 99.5%** (77 จังหวัด)
→ ดึงจาก master แทน · ลด server call 1 ตัว · **ไฟล์บน Drive เหลือ 3**
> ⚠️ ต้อง normalize ชื่อจังหวัด (trim + ตัด "จ."/"จังหวัด") ก่อนเปลี่ยน ไม่งั้น Territory Map อาจ match ไม่ตรง

### 5. 🐛 ScriptCache ไม่เคยทำงาน
`getDataForClientMaster()` มี guard `if (masterContent.length <= 100000)` แต่ไฟล์เป็น MB
→ **`sc.put()` ไม่เคยถูกเรียก** · `getDataForClientTx()` ไม่มี cache เลย
→ แก้ตอนทำเฟส 3/4 (ต้อง chunk เพราะ CacheService จำกัด 100KB/key)

### 6. Renewal Prediction Dashboard (ค้างจากเดิม)
`Renewal.html` แยกจาก Index/SalesProspect · Installation Base + SC contracts
predict: customer_id + brand + model match = renewed · Section A(KPI) + B(Gap) + C(Funnel)

---

## 🧭 หลักการสำคัญ (คงเดิม)

- **`overrides.html` always wins** — โหลดหลัง `script_main`/`body_app_top` → override ทุก function ชื่อซ้ำ
- **Bundle base ต้องตรงเป๊ะ** — ยืนยันด้วย `_BUILD_VER` ใน `overrides.html` ไม่ใช่เลขชื่อไฟล์
- **ห้าม patch base เก่า** — ต้อง rebase บนไฟล์ล่าสุดเสมอ
- **`SalesProspect.html` เป็น IIFE** — function ที่เรียกจาก HTML attribute ต้อง `window.fn = fn`
- **`Code.gs` เปลี่ยน → Deploy → New Version** · HTML อย่างเดียว → Ctrl+S ใน /dev พอ
- **cache ปิดอยู่** (V479.59) — ทุกคน full reload สด → ตรงกันแต่ช้า
- **`_slimRows()` ใน `script_main` = safety net** — เมื่อ `ex_col` ทำงานแล้วมันกลายเป็น no-op โดยอัตโนมัติ (ไม่พัง)
- **Thai strings ใน heredoc พัง** → ใช้ Python patch script เขียนลงไฟล์
- **แก้ไฟล์ด้วย `str.count()==1` assert แล้ว `str.replace()`** (ไม่ใช้ regex)

---

## ✅ การทดสอบรอบนี้

- `node --check` ผ่านทั้ง 3 ไฟล์ (`Code.gs`, `script_main.html`, `overrides.html`)
- `vm` sandbox: รัน `_bjhSlimGuard()` กับข้อมูลจริง → **field วิกฤตครบทุกตัว**
- negative test: จำลองตัด `INSTALL_STATUS`+`CUS_ID` → **guard จับได้**
- pipeline: `RAW_INSTALLATION` filter `==='0'` → **10,579 rows** (ไม่ว่าง)
- `PROVINCE` 1,141/1,147 · `NOTE_LOG` 5,420 · `QH_SUBJECT_EMAIL` 2,267 · `MC_STATUS_HISTORY` 17,426 → ครบ
- **URL length**: รัน `Code.gs` จริงใน `vm` → TX **1,395** / MASTER **669** chars (เพดาน 2,048) ✅
- **rollback test**: `BJH_EX_COL_OFF=true` → URL ไม่มี `ex_col` (ดึงเต็ม) ✅
- **ไฟล์อื่น**: `_bjhExColFor_('other.json')` → `''` (ไม่ตัด) ✅
- 🐛 **แก้บั๊ก 2 ตัว:** (1) URL ชน 2048 limit · (2) guard เคยอยู่หลัง `</script>`
