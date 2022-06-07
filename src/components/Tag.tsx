import React from 'react';
import {StyleSheet, Text} from 'react-native';

interface TagProps {
  children: string;
}

export function Tag({children}: TagProps) {
  return <Text style={styles.container}>{children}</Text>;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#222',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 8,
    overflow: 'hidden',
  },
});
