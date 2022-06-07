import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {ExploreItem} from '../components/ExploreItem';
import {Tag} from '../components/Tag';
import {NativeStackScreenList} from '../types/routes';

export default function Item({
  route,
}: NativeStackScreenProps<NativeStackScreenList, 'item'>) {
  const {show} = route.params;

  const enteringAnimation = FadeInDown.duration(500);

  return (
    <Animated.ScrollView entering={enteringAnimation}>
      <ExploreItem show={show} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}>
        {show.genres.map(genre => (
          <Tag key={genre.id}>{genre.name}</Tag>
        ))}
      </ScrollView>
      <Text style={styles.overview}>{show.overview}</Text>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 16,
  },
  overview: {
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 24,
  },
});