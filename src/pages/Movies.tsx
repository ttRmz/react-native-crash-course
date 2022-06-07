import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {ExploreItem} from '../components/ExploreItem';
import {useGetMovies} from '../server/movies';
import {Movie} from '../server/movies';
import {NativeStackScreenList} from '../types/routes';

export default function Movies({
  navigation,
}: NativeStackScreenProps<NativeStackScreenList, 'movies'>) {
  const renderItem = ({item}: {item: Movie; index: number}) => {
    return <ExploreItem navigation={navigation} infos={item} />;
  };

  const {movies, loading, fetchMore} = useGetMovies();

  return (
    <View style={styles.view}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          style={styles.list}
          data={movies}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          onEndReached={fetchMore}
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
