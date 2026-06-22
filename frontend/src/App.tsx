import { Routes, Route,  } from 'react-router-dom'
import AddExpense from './pages/AddExpense'
import Dashboard from './pages/Dashboard'
import Layout from './pages/Layout'
import Login from './pages/Login'
import Signup from './pages/Signup'

import ProtectedRoute from './pages/ProtectedRoute'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          <Route
              path="/"
              element={
                  <ProtectedRoute>
                      <Dashboard />
                  </ProtectedRoute>
              }
          />
          <Route
              path="/transactions"
              element={
                  <ProtectedRoute>
                      <AddExpense />
                  </ProtectedRoute>
              }
          />
        </Route>
        <Route path="/Sign" element={<Signup></Signup>}></Route>
        <Route path="/Login" element={<Login></Login>}></Route>
      </Routes>
    </>
  )
}

export default App
