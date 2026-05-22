@echo off
cd /d "%~dp0"
echo Pornesc Lefkada Lowkey Guide...
echo.
echo Dupa ce vezi mesajul "Serving HTTP", deschide:
echo http://127.0.0.1:8000
echo.
if exist "C:\Python313\python.exe" (
  "C:\Python313\python.exe" -m http.server 8000 --bind 127.0.0.1
) else (
  python -m http.server 8000 --bind 127.0.0.1
)
pause
