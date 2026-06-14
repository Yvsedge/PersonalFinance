# Personal Finance Tracker (PFT)

A full-stack personal finance tracking application built with **React**, **TypeScript**, and **Express.js**.

This project was created as a learning exercise to understand modern frontend development with React and TypeScript, while also gaining hands-on experience with backend development and frontend-backend integration using Express. It is my first project using Express.js.

## Features

* 📊 Dashboard with financial overview

  * Current balance
  * Total income
  * Total expenses
  * Transaction count

* 💰 Transaction Management

  * Add new transactions
  * Edit existing transactions
  * Delete transactions

* 🔍 Search and Filter

  * Search transactions by title
  * Filter by income or expense
  * Sort transactions

* 📈 Expense Analysis

  * Category-based expense breakdown
  * Recent transactions section

## Tech Stack

### Frontend

* React
* TypeScript
* CSS

### Backend

* Express.js
* Node.js

### Other Tools

* REST API
* JSON-based data handling
* React Router   
* React Icons   
* react-spinners   
* Vite               

## What I Learned

Through this project I gained experience with:

* Building React applications using TypeScript
* Creating reusable React components
* Managing application state
* Building REST APIs with Express.js
* Handling HTTP requests and responses
* Connecting a frontend application to a backend server
* CRUD operations (Create, Read, Update, Delete)
* Project structure and organization in full-stack applications

## Installation

> **Note:** The backend and frontend must both be running simultaneously. 
> Open two terminal windows — one for each.

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

### Install frontend dependencies

```bash
npm install
```

### Install backend dependencies

```bash
cd backend
npm install
```

### Environment Setup
Create a `.env` file in the root directory:
```
VITE_API_URL=http://localhost:3000
```

### Run the backend

```bash
cd backend
node server
```

### Run the frontend

```bash
npm run dev
```

## Project Structure

```text
PersonalFinance/
│
├── backend/
│   ├── data/
│   │   └── expense.js          # Expense data source
│   ├── routes/
│   │   └── expense.js          # Expense API routes
│   ├── server.js              # Express server entry point
│   └── package.json
│
├── public/
│
├── src/
│   ├── components/            # Reusable UI components
│   ├── context/               # React Context API
│   ├── dispatch/              # State update logic
│   ├── hooks/                 # Custom React hooks
│   ├── pages/                 # Application pages
│   ├── types/                 # TypeScript type definitions
│   ├── App.tsx
│   └── main.tsx
│
├── .env
├── vite.config.ts
├── package.json
└── README.md
```

## Architecture

The application follows a simple full-stack architecture:

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
      Local Data Store
```

The frontend handles UI rendering, state management, and user interactions, while the Express backend exposes API endpoints for managing expense data. The frontend communicates with the backend through HTTP requests, making this project a practical introduction to frontend-backend integration.


## Future Improvements

* Database integration (MongoDB/PostgreSQL) 
* User authentication             
* Data visualization and charts
* Monthly budget tracking
* Export transaction history
* Dark mode support
* Mobile responsiveness

## Screenshots

### Dashboard

<img width="1920" height="1265" alt="image" src="https://github.com/user-attachments/assets/3ed19871-f83f-4641-9efa-0bb77db9d094" />

### Transactions

<img width="1920" height="1050" alt="image" src="https://github.com/user-attachments/assets/4496d726-c051-4857-b115-6f840349bf72" />

## Known Limitations
* Data is stored in memory — restarting the server resets all transactions
* No user authentication — all data is shared
* Not optimized for mobile screens
