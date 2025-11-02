💰 Expense Tracker Application

A full-stack Expense Tracker built with React (Vite) for the frontend and Node.js + Express + MongoDB for the backend.  
Easily record your income and expenses, filter by category or date, and visualize data with interactive charts.

------------------------------------------------------------
🚀 FEATURES
------------------------------------------------------------
- Add, view, and delete transactions
- Filter by type, category, or date range
- Reset filters with one click
- Analytics page with bar and pie charts (via Recharts)
- Responsive, clean, and modern UI

------------------------------------------------------------
🧩 TECH STACK
------------------------------------------------------------
Frontend: React (Vite), Axios, React Router, Lucide Icons
Backend: Node.js, Express.js, Mongoose (MongoDB)
Charts: Recharts
Styling: CSS (custom, no Tailwind)

------------------------------------------------------------
⚙️ SETUP INSTRUCTIONS
------------------------------------------------------------
1️⃣ Clone the Repository
------------------------------------------------------------
git clone https://github.com/<your-username>/Expense-Tracker-Application.git
cd Expense-Tracker-Application

------------------------------------------------------------
2️⃣ Install Dependencies
------------------------------------------------------------
👉 Backend
cd backend
npm install

👉 Frontend
cd ../frontend
npm install

------------------------------------------------------------
3️⃣ Configure Environment Variables
------------------------------------------------------------
Create a .env file inside the backend folder and add:

PORT=5000
MONGO_URI=mongodb+srv://<your_mongo_connection_string>

Replace <your_mongo_connection_string> with your actual MongoDB connection string.

------------------------------------------------------------
▶️ RUNNING THE APPLICATION
------------------------------------------------------------
You have two options to run the app:

🅰️ Option 1 — Run Both Frontend & Backend Together (Recommended)
------------------------------------------------------------
Install concurrently at the root level:

cd ..
npm init -y
npm install concurrently --save-dev

Then add this to your root package.json:

{
  "scripts": {
    "start": "concurrently \"npm run dev --prefix frontend\" \"npm run dev --prefix backend\""
  }
}

Now start both servers with one command:

npm start

Frontend: http://localhost:5173  
Backend: http://localhost:5000

🅱️ Option 2 — Run Separately
------------------------------------------------------------
Start Backend
cd backend
npm run dev

Start Frontend
cd ../frontend
npm run dev

------------------------------------------------------------
🧪 DEVELOPMENT NOTES
------------------------------------------------------------
- The backend auto-reloads if you use nodemon.
- React Vite automatically refreshes frontend changes.
- Filters in the dashboard allow quick data segmentation.
- “Reset” button restores full transaction list.
