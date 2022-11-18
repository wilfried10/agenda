import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import DefaultLayout from './Layout/defaultLayout'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>

        <Route path='/*' element={<DefaultLayout />}> </Route>



      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
