import { CssBaseline } from '@mui/material';
import './App.css';

import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Routes } from './routes';
import { Dashboard } from './components/Dashboard/Dashboard';
import { MainLayout } from './layouts/Mainlayout/Mainlayout';

const router = createBrowserRouter([
  {
    path: Routes.Home,
    element: <MainLayout />,
    children: [
      {
        path: Routes.Dashboard,
        element: <Dashboard />
      },
      {
        path: "/",
        element: <Navigate to={Routes.Dashboard} replace />
      },
      {
        path: "*",
        element: <Navigate to={Routes.Dashboard} replace />
      }
    ]
  }
]);



 export const App = () =>{
  return (
    <>
    
      <CssBaseline />
      <RouterProvider router={router} />
    
    </>
  );
  
}
