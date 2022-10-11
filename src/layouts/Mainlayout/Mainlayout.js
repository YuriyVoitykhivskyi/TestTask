import React from 'react';
import Box from '@mui/material/Box';

import { MainAppBar } from '../../components/AppBar/AppBar';
import { DrawerHeader } from '../../components/DrawerHeader/DrawerHeadre';
import { Navigate, Outlet } from 'react-router-dom';
import { Routes } from '../../routes';

export const MainLayout = () =>{

return (
    <Box sx={{ display: 'flex' }}>
      <MainAppBar/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <main id="main">
          <Outlet />
        </main>
      </Box>
    </Box>
  );
}