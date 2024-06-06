@echo off
@REM Setup the backend
cd backend
call npm install
echo.> database.sqlite3
call npm run migrate:run
python -m venv venv
venv\Scripts\activate.bat
pip install -r requirements.txt
cd ..

@REM Setup the frontend
cd frontend
call npm install
cd ..
