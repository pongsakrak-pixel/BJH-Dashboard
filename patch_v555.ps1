# BJH V555.0 - loading screen text -> English
# usage:  cd C:\bjh-dashboard ; .\patch_v555.ps1
$ErrorActionPreference = "Stop"
$root = "C:\bjh-dashboard"

$edits = @(
 @{f="body_app_top.html"; o="label:'ระบบหลัก (Dashboard)'";                     n="label:'Core system'"},
 @{f="body_app_top.html"; o="label:'ข้อมูลหลัก (Install Base · Contracts)'";    n="label:'Master data · Install base & contracts'"},
 @{f="body_app_top.html"; o="label:'ข้อมูลรายการ (Bills · Quotations)'";        n="label:'Transactions · Bills & quotations'"},
 @{f="body_app_top.html"; o="label:'ตั้งค่า (Sales Areas · กลุ่ม รพ. · โน้ต)'"; n="label:'Settings · Areas, groups & notes'"},
 @{f="body_app_top.html"; o="label:'Actual FAD รายเซลล์'";                      n="label:'Actual FAD by representative'"},
 @{f="body_app_top.html"; o="label:'Forecast (Send to FC)'";                    n="label:'Forecast pipeline'"},
 @{f="body_app_top.html"; o="('กำลังโหลด: ' + next.label + '…')";               n="('Loading · ' + next.label + '…')"},
 @{f="body_app_top.html"; o="'พร้อมแล้ว ✓'";                                     n="'Ready ✓'"},

 @{f="script_main.html";  o="label:'ตั้งค่าระบบ (Config)'";                     n="label:'System configuration'"},
 @{f="script_main.html";  o="label:'ข้อมูลหลัก (Install Base · Contracts)'";    n="label:'Master data · Install base & contracts'"},
 @{f="script_main.html";  o="label:'ข้อมูลรายการ (Bills · Quotations)'";        n="label:'Transactions · Bills & quotations'"},
 @{f="script_main.html";  o="label:'ประมวลผลข้อมูล (ETL)'";                     n="label:'Processing records'"},
 @{f="script_main.html";  o="label:'Actual FAD รายเซลล์'";                      n="label:'Actual FAD by representative'"},
 @{f="script_main.html";  o="label:'Forecast (Send to FC)'";                    n="label:'Forecast pipeline'"},
 @{f="script_main.html";  o="label:'คำนวณ + แสดงผล'";                           n="label:'Building your dashboard'"},
 @{f="script_main.html";  o=">กำลังเตรียมข้อมูล…</div>";                         n=">Preparing your workspace…</div>"},
 @{f="script_main.html";  o="'กำลังโหลด: '";                                    n="'Loading · '"},
 @{f="script_main.html";  o="'เสร็จสมบูรณ์ ✓'";                                  n="'Ready ✓'"},

 @{f="overrides.html";    o="_BUILD_VER='V554.1'";                              n="_BUILD_VER='V555.0'"}
)

$enc  = New-Object Text.UTF8Encoding($false)
$fail = $false
$plan = @{}
$cnt  = @{}

foreach($g in ($edits | Group-Object f)){
  $name = $g.Name
  if([string]::IsNullOrWhiteSpace($name)){ Write-Host "[FAIL] empty filename" -ForegroundColor Red; $fail=$true; continue }
  $p = Join-Path $root $name
  if(-not (Test-Path $p)){ Write-Host "[FAIL] not found: $p" -ForegroundColor Red; $fail=$true; continue }
  $t = [IO.File]::ReadAllText($p)
  foreach($e in $g.Group){
    $c = ([regex]::Matches($t, [regex]::Escape($e.o))).Count
    if($c -ne 1){
      Write-Host ("[FAIL] {0} found={1} : {2}" -f $name, $c, $e.o) -ForegroundColor Red
      $fail = $true
    } else {
      $t = $t.Replace($e.o, $e.n)
    }
  }
  $plan[$p] = $t
  $cnt[$name] = $g.Count
}

if($fail){
  Write-Host ""
  Write-Host "ABORT - ไม่ได้เขียนไฟล์ใดๆ" -ForegroundColor Red
  exit 1
}

foreach($k in $plan.Keys){ [IO.File]::WriteAllText($k, $plan[$k], $enc) }
Write-Host ""
foreach($k in $cnt.Keys){ Write-Host ("[OK] {0}  {1} edits" -f $k, $cnt[$k]) -ForegroundColor Green }
Write-Host ""
Write-Host "V555.0 patched. ตรวจด้วย: git diff --stat" -ForegroundColor Cyan
