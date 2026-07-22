param([Parameter(Mandatory=$true)][string]$m)
$ErrorActionPreference="Stop"
Set-Location C:\bjh-dashboard
clasp push
clasp create-deployment -i AKfycbzO7LW1DPUOzosAxpZsJPvX8PoW4eJ8rDHuZI-GXwHpT9yXDERnrEdPVvdOoffQLVF-kw -d $m
git add -A
git commit -m $m
Write-Host ""
Write-Host "DEPLOYED: $m" -F Green
Write-Host "user must Ctrl+Shift+R" -F Yellow