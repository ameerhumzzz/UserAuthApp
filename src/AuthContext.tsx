import React, {createContext, useEffect, useState, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ErrorMessages, StorageKey} from './Constant';

export interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  signup: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    const userData = await AsyncStorage.getItem(StorageKey.currentUser);
    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

  const signup = async (name: string, em: string, password: string) => {
    const email = em.toLowerCase();
    if (!name || !email || !password) {
      throw new Error(ErrorMessages.missingFields);
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      throw new Error(ErrorMessages.invalidEmail);
    }

    if (password.length < 6) {
      throw new Error(ErrorMessages.shortPassword);
    }

    const usersJSON = await AsyncStorage.getItem(StorageKey.users);
    const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];

    if (users.find(user => user.email === email)) {
      throw new Error(ErrorMessages.alreadyRegistered);
    }

    const newUser: User = {name, email, password};
    users.push(newUser);
    await AsyncStorage.setItem(StorageKey.users, JSON.stringify(users));
    await AsyncStorage.setItem(StorageKey.currentUser, JSON.stringify(newUser));

    setUser(newUser);
  };

  const login = async (em: string, password: string) => {
    const email = em.toLowerCase();

    if (!email || !password) {
      throw new Error(ErrorMessages.missingFields);
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      throw new Error(ErrorMessages.invalidEmail);
    }
    const usersJSON = await AsyncStorage.getItem(StorageKey.users);
    const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];

    const existingUser = users.find(user => user.email === email);
    if (!existingUser) {
      throw new Error(ErrorMessages.notRegistered);
    }

    if (existingUser.password !== password) {
      throw new Error(ErrorMessages.incorrectCredentials);
    }

    await AsyncStorage.setItem(
      StorageKey.currentUser,
      JSON.stringify(existingUser),
    );
    setUser(existingUser);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(StorageKey.currentUser);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, signup, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
