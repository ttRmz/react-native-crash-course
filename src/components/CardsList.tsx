import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {Movie} from '../server/movies';
import {Show} from '../server/shows';
import {CardItem} from './CardItem';

interface CardsListProps {
  onPressItem?: (item: Movie | Show) => void;
  loading: boolean;
  onEndReached: () => void;
  items: (Show | Movie)[];
}

export function CardsList({
  onEndReached,
  items,
  loading,
  onPressItem,
}: CardsListProps) {
  const renderItem = ({item}: {item: Movie | Show; index: number}) => {
    const onPress = () => {
      if (typeof onPressItem === 'function') {
        onPressItem(item);
      }
    };

    return <CardItem onPress={onPress} infos={item} />;
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
