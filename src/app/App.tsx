import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {useUserContext} from '../contexts/user';
import {AuthenticatedUser} from '../routes/AuthenticatedUser';
import {UnauthenticatedUser} from '../routes/UnauthenticatedUser';
import AppProviders from './AppProviders';

function App() {
  const {user, loading} = useUserContext();

  if (loading) {
    return <ActivityIndicator style={styles.loading} size="large" />;
  }

  return user ? <AuthenticatedUser /> : <UnauthenticatedUser />;
}

export default function AppWithProviders() {
  return (
    <AppProviders>
      <App />
    </AppProviders>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
  },
});
