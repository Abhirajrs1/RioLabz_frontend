import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Register from "../Register/Register";
import Signin from "../Login/Signin";
import Home from "../Dashboard/Home";
import Context from "../Context/Context";
import ListUsers from "../ListUsers/ListUsers";
import Profile from "../Profile.jsx/Profile";


function Api() {
  return (
   <>
   <Context>
    <Router>
        <Routes>
            <Route path="/user-login" element={<Signin/>}/>
            <Route path="/user-register" element={<Register/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/getAllUsers" element={<ListUsers/>}/>
            <Route path="/userProfile" element={<Profile/>}/>
        </Routes>
    </Router>
    </Context>
   </>
  )
}

export default Api