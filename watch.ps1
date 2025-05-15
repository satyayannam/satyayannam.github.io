$path = "C:\Users\Satya Yannam\Desktop\satyayannam.github.io"
$filter = "*.*"

$fsw = New-Object System.IO.FileSystemWatcher $path, $filter
$fsw.IncludeSubdirectories = $true
$fsw.EnableRaisingEvents = $true

Register-ObjectEvent $fsw Changed -Action {
    Start-Sleep -Milliseconds 500  # debounce for safety
    Write-Host "Change detected! Auto pushing..." -ForegroundColor Green
    powershell.exe -ExecutionPolicy Bypass -File "$path\push.ps1"
}

while ($true) { Start-Sleep -Seconds 1 }
