# STATE — BJH Revenue Dashboard
อัปเดต: 30 ก.ค. 2569 · เวอร์ชันล่าสุด **V624.0**

---

## กติกาการส่งงาน

ส่ง **ไฟล์เดียวต่อรอบ** = `patch_Vxxx.ps1` (ฝัง .html แบบ gzip+base64 · เขียนเอง · verify SHA เอง · เขียน STATE.md ลง repo เอง · push เอง)
**ห้ามแนบ .html หรือ STATE.md แยก** ซ้ำซ้อนกับที่ฝังใน .ps1 อยู่แล้ว (พลาดมาแล้วรอบ V623)

---

## รอบนี้ทำอะไร (V624.0 — รวม 3 เรื่องตามกติกา)

### A. ชิป Sale Order (`st = Backlog`) — `SalesProspect.html`
เดิม `_subOf()` / `_scSubOf()` คืนค่า `'BL'` อยู่แล้ว และ `wantSt` ก็ดึง Backlog เข้ามา **แต่ไม่มีปุ่มให้กด** เห็นได้แค่ตอนกด "ทั้งหมด"

- **SP Monitor** เพิ่มปุ่ม `data-sub="BL"` 🔷 Sale Order แทรกก่อน Sales Confirm + เติม `BL:0` ใน `_spOrdSPCounts` + เติมสีใน `_spOrdSPUpdateChips`
- **SC Monitor** เพิ่มปุ่มอย่างเดียว — โค้ดรองรับ `BL` ครบอยู่แล้ว (`_scSubCnt` มี `BL:0` · color map มี · KPI มี)
- สี **teal `#2dd4bf`** ทั้ง 2 หน้า · SC Monitor เดิม BL เป็นส้ม `#fb923c` เปลี่ยนเป็น teal ให้ตรงกัน (แก้ทั้ง chip map + KPI mini)
  เหตุผลที่ไม่ใช้ส้ม: ใน SP Monitor ส้มเป็นสีของ Pending อยู่แล้ว

### B. เปลี่ยนชื่อ Contract & PO → **Contract Monitor** (3 จุดที่ผู้ใช้เห็น)
| ที่ | ไฟล์ |
|---|---|
| ปุ่มแท็บ | `SalesProspect.html` |
| รายการสิทธิ์ใน Config | `script_main.html` |
| บรรทัดใน Weekly Report | `SalesProspect.html` |

ไม่แตะ `id="sp-tab-contract"` · `spTab('contract')` · `key:'sp_contract'` — เปลี่ยนแค่ข้อความที่แสดง
เหลือคำเดิมอีก 8 จุดในไฟล์ แต่**เป็นคอมเมนต์ล้วน** (ตรวจแล้วในเทส)

### C. ชิป Package ขึ้นเฉพาะ "หลายยี่ห้อ" — `script_main.html`
ต้นเหตุ: `o.multi = (_all.length > 1)` นับ **จำนวนเครื่อง** ไม่ใช่จำนวนรุ่น → ยี่ห้อเดียวรุ่นเดียว 3 เครื่อง ก็ติดชิป ทำให้คอลัมน์ Brand หายไปเปล่าๆ

- เงื่อนไขชิปเปลี่ยน `_bm.multi` → `(_bm.nBr||0) > 1`
- **ไม่แตะค่า `.multi`** เพราะ `_bmAudit()` ใช้อยู่ (แก้แล้วเลขตรวจสอบเพี้ยน)
- ยี่ห้อเดียวหลายรุ่น: `o.ml` เดิม `"2 รุ่น (2 เครื่อง)"` → **`"2 รุ่น"`**

| เคส | เดิม | ใหม่ |
|---|---|---|
| หลายยี่ห้อ | ชิป `Package` + `3 เครื่อง` | เหมือนเดิม |
| ยี่ห้อเดียว 2 รุ่น | ชิป `Package` + `2 รุ่น (2 เครื่อง)` | **`HOLOGIC` + `2 รุ่น`** |
| ยี่ห้อเดียว รุ่นเดียว 3 เครื่อง | ชิป `Package` + ชื่อรุ่น | **`HOLOGIC` + `Horizon Wi`** |

จำนวนเครื่องไม่หาย — ดูได้ที่แท็บ Hardware List (V623) ทุกแถว

---

## Decision

| เรื่อง | สรุป |
|---|---|
| นิยาม Sale Order | `st = 'Backlog'` ตรงกับ pill ชื่อเดียวกันบนหน้า Service Commercial Orders |
| สีชิป | teal `#2dd4bf` ทั้ง SP + SC Monitor |
| คำในคอลัมน์ Model | ใช้ไทย **"2 รุ่น"** ให้เข้าชุดกับ "3 เครื่อง" ที่มีอยู่เดิมในคอลัมน์เดียวกัน (ไม่ใช้ "2 Model") |
| Weekly Report | เปลี่ยนชื่อตามด้วย เพื่อให้ชื่อหน้าตรงกันทุกที่ |

---

## ทดสอบ

