import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {CardsList} from '../components/CardsList';
import {Show, useGetShows} from '../server/shows';
import {NativeStackScreenList} from '../types/routes';

export default function Shows({
  navigation,
}: NativeStackScreenProps<NativeStackScreenList, 'shows'>) {
  const {shows, loading, fetchMore} = useGetShows();

  const onNavigateToItem = (infos: Show) => {
    navigation.push('item', {infos, type: 'tv'});
  };

  return (
    <CardsList
      onPressItem={onNavigateToItem}
      items={shows}
      loading={loading}
      onEndReached={fetchMore}
    />
  );
}
