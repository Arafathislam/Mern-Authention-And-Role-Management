import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import PublicLayout from "../layouts/public/PublicLayout";
import UserLayout from "../layouts/user/userLayout";
import { publicRoutes,userRoutes } from "../routes";

const UseRoute = () => {
  return useRoutes([
    {
      path: '/',
      element: <PublicLayout />,
      children:[
        ...publicRoutes,
        { path: "*", element: <Navigate to="/" replace /> },


      ]

    },

    {
      path: '/user',
      element: <UserLayout />,
      children:[
        ...userRoutes,
        { path: "*", element: <Navigate to="/" replace /> },


      ]

    },
    

  ])
}

export default UseRoute