# Personal Finance Tracker (PFT)

A full-stack personal finance tracking application built with React, TypeScript, Express.js, and PostgreSQL.

This project was developed as a learning exercise to gain practical experience with modern frontend development, backend API development, database integration, and full-stack application architecture. It is my first project using Express.js and PostgreSQL.

---

## Features

### Dashboard

* Current balance overview
* Total income tracking
* Total expense tracking
* Transaction count
* Category-wise expense breakdown
* Recent transaction summary

### Transaction Management

* Create transactions
* Edit transactions
* Delete transactions
* Persistent storage using PostgreSQL

### Search, Filter & Sort

* Search transactions by title
* Filter by Income / Expense
* Sort by:
  * Latest
  * Oldest
  * Highest Amount
  * Lowest Amount

### User Experience

* Loading state indicators
* Error handling
* Clean and modern UI

---

## Tech Stack

### Frontend

* React
* TypeScript
* React Router
* React Context API
* useReducer
* CSS
* React Icons
* React Spinners
* Vite

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* pg
* dotenv

### Communication

* REST API
* Fetch API

---

## What I Learned

Through this project I gained hands-on experience with:

### Frontend

* Building React applications using TypeScript
* Creating reusable React components
* Managing global state using Context API
* State management with useReducer
* Routing using React Router
* Form handling and validation

### Backend

* Building REST APIs with Express.js
* Handling HTTP requests and responses
* CRUD operations
* Organizing backend project structure

### Database

* Designing relational database schemas
* Connecting Node.js applications to PostgreSQL
* Writing SQL queries
* Implementing database-backed CRUD operations

### Full-Stack Development

* Frontend-backend integration
* Environment variable management
* Project organization
* Debugging and API testing with Thunder Client

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/Yvsedge/PersonalFinance.git
cd PersonalFinance
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create:

```env
frontend/.env
```

```env
VITE_API_URL=http://localhost:3000
```

### Backend Setup

```bash
cd backend
npm install
```

Create:

```env
backend/.env
```

```env
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=PersonalFinance
```

### Create Database

Create a PostgreSQL database named:

```sql
PersonalFinance
```

Run the schema provided in:

```text
backend/db/schema.sql
```

### Start Backend

```bash
cd backend
npm start
```

### Start Frontend

```bash
cd frontend
npm run dev
```

---

## Project Structure

```text
PersonalFinance/

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
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

---

## Architecture

```text
React + TypeScript
         │
         ▼
      Fetch API
         │
         ▼
     Express API
         │
         ▼
     PostgreSQL
```

The React frontend handles user interaction and state management, while the Express backend exposes RESTful API endpoints that communicate with a PostgreSQL database for persistent storage.

---

## Future Improvements

* User authentication
* Monthly budget tracking
* Data visualization and charts
* Export transaction history
* Dark mode
* Mobile optimization
* Pagination
* Multi-user support

---

## Known Limitations

* No authentication system
* Limited expense categories
* No pagination for large transaction histories
* Not optimized for mobile devices

---

## Screenshots

### Dashboard

<img width="1920" height="1265" alt="image" src="https://github.com/user-attachments/assets/3ed19871-f83f-4641-9efa-0bb77db9d094" />

### Transactions

<img width="1920" height="1050" alt="image" src="https://github.com/user-attachments/assets/4496d726-c051-4857-b115-6f840349bf72" />
