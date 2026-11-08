@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Starting MOLEVERSE X Phase 2 at http://localhost:8080
where py >nul 2>nul
if %errorlevel%==0 (
  start "" "http://localhost:8080"
  py -m http.server 8080
) else (
  where python >nul 2>nul
  if %errorlevel%==0 (
    start "" "http://localhost:8080"
    python -m http.server 8080
  ) else (
    echo Please install Python or publish folder to GitHub Pages.
    pause
  )
)
