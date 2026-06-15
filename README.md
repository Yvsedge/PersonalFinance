# Personal Finance Tracker (PFT)

A full-stack personal finance management application built with **React**, **TypeScript**, **Express.js**, and **PostgreSQL**.

The application allows users to track income and expenses, analyze spending by category, and manage transactions through a clean and responsive interface.

## Live Demo

**Frontend:** https://pft-sigma.vercel.app

**Backend API:** https://pft-backend-geiy.onrender.com

---

## Features

### 📊 Dashboard

- Current balance overview
- Total income tracking
- Total expense tracking
- Transaction count
- Expense breakdown by category
- Recent transactions section

### 💰 Transaction Management

- Create transactions
- Update transactions
- Delete transactions
- Persistent database storage

### 🔍 Search, Filter & Sort

- Search by transaction title
- Filter by Income / Expense
- Sort by:
  - Latest
  - Oldest
  - Highest Amount
  - Lowest Amount

### 🗄️ Data Persistence

- PostgreSQL database integration
- RESTful API architecture
- Persistent storage across sessions

---

## Tech Stack

### Frontend

- React
- TypeScript
- React Router
- React Context API
- React Icons
- React Spinners
- CSS
- Vite

### Backend

- Express.js
- Node.js

### Database

- PostgreSQL
- pg

### Deployment

- Vercel (Frontend)
- Render (Backend)

---

## Screenshots

### Dashboard

<img width="1900" height="1143" alt="image" src="https://github.com/user-attachments/assets/23264a1f-3ec4-40dd-be78-dbe4a94ed242" />

### Transactions

<img width="1900" height="1030" alt="image" src="https://github.com/user-attachments/assets/40d8aa7c-4076-4069-93f7-5a4238e8b9b3" />

---

## Project Architecture

```text
React + TypeScript (Frontend)
            │
            ▼
        Fetch API
            │
            ▼
      Express.js API
            │
            ▼
       PostgreSQL
```

---

## API Endpoints

| Method | Endpoint | Description |
|----------|----------|----------|
| GET | `/expenses` | Get all expenses |
| GET | `/expenses/:id` | Get expense by ID |
| POST | `/expenses` | Create expense |
| PUT | `/expenses/:id` | Update expense |
| DELETE | `/expenses/:id` | Delete expense |

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Yvsedge/PersonalFinance.git
cd PersonalFinance
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=PersonalFinance

FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

---

## Database Schema

```sql
CREATE TABLE expenses (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    category TEXT NOT NULL,
    flow TEXT NOT NULL,
    date DATE NOT NULL
);
```

---

## What I Learned

Through this project I gained experience with:

- React and TypeScript development
- State management using Context API and Reducers
- Building REST APIs with Express.js
- PostgreSQL database integration
- SQL queries and CRUD operations
- Frontend-backend communication
- Environment variable management
- Deployment using Render and Vercel
- Debugging production issues
- CORS configuration
- Full-stack application architecture

---

## Future Improvements

### Short-Term

- Transaction pagination
- Date range filtering
- Better form validation
- Toast notifications
- Improved mobile responsiveness

### Long-Term

- Authentication & Authorization
- Multi-user support
- Budget planning
- Charts and visual analytics
- Export transactions (CSV/PDF)
- Recurring transactions
- Dark mode
- Docker support
- CI/CD pipeline

---

## Project Structure

```text
PersonalFinance/
│
├── backend/
│   ├── db/
│   │   ├── connection.js
│   │   ├── queries.js
│   │   └── schema.sql
│   │
│   ├── routes/
│   │   └── expense.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── dispatch/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── types/
│   │
│   ├── vite.config.ts
│   ├── package.json
│   └── .env
│
└── README.md
```

---
