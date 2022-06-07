import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export function BackButton() {
  const {goBack} = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={goBack}>
      <Text style={styles.text}>Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
  },
  text: {fontWeight: 'bold'},
});
