import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Register from "../Register/Register";
import Signin from "../Login/Signin";
import Home from "../Dashboard/Home";
import Context from "../Context/Context";
import ListUsers from "../ListUsers/ListUsers";
import Profile from "../Profile.jsx/Profile";
import Category from "../Category/Category";
import AddCategory from "../Category/AddCategory";
import EditCategory from "../Category/EditCategory";
import Products from "../Products/Products";
import AddProducts from "../Products/AddProducts";
import EditProduct from "../Products/EditProducts";


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
            <Route path="/categories" element={<Category/>}/>
            <Route path="/add-category" element={<AddCategory/>}/>
            <Route path="/edit-category/:id" element={<EditCategory/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/add-Product" element={<AddProducts/>}/>
            <Route path="/edit-product/:id" element={<EditProduct/>}/>
        </Routes>
    </Router>
    </Context>
   </>
  )
}

export default Api