import React, {useState, useContext} from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../AuthContext';
import PasswordInput from '../components/PasswordInput';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Error from '../components/Error';

export default function Signup() {
  const navigation = useNavigation();

  const {signup} = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onLoginPress = () => {
    navigation.goBack();
  };

  const onSignupPress = async () => {
    try {
      setError('');
      await signup(name, email, password);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <Text style={styles.titleStyle}>User Signup</Text>
      {error && <Error message={error} />}
      <InputField placeholder="Name" value={name} onChangeText={setName} />
      <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      <PasswordInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Signup" onPress={onSignupPress} />
      <Button title="Go to Login" onPress={onLoginPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 150,
    marginHorizontal: 20,
  },
  imageView: {
    width: 75,
    height: 75,
    alignSelf: 'center',
  },
  titleStyle: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 40,
  },
});
