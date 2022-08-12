import React, { useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAPI } from '../providers/APIProvider';
import { useCurrentUser } from '../providers/UserProvider';

type Validation = {
  amount?: {
    error: boolean;
    helperText: string;
  };
  recipient?: {
    error: boolean;
    helperText: string;
  };
};

export function Transfer() {
  const amountRef = useRef<HTMLInputElement>();
  const recipientRef = useRef<HTMLInputElement>();

  const [validation, setValidation] = useState<Validation>({});
  const [formStatus, setFormStatus] = useState<any>('initialized');

  const { user } = useCurrentUser();
  const api = useAPI();

  if (!user) {
    return null;
  }

  const handleClickFaucet = async () => {
    await api.faucet(user.username);
  };

  const handleClickTransfer = async () => {
    const recipientEl = recipientRef?.current;
    const amountEl = amountRef?.current;

    if (!recipientEl || !amountEl) {
      return;
    }

    const recipient = recipientEl.value;
    const amount = amountEl.value;

    setFormStatus('submitting');

    const validation: Validation = {};
    if (amount.length === 0) {
      validation.amount = { error: true, helperText: 'Amount is required' };
    } else if (Number(amount) > user.balance) {
      validation.amount = { error: true, helperText: 'Insufficient funds' };
    }

    if (recipient.length === 0) {
      validation.recipient = {
        error: true,
        helperText: 'Recipient is required',
      };
    }

    setValidation(validation);

    if (validation.amount || validation.recipient) {
      setFormStatus('initialized');
      return;
    }

    const [res, details] = await api.transfer(user.username, recipient, amount);

    setFormStatus([res ? 'success' : 'failure', details]);
  };

  const [status, details] = formStatus;
  const disabled = formStatus === 'submitting';

  return (
    <Stack bgcolor="white" color="black" borderRadius={2} p={2}>
      <Typography variant="h4">Transfer</Typography>
      {status === 'failure' && (
        <Alert severity="error">Transaction failed. {details}</Alert>
      )}
      <Grid container>
        <Grid item xs={5}>
          <Typography variant="h6">From</Typography>
          <Box p={3} border="1px solid black">
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h4">{user?.username}</Typography>
              </Grid>
              <Grid item>
                <TextField
                  inputRef={amountRef}
                  type="number"
                  label="Amount"
                  disabled={disabled}
                  {...validation.amount}
                />
              </Grid>
              <Grid item>Max ({user?.balance})</Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          container
          item
          xs={2}
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Typography variant="h6">&nbsp;</Typography>
          <Button
            variant="contained"
            disabled={disabled}
            onClick={handleClickTransfer}
            endIcon={<ArrowForwardIcon fontSize="large" />}
          >
            Transfer
          </Button>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h6">To</Typography>
          <Box p={3} border="1px solid black">
            <TextField
              inputRef={recipientRef}
              label="Recipient"
              disabled={disabled}
              {...validation.recipient}
            />
          </Box>
        </Grid>
      </Grid>
      <Box textAlign="center" p={3}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickFaucet}
        >
          Faucet +100
        </Button>
      </Box>
    </Stack>
  );
}
