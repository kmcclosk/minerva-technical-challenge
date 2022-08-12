import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid } from '@mui/material';
import { useAPI } from '../providers/APIProvider';
import { useCurrentUser } from '../providers/UserProvider';
import { Authenticated } from '../components/Authenticated';
import { NavBar } from '../components/NavBar';
import { Transfer } from '../components/Transfer';
import { TransactionHistory } from '../components/TransactionHistory';
import { Copyright } from '../components/Copyright';

const User: NextPage = () => {
  const { user } = useCurrentUser();
  const api = useAPI();

  return (
    <Authenticated>
      <Head>
        <title>Minerva: User</title>
      </Head>
      <Grid
        container
        direction="column"
        minHeight="100vh"
        justifyContent="space-between"
      >
        <Grid item>
          <NavBar />
        </Grid>
        <Grid item p={3}>
          <Transfer />
        </Grid>
        <Grid item p={3}>
          <TransactionHistory />
        </Grid>
        <Grid item>
          <Copyright />
        </Grid>
      </Grid>
    </Authenticated>
  );
};

export default User;
