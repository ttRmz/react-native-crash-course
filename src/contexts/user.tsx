import React, {ReactElement} from 'react';

interface User {
  name: string;
}

const defaultValues = {
  user: null,
  login: () => {},
  logout: () => {},
};

interface UserContextValues {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = React.createContext<UserContextValues>(defaultValues);

export const useUserContext = () => React.useContext(UserContext);

export const UserProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [user, setUser] = React.useState<User | null>(null);

  function login({name}: User): void {
    setUser({name});
  }

  function logout() {
    setUser(null);
  }

  const contextValues = React.useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
