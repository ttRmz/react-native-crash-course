import React, {ReactElement, useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

interface User {
  name: string;
}

const defaultValues = {
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
  error: '',
};

interface UserContextValues {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
  error: string;
}

const UserContext = React.createContext<UserContextValues>(defaultValues);

export const useUserContext = () => React.useContext(UserContext);

export const UserProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(defaultValues.loading);
  const [error, setError] = React.useState<string>(defaultValues.error);

  useEffect(() => {
    setLoading(true);
    retrieveUserSession().then(response => {
      setUser(response);
      setLoading(false);
    });
  }, []);

  function login(userSession: User): void {
    setLoading(true);
    storeUserSession(userSession)
      .then(() => {
        setLoading(false);
        setUser(userSession);
      })
      .catch(() => {
        setLoading(false);
        setError('Failed to login');
      });
  }

  function logout() {
    EncryptedStorage.removeItem('user_session');
    setUser(null);
  }

  const contextValues = React.useMemo(
    () => ({
      user,
      login,
      logout,
      loading,
      error,
    }),
    [user, loading, error],
  );

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

async function storeUserSession(user: User): Promise<void> {
  try {
    const result = await EncryptedStorage.setItem(
      'user_session',
      JSON.stringify(user),
    );
    return result;
  } catch (error) {
    throw error;
  }
}

async function retrieveUserSession(): Promise<User | null> {
  try {
    const session = await EncryptedStorage.getItem('user_session');

    if (session !== null) {
      return JSON.parse(session);
    }

    return null;
  } catch (error) {
    return null;
  }
}
