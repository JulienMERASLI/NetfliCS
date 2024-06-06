@echo off
@REM Setup the backend
cd backend
call npm install
@REM Copy the database file to the backend folder
copy base_database.sqlite3 backend/
call npm run migration:run
call python -m venv venv

call venv\Scripts\activate.bat

call pip install -r requirements.txt
cd ..

@REM Setup the frontend
cd frontend
call npm install
cd ..
