import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Grid } from '@mui/material';
import { useAPI } from '../providers/APIProvider';
import { useRouter } from 'next/router';

const Logout: NextPage = () => {
  const router = useRouter();
  const api = useAPI();

  useEffect(() => {
    api.logout();
    router.push('/');
  }, [api, router]);

  return (
    <Box sx={{ height: '100vh' }}>
      <Head>
        <title>Minerva: Logout</title>
      </Head>
    </Box>
  );
};

export default Logout;
