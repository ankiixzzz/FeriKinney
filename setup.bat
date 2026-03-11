@echo off
echo ========================================
echo   Kinbech Setup
echo ========================================

:: Install root node_modules if missing
if not exist "node_modules" (
    echo [1/2] Installing backend dependencies...
    npm install
) else (
    echo [1/2] Backend dependencies already installed. Skipping.
)

:: Install client node_modules if missing
if not exist "client\node_modules" (
    echo [2/2] Installing frontend dependencies...
    cd client
    npm install
    cd ..
) else (
    echo [2/2] Frontend dependencies already installed. Skipping.
)

echo.
echo ========================================
echo   Setup complete! Run start.bat to launch.
echo ========================================
pause
