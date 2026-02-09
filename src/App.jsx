import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route } from "react-router-dom";
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Admin from './pages/Admin'
 


function App() {
  

  return (

    <>
   
      <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path ="/admin"  element= {<Admin />} />
      </Routes>
    </>
  )
}

export default App
