# STATE — BJH Revenue Dashboard
อัปเดต: 3 ส.ค. 2569 · เวอร์ชันล่าสุด **V654.0**

---

## กติกาการส่งงาน
ส่ง **ไฟล์เดียวต่อรอบ** = `patch_Vxxx.ps1` · guard รับหลาย minor
**สะสมให้ครบ 3 เรื่องก่อนเขียนโค้ด** · patch ที่ยังไม่ได้ลง ให้ยุบรวมกับตัวถัดไป
**STATE.md ไม่ต้องส่งเป็นไฟล์แยก** — ฝังใน `.ps1` เขียนทับ + `git push` ให้เอง

### 🔴 กฎที่ต้องเช็คทุกครั้ง
**`overrides.html` โหลดทีหลัง `script_main.html` จึงทับเสมอ**
**ก่อนแก้ฟังก์ชันใดๆ ให้ `grep` ชื่อฟังก์ชัน/ตัวแปรใน `overrides.html` ก่อน**

**ไฟล์ .txt / .log ที่แนบมา มาถึงเป็นค่าว่างเสมอ** — ให้วางเป็นข้อความ หรือส่ง .csv / .xlsx / .pdf / .docx

---

## รอบนี้ (V654.0) — 4 เรื่อง · แตะ 5 ไฟล์ · **ต้อง Deploy → New Version**

### 1. ปุ่ม Clear หน้า Alert กดแล้วไม่จำ — FIX
ต้นเหตุ: V601 เขียนฝั่ง client ครบ แต่คอมเมนต์เขียนว่า "ไม่ต้องแตะ Code.gs" ซึ่งเข้าใจผิด
`_cdSaveCleared()` ยิง `saveConfigSection({section:'cd_cleared'})` → `Code.js` ไม่มี section นี้ → **ตกทุกเงื่อนไข ไม่เขียนอะไรเลย ไม่ error ด้วย** (บั๊กเงียบเต็มรูปแบบ)

แก้ 2 จุดใน `Code.js`
- `saveConfigSection` — เติม `|| section === 'cd_cleared'` เข้ากลุ่ม string-map เดิม (ใช้ `_ckvWriteSection` ตัวเดียวกับ `quote_notes`)
- `_getConfig_` — เพิ่ม passthrough `config.cd_cleared` ต่อจาก `quote_notes` → `_qnLoadNotes()` อ่านเข้า `window._CD_CLEARED` ได้จริงตอน boot

`SalesProspect.html` ไม่ต้องแตะ · `_ckvWriteSection` เขียนทับทั้ง section → กด undo แล้วคีย์หายจากชีตจริง

### 2. สิทธิ์ BG Monitor / Weekly Report
2 แท็บนี้ไม่เคยอยู่ใน `TABS[]` / `_TAB_PERM_KEYS` / `map{}` → คุมสิทธิ์ไม่ได้ ทุกคนเห็น
- `script_main.html` — เพิ่ม `sp_bg` / `sp_weekly` ใน `_TAB_PERM_DEFAULT` + `_TAB_PERM_KEYS` + `TABS[]`
- `SalesProspect.html` — เพิ่มใน `DEF{}` และ `map{}` ของ `spApplyTabPermissions` (ปุ่ม `sp-tab-bg` / `sp-tab-weekly` มีอยู่แล้ว)
- default = เปิดครบทุก role (คงพฤติกรรมเดิม)

### 3. สิทธิ์ Admin/Manager ใน MA After Sales
MA ไม่มี role check เลยสักบรรทัด — ใครเปิดเข้าได้ก็กดอนุมัติ / แก้ Config ได้หมด
- key ใหม่ `ma_verify` (ตรวจสอบ/อนุมัติ) · `ma_config` (⚙ Config)
- `MA.html` — เพิ่ม `maCanPage()` · `go()` เช็คก่อนสลับหน้า + ซ่อนปุ่ม `nav-verify` / `nav-config`
- default: `ma_verify` = admin + manager · `ma_config` = **admin เท่านั้น**
- guard: `_TAB_PERMISSIONS` ว่าง (config ยังไม่โหลด) → ไม่ล็อก กันซ่อนหมดตอน boot

### 4. ไฟล์แนบไม่แสดงในหน้า Manager
`vFillExtra` ไม่เคยอ่าน `req.attach_urls` เลย — ไฟล์อัปขึ้น Drive แล้วแต่คนอนุมัติไม่เห็น
- `MA.html` — เพิ่ม `div#v_attach` ใต้ตารางเครื่อง + `vRenderAttach()` แสดงลิงก์เปิดแท็บใหม่
- **ข้อจำกัด:** `attach_urls` เก็บแต่ URL ไม่เก็บชื่อไฟล์ และ `attachUrls()` ตัดค่าว่างทิ้ง (`filter(Boolean)`) → แนบแค่สเปคจะเลื่อนมาเป็นตัวแรก แยกไม่ออก **จึงแสดงเป็น "ไฟล์แนบ 1 / 2"** ต้องเปิดดูถึงจะรู้ว่าใบไหน
- อยากได้ชื่อจริงต้องแก้ format ที่บันทึก = กระทบใบเก่า → แยกรอบ

