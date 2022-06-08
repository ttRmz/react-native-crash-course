import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {Movie} from '../server/movies';
import {Show} from '../server/shows';

interface CardItemProps {
  onPress?: () => void;
  infos: Show | Movie;
}

export function CardItem({infos, onPress}: CardItemProps) {
  const {poster_path, name} = infos;

  const enteringAnimation = FadeInDown.duration(500);

  const Component: any =
    typeof onPress === 'function' ? TouchableOpacity : View;

  return (
    <Animated.View entering={enteringAnimation}>
      <Component onPress={onPress} style={styles.item}>
        <ImageBackground
          resizeMode="cover"
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w440_and_h660_face${poster_path}`,
          }}
        />
        <Text style={styles.title}>{name}</Text>
      </Component>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#000',
    position: 'relative',
  },
  image: {
    height: 500,
    opacity: 0.8,
  },
  title: {
    position: 'absolute',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    bottom: 20,
    left: 20,
  },
});
