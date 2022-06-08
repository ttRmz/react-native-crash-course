import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {CardsList} from '../components/CardsList';
import {useGetMovies} from '../server/movies';
import {NativeStackScreenList} from '../types/routes';

export default function Movies({
  navigation,
}: NativeStackScreenProps<NativeStackScreenList, 'movies'>) {
  const {movies, loading, fetchMore} = useGetMovies();

  return (
    <CardsList
      navigation={navigation}
      items={movies}
      loading={loading}
      onEndReached={fetchMore}
    />
  );
}
