import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {CardsList} from '../components/CardsList';
import {useGetShows} from '../server/shows';
import {NativeStackScreenList} from '../types/routes';

export default function Shows({
  navigation,
}: NativeStackScreenProps<NativeStackScreenList, 'shows'>) {
  const {shows, loading, fetchMore} = useGetShows();

  return (
    <CardsList
      navigation={navigation}
      items={shows}
      loading={loading}
      onEndReached={fetchMore}
    />
  );
}
