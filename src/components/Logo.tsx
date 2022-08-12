import React from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Avatar, Grid, Typography } from '@mui/material';

export function Logo() {
  return (
    <Grid container alignItems="center" spacing={2} wrap="nowrap">
      <Grid item>
        <Avatar>
          <AccountBalanceIcon sx={{ fontSize: '2rem' }} />
        </Avatar>
      </Grid>
      <Grid item>
        <Typography
          variant="h4"
          style={{ color: 'white', letterSpacing: '6px' }}
        >
          MINERVA
        </Typography>
      </Grid>
    </Grid>
  );
}
