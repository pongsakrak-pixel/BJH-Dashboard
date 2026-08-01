# STATE — BJH Revenue Dashboard
อัปเดต: 31 ก.ค. 2569 · เวอร์ชันล่าสุด **V629.0**

---

## กติกาการส่งงาน
ส่ง **ไฟล์เดียวต่อรอบ** = `patch_Vxxx.ps1` (ฝัง .html gzip+base64 · verify SHA · เขียน STATE.md ลง repo · push เอง)

---

## รอบนี้ (V629.0) — รวม 2 เรื่อง

> **patch_V628_1.ps1 ถูกยุบรวมมาไว้ในตัวนี้แล้ว ไม่ต้องรันตัวนั้น** (ตอนนั้นยังไม่ได้ลง)

### A. HOTFIX — แท็บ SP กดไม่ติด
```
Uncaught ReferenceError: warn is not defined
  at _pbHtmlSP -> pbRender -> pbSetTab
```
ต้นเหตุ: V627 ถอด ⚠ ออกแล้วลบ `warn = st.modeN < 2` ทิ้ง แต่ `<tr>` ยังใช้คุม opacity อยู่ 1 จุด
แก้: ใช้ `_pbTone(st.modeN)` แทน → SP ได้โทนเดียวกับ SC ไปด้วย (ซ้ำ ≥3 เต็มสี · 2 หรี่ .82 · 1 หรี่ .62)

### B. ลบปุ่ม ↻ Update
**เหตุผล:** ปุ่มเรียก `bjhUnifiedRefresh()` → `bjhFullReload()`
ซึ่งเป็น**ฟังก์ชันเดียวกับที่ boot เรียกตอนเปิดหน้า** (`script_main` บรรทัด ~6773)
→ กดปุ่ม = F5 ทุกประการ · และ F5 ดีกว่าด้วยซ้ำ เพราะโหลด HTML/JS ใหม่ด้วย ปุ่มไม่ได้โหลดโค้ด

- ลบเฉพาะ `<button>` ใน `body_app_top.html`
- **คงฟังก์ชัน `bjhUnifiedRefresh` / `bjhRefreshData` ไว้** — ยังมีที่เรียกอยู่:
  `script_main:9265` SWR เงียบหลังโหลด 5 วิ · `script_main:9659` auto hard refresh 3 วิ
- `bjhRefreshData` หา `getElementById('gas-refresh-btn')` แล้ว guard `if (!silent && btn)` → ไม่มีปุ่มก็ไม่พัง
- `_setUILock` regex ยกเว้นปุ่มที่มี onclick `bjhUnifiedRefresh` → ไม่มีปุ่มก็แค่ไม่ match เฉยๆ
- **แก้ tooltip ที่ยังบอกให้กดปุ่ม** (`body_app_top:293`) → เปลี่ยนเป็น "รีเฟรชหน้า (F5)"

---

## ทดสอบ
- `node --check` ผ่านทั้ง 3 ไฟล์
- **V629: 15/15 ผ่าน** — ปุ่มหาย · จำนวน `<button>` ลด 1 ตัวพอดี · theme/logout ยังอยู่ · แท็ก balance · ไม่เหลือข้อความชี้ไปปุ่มที่ลบแล้ว (ยกเว้นในคอมเมนต์)
- **hotfix SP: 12/12 ผ่าน** — รัน `_pbHtmlSP()` ของจริงใน vm (stub 5 ตัว) ไม่ throw · opacity ถูกตามจำนวนซ้ำ
- diff: SalesProspect 10 · body_app_top 7 · overrides 4 · บรรทัดสุดท้ายเหมือนเดิมทุกไฟล์

---

## วิธีลง
```powershell
cd C:\bjh-dashboard
& .\patch_V629.ps1
```
guard: ฐานต้องเป็น V628.0 · ไม่แตะ Code.gs · ไม่ต้อง Load Data สด
**หลังลงเสร็จ ให้ F5 เอง** (ไม่มีปุ่ม Update แล้ว)

---

