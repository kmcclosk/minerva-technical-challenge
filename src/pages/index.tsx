import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Button, Stack, Typography } from '@mui/material';
import { FormLayout } from '../components/FormLayout';
import { useCurrentUser } from '../providers/UserProvider';

const Home: NextPage = () => {
  const router = useRouter();
  const { user } = useCurrentUser();

  if (user) {
    router.push('/user');
    return null;
  }

  const handleClickGetStarted = () => {
    router.push('/signup');
  };

  return (
    <FormLayout title="Minerva">
      <Stack spacing={2} sx={{ color: 'white', textAlign: 'center' }}>
        <Typography variant="h2">
          Exchange $OWL coins with other users!
        </Typography>
        <Typography variant="h4">Minerva makes it easy.</Typography>
        <Box>
          <Button
            size="large"
            variant="contained"
            onClick={handleClickGetStarted}
          >
            Get Started
          </Button>
        </Box>
      </Stack>
    </FormLayout>
  );
};

export default Home;
