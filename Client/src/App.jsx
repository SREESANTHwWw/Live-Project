import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Navbar from './Pages/Navbar'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'


const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Navbar/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<SignUp/>}/>

   </Routes>
   
   </BrowserRouter>
  )
}

export default App