## ข้อเท็จจริงเรื่องการรีเฟรช (จบแล้ว — ห้ามรื้อ)
```
เปิดหน้า / F5  →  boot line ~6773  →  bjhFullReload()
ปุ่ม Update    →  bjhUnifiedRefresh() →  bjhFullReload()   ← ตัวเดียวกัน
```
- **ไม่มี cache แล้วตั้งแต่ V479.59** → เปิดหน้าครั้งแรก = FULL RELOAD เสมอ
- `bjh_force_drive` sessionStorage เป็น**โค้ดตาย** — อ่านที่ `script_main:6767` แล้วลบทิ้ง แต่ไม่ได้เอาไปใช้ต่อ (ยังไม่ลบ เพราะแตะ boot logic ต้อง confirm ก่อน)
- `bjhHardRefresh` (ตัวที่มี top-nav + cache-bust `?v=`) **ไม่มีปุ่มไหนเรียกแล้ว** ตั้งแต่ v429 · เหลือที่เรียกจาก `script_main:9659` เท่านั้น

---

## ค้างอยู่
**แท็บ 4 อะไหล่** (ตรรกะแก้แล้ว V626 · UI ยังไม่ทำ)
- หน้าตาตาม mockup v5 (Top 10 + แถบ % + เรียงใหม่)
- ปุ่มรายงาน 1 หน้า A4 ส่งลูกค้า (print/PDF)
- **Battery ชื่อซ้ำ** — `Battery 12V/9AH Yuasa (NPW53-12)` 30 เครื่อง + `Battery 12V/9Ah` 15 เครื่อง เป็นชิ้นเดียวกัน สถิติโดนผ่าครึ่ง ต้องมี Config กลุ่มอะไหล่
- **ยังไม่ได้ยืนยันด้วยตา** ว่าแถบฐานขึ้น 165 เครื่อง (ไม่ใช่ 107)

**อื่นๆ**
- Performance: sheets 4.7s + ETL 3.9s
- 6 mobile menus · Renewal.html · M3 SR (blocked) · M8 mobile black screen
- Hardware List ฝั่ง SP (`renderSPDetail`)
- ชิป Sale Order ถ้าขึ้น `(0)` → ไล่ `_spPartsInfo(qn).hasBill`
- `_PB_SVC_RX` มี 2 ชุด (แท็บ 4 + หน้าราคา) ควรยุบเป็นตัวเดียว
- `_forceDrive` + `bjhHardRefresh` เป็นโค้ดตาย — เก็บกวาดได้ถ้าอยาก (แตะ boot ต้อง confirm)

## คำขอถึง SmartFlow
1. ใบเสนอราคา — เพิ่ม `BRAND` / `MODEL` / `SN` (ตอนนี้ไม่มีเลย ทำราคาอ้างอิงไม่ได้)
2. RAW_CONTRACT สัญญาเหมา — ระบุ SN เครื่องที่คลุม

## ดองไว้ตั้งใจ — ห้ามเสนอซ้ำ
- V610 "อะไหล่รอในคลัง" + "ติดตามสัญญา"
- % โอกาสเสียรายปี — ข้อมูลมีแค่ 2.6 ปี
- ใบเสนอราคาเข้าหน้าราคา — รอ SmartFlow เพิ่มฟิลด์

---

## เกร็ดที่ได้รอบนี้
- **อ่านโค้ดให้ถึงตัวที่ถูกเรียกจริง** — รอบก่อนผมอธิบายปุ่ม Update ผิด เพราะไปอ่าน `bjhHardRefresh` ซึ่งปุ่มเลิกเรียกตั้งแต่ v429 · ต้องไล่จาก `onclick` ในไฟล์ HTML ไม่ใช่เดาจากชื่อฟังก์ชัน
- **ลบ UI ต้องลบข้อความที่อ้างถึงด้วย** — เจอ tooltip บอก "กด ↻ Update" ค้างอยู่ (บทเรียนเดียวกับ V627 ที่ลบ ⚠ แล้วลืมคำอธิบาย) · ครั้งนี้เทสจับได้เพราะสแกนทั้งไฟล์แบบตัดคอมเมนต์
- **patch ที่ยังไม่ได้ลง ให้ยุบรวมกับตัวถัดไป** ดีกว่าปล่อยค้าง 2 ไฟล์ — กัน guard version ชนกันแล้ว ABORT
