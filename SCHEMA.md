# BJH Dashboard — SCHEMA (field reference)

> สแกนจากข้อมูลจริงบนเครื่อง **24 ก.ค. 2569**
> `%` = fill rate (นับเฉพาะค่าที่ไม่ว่าง / ไม่ null)
> อัปเดตด้วยการรัน snippet ท้ายไฟล์นี้ใน Console แล้วให้ Claude เขียนทับ

---

## 📊 สรุปตาราง

| ตัวแปร | rows | คือ |
|---|---|---|
| `window.D` | 3,724 | record ที่ classify แล้ว (SC+SP) — **แหล่งหลักของ dashboard** |
| `window._jsupParts` | 3,398 | อะไหล่ (RAW_Quotation_SP) |
| `window._jsupSC` | 4,487 | งวดบิลสัญญา (RAW_SC_BILL) |
| `window._jsupQuo` | 5,805 | ใบเสนอราคา (RAW_Quotation) |
| `window._ibAllRows` | 10,636 | Install Base (เครื่องที่ติดตั้ง) |
| `window._spCustomerRows` | 1,151 | ลูกค้า (RAW_CUSTOMER) |

---

## 🔑 window.D — classified records (3,724)

**100%:** `id` `t` `st` `ip` `cu` `tm` `px` `mo` `yr` `nc` `is_carry` `co_ready` `is_sp_fix` `carry_from_mo` `carry_from_yr` `om` `oy` `display_month_label` `qn`

| field | % | คือ |
|---|---|---|
| `t` | 100 | ประเภท: `SC` / `SP` |
| `st` | 100 | สถานะหลัก (Billed / SC Carry / SP Ordered (Ordering) / Offer / Backlog (Confirmed) / Excluded / Data Issue) |
| `ip` | 100 | Internal Process (SC Billing / RP:Stock In / Waiting Bill …) |
| `cu` | 100 | ชื่อลูกค้า |
| `qn` | 100 | เลขใบเสนอราคา |
| `mo` `yr` | 100 | เดือน/ปี ที่นับยอด |
| `sa` | 99 | **ชื่อ sales** — `_SA_NAMES` |
| `ctn` | 98 | ชื่อประเภทสัญญา (CONTRACT_TYPE_NAME) — *ความคุ้มครอง ไม่ใช่ New/Renew* |
| **`cnr`** | **94** | **`CON_TYPE_TYPE` = NEW / RENEW** ← ใช้ทำคอลัมน์ New/Renew (V577.1) |
| `sc` | 94 | เลขสัญญา |
| `pg` `pn` | 92 / 91 | brand / model |
| `sb` | 83 | สถานะบิล (`รอดำเนินการออกบิล` = Sale Order) |
| `sn` | 83 | serial number |
| `bd` `bn` | 80 / 79 | วันที่บิล / เลขบิล |
| `sr` | 77 | เลข SR |
| `br` | **6** | ⚠️ brand ดิบ — เติมน้อย **ใช้ `resolveBM()` แทน** |
| `bjob` `delivery` `podate` | 6 | เติมน้อยมาก |

---

## 🔧 _jsupParts — อะไหล่ (3,398)

| field | % | หมายเหตุ |
|---|---|---|
| `JOB_SR` `CUSTOMER_NAME` `BRAND_NAME` `PARTS_QTY` `PARTS_NAME` `SERVICE_JOB_STATUS` `SERVICE_JOB_SR` `ENG_REQ_DATETIME` `REQ_TEAM` | 100 | |
| **`STATUS_DT_NAME`** | **98** | **สถานะอะไหล่ 15 ค่า** → config `parts_status` (V562) |
| `SN` | 97 | |
| `MODEL_NAME` | 96 | |
| `SALES_SERVICE_NAME` | 96 | |
| `PARTS_MAT_NO` | 92 | |
| `CONTRACT_NAME` | 85 | ใช้แยกในประกัน/เสียเงิน |
| `ETA_DATE` | 66 | |
| **`QH_DOC_NUMBER`** | **57** | **43% ไม่มี QN = เบิกในประกัน** (เกณฑ์ [v436]) |
| `QH_TOTAL_AMT` `QUO_STATUS` `BILL_JOB_STATUS` | 57 | |
| `BILL_NUMBER` | 54 | |
| `BILL_JOB_PRICE` | **1** | 🔴 **แทบไม่มีข้อมูล — อย่าพึ่ง** |

