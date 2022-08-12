export type Transaction = [
  type: string,
  from: string,
  to: string,
  amount: number,
  timestamp: number
];

export interface User {
  username: string;
  password: string;
  balance: number;
  transactions: Transaction[];
}
