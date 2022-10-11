import React from 'react';
import { Box, Typography } from "@mui/material";
import { ProductItems } from '../ProducItems/ProducItems';

export const Dashboard = () => {
    return (
    <Box>
      <Typography variant="h4">Welcome, Guest</Typography>
      <ProductItems />
    </Box>
    );
  }