---

## 📑 _jsupSC — งวดบิลสัญญา (4,487)

**100%:** `CON_ID` `CUSTOMER_NAME` `PROJECT_NAME` `CON_TYPE_TYPE` `CON_END_DATE` `CON_START_DATE` `BILL_ROUND` `BILL_MONTH` `BILL_YEAR` `BILL_PRICE` `TEAM_BILL` `PROJECT_NUMBER` `CONTRACT_PROCESS_STATUS_NAME`

| field | % | หมายเหตุ |
|---|---|---|
| `CON_ID` | 100 | 🔑 link ไป `RAW_CONTRACT.CON_ID` (99% coverage) |
| `CON_TYPE_TYPE` | 100 | NEW / RENEW |
| `BILL_ROUND` | 100 | ⚠️ counter ต่อเนื่องข้ามปี |
| `PRODUCT_NAME` | 99 | SN ฝังอยู่ในนี้ |
| `SR` `JOB_STATUS` `CONTRACT_TYPE_NAME` `SALES_SERVICE_NAME` | 99 | |
| `QH_DOC_NUMBER` | 98 | |
| `BILL_NUMBER` `BILL_PRINT_DATE` | 96 | |
| `CON_OWNER_NEW` | 11 | เติมน้อย |

---

## 📄 _jsupQuo — ใบเสนอราคา (5,805)

**100%:** `DOC_NUMBER` `CUSTOMER_NAME` `STATUS_NAME` `CONTRACT_TYPE_NAME` `TEAM_NAME` `QH_TYPE` `REQ_DATETIME` `SUBJECT_EMAIL` `QH_TOTAL_AMT` `QH_TOTAL_DISCOUNT` `QH_CONTRACT_START_DATE` `QH_CONTRACT_END_DATE`

| field | % | หมายเหตุ |
|---|---|---|
| **`CONTRACT_TYPE_TYPE_NAME`** | **100** | **New/Renew — เติมครบ!** ใช้ได้ดีกว่า `cnr` (94%) |
| `SUBJECT_EMAIL` | 100 | SN ฝังอยู่ในนี้ |
| `NOTE_LOG` | 99 | ⚠️ field อ้วน — บีบด้วย `slice(-1)` แล้ว |
| `SALES_SERVICE_NAME` | 97 | |
| `SEND_TO_CUSTOMER_DATETIME` | 76 | ใช้คำนวณ aging |
| `CUSTOMER_ACCEPT_DATETIME` | 30 | ใช้คำนวณ lead time |
| ~~`BRAND_NAME`~~ | **0** | 🔴 SmartFlow ไม่ส่ง — ใช้ `resolveBM()` |

---

## 🏥 _ibAllRows — Install Base (10,636)

### field ที่ประกอบไว้แล้ว (top-level)

| field | % | หมายเหตุ |
|---|---|---|
| `r` | 100 | 🔑 **object ข้อมูลดิบ** (ดูตารางล่าง) |
| `cu` `brand` `trigger` `hasCon` `installDate` `ageMs` | 100 | |
| `model` | 97 | |
| `sales` | 94 | |
| `sn` | 93 | |
| `endDate` `daysLeft` | 76 | |
| `ctype` | **75** | → 25% ว่าง = "กลุ่มไม่มีข้อมูล" 5,689 เครื่อง |
| `trigger` | 100 | ⚠️ **ค่าเป็น `'0'` ทั้งหมด** — ไม่มีข้อมูลจริง (V585 จึงตัดคอลัมน์เสนอราคาทิ้ง) |

### `x.r` — ข้อมูลดิบ (RAW_INSTALLATION)

```
วันที่ติดตั้ง · Customer · ยี่ห้อ · รุ่น · จังหวัด · SN
วันสิ้นสุดสัญญา · สัญญา · ประเภทสัญญา · ผู้แทน Service · _sales
CON_NO · QH_DOC_NUMBER · _CUS_ID · MODEL · BRAND · CUS_NAME
CON_END_DATE · CON_START_DATE · CON_TYPE · SALE_SERVICE_NAME
CONTRACT_PRICE · INSTALL_DT_ID · CONTRACT_TYPE_TYPE · con_trigger
MC_ISSUE_TAGS · MC_STATUS · MC_STATUS_NAME · MC_STATUS_HISTORY
```

