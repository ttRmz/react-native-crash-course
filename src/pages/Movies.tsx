import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {CardsList} from '../components/CardsList';
import {Movie, useGetMovies} from '../server/movies';
import {NativeStackScreenList} from '../types/routes';

export default function Movies({
  navigation,
}: NativeStackScreenProps<NativeStackScreenList, 'movies'>) {
  const {movies, loading, fetchMore} = useGetMovies();

  const onNavigateToItem = (infos: Movie) => {
    navigation.push('item', {infos, type: 'movie'});
  };

  return (
    <CardsList
      onPressItem={onNavigateToItem}
      items={movies}
      loading={loading}
      onEndReached={fetchMore}
    />
  );
}
