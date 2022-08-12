import React, { PropsWithChildren } from 'react';
import { useData } from './DataProvider';
import { useCurrentUser } from './UserProvider';

const APIContext = React.createContext<any>(undefined);

const rand = (min = 0, max = 0) => {
  return Math.random() * (max - min) + min;
};

// Introduce a random delay to simulate a round-trip to a server.
const delayedFn =
  (fn: any) =>
  async (...args: any[]) => {
    return new Promise((resolve) =>
      setTimeout(async () => resolve(await fn(...args)), rand(150, 350))
    );
  };

export function APIProvider(props: PropsWithChildren<{}>) {
  const { findUser, addUser, addToBalance, transferAmount } = useData();
  const { setCurrentUser } = useCurrentUser();

  const { children } = props;

  const login = delayedFn(async (username: string, password: string) => {
    const match = findUser(username);
    if (match && match.password === password) {
      setCurrentUser(match);
      return true;
    }
    return false;
  });

  const logout = delayedFn(async () => {
    setCurrentUser(undefined);
  });

  const signup = delayedFn(async (username: string, password: string) => {
    return addUser(username, password);
  });

  const retrievePassword = delayedFn(async (username: string) => {
    const match = findUser(username);
    if (!match) {
      return undefined;
    }
    return match.password;
  });

  const faucet = delayedFn(async (username: string) => {
    return addToBalance(username, 100);
  });

  const transfer = delayedFn(
    async (fromUsername: string, toUsername: string, amount: number) => {
      return transferAmount(fromUsername, toUsername, amount);
    }
  );

  const value = {
    login,
    logout,
    signup,
    retrievePassword,
    transfer,
    faucet,
  };

  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
}

export const useAPI = () => {
  const context = React.useContext(APIContext);
  if (!context) {
    throw new Error(`useAPI must be used within an APIProvider`);
  }
  return context;
};
