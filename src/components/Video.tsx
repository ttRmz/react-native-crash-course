import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import YouTube from 'react-native-youtube';
import {Video as VideoType} from '../server/video';

interface VideoProps {
  id: VideoType['key'];
  name: VideoType['name'];
}

export function Video({id, name}: VideoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <YouTube apiKey="" videoId={id} style={styles.youtube} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    marginBottom: 4,
  },
  youtube: {
    height: 200,
  },
});
