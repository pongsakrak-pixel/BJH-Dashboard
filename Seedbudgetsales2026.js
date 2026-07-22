/**
 * [seed] ตั้ง Budget Sales 2026 — H1 45% / H2 55% ของ 50 ล้าน/คน/ปี
 *   H1 (Jan-Jun) = 22.5M ÷ 6 = 3,750 K/เดือน
 *   H2 (Jul-Dec) = 27.5M ÷ 6 = 4,583.33 K/เดือน
 *   รวมปี = 50,000 K (50 ล้าน) · ทีม 5 คน = 250 ล้าน
 * วิธีใช้: วางใน Apps Script Editor -> เลือก seedBudgetSales2026 -> Run -> Log {ok:true} -> ลบทิ้งได้
 * หมายเหตุ: ทับ budget เดิมปี 2026 ทั้ง 5 คน · หลังรันกด Load Data
 */
function seedBudgetSales2026() {
  var merged = {};
    merged['_mo_จีรนันท์_jan']=3750.0;
    merged['_mo_จีรนันท์_feb']=3750.0;
    merged['_mo_จีรนันท์_mar']=3750.0;
    merged['_mo_จีรนันท์_apr']=3750.0;
    merged['_mo_จีรนันท์_may']=3750.0;
    merged['_mo_จีรนันท์_jun']=3750.0;
    merged['_mo_จีรนันท์_jul']=4583.33;
    merged['_mo_จีรนันท์_aug']=4583.33;
    merged['_mo_จีรนันท์_sep']=4583.33;
    merged['_mo_จีรนันท์_oct']=4583.33;
    merged['_mo_จีรนันท์_nov']=4583.33;
    merged['_mo_จีรนันท์_dec']=4583.33;
    merged['จีรนันท์']=49999.98;
    merged['_mo_ธนาวุฒิ_jan']=3750.0;
    merged['_mo_ธนาวุฒิ_feb']=3750.0;
    merged['_mo_ธนาวุฒิ_mar']=3750.0;
    merged['_mo_ธนาวุฒิ_apr']=3750.0;
    merged['_mo_ธนาวุฒิ_may']=3750.0;
    merged['_mo_ธนาวุฒิ_jun']=3750.0;
    merged['_mo_ธนาวุฒิ_jul']=4583.33;
    merged['_mo_ธนาวุฒิ_aug']=4583.33;
    merged['_mo_ธนาวุฒิ_sep']=4583.33;
    merged['_mo_ธนาวุฒิ_oct']=4583.33;
    merged['_mo_ธนาวุฒิ_nov']=4583.33;
    merged['_mo_ธนาวุฒิ_dec']=4583.33;
    merged['ธนาวุฒิ']=49999.98;
    merged['_mo_ประเสริฐ_jan']=3750.0;
    merged['_mo_ประเสริฐ_feb']=3750.0;
    merged['_mo_ประเสริฐ_mar']=3750.0;
    merged['_mo_ประเสริฐ_apr']=3750.0;
    merged['_mo_ประเสริฐ_may']=3750.0;
    merged['_mo_ประเสริฐ_jun']=3750.0;
    merged['_mo_ประเสริฐ_jul']=4583.33;
    merged['_mo_ประเสริฐ_aug']=4583.33;
    merged['_mo_ประเสริฐ_sep']=4583.33;
    merged['_mo_ประเสริฐ_oct']=4583.33;
    merged['_mo_ประเสริฐ_nov']=4583.33;
    merged['_mo_ประเสริฐ_dec']=4583.33;
    merged['ประเสริฐ']=49999.98;
    merged['_mo_เจนจิรา_jan']=3750.0;
    merged['_mo_เจนจิรา_feb']=3750.0;
    merged['_mo_เจนจิรา_mar']=3750.0;
    merged['_mo_เจนจิรา_apr']=3750.0;
    merged['_mo_เจนจิรา_may']=3750.0;
    merged['_mo_เจนจิรา_jun']=3750.0;
    merged['_mo_เจนจิรา_jul']=4583.33;
    merged['_mo_เจนจิรา_aug']=4583.33;
    merged['_mo_เจนจิรา_sep']=4583.33;
    merged['_mo_เจนจิรา_oct']=4583.33;
    merged['_mo_เจนจิรา_nov']=4583.33;
    merged['_mo_เจนจิรา_dec']=4583.33;
    merged['เจนจิรา']=49999.98;
    merged['_mo_พงษ์ศักดิ์_jan']=3750.0;
    merged['_mo_พงษ์ศักดิ์_feb']=3750.0;
    merged['_mo_พงษ์ศักดิ์_mar']=3750.0;
    merged['_mo_พงษ์ศักดิ์_apr']=3750.0;
    merged['_mo_พงษ์ศักดิ์_may']=3750.0;
    merged['_mo_พงษ์ศักดิ์_jun']=3750.0;
    merged['_mo_พงษ์ศักดิ์_jul']=4583.33;
    merged['_mo_พงษ์ศักดิ์_aug']=4583.33;
    merged['_mo_พงษ์ศักดิ์_sep']=4583.33;
    merged['_mo_พงษ์ศักดิ์_oct']=4583.33;
    merged['_mo_พงษ์ศักดิ์_nov']=4583.33;
    merged['_mo_พงษ์ศักดิ์_dec']=4583.33;
    merged['พงษ์ศักดิ์']=49999.98;
  var payload = { section: 'sa_bud', data: { yr: '2026', data: merged } };
  var res = saveConfigSection(JSON.stringify(payload));
  Logger.log('seedBudgetSales2026: ' + res);
  return res;
}