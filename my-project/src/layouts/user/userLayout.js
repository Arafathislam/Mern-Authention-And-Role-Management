import React from 'react'
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Navbar from '../../navbar/Navbar';
import Sidebar from '../../sidebar/Sidebar';
const UserLayout = () => {
   
    let location = useLocation();
    let token=true;

    if (token) {
        return (
          <>
            {/* <Navbar /> */}
            <Sidebar/>
            <Outlet />
          </>
        );
      }
      return <Navigate to="/login" state={{ from: location }} />;
  
}

export default UserLayout