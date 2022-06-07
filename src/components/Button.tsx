import React from 'react';
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface ButtonProps {
  onPress: () => void;
  children: string;
  style?: StyleProp<ViewStyle>;
}

export function Button({onPress, children, style}: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 6,
    overflow: 'hidden',
    width: '100%',
    padding: 12,
    backgroundColor: '#222',
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
