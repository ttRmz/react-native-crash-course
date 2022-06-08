import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {Movie} from '../server/movies';
import {Show} from '../server/shows';
import {NativeStackScreenList} from '../types/routes';
import {CardItem} from './CardItem';

interface CardsListProps {
  loading: boolean;
  onEndReached: () => void;
  items: (Show | Movie)[];
  navigation: NativeStackScreenProps<
    NativeStackScreenList,
    'movies' | 'shows'
  >['navigation'];
}

export function CardsList({
  navigation,
  onEndReached,
  items,
  loading,
}: CardsListProps) {
  const renderItem = ({item}: {item: Movie; index: number}) => {
    return <CardItem navigation={navigation} infos={item} />;
  };

  return (
    <View style={styles.view}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          style={styles.list}
          data={items}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          onEndReached={onEndReached}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  list: {
    width: '100%',
  },
});
