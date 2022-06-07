import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Header} from '../components/Header';
import Login from '../pages/Login';
import {NativeStackScreenList} from '../types/routes';

const Stack = createNativeStackNavigator<NativeStackScreenList>();

export function UnauthenticatedUser() {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          header: () => <Header shouldHideBackButton title="Login" />,
        }}
      />
    </Stack.Navigator>
  );
}
