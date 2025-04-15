import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen.tsx';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import {AuthContext} from './AuthContext';
import {NavigationConstant} from './Constant.tsx';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const {user} = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
        <Stack.Screen
          name={NavigationConstant.HomeScreen}
          component={HomeScreen}
        />
      ) : (
        <>
          <Stack.Screen
            name={NavigationConstant.LoginScreen}
            component={LoginScreen}
          />
          <Stack.Screen
            name={NavigationConstant.SignupScreen}
            component={SignupScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
