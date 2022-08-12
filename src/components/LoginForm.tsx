import React, { useRef, useState } from 'react';
import Link from './Link';
import {
  Alert,
  Box,
  Stack,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useAPI } from '../providers/APIProvider';
import { useRouter } from 'next/router';

type Validation = {
  username?: {
    error: boolean;
    helperText: string;
  };
  password?: {
    error: boolean;
    helperText: string;
  };
};

export function LoginForm() {
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const [validation, setValidation] = useState<Validation>({});
  const [formStatus, setFormStatus] = useState<any>('initialized');

  const api = useAPI();

  const handleLogin = async () => {
    const usernameEl = usernameRef?.current;
    const passwordEl = passwordRef?.current;

    if (!usernameEl || !passwordEl) {
      return;
    }

    const username = usernameEl.value;
    const password = passwordEl.value;

    setFormStatus('submitting');

    const validation: Validation = {};
    if (username.length === 0) {
      validation.username = { error: true, helperText: 'Username is required' };
    }
    if (password.length === 0) {
      validation.password = { error: true, helperText: 'Password is required' };
    }

    setValidation(validation);

    if (validation.username || validation.password) {
      setFormStatus('initialized');
      return;
    }

    const res = await api.login(username, password);
    setFormStatus(res ? 'success' : 'failure');
    if (res) {
      router.push('/user');
    }
  };

  const disabled = formStatus === 'submitting';

  return (
    <Stack
      bgcolor="white"
      color="black"
      spacing={2}
      p={2}
      borderRadius={2}
      width="100%"
      height="100%"
    >
      <Box>
        <Typography variant="h4">Login</Typography>
        <Box>
          New to our site? <Link href="/signup">Signup</Link>
        </Box>
      </Box>
      <Stack spacing={2}>
        {formStatus === 'failure' && (
          <Alert severity="error">The provided credentials are invalid.</Alert>
        )}
        <TextField
          inputRef={usernameRef}
          label="Username"
          disabled={disabled}
          {...validation.username}
        />
        <TextField
          inputRef={passwordRef}
          disabled={disabled}
          label="Password"
          type="password"
          {...validation.password}
          autoComplete="current-password"
        />
        <Box>
          <Link href="/forgot-password">Forgot your password?</Link>
        </Box>
        <Button variant="contained" disabled={disabled} onClick={handleLogin}>
          Log in
        </Button>
      </Stack>
    </Stack>
  );
}