### กันแท็บใหม่หายตอนอัป — `_TAB_PERM_NEWKEYS_DEF`
`applyConfig` เดิมวน `_TAB_PERM_KEYS` แล้วเซ็ต **all-false** ให้ทุก key ที่ไม่มีในชีต
→ ถ้าเพิ่ม key เฉยๆ ทุกคนจะมองไม่เห็นแท็บทันทีที่อัป จนกว่าแอดมินจะเข้าไปติ๊ก
แก้: key ที่อยู่ใน `_TAB_PERM_NEWKEYS_DEF` และยังไม่มีในชีต ให้ใช้ค่า default แทน all-false
**key เก่าคงพฤติกรรมเดิมทุกตัว** · พอแอดมินกด Save ครั้งแรก ค่าเข้าชีตแล้วชีตคุมตามปกติ

---

## ทดสอบ
- `node --check` 6 บล็อกผ่านหมด (ดึง `<script>` จาก html มาเช็คทีละบล็อก)
- jsdom/vm **84/84 ผ่าน** — ตัดโค้ดจากไฟล์ที่ patch แล้วมารันจริง ไม่มีฟังก์ชันจำลอง
  - `saveConfigSection('cd_cleared')` เขียนจริง · undo แล้วคีย์หาย · `quote_notes` ไม่พัง
  - passthrough `config.cd_cleared` · คีย์ค่าว่างถูกตัด · `ckv` ว่างไม่พัง · `_qnLoadNotes` รับค่าเข้า `_CD_CLEARED`
  - KEYS 27 → 31 ไม่ซ้ำ · UI Config มีครบ 4 แถว 3 ช่อง
  - key ใหม่ไม่โดนปิดตอนอัป · key เก่ายังปิดหมดเหมือนเดิม · ค่าในชีตชนะ default
  - `spApplyTabPermissions` ซ่อน/โชว์ bg + weekly ตาม role · แท็บอื่นไม่กระทบ
  - `vRenderAttach` 0/1/2 ไฟล์ · null ไม่พัง · escape XSS · ตัดค่าว่างคั่น
  - `maCanPage` ครบ 3 role × 5 หน้า · config ยังไม่โหลดไม่ล็อก
  - `overrides.html` ไม่มีตัวทับฟังก์ชันที่แก้ทั้ง 5 ตัว

## วิธีลง
```powershell
cd C:\bjh-dashboard
& .\patch_V654.ps1
```
guard: รับ V653.x · **แตะ `Code.js` → ต้อง Deploy → New Version** (สคริปต์ create-deployment ให้แล้ว)
หลังลง: Ctrl+Shift+R แล้วกด **Load Data** สด (cache ไม่ re-classify)

---

## สถานะระบบ
- **Tools → ตั้งราคาสัญญาบริการ**: ปุ่ม 📈 Analysis · ฝัง Incident 124 รุ่น (1 ส.ค. 68 – 31 ก.ค. 69) · เลือกประเภท 3 แบบ (รวมทุกชิ้น / รวมยกเว้น / ไม่รวมยกเว้น)
- **MA After Sales**: Admin คีย์ → ดูร่าง → ราคามาตรฐานออกเอง / ไม่ครบส่ง Manager · ใบที่ออกแล้วล็อก · เอกสาร 2 ภาษา · **[V654] คุมสิทธิ์หน้าตรวจสอบ/Config แล้ว + เห็นไฟล์แนบแล้ว**
- **Alert**: **[V654] ปุ่ม Clear จำค่าข้ามการโหลดได้แล้ว** (ผูกกับเลข SR ไม่ใช่ SN)

---

## ผลวิเคราะห์ราคา (Excel `service_pricing_model.xlsx`)
```
ราคา = Incident/ปี × ค่าแรงต่อ Incident ÷ (1 − margin)   ·   Incident = PM + CM
ต้นทุน/Incident 9,700 = ช่าง 2 วัน × 3,000 + ที่พัก 700 + เดินทาง 3,000
PM เฉลี่ย 1.9 (96% อยู่ 1–3) · CM เฉลี่ย 0.5 ครั้ง/เครื่อง/ปี
margin 50% → 42 รุ่น · 395 เครื่องต่ำกว่าฐาน → +8.1 ล้าน/ปี
```
**ราคาใหม่ = สูงกว่าระหว่าง [ราคาปัจจุบัน] กับ [ราคาฐาน] — ไม่ลดราคาใคร**
**ผู้บริหารเคาะ 2 ตัว** — ค่าแรงต่อ Incident · margin

---

