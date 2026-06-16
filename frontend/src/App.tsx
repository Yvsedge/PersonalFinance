import { useReducer, useEffect, useState } from 'react'
import {ExpContext} from './context/ExpContext'
import {expReducer} from './dispatch/expReducer'
import { Routes, Route,  } from 'react-router-dom'
import AddExpense from './pages/AddExpense'
import Dashboard from './pages/Dashboard'
import Layout from './pages/Layout'
import './App.css'
import { useSearchParams } from "react-router-dom";

function App() {

  const [expenses, dispatch] = useReducer(
    expReducer, 
    []
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const filter = searchParams.get("filter") || "";
  const sort = searchParams.get("sort") || "";
  const search = searchParams.get("search") || "";

  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
      setLoading(true);

      fetch(`${import.meta.env.VITE_API_URL}/expenses?page=${page}&filter=${filter}&sort=${sort}&search=${search}`)
          .then(res => {
              if (!res.ok) throw new Error("Server error");
              return res.json();
          })
          .then(data => {
              dispatch({
                  type: "LOAD_EXP",
                  expenses: data.expenses
              });
              setTotalPage(data.totalPages)
          })
          .catch(() => setError(true))
          .finally(() => setLoading(false));

  }, [page, filter, sort, search]);

  return (
    <ExpContext.Provider 
      value = {{
        expenses : expenses,
        dispatch : dispatch,
        loading : loading,
        error : error,
        totalPage : totalPage
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