- `node --check` ผ่านทุก script block (3 ไฟล์)
- jsdom + vm **42/42 ผ่าน** — รันโค้ดจริงที่ตัดจากไฟล์ที่ patch แล้ว
  - `_tag()` 4 เคส: หลายยี่ห้อ / ยี่ห้อเดียว 2 รุ่น / ยี่ห้อเดียวรุ่นเดียว 3 เครื่อง / เครื่องเดียว + ไม่มีข้อมูล
  - ชิป Package: ขึ้นเฉพาะหลายยี่ห้อ · ยังเรียก `selRow` + ตั้งธง `hw` ถูก · `.multi` ไม่ถูกแตะ · `list` ยังครบ
  - SP Monitor: ชิป 7→8 · ลำดับก่อน Sales Confirm · badge `(5)` · teal · ไม่ชนสี Wait Stock-in · active/ดับถูก
  - SC Monitor: ปุ่มอยู่ถัดจาก "ทั้งหมด" · badge `(14)` · single-select ถูก · `_spOrdSCSub='BL'`
  - rename ครบ 3 จุด · ไม่มีคำเดิมหลงในโค้ดจริง · id/key ไม่ถูกแตะ
- SHA256 byte-exact ทั้ง 3 ไฟล์ · diff: SalesProspect 18 บรรทัด · script_main 11 · overrides 4 (bump version)
- บรรทัดสุดท้ายทั้ง 3 ไฟล์เหมือนเดิมเป๊ะ

---

## วิธีลง

```powershell
cd C:\bjh-dashboard
& .\patch_V624.ps1
```
guard: ฐานต้องเป็น V623.0 ไม่งั้น ABORT · SHA ไม่ตรง = revert อัตโนมัติ
ครบวงจร: `clasp push` → `create-deployment -i <pinned>` → `git commit` → `git push`

> ไม่ได้แตะ Code.gs → ไม่ต้อง Deploy → New Version ด้วยมือ
> **แต่ C แก้ผลลัพธ์ `resolveBM()` ซึ่งเป็น classify-level** → ถ้าเปิดมาแล้วยังเห็นชิป Package เดิม ให้กด **Load Data สด** หนึ่งครั้ง

---

## ค้างอยู่

- **ต้องยืนยันกับของจริง:** ชิป Sale Order ใน SP Monitor ถ้าขึ้น `(0)` แปลว่าโดนตัวกรอง `if(_spPartsInfo(qn).hasBill) return;` ตัดทิ้งก่อนถึงจุดนับ ไม่ใช่ชิปพัง — ต้องไล่ต่อ
- ถ้าอยากได้คอลัมน์ Model เป็นอังกฤษ ต้องเปลี่ยนคู่กัน `2 Models` / `3 Units` (คำเดียวต่อจุด)
- Performance: sheets 4.7s + ETL 3.9s
- 6 mobile menus (ยังไม่เริ่ม)
- **Renewal.html** — Predict `customer_id + brand + model` · A=KPI · B=Gap · C=Funnel (ยังไม่เริ่ม)
- M3 SR (blocked) · M8 mobile black screen
- Hardware List ฝั่ง SP (`renderSPDetail`) — ยังไม่ทำ ตกลงกันไว้ว่าเอา SC ก่อน

## ดองไว้ตั้งใจ — ห้ามเสนอซ้ำ
V610 "อะไหล่รอในคลัง" + "ติดตามสัญญา" — รอ Weekly Report ใช้จริง 2-3 สัปดาห์ก่อน

---

## เกร็ดที่ได้รอบนี้

- **โค้ดรองรับไว้แล้วแต่ไม่มีปุ่ม** เกิดซ้ำได้ง่าย — `BL` มีทั้ง classifier/counter/สี/KPI ครบ ขาดแค่ `<button>` เดียว ก่อนเขียน logic ใหม่ให้ค้น key เดิมก่อนเสมอ
- ตั้งชื่อ flag ให้ตรงความหมาย: `multi` แปลว่า "หลายเครื่อง" แต่ถูกใช้ตัดสิน "หลายยี่ห้อ" มา 2 เวอร์ชัน — เจอบั๊กแบบนี้ให้เพิ่ม flag ใหม่/ใช้ตัวนับตรงๆ ดีกว่าแก้ความหมายของเดิม (มีคนอื่นใช้อยู่)
- **เทส jsdom:** ฟังก์ชันที่ inline `onclick` เรียก ต้องอยู่บน `window` จริง · ส่วนฟังก์ชันที่ถูกเรียกจาก**ในตัวโค้ดที่รันใน vm** ต้องอยู่ใน sandbox — คนละที่กัน ถ้าวางผิดจะได้ `ReferenceError` ที่ดูเหมือนโค้ดพังทั้งที่ harness เอง
- ตรวจ "คำเดิมหลงเหลือ" ด้วยการนับ `/*` `*/` สะสมไม่แม่น (มี `*/` ในสตริง/regex ปนอยู่) — เช็ครายบรรทัดตรงๆ แม่นกว่า
