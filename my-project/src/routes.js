import React from "react";
import Login from '../src/login/Login'
import Register from './register/Register'
import Dashboard from '../src/dashboard/Dashboard'
import RoleManage from "./roleManage/RoleManage";
import RoleCreate from './roleCreate/RoleCreate'
import User from './profile/User'
import ChangePassword from "./profile/ChangePassword";
const publicRoutes = [
    { path: '', element: <Login /> },
    { path: 'register', element: <Register/> },
    
  ];

const userRoutes=[
  { path: 'dashboard', element: <Dashboard/> },
  { path: 'rolemanage', element: <RoleManage/> },
  { path: 'rolecreate', element: <RoleCreate/> },
  { path: 'profile', element: <User/> },
  { path: 'changepass', element: <ChangePassword/> },

]

  export { publicRoutes,userRoutes};