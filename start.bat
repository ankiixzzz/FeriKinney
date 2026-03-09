@echo off
echo Starting Kinbech...

:: Start backend
start "Kinbech Backend" cmd /k "npm start"

:: Start frontend
start "Kinbech Frontend" cmd /k "cd client && npm start"

echo Both servers are starting.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
