import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {ExploreItem} from '../components/ExploreItem';
import {Show, useGetShows} from '../server/shows';
import {NativeStackScreenList} from '../types/routes';

export default function Explore({
  navigation,
}: NativeStackScreenProps<NativeStackScreenList, 'explore'>) {
  const renderItem = ({item}: {item: Show; index: number}) => {
    return <ExploreItem navigation={navigation} show={item} />;
  };

  const {shows, loading, fetchMore} = useGetShows();

  return (
    <View style={styles.view}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          style={styles.list}
          data={shows}
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
