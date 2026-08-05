# ============================================================
#  go.ps1  -  BJH Dashboard patch runner (install once)
#  Put this file at: C:\bjh-dashboard\go.ps1
#  Usage:  cd C:\bjh-dashboard   then   .\go.ps1
#          .\go.ps1 -Yes      (skip confirm)
#          .\go.ps1 -List     (show 5 newest, pick by number)
# ============================================================
param(
  [switch]$Yes,
  [switch]$List
)

$ErrorActionPreference = 'Stop'

$Root   = Split-Path -Parent $MyInvocation.MyCommand.Path
$Deploy = Join-Path $Root 'Deploy'
if (-not (Test-Path $Deploy)) { New-Item -ItemType Directory -Path $Deploy | Out-Null }

# --- where to look for freshly downloaded patches -----------
$SearchDirs = @(
  (Join-Path $env:USERPROFILE 'Downloads'),
  (Join-Path $env:USERPROFILE 'Desktop'),
  $Deploy,
  $Root
) | Where-Object { Test-Path $_ } | Select-Object -Unique

Write-Host ''
Write-Host '=== BJH patch runner ===' -ForegroundColor Cyan

$found = @()
foreach ($d in $SearchDirs) {
  $found += Get-ChildItem -Path $d -Filter 'patch_V*.ps1' -File -ErrorAction SilentlyContinue
}

if ($found.Count -eq 0) {
  Write-Host 'No patch_V*.ps1 found in:' -ForegroundColor Yellow
  $SearchDirs | ForEach-Object { Write-Host ("  " + $_) }
  Write-Host 'Download the patch first, then run .\go.ps1 again.' -ForegroundColor Yellow
  exit 1
}

$sorted = $found | Sort-Object LastWriteTime -Descending

if ($List) {
  $top = $sorted | Select-Object -First 5
  for ($i = 0; $i -lt $top.Count; $i++) {
    $f = $top[$i]
    Write-Host ("  [{0}] {1}   {2}   {3} KB" -f ($i+1), $f.Name, $f.LastWriteTime.ToString('yyyy-MM-dd HH:mm'), [math]::Round($f.Length/1KB))
  }
  $sel = Read-Host 'Pick number'
  $idx = 0
  if (-not [int]::TryParse($sel, [ref]$idx)) { Write-Host 'Cancelled.'; exit 1 }
  if ($idx -lt 1 -or $idx -gt $top.Count) { Write-Host 'Cancelled.'; exit 1 }
  $src = $top[$idx-1]
} else {
  $src = $sorted[0]
}

Write-Host ''
Write-Host ("File : " + $src.Name)
Write-Host ("From : " + $src.DirectoryName)
Write-Host ("Time : " + $src.LastWriteTime.ToString('yyyy-MM-dd HH:mm:ss'))
Write-Host ("Size : " + [math]::Round($src.Length/1KB) + " KB")

# --- age warning: avoid re-running an old patch by mistake ---
$ageMin = [math]::Round(((Get-Date) - $src.LastWriteTime).TotalMinutes)
if ($ageMin -gt 120) {
  Write-Host ("WARNING: this file is " + [math]::Round($ageMin/60) + " hour(s) old.") -ForegroundColor Yellow
}

if (-not $Yes) {
  $ans = Read-Host 'Run this patch? (Y/n)'
  if ($ans -ne '' -and $ans -notmatch '^[Yy]') { Write-Host 'Cancelled.'; exit 1 }
}

# --- move into Deploy (keep one copy, overwrite same name) ---
$dst = Join-Path $Deploy $src.Name
if ($src.FullName -ne $dst) {
  Move-Item -LiteralPath $src.FullName -Destination $dst -Force
}

# --- unblock: files downloaded from the web are blocked ------
try { Unblock-File -LiteralPath $dst } catch { }

Write-Host ''
Write-Host ('Running ' + $dst) -ForegroundColor Green
Write-Host '------------------------------------------------------------'

Set-Location $Root
& $dst
$code = $LASTEXITCODE

Write-Host '------------------------------------------------------------'
if ($code -and $code -ne 0) {
  Write-Host ("Patch exited with code " + $code) -ForegroundColor Red
} else {
  Write-Host 'Done.' -ForegroundColor Green
}
