import { Button, Grid } from '@mui/material';
import React from 'react';
import { Logo } from '../components/Logo';
import { useCurrentUser } from '../providers/UserProvider';
import { useRouter } from 'next/router';

// enum NavBarVariant {
// }

interface NavBarProps {
  variant?: string; // NavBarVariant;
}

export function NavBar({ variant }: NavBarProps) {
  const router = useRouter();
  const { user } = useCurrentUser();

  const handleClickLogo = () => {
    router.push('/');
  };

  let link;

  if (variant === 'logoOnly') {
    link = null;
  } else if (variant === 'backButton') {
    link = (
      <Button
        variant="contained"
        onClick={() => {
          router.back();
        }}
      >
        Back
      </Button>
    );
  } else {
    link = user ? (
      <Button
        variant="contained"
        onClick={() => {
          router.push('/logout');
        }}
      >
        Logout
      </Button>
    ) : (
      <Button
        variant="contained"
        onClick={() => {
          router.push('/signup');
        }}
      >
        Sign up
      </Button>
    );
  }

  return (
    <Grid container p={2} alignItems="center" justifyContent="space-between">
      <Grid item>
        <Button onClick={handleClickLogo}>
          <Logo />
        </Button>
      </Grid>
      <Grid item>{link}</Grid>
    </Grid>
  );
}
