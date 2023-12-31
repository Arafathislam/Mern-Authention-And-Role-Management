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
           <div className='flex'>

            <Sidebar/>
            <Outlet />
           </div>
          </>
        );
      }
      return <Navigate to="/login" state={{ from: location }} />;
  
}

export default UserLayout