import { Routes, Route,  } from 'react-router-dom'
import AddExpense from './pages/AddExpense'
import Dashboard from './pages/Dashboard'
import Layout from './pages/Layout'
import './App.css'

function App() {



  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Dashboard></Dashboard>}/>
          <Route path="/transactions" element={<AddExpense></AddExpense>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
