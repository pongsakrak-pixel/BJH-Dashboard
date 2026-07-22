function err {
  param([int]$n = 60)
  $out = ""
  try {
    $h = Get-History -Count 5 | Select-Object -Last 1
    if($h){ $out = "> " + $h.CommandLine + "`r`n" }
  } catch {}
  try { Stop-Transcript | Out-Null } catch {}
  Start-Sleep -Milliseconds 300
  $t = Get-Content "C:\bjh-dashboard\last.log" -Raw -ErrorAction SilentlyContinue
  if($t){
    $parts = $t -split '\*{10,}'
    $body = $parts[$parts.Count-1]
    if($body.Trim().Length -lt 5 -and $parts.Count -ge 3){ $body = $parts[$parts.Count-3] }
    $out += $body
  }
  if($out.Trim().Length -lt 3){ $out = "(no output captured)" }
  $out | Set-Clipboard
  Start-Transcript -Path "C:\bjh-dashboard\last.log" -Force -Append | Out-Null
  Write-Host "COPIED ($($out.Length) chars) - Ctrl+V in chat" -F Green
}