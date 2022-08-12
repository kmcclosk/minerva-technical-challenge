import React, { useRef, useState } from 'react';
import {
  Alert,
  Box,
  Stack,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import Link from './Link';
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

export function SignupForm() {
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const [validation, setValidation] = useState<Validation>({});
  const [formStatus, setFormStatus] = useState<any>('initialized');

  const api = useAPI();

  const handleSignup = async () => {
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

    const res = await api.signup(username, password);
    setFormStatus(res ? 'success' : 'failure');
    if (res) {
      router.push('/');
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
        <Typography variant="h4">Sign Up</Typography>
        <Box>
          Already have an account? <Link href="/login">Login</Link>
        </Box>
      </Box>
      <Stack spacing={2}>
        {formStatus === 'failure' && (
          <Alert severity="error">An error occurred.</Alert>
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
          autoComplete="current-password"
          {...validation.password}
        />
        <Button variant="contained" disabled={disabled} onClick={handleSignup}>
          Sign up
        </Button>
      </Stack>
      <Box>
        By continuing, you agree to our{' '}
        <Link href="/terms-of-service">Terms of Service</Link> and{' '}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </Box>
    </Stack>
  );
}
