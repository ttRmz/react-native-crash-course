import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {Button} from '../components/Button';
import {useUserContext} from '../contexts/user';
import {NativeStackScreenList} from '../types/routes';

export default function Home({
  navigation,
}: NativeStackScreenProps<NativeStackScreenList, 'home'>) {
  const {logout, user} = useUserContext();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: withSequence(
            withTiming('-10deg', {duration: 50}),
            withRepeat(withTiming('10deg', {duration: 200}), -1, true),
            withTiming('0deg', {duration: 50}),
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.view}>
      <View>
        <Text style={styles.title}>
          Hi {user?.name} !{' '}
          <Animated.View style={animatedStyle}>
            <Text style={styles.emoji}>👋</Text>
          </Animated.View>
        </Text>
        <Button onPress={() => navigation.push('shows')} style={styles.shows}>
          Browse TV shows 🍿
        </Button>
        <Button onPress={() => navigation.push('movies')} style={styles.shows}>
          Browse movies 🎬
        </Button>
      </View>
      <TouchableOpacity onPress={logout} style={styles.logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: 44,
    marginTop: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emoji: {
    fontSize: 32,
  },
  shows: {
    marginBottom: 8,
  },
  logout: {
    borderWidth: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    overflow: 'hidden',
    width: '100%',
    padding: 12,
    marginBottom: 32,
    borderColor: '#b62e2e',
  },
  logoutText: {
    fontWeight: 'bold',
    color: '#b62e2e',
  },
});
