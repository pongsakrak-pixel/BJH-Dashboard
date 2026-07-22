# BJH Sales Dashboard — STATE

> อัปเดตล่าสุด: **22 ก.ค. 2569**

---

# 📦 VERSION

| | |
|---|---|
| **เวอร์ชันปัจจุบัน** | **V558.0** |
| **🆕 วิธีจัดการโค้ด** | **git + clasp** (`C:\bjh-dashboard`) — **เลิกใช้ bundle JSON แล้ว** |
| **Base เริ่มต้น** | V479.75 (`__29_`) |
| **เช็คเวอร์ชัน** | `_BUILD_VER` ใน `overrides.html` · หรือ badge `#ver-stamp` มุมซ้ายบน |
| **ไฟล์ STATE** | `STATE_V558.md` — **ชื่อไฟล์มี version เสมอ** |
| **Deploy ปัจจุบัน** | **@851** |
| **🚀 ความเร็วล่าสุด** | **14.1s** (จาก 29s เดิม) — sheets=4.7s master=0.8s tx=1.8s etl=3.9s render=0.1s |

> ⚠️ **เปลี่ยนวิธีทำงานตั้งแต่ 22 ก.ค. 2569** — git + clasp
> ไม่ต้องส่ง/รับ bundle JSON อีกแล้ว · `clasp push` = Ctrl+S ทุกไฟล์ · ย้อนกลับได้ด้วย git

---

## 📊 งานวันนี้ 22 ก.ค. 2569

| Ver | เรื่อง | ผลลัพธ์ |
|---|---|---|
| **V555.0** | Loading text **ไทย→อังกฤษ** | "System configuration", "Master data · Install base and contracts", "Loading · ", "Ready ✓" |
| V556.0 | ลองซ่อนขั้นที่ยังไม่ถึง | ❌ ผู้ใช้ไม่ชอบ |
| **V557.0** | แสดงครบทุกขั้น + **ติ๊กไล่จากบน** | ✓ เด้งน้อยลง · active สีสว่าง · ที่เหลือ opacity 0.45 |
| V557.1 | ลบ margin ซ้ำกับ gap | แก้เล็กน้อย |
| **V488** (ค้าง) | ตั้ง **BJH_EXEC_URL** สำเร็จ | ✅ HTTP FAST PATH จาก /dev → /exec |
| **V558.0** | **PERF: skip auto-migrate** | ห่อ _ckvAutoMigrate/_logAutoMigrate/_qnoAutoMigrate ด้วย `BJH_MIG_DONE` |

### ผลความเร็ว
- **29s** → **18.5s** (หลัง EXEC_URL) → **14.1s** (หลัง V558 skip migrate)
- Breakdown: sheets=4.7s · master=0.8s · tx=1.8s · etl=3.9s · render=0.1s

### Decision ที่ตกลงกัน
- **ไม่เปิด cache กลับ** (V479.59 ปิดไว้ถูกแล้ว) — ข้อมูลไม่ตรงกันระหว่างผู้ใช้
- **NOTE_LOG ตัดไม่ได้** — ใช้จริง 4 จุด + บีบให้แล้วด้วย `.slice(-1)`
- **ไม่ต้องเช็ค V535-V554 แล้ว** — ไม่มีใครแจ้งปัญหา

---

## 📂 ไฟล์ที่เปลี่ยนจาก base (ไฟล์หลัก)

| ไฟล์ | แก้ล่าสุดที่ | หมายเหตุ |
|---|---|---|
| **`Code.gs`** | **V558.0** | ⚠️ ต้อง `clasp create-deployment` |
| **`Index.html`** | V520.0 | ย้าย Mobile |
| **`overrides.html`** | **V558.0** | `_BUILD_VER` = 558 |
| `script_main.html` | **V557.0** | loading steps |
| `body_app_top.html` | **V555.0** | boot steps |
| `Dashboard.html` | V554.0 | |
| `Home.html` | V546.0 | |
| `SalesProspect.html` | V522.0 | |
| `Mobile.html` | V554.0 | ✅ ใช้ได้แล้ว |
| `config_modal.html` | V545.0 | |
| `confirm_billing.html` | V529.0 | |

> **ไม่เปลี่ยน:** `style` · `body_app_bottom` · `DailySales` · `LOA` · `MA` · `MDCollection` · `QuotationCheck` · `Territory map interactive` · `Seedbudgetsales2026` · `appsscript`

---

## 🕘 Version History (เฉพาะ milestone)

