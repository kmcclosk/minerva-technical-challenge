import React, { PropsWithChildren, useState } from 'react';
import { User } from '../types';

interface UserContextState {
  user?: User;
  setCurrentUser: any;
}

const UserContext = React.createContext<UserContextState | undefined>(
  undefined
);

export function UserProvider(props: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User>();

  const { children } = props;

  const setCurrentUser = (user: User) => {
    setUser(user);
  };

  const value = {
    user,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useCurrentUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error(`useCurrentUser must be used within an UserProvider`);
  }
  return context;
};
