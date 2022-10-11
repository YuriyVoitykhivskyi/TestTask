import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const MainAppBar = () =>{


    return (
    <AppBar position="fixed">
    <Toolbar>
      <Typography variant="h6" noWrap component="div">
        Test
      </Typography>
      <Box ml="auto" display="flex" alignItems="center">
        <Typography variant="body1">Hello User</Typography>
        <IconButton color="inherit"><AccountCircleIcon /></IconButton>
      </Box>
    </Toolbar>
  </AppBar>
    );
}