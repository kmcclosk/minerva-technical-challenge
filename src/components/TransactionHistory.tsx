import React from 'react';
import {
  Box,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material';
import { useCurrentUser } from '../providers/UserProvider';

export function TransactionHistory() {
  const { user } = useCurrentUser();

  if (!user) {
    return null;
  }

  let transactions;

  if (!user.transactions || user.transactions.length === 0) {
    return <Box>No transactions</Box>;
  } else {
    const tableRows = user.transactions.map(
      ([type, from, to, amount, timestamp], idx) => {
        return (
          <TableRow
            key={idx}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell>{type}</TableCell>
            <TableCell>{from}</TableCell>
            <TableCell>{to}</TableCell>
            <TableCell>{amount}</TableCell>
            <TableCell>{timestamp}</TableCell>
          </TableRow>
        );
      }
    );

    transactions = (
      <TableContainer>
        <Table color="black">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <Stack bgcolor="white" color="black" borderRadius={2} p={2}>
      <Typography variant="h4">Transaction History</Typography>
      {transactions}
    </Stack>
  );
}