## ค้างอยู่
**ตั้งราคากลุ่ม**
- ตั้งไปแล้ว **1 / 154 แบรนด์** — ทำ 18 กลุ่มที่คุมหลายรุ่นก่อน (350+ เครื่อง) แล้วต่อรุ่นเดี่ยวที่เครื่อง > 20

**MA After Sales**
- ⬜ ยังไม่ทดสอบเส้นทาง "ส่ง Manager" กับใบจริง — **V654 แก้เรื่องไฟล์แนบ + สิทธิ์แล้ว รอบนี้เทสได้ครบเส้น**
- ⬜ ยังไม่กรอกข้อความ EN ลง Config (แปลไว้แล้วในแชท + `MA_service_proposal_template.docx`)
- ⬜ ยังไม่ตรวจข้อความ default ใน Config
- หัวกระดาษใช้ `companyName` จาก Config — อยากได้ **BJCHealthcare** แก้ใน Config ได้เลย
- ยังไม่มีปุ่ม "สร้างคำขอใหม่จากใบนี้"
- ชื่อไฟล์แนบ — ต้องแก้ format `attach_urls` (กระทบใบเก่า) แยกรอบ
- **text layer ใน PDF เพี้ยน** — ก็อปได้ `ปีที่ปีที่` `เป็นป็` (หน้าจอถูก) จากการฝังฟอนต์ไทย

**อื่นๆ**
- แท็บ 4 อะไหล่: UI ตาม mockup v5 · ปุ่มรายงาน 1 หน้า A4 · Battery ชื่อซ้ำ
- Performance: sheets 4.7s + ETL 3.9s · 6 mobile menus · Renewal.html · M3 SR (blocked) · M8 mobile black screen

## คำขอถึง SmartFlow
1. ใบเสนอราคา — เพิ่ม `BRAND` / `MODEL` / `SN`
2. RAW_CONTRACT สัญญาเหมา — ระบุ SN เครื่องที่คลุม
3. จำนวน PM ที่ระบุในสัญญา

## ดองไว้ตั้งใจ — ห้ามเสนอซ้ำ
- V610 "อะไหล่รอในคลัง" + "ติดตามสัญญา" · % โอกาสเสียรายปี · ใบเสนอราคาเข้าหน้าราคาอ้างอิง
- Template 5 Level (V635) · ช่องขอส่วนลด (V640) · คอลัมน์ "รวมอะไหล่" ในตัวแก้ไขกลุ่ม (V644)
- B20 hospital→sales mapping · SP reconciliation · MDCollection.html · ServiceMix.html · AR Monitor · NOTE_LOG SmartFlow parameter

---

## เกร็ดที่ได้รอบนี้
- **คอมเมนต์ในโค้ดโกหกได้ ชีตโกหกไม่ได้** — V601 เขียนไว้ว่า "ไม่ต้องแตะ Code.gs" แล้วทุกรอบถัดมาก็เชื่อตามนั้น ทั้งที่ `grep 'cd_cleared' Code.js` ได้ 0 บรรทัดตั้งแต่วันแรก · **เจอฟีเจอร์ที่ "บันทึกแล้วไม่จำ" ให้ grep ชื่อ section ฝั่ง backend ก่อนเป็นอย่างแรก**
- **`saveConfigSection` ไม่มี else** — section ที่ไม่ตรงเงื่อนไขไหนเลยจะ "ผ่าน" ไปเงียบๆ ไม่ throw ไม่ log · ฝั่ง client `withSuccessHandler` ก็ยิงปกติ ดูเหมือนบันทึกสำเร็จทุกประการ
- **การเพิ่ม key เข้า `_TAB_PERM_KEYS` = ปิดสิทธิ์ทุกคนทันที** ไม่ใช่แค่ "เพิ่มตัวเลือกใน Config" — เพราะ `applyConfig` เซ็ต all-false ให้ทุก key ที่ไม่มีในชีต · เกือบพลาดรอบนี้ ถ้าไม่ไล่อ่าน `applyConfig` ก่อน แท็บ BG/Weekly จะหายจากจอทุกคนทันทีที่อัป
- **ฟีเจอร์ที่ "ไม่มีสิทธิ์เลย" อันตรายกว่าฟีเจอร์ที่สิทธิ์ผิด** — MA เปิดมาตั้งแต่ V445 โดยไม่มี role check สักบรรทัด ใครเปิดเข้าได้ก็กดอนุมัติได้ ไม่มีใครสังเกตเพราะมันไม่เคยพัง
- **เทสฟังก์ชันใหญ่ที่พึ่ง GAS API ทั้งก้อนไม่คุ้ม** — `_getConfig_` ลาก `PropertiesService` / `_qnoReadAll` มาเป็นพรวน · ตัดเฉพาะบล็อก `if (ckv.xxx …)` จากไฟล์จริงมารันได้ผลเท่ากันและไม่ต้อง stub ทั้งระบบ
