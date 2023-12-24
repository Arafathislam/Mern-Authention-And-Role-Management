import React from "react";
import Login from '../src/login/Login'
import Register from './register/Register'
import Dashboard from '../src/dashboard/Dashboard'

const publicRoutes = [
    { path: '', element: <Login /> },
    { path: 'register', element: <Register/> },
    
  ];

const userRoutes=[
  { path: 'dashboard', element: <Dashboard /> },

]

  export { publicRoutes,userRoutes};