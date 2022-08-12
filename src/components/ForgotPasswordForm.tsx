import React, { useRef, useState } from 'react';
import Link from 'next/link';
import {
  Alert,
  Box,
  Stack,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { useAPI } from '../providers/APIProvider';

type Validation = {
  username?: {
    error: boolean;
    helperText: string;
  };
};

export function ForgotPasswordForm() {
  const usernameRef = useRef<HTMLInputElement>();
  const [validation, setValidation] = useState<Validation>({});
  const [formStatus, setFormStatus] = useState<any>(['initialized']);

  const api = useAPI();

  const handleForgotPassword = async () => {
    const inputEl = usernameRef?.current;
    if (!inputEl) {
      return;
    }

    const username = inputEl.value;

    setFormStatus(['submitting']);

    const validation: Validation = {};
    if (username.length === 0) {
      validation.username = { error: true, helperText: 'Username is required' };
    }
    setValidation(validation);

    if (validation.username) {
      setFormStatus(['initialized']);
      return;
    }

    const res = await api.retrievePassword(username);

    setFormStatus(res ? ['success', [username, res]] : ['failure']);

    inputEl.value = '';
  };

  const [status, details] = formStatus;
  const disabled = status === 'submitting';

  return (
    <Stack
      sx={{ backgroundColor: 'white', color: 'black' }}
      spacing={2}
      p={2}
      borderRadius={2}
      width="100%"
    >
      <Box>
        <Box>
          <Link href="/login">Back to Login</Link>
        </Box>
        <Typography variant="h4">Forgot Password</Typography>
        <Box>
          No worries! Just enter the username that you signed up with to reset
          it.
        </Box>
      </Box>
      <Stack spacing={2}>
        {status === 'success' && (
          <Alert severity="info">
            The password for <b>{details[0]}</b> is <b>{details[1]}</b>.
          </Alert>
        )}
        {status === 'failure' && (
          <Alert severity="error">
            Unable to retrieve password, try again.
          </Alert>
        )}
        <TextField
          inputRef={usernameRef}
          label="Username"
          disabled={disabled}
          {...validation.username}
        />
        <Button
          variant="contained"
          disabled={disabled}
          onClick={handleForgotPassword}
        >
          Retrieve Password
        </Button>
      </Stack>
    </Stack>
  );
}
