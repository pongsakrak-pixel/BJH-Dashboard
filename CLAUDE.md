# BJH Sales Dashboard — CLAUDE.md

Google Apps Script (HtmlService) web app สำหรับทีมขาย/บริการเครื่องมือแพทย์ (ไทย)
ติดตามรายได้ SC (Service Contract) / SP (Spare Parts), billing, forecast, install base, quotation, contract pipeline

**ตอบเป็นภาษาไทย กระชับ**

---

## 🔴 กติกาที่ห้ามละเมิด

1. **`overrides.html` always wins** — โหลดหลัง `script_main` → override ทุก function ชื่อซ้ำ
   render/classify/filter override **ต้องอยู่ใน `overrides.html` เท่านั้น** ห้ามใส่ `script_main`
2. **ห้าม rewrite ไฟล์** — ใช้ anchor-based surgical patch เท่านั้น
3. **ห้ามเดา** — ไม่มั่นใจให้ถาม หรือใช้วิธีปลอดภัยสุด
4. **ห้ามแตะส่วนที่ไม่เกี่ยว** — minimal targeted เท่านั้น
5. **bump `_BUILD_VER`** ใน `overrides.html` ทุกครั้งที่แก้
6. **ทดสอบก่อนส่งเสมอ** — `node --check` + jsdom/vm sandbox

---

## ⚙️ Workflow (แบบ B — ผ่อนตามขนาดงาน)

### งานเล็ก → ลงมือได้เลย แล้วรายงาน
- แก้สี / ข้อความ / spacing / label
- แก้ไฟล์เดียว ไม่แตะ logic
- fix typo

### งานใหญ่ → ต้องสรุปแผน + รอ confirm ก่อน
- แตะ **2 ไฟล์ขึ้นไป**
- แตะ **`Code.gs`** (ต้อง Deploy → New Version)
- แตะ **classify chain / filter logic / HM config**
- เพิ่ม/ลบ tab, เพิ่ม status ใหม่
- งาน UI ใหญ่ → **ทำ mockup ก่อน implement**

### ทุกครั้งก่อน commit
```
node --check <ไฟล์ที่แก้>
git diff
```

### commit message
```
V555.0: <สิ่งที่ทำสั้นๆ>
```
---

## 📂 ไฟล์สำคัญ

| ไฟล์ | บทบาท | Deploy |
|---|---|---|
| `Code.js` (= Code.gs) | backend, SmartFlow API, Drive | ⚠️ **Deploy → New Version** |
| `Index.html` | shell | ⚠️ Deploy |
| `overrides.html` | **override ทุกอย่าง + `_BUILD_VER`** | `clasp push` |
| `script_main.html` | core client logic | `clasp push` |
| `Dashboard.html` | หน้า dashboard หลัก | `clasp push` |
| `SalesProspect.html` | **IIFE-wrapped** | `clasp push` |
| `Home.html` · `Mobile.html` · `config_modal.html` · `confirm_billing.html` | | `clasp push` |

---

## ⚠️ กับดักที่เคยพัง (อย่าซ้ำ)

- **แทนที่บล็อก HTML ที่จบด้วย comment** → เช็คว่าไม่กิน `</div>` ของ parent ไปด้วย
  (V504: 6 tabs ว่างเปล่า · V512: 4 tabs ว่างเปล่า — สาเหตุเดียวกัน)
- **`SalesProspect.html` เป็น IIFE** → function ที่เรียกจาก HTML attribute ต้อง `window.fn = fn`
- **`_cdBuildV2()` เป็น closure ใน `spRenderAlert()`** → ใช้ได้หลังฟังก์ชันนั้นรันแล้วเท่านั้น
- **`_qfPillOf` เช็ค `r.st==='SP Forward'`** แต่ data จริงคือ `'SP Forward (Ordering)'` → อย่าเชื่อ
- **`provinceMapHTML()` กับ `mapHTML()` เป็นคนละฟังก์ชัน**
- **เพิ่ม status ใหม่** ต้องเช็คทั้ง classify chain else-fallback **และ** `_hasHMStage` ที่กระจายหลายไฟล์
- **`_MFC_PILLS` (Monthly Forecast) กับ Quick Filter pills คนละกลไก** ต้องแก้แยก
- **`#boot-loading` มี `z-index:2147483647`** → Mobile UI ต้องสูงกว่า
- **`background-clip:text` ทำ emoji เป็นก้อนดำ** → หุ้ม emoji ด้วย `.hb-ico` + `-webkit-text-fill-color:initial`
- **cache key** bump เฉพาะตอน format ของ cache เปลี่ยน ไม่ใช่ตอน transform เปลี่ยน
- **Thai string ใน heredoc พัง** → ใช้ Python patch script เขียนไฟล์
- **แก้ไฟล์: `assert src.count(anchor)==1` ก่อน `replace()`** ห้ามใช้ regex

