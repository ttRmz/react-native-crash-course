import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export function BackButton() {
  const {goBack} = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={goBack}>
      <Icon style={styles.icon} name="angle-left" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 8,
    padding: 12,
  },
  icon: {fontWeight: 'bold', fontSize: 24},
});