**field ที่เกี่ยวกับสัญญา (ตัวอย่างจริง):**
```
วันสิ้นสุดสัญญา = "2027-07-26"
สัญญา          = "☑"                 ← ธง มี/ไม่มี (ไม่ใช่เลขสัญญา)
ประเภทสัญญา    = "สัญญาซื้อขาย"
CON_NO         = ""                   ⚠️ ว่างในตัวอย่างนี้
CON_END_DATE   = "2027-07-26"
CON_START_DATE = "2026-07-27"
CON_TYPE       = "สัญญาซื้อขาย"
CONTRACT_PRICE = ""                   ⚠️ ว่างในตัวอย่างนี้
CONTRACT_TYPE_TYPE = "SALE-CONTRACT"  ← New/Renew ระดับ Install Base
con_trigger    = "0"                  ⚠️ เป็น 0 ทั้งระบบ
```

> **`MC_STATUS` / `MC_STATUS_NAME` / `MC_ISSUE_TAGS` / `MC_STATUS_HISTORY`** = สถานะเครื่อง (ใช้ได้/ไม่ได้) → หน้า Alert Critical Down ใช้

---

## 👥 _spCustomerRows — ลูกค้า (1,151)

| field | % | หมายเหตุ |
|---|---|---|
| `CUS_ID` `CUS_NAME` | 100 | |
| `PROVINCE` | 99 | ✅ ใช้ได้ดี |
| `RES_SERVICE_NAME` | 55 | |
| `RES_SALES_NAME` | **0** | 🔴 ว่างทั้งหมด — อย่าใช้ |

---

## ⚠️ field ที่ห้ามพึ่ง (fill rate ต่ำ / ว่าง)

| field | % | ใช้อะไรแทน |
|---|---|---|
| `RAW_Quotation.BRAND_NAME` | 0 | `resolveBM()` (5-layer) |
| `_spCustomerRows.RES_SALES_NAME` | 0 | `RES_SERVICE_NAME` |
| `_ibAllRows.trigger` / `r.con_trigger` | 0 (เป็น '0' หมด) | — ไม่มีทางแทน ต้องขอ SmartFlow |
| `_jsupParts.BILL_JOB_PRICE` | 1 | `QH_TOTAL_AMT` |
| `window.D.br` | 6 | `resolveBM()` |
| `RAW_INSTALLATION.SERAIL_NUMBER` | ~0 | SN ฝังใน `PRODUCT_NAME` / `SUBJECT_EMAIL` |

---

## 🔄 วิธีอัปเดตไฟล์นี้

รันใน Console หน้า dashboard (เปิดแท็บ Install Base ก่อน) แล้วส่งผลให้ Claude เขียนทับ:

```javascript
(()=>{const out=[];const src=[['window.D (classified)',window.D],['_jsupParts',window._jsupParts],['_jsupSC',window._jsupSC],['_jsupQuo',window._jsupQuo],['_ibAllRows',window._ibAllRows],['_spCustomerRows',window._spCustomerRows]];src.forEach(([n,a])=>{if(!Array.isArray(a)||!a.length)return;const keys={};a.slice(0,3000).forEach(r=>{if(r&&typeof r==='object')Object.keys(r).forEach(k=>{const v=r[k];if(v!==null&&v!==undefined&&String(v).trim()!=='')keys[k]=(keys[k]||0)+1})});const n2=Math.min(a.length,3000);out.push('### '+n+'  ('+a.length+' rows)');Object.entries(keys).sort((x,y)=>y[1]-x[1]).forEach(([k,c])=>out.push('  '+k+'  '+Math.round(c*100/n2)+'%'));out.push('')});const txt=out.join('\n');console.log(txt);copy(txt);console.log('✅ copy แล้ว')})()
```

**ดู field ดิบของ Install Base:**
```javascript
(()=>{const R=window._ibAllRows||[];const s=R.find(x=>x.hasCon)||R[0];console.log(Object.keys(s.r||{}).join(','));copy(Object.keys(s.r||{}).join(','))})()
```
