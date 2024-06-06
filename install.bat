@REM Setup the backend
cd backend
npm install
echo.> database.sqlite3
npm run migrate:run
python -m venv venv
venv\Scripts\activate.bat
pip install -r requirements.txt
cd ..

@REM Setup the frontend
cd frontend
npm install
cd ..
