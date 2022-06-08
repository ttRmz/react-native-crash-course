import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {CardItem} from '../components/CardItem';
import {Tag} from '../components/Tag';
import {Video} from '../components/Video';
import {useGetMovieVideos} from '../server/video';
import {NativeStackScreenList} from '../types/routes';

export type ItemType = 'tv' | 'movie';

export default function Item({
  route,
}: NativeStackScreenProps<NativeStackScreenList, 'item'>) {
  const {infos, type} = route.params;

  const {videos, loading} = useGetMovieVideos(infos.id, type);

  const enteringAnimation = FadeInDown.duration(500);

  if (loading) {
    return <ActivityIndicator style={styles.loading} size="large" />;
  }

  return (
    <Animated.ScrollView entering={enteringAnimation}>
      <CardItem infos={infos} />
      <View style={styles.content}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.list}>
          {infos.genres.map(genre => (
            <Tag key={genre.id}>{genre.name}</Tag>
          ))}
        </ScrollView>
        <Text style={styles.overview}>{infos.overview}</Text>
        {videos.length > 0 ? (
          <Text
            style={styles.trailer}
            children={`Trailer${videos.length > 1 ? 's' : ''} 📺`}
          />
        ) : null}
        {videos.map(({name, key}) => (
          <Video id={key} name={name} key={key} />
        ))}
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
  },
  content: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 16,
  },
  overview: {
    marginBottom: 24,
  },
  trailer: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
