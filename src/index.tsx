import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './AuthContext';
import AppNavigator from './AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
