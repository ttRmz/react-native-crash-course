import React from 'react';
import {useUserContext} from '../contexts/user';
import {AuthenticatedUser} from '../routes/AuthenticatedUser';
import {UnauthenticatedUser} from '../routes/UnauthenticatedUser';
import AppProviders from './AppProviders';

function App() {
  const {user} = useUserContext();

  return user ? <AuthenticatedUser /> : <UnauthenticatedUser />;
}

export default function AppWithProviders() {
  return (
    <AppProviders>
      <App />
    </AppProviders>
  );
}
