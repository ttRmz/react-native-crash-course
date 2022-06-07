import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {BackButton} from './BackButton';

interface HeaderProps {
  title: string;
  shouldHideBackButton?: boolean;
}

export function Header({title, shouldHideBackButton = false}: HeaderProps) {
  const {canGoBack} = useNavigation();
  const shouldDisplayBackButton = !shouldHideBackButton && canGoBack();

  return (
    <View style={styles.container}>
      {shouldDisplayBackButton && <BackButton />}
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    backgroundColor: '#fff',
  },
});
