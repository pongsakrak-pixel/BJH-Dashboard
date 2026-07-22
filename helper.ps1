function err {
  try{ Stop-Transcript | Out-Null }catch{}
  $t = Get-Content "C:\bjh-dashboard\last.log" -Raw -ErrorAction SilentlyContinue
  if($t){ $t = ($t -split '\*{10,}')[-1] }
  if(-not $t){ $t = "(empty)" }
  $t | Set-Clipboard
  Start-Transcript -Path "C:\bjh-dashboard\last.log" -Force | Out-Null
  Write-Host "COPIED - paste in chat (Ctrl+V)" -F Green
}