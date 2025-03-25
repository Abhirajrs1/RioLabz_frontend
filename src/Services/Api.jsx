import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Signup from "../Login/Signup";
import Register from "../Register/Register";


function Api() {
  return (
   <>
    <Router>
        <Routes>
            <Route path="/login" element={<Signup/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    </Router>
   </>
  )
}

export default Api