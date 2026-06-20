# Personal Finance Tracker (PFT)

A full-stack personal finance management application built with **React**, **TypeScript**, **Express.js**, and **PostgreSQL**.

PFT allows users to securely manage their personal finances, track income and expenses, analyze spending patterns through interactive charts, and maintain separate accounts with JWT-based authentication.

---

## Live Demo

**Frontend:** https://pft-sigma.vercel.app

**Backend API:** https://pft-backend-gejy.onrender.com

### Demo Account

Email: `johndoe@gmail.com`

Password: `johndoe`

---

## Features

### 🔐 Authentication

* User registration
* User login
* JWT authentication
* Protected routes
* User-specific data isolation
* Persistent login sessions

### 📊 Dashboard Analytics

* Current balance overview
* Total income tracking
* Total expense tracking
* Transaction counts
* Daily expense trend chart
* Monthly expense trend chart
* Expense breakdown by category
* Recent transactions section

### 💰 Transaction Management

* Create transactions
* Update transactions
* Delete transactions
* Pagination support
* Secure user ownership checks

### 🔍 Search, Filter & Sort

* Search by transaction title
* Filter by Income / Expense
* Sort by:

  * Latest
  * Oldest
  * Highest Amount
  * Lowest Amount

### 🎨 User Experience

* Dark mode support
* Responsive layout(Kind of)
* Loading states
* Error handling
* Interactive charts
* Category progress indicators

### 🗄️ Data Persistence

* PostgreSQL database
* User-specific records
* Secure password hashing with bcrypt
* JWT token verification middleware

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* TanStack Query
* Recharts
* React Icons
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt

### Database

* PostgreSQL
* pg

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## Screenshots

### Dashboard

<img width="1900" height="2562" alt="image" src="https://github.com/user-attachments/assets/17586390-8700-4ae6-b343-3e6a1d136bfb" />

### Authentication

<img width="1900" height="1118" alt="image" src="https://github.com/user-attachments/assets/42c1906d-3c37-4187-a2c2-b0a016e3ad78" />
<img width="1900" height="1118" alt="image" src="https://github.com/user-attachments/assets/bd05225e-e255-4eb4-b352-253d80561795" />

### Transactions

<img width="1900" height="1901" alt="image" src="https://github.com/user-attachments/assets/43cb3603-e699-44c6-b820-6029a8e5c371" />


---

## Project Architecture

```text
React + TypeScript
        │
        ▼
 TanStack Query
        │
        ▼
 Express REST API
        │
 JWT Middleware
        │
        ▼
    PostgreSQL
```

---

## API Endpoints

### Authentication

| Method | Endpoint                  | Description      |
| ------ | ------------------------- | ---------------- |
| POST   | `/expenses/auth/register` | Register user    |
| POST   | `/expenses/auth/login`    | Login user       |
| GET    | `/expenses/auth/me`       | Get current user |

### Expenses

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| GET    | `/expenses`           | Paginated expenses |
| GET    | `/expenses/dashboard` | Dashboard data     |
| GET    | `/expenses/:id`       | Expense by ID      |
| POST   | `/expenses`           | Create expense     |
| PUT    | `/expenses/:id`       | Update expense     |
| DELETE | `/expenses/:id`       | Delete expense     |

### Analytics

| Method | Endpoint                      | Description      |
| ------ | ----------------------------- | ---------------- |
| GET    | `/expenses/analytics/daily`   | Daily expenses   |
| GET    | `/expenses/analytics/monthly` | Monthly expenses |

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

Create a `.env` file:

```env
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=PersonalFinance

JWT_SECRET=your_secret_key

FRONTEND_URL=http://localhost:5173
```

Start backend:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000/expenses
```

Start frontend:

```bash
npm run dev
```

---

## Database Schema

### Users

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
```

### Expenses

```sql
CREATE TABLE expenses (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    category TEXT,
    flow TEXT NOT NULL,
    date DATE NOT NULL
);
```

---

## What I Learned

Through this project I gained experience with:

* React and TypeScript
* TanStack Query
* JWT Authentication
* Protected Routes
* Password Hashing (bcrypt)
* PostgreSQL Relationships
* SQL Query Optimization
* REST API Design
* Full-Stack Architecture
* Data Visualization
* State Management
* Deployment with Vercel and Render
* Secure Multi-User Applications

---

## Future Improvements

* Budget planning
* Savings goals
* Recurring transactions
* CSV/PDF exports
* Email verification
* Password reset
* Google OAuth
* Docker support
* CI/CD pipeline
* Automated testing

---

## Project Structure

```text
PersonalFinance/
│
├── backend/
│   ├── db/
│   ├── middleware/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── vite.config.ts
│   └── .env
│
└── README.md
```
