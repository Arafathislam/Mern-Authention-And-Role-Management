import React from 'react'
import { Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import Navbar from '../navbar/Navbar';
const DashboardLayout = () => {
    const navigate = useNavigate();
  return (
    <div>DashboardLayout</div>
  )
}

export default DashboardLayout