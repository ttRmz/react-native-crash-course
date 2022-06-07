import {NavigationContainer} from '@react-navigation/native';
import React, {ReactElement} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {RestfulProvider} from 'restful-react';
import {UserProvider} from '../contexts/user';

export default function AppProviders({children}: {children: ReactElement}) {
  return (
    <UserProvider>
      <RestfulProvider
        queryParams={{api_key: '1b19370e6d8b869f61727cba1f326adc'}}
        base="https://api.themoviedb.org/3/">
        <SafeAreaView style={styles.view}>
          <NavigationContainer>{children}</NavigationContainer>
        </SafeAreaView>
      </RestfulProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
