import { User, Transaction } from '../types';

export const newUser = (
  username: string,
  password: string,
  balance = 1000
): User => ({
  username,
  password,
  balance,
  transactions: [],
});

export const newTransaction = (
  type: string,
  from: string,
  to: string,
  amount: number
): Transaction => [type, from, to, amount, Date.now()];

const user0 = newUser('owl0', 'password0', 1000);
const user1 = newUser('owl1', 'password1', 1000);
const user2 = newUser('owl2', 'password1', 1000);
const whale = newUser('whale', 'fatcat', 1000000);

const users = [user0, user1, user2, whale];

const db = {
  users,
};

export default db;
