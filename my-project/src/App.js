
import React from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
/***** Authentication ******* */
import Login from "./login/Login";
import Register from "./register/Register";
/*************Role Mangement ***************/
import Dashboard from "./dashboard/Dashboard";
import Navbar from "./navbar/Navbar";

function App() {
  return (
   <>
   <Routes>
    {/* <Login/> */}
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Register />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/navbar" element={<Navbar />} />

    </Routes>
   </>

  );
}

export default App;
