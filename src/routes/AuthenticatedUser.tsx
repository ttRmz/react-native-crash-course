import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import {Header} from '../components/Header';
import Shows from '../pages/Shows';
import Home from '../pages/Home';
import Item from '../pages/Item';
import {NativeStackScreenList} from '../types/routes';
import Movies from '../pages/Movies';

const Stack = createNativeStackNavigator<NativeStackScreenList>();

export function AuthenticatedUser() {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          header: () => <Header shouldHideBackButton title="Home" />,
        }}
      />
      <Stack.Screen
        name="shows"
        component={Shows}
        options={{header: () => <Header title="TV Shows" />}}
      />
      <Stack.Screen
        name="movies"
        component={Movies}
        options={{header: () => <Header title="Movies" />}}
      />
      <Stack.Screen
        name="item"
        component={Item}
        options={{
          header: props => {
            const {route} = props as NativeStackScreenProps<
              NativeStackScreenList,
              'item'
            >;
            return <Header title={route.params.infos.name} />;
          },
        }}
      />
    </Stack.Navigator>
  );
}
