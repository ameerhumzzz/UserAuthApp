import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AuthContext} from '../AuthContext';
import Button from '../components/Button';

export default function HomeScreen() {
  const {user, logout} = useContext(AuthContext);

  return (
    <View style={styles.mainView}>
      <Text style={styles.title}>Welcome, {user?.name}!</Text>
      <Text>Email: {user?.email}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
});
