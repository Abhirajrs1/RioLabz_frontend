import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Register from "../Register/Register";
import Signin from "../Login/Signin";


function Api() {
  return (
   <>
    <Router>
        <Routes>
            <Route path="/user-login" element={<Signin/>}/>
            <Route path="/user-register" element={<Register/>}/>
        </Routes>
    </Router>
   </>
  )
}

export default Api