---

## 🚨 6 field ห้ามใส่ `BJH_EX_COL` เด็ดขาด

| field | ถ้าตัด |
|---|---|
| `INSTALL_STATUS` | Install Base ว่างหมด |
| `MC_STATUS_HISTORY` | popup ประวัติ MC พัง |
| `QH_SUBJECT_EMAIL` | ค้นหา SN ไม่เจอ |
| `CUS_ID` | จังหวัดหายหมด |
| `NOTE_LOG` | หา "X ปี" ไม่ได้ |
| `PROVINCE` | Territory Map พัง |

`_bjhSlimGuard()` จับให้แล้ว — ถ้าเห็น log แดงคือตัดเกิน
**URL limit 2,048 chars** — ห้าม `encodeURIComponent()` เต็มกับ `ex_col` (comma → `%2C`)
ใช้ `encodeURIComponent(s).replace(/%2C/g, ',')`

---

## 📊 ข้อเท็จจริงของข้อมูล

- `window.D` = single source of truth ของ record ที่ classify แล้ว
- field sales = `r.sa` · `_SA_NAMES` = `['จีรนันท์','ธนาวุฒิ','ประเสริฐ','เจนจิรา','พงษ์ศักดิ์']`
- `RAW_SC_BILL.CON_ID` ↔ `RAW_CONTRACT.CON_ID` coverage 99%
- `CONTRACT_PRICE_NET` = มูลค่าหลายปีรวม → หารจำนวนปีถึงได้ต่อปี
- `RAW_Quotation.BRAND_NAME` ว่าง 100% → ใช้ `resolveBM()` (5-layer) เท่านั้น
- `RAW_INSTALLATION.SERAIL_NUMBER` ส่วนใหญ่ว่าง — SN ฝังใน `PRODUCT_NAME` / `QH_SUBJECT_EMAIL` / `PROJECT_NAME`
- `BILL_ROUND` เป็น counter ต่อเนื่องข้ามปี
- "เงินเข้าตอนเปิดบิล" — รับรู้รายได้เมื่อออกบิล
- `con_trigger_do_create_quotation`: 0=ยังไม่เสนอ · 1=เสนอแล้ว · 2=ไม่เสนอ
- role: `admin` / `manager` / `sales` — sales เห็นเฉพาะของตัวเอง

---

## 🚀 Deploy

```
clasp push                  # HTML อย่างเดียว (เดิม = Ctrl+S ทุกไฟล์)
clasp create-deployment     # เมื่อแก้ Code.js (เดิม = Deploy -> New Version)
```

**เตือนผู้ใช้เสมอ:**
- แก้ `Code.js` → ต้อง `clasp create-deployment` ไม่ใช่แค่ push
- แก้ classify / HM config → ต้องกด **Load Data สด** (cache ไม่ re-classify)

---

## 🧠 สไตล์การทำงานของ Eak

- สื่อสารไทยสั้น ผสมศัพท์เทคนิคอังกฤษ
- "ครับ" / "ใช่" / "ok" / "ต่อเลย" / "จัดเลย" / "ทำได้เลย" = **อนุมัติ ลงมือได้**
- ชอบแก้จบรอบเดียว ไม่ชอบถามกลางทางบ่อย
- **จับ logic error เก่ง** — ถ้าบอกว่าตัวเลขไม่ตรงข้ามหน้า = bug จริงเสมอ ต้องขุด root cause ไม่ใช่ display artifact
- design direction เป็นของ Eak — Claude หา root cause + implement

---

## 📌 งานค้าง

- 6 mobile menu: Alert · Quotation · SN check · Customer · Contract expiry · My Jobs
- `Renewal.html` — Renewal Prediction Dashboard (Installation Base + SC contracts, predict: customer_id+brand+model match = renewed, KPI/Gap/Funnel)
- B20: map hospital→sales rep บน Service Commercial Orders
- SP reconciliation
- `ServiceMix.html` — รอ confirm field name/values
- `NOTE_LOG` บีบ 96% (ขอ SF เพิ่ม param `note_log=last`) → 131.5MB → 33.9MB
- ตั้ง `BJH_EXEC_URL` (/exec fast path) → คาดเปิดหน้า ~10s
