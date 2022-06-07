import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import {Header} from '../components/Header';
import Explore from '../pages/Explore';
import Home from '../pages/Home';
import Item from '../pages/Item';
import {NativeStackScreenList} from '../types/routes';

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
        name="explore"
        component={Explore}
        options={{header: () => <Header title="Explore" />}}
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
            return <Header title={route.params.show.name} />;
          },
        }}
      />
    </Stack.Navigator>
  );
}
