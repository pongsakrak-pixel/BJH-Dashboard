# BJH Dashboard - Dev Environment
$ErrorActionPreference = "Stop"

$NODE = "C:\Users\pongsakr\Downloads\node\node"
$NPMG = "$env:USERPROFILE\.npm-global"
$GIT  = "C:\Users\pongsakr\Downloads\PortableGit\cmd"

$env:Path = "$NODE;$NPMG;$GIT;" + $env:Path
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force

Set-Location "C:\bjh-dashboard"

Write-Host ""
Write-Host "=== BJH Dashboard Dev ===" -ForegroundColor Cyan
Write-Host ""

function Show-Ver($name, $cmd) {
  try { $v = (& $cmd --version 2>&1 | Select-Object -First 1)
        Write-Host ("  {0,-8} {1}" -f $name, $v) -ForegroundColor Green }
  catch { Write-Host ("  {0,-8} NOT FOUND" -f $name) -ForegroundColor Red }
}
Show-Ver "node"   "node"
Show-Ver "clasp"  "clasp"
Show-Ver "claude" "claude"
Show-Ver "git"    "git"

# --- guard: Claude Code ต้องเป็น 1.0.100 (2.x ใช้ Bun -> Trend Micro ทำ crash) ---
try {
  $cv = (claude --version 2>&1 | Select-Object -First 1)
  if ($cv -notmatch '^1\.0\.100') {
    Write-Host ""
    Write-Host "  !! WARNING: Claude Code = $cv (ต้องเป็น 1.0.100)" -ForegroundColor Red
    Write-Host "     แก้: npm i -g @anthropic-ai/claude-code@1.0.100" -ForegroundColor Red
  }
} catch {}

Write-Host ""
try {
  $ver = (Select-String -Path "overrides.html" -Pattern "_BUILD_VER\s*=\s*'([^']+)'" |
          Select-Object -First 1).Matches[0].Groups[1].Value
  Write-Host "  _BUILD_VER : $ver" -ForegroundColor Yellow
} catch { Write-Host "  _BUILD_VER : ?" -ForegroundColor Red }

try {
  $br = (git rev-parse --abbrev-ref HEAD 2>$null)
  $lg = (git log --oneline -1 2>$null)
  Write-Host "  git        : $br | $lg" -ForegroundColor Yellow
  $st = (git status --porcelain 2>$null)
  if ($st) { Write-Host "  changes    : $((($st -split "`n") | Measure-Object).Count) file(s) modified" -ForegroundColor Magenta }
  else     { Write-Host "  changes    : clean" -ForegroundColor DarkGray }
} catch {}

Write-Host ""
Write-Host "  clasp push          = upload to GAS" -ForegroundColor DarkGray
Write-Host "  claude              = start Claude Code" -ForegroundColor DarkGray
Write-Host "  git add -A; git commit -m ""...""" -ForegroundColor DarkGray
Write-Host ""

. "C:\bjh-dashboard\helper.ps1"
Start-Transcript -Path "C:\bjh-dashboard\last.log" -Force | Out-Null
