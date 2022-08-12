import React, { PropsWithChildren, useReducer, useState } from 'react';
import initialDb, { newUser, newTransaction } from '../utils/db';

const DataContext = React.createContext<any>(undefined);

export function DataProvider(props: PropsWithChildren<{}>) {
  const { children } = props;
  const [db] = useState(initialDb);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const getUsers = () => {
    return db.users;
  };

  const findUser = (username: string) => {
    return db.users.find((user) => {
      return user.username === username;
    });
  };

  const addUser = (username: string, password: string) => {
    if (findUser(username)) {
      return false;
    }
    db.users.push(newUser(username, password));
    forceUpdate();
    return true;
  };

  const addToBalance = (username: string, amount: number) => {
    const user = findUser(username);
    if (!user) {
      return false;
    }
    user.balance += amount;
    user.transactions.push(
      newTransaction('deposit', 'system/faucet', user.username, amount)
    );
    forceUpdate();
    return true;
  };

  const transferAmount = (
    fromUsername: string,
    toUsername: string,
    amount: number
  ) => {
    const from = findUser(fromUsername);
    if (!from) {
      return [false, 'From user does not exist'];
    }
    const to = findUser(toUsername);
    if (!to) {
      return [false, 'To user does not exist'];
    }
    if (to === from) {
      return [false, "Can't send funds to yourself"];
    }

    if (amount > from.balance) {
      return [false, 'Insufficient funds'];
    }

    from.balance -= amount;
    to.balance += amount;

    from.transactions.push(
      newTransaction('withdrawal', from.username, to.username, amount)
    );
    to.transactions.push(
      newTransaction('deposit', to.username, from.username, amount)
    );

    forceUpdate();

    return [true];
  };

  const value = {
    db,
    getUsers,
    findUser,
    addUser,
    addToBalance,
    transferAmount,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => {
  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error(`useData must be used within a DataProvider`);
  }
  return context;
};
