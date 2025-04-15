import React, {useState, useContext} from 'react';
import {Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../AuthContext';
import PasswordInput from '../components/PasswordInput';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Error from '../components/Error';
import {NavigationConstant} from '../Constant';

export default function LoginScreen() {
  const navigation = useNavigation();

  const {login} = useContext(AuthContext);

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const onLoginPress = async () => {
    try {
      setError('');
      await login(email, password);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const onSignupPress = () => {
    navigation.navigate(NavigationConstant.SignupScreen);
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <Image source={require('../assets/lock.png')} style={styles.imageView} />
      <Text style={styles.titleStyle}>User Authentication App</Text>
      {error && <Error message={error} />}
      <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      <PasswordInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={onLoginPress} />
      <Button title="Go to Signup" onPress={onSignupPress} />
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
