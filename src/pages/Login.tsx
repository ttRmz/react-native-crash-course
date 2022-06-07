import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from '../components/Button';
import {useUserContext} from '../contexts/user';

export default function Login() {
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const {login} = useUserContext();

  const handleLogin = () => {
    if (name) {
      login({name});
    } else {
      setError('Name is required');
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.view}>
      <Text style={styles.title}>Who are you ?</Text>
      <TextInput
        onSubmitEditing={handleLogin}
        placeholder="Enter your name here"
        style={styles.input}
        onChangeText={setName}
        value={name}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <Button onPress={handleLogin} style={styles.button}>
        Login
      </Button>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    marginHorizontal: 44,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 16,
    borderRadius: 6,
    overflow: 'hidden',
  },
  error: {
    color: 'red',
    marginTop: -8,
    marginBottom: 16,
  },
  button: {
    marginBottom: 32,
  },
});
