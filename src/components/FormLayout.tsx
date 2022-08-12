import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import { Grid } from '@mui/material';
import { NavBar } from '../components/NavBar';
import { FriendlyOwl } from '../components/FriendlyOwl';
import { Copyright } from '../components/Copyright';

type FormLayoutProps = PropsWithChildren<{ title: string }>;

export const FormLayout = ({ title, children }: FormLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Grid
        container
        direction="column"
        minHeight="100vh"
        justifyContent="space-between"
      >
        <Grid item>
          <NavBar variant="logoOnly" />
        </Grid>
        <Grid item>
          <Grid container>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              item
              xs={12}
              md={6}
              p={2}
              sx={{ order: { xs: 1, md: 0 } }}
            >
              <FriendlyOwl />
            </Grid>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              item
              xs={12}
              md={6}
              p={2}
              sx={{ order: { xs: 0, md: 1 } }}
            >
              {children}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Copyright />
        </Grid>
      </Grid>
    </>
  );
};

export default FormLayout;