| Ver | เรื่อง | Impact |
|---|---|---|
| V479.75 | Base จาก Eak | — |
| V480.0 | **SLIM** ตัด 107 fields | JSON 131.5→67.3 MB |
| V485.0 | **getBootBundle()** รวม 5→1 call | config 14.6s→5.3s |
| V486-488 | **HTTP fast path** `/exec` | ลด latency |
| V520.0 | แยก **Mobile.html** | responsive |
| V535.0 | **Config สิทธิ์ Mobile** | admin only |
| V545.0 | จัดกลุ่ม รพ. **ไม่ใช้ popup** | UX ดีขึ้น |
| V551-553 | **Achievement redesign** | กราฟแท่ง + ordered 2 ระดับ |
| V554.0 | **Mobile 5 เมนูอังกฤษ** | โหลดอัตโนมัติ |
| V555-557 | **Loading steps อังกฤษ** | ติ๊กไล่จากบน |
| **V558.0** | **Skip auto-migrate** | 18.5s→14.1s |

---

## 📌 งานค้างที่เหลือ

### Performance
- **sheets 4.7s** — ยังลดได้อีก (batch API?)
- **ETL 3.9s** — classify chain optimization

### Features ค้าง
- **6 Mobile menus**: Alert · Quotation · SN check · Customer · Contract expiry · My Jobs
- **`Renewal.html`** — Renewal Prediction Dashboard
- **B20**: map hospital→sales rep บน Service Commercial Orders
- **SP reconciliation**
- **`ServiceMix.html`** — รอ confirm field name/values
- **Free Check Medical Device**

### เก็บกวาด
- ❌ `patch_v555.ps1` กับ `.claude/` ค้างใน repo
- ❌ `MDCollection.html` ยังอยู่ทั้งที่ STATE เก่าบอกว่าลบแล้ว

---

## 🔧 Technical Notes V558

### Script Property `BJH_MIG_DONE`
- ตั้งเฉพาะเมื่อ legacy sheets 10 ตัวหายหมดแล้ว:
  - fcsp, fcfad, display_config, hm_stage, status_group
  - tab_permissions, access_log, activity_log
  - unassigned_overrides, brand_overrides
- **ถ้าจะย้อน**: ลบ property นี้ใน GAS editor

### NOTE_LOG ใช้จริง 4 จุด
1. DailySales `parseLastNote()`
2. SalesProspect `_fcParseYearsFromFields()` — หา "X ปี"
3. SalesProspect `_fcParseTimesPerYear()` — หา "X ครั้ง"
4. script_main popup ประวัติ + ค้น SN

---

## 🚀 Deploy

```bash
clasp push                  # HTML files
clasp create-deployment     # เมื่อแก้ Code.gs
```

**เตือนผู้ใช้:**
- แก้ `Code.gs` → ต้อง `clasp create-deployment`
- แก้ classify/HM config → ต้องกด **Load Data สด** (cache ไม่ re-classify)

---

## CASE LIST (จากรอบที่แล้ว)

### ✅ จบแล้ว
- C1: Sales ขายเอง (นับตาม sales name) ✅
- C2: Project เดียวหลาย reps ✅
- C3: DailySales Month To Date ✅
- C4: ชื่อซ้ำ+ต่างเมือง / เมืองใหม่ ✅
- C5: ไปขายที่อื่น / cross-territory ✅
- C6: Actual FAD = เดือนที่บิล ✅
- C7: Confirm → เลื่อนเดือน ✅
- C8: Sales confirm → โน้ต+ประวัติเลื่อน ✅
- C9: สถานะ SR บนการ์ดทีม ✅
- C10: filter pills กรอง Status → Monthly FC ไม่ลด ✅
- C11: Monthly นับเฉพาะเดือนนี้ ไม่เอา carry (ยกเลิกแล้ว V546) ✅
- C12: Export ส่วนที่แสดง → copy table ✅
- C13: Loading "ตัวปั่น" → tick marks ✅
- C14: HTTP FAST PATH → /exec ✅

### ⏳ ทำต่อ
- C15: 6 mobile menus
- C16: แสดง SN ผูก Contract 
- C17: Alert Dashboard → 2D นับแต่ละคน
- C18: แสดงสินค้าที่ต้องไป PM
- C19: รพ. ไหน bill ไหม

---

## 📝 Migration Note

เปลี่ยนจาก bundle JSON → **git + clasp** ตั้งแต่ 22 ก.ค. 2569:
- Repo: `C:\bjh-dashboard`
- Push: `clasp push` (ทุกไฟล์ HTML)
- Deploy: `clasp create-deployment` (เฉพาะเมื่อแก้ Code.gs)
- Commit: `git add . && git commit -m "V558.0: ..."`