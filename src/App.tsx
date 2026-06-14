import { useReducer, useEffect, useState } from 'react'
import {ExpContext} from './context/ExpContext'
import {expReducer} from './dispatch/expReducer'
import { Routes, Route,  } from 'react-router-dom'
import AddExpense from './pages/AddExpense'
import Dashboard from './pages/Dashboard'
import Layout from './pages/Layout'
import './App.css'

function App() {

  const [expenses, dispatch] = useReducer(
    expReducer, 
    []
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
      fetch(`${import.meta.env.VITE_API_URL}/expenses`)
          .then(res => {
              if (!res.ok) throw new Error("Server error");
              return res.json();
          })
          .then(data => dispatch({ type: 'LOAD_EXP', expenses: data }))
          .catch(() => setError(true))
          .finally(() => setLoading(false));
  }, []);

  return (
    <ExpContext.Provider 
      value = {{
        expenses : expenses,
        dispatch : dispatch,
        loading : loading,
        error : error
    }}>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Dashboard></Dashboard>}/>
          <Route path="/transactions" element={<AddExpense></AddExpense>}></Route>
        </Route>
      </Routes>
    </ExpContext.Provider>
  )
}

export default App
