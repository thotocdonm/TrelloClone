import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Button, MD3Colors, TextInput } from 'react-native-paper';
import Icon from '@react-native-vector-icons/fontawesome6';
import { RootNavigationProp } from '../../types/types';
import authService from '../../services/Auth/authService';
import { saveTokens } from '../../services/Auth/tokenService';
import { useAuthStore } from '../../store/authStore';
import * as Keychain from "react-native-keychain";
import ThemedView from '../../shared/components/ThemedView';
import ThemedText from '../../shared/components/ThemedText';
import Toast from 'react-native-toast-message';



const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<RootNavigationProp<'Login'>>();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const handleLogin = async (email: string, password: string) => {
    try {
      console.log("email", email);
      const res = await authService.login(email, password);
      console.log("password", password);
      console.log(res);
      console.log(res.data.access, res.data.refresh);
      if (res && res.code === "SUCCESS") {
        await saveTokens(res.data.access, res.data.refresh);
        setIsAuthenticated(true);
      } else {
        // Show toast for non-success response
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: res.message || 'Invalid credentials. Please try again.',
        });
      }
    } catch (error: any) {
      // Show toast for network or other errors
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'An error occurred during login.',
      });

    }
  };



  return (
    <ThemedView style={styles.container}>
      <Icon name="trello" size={50} color="#0079BF" iconStyle='brand' />
      <ThemedText style={{ fontSize: 25, fontWeight: 'bold' }}>Welcome !</ThemedText>
      <TextInput style={styles.input} mode='outlined' placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} mode='outlined' placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button mode='contained' onPress={() => handleLogin(email, password)}>Login</Button>
      <ThemedView style={styles.registerContainer}>
        <ThemedText>Don't have an account yet ?</ThemedText>
        <Button onPress={() => navigation.navigate('Register')}>Register</Button>
      </ThemedView>

    </ThemedView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 20
  },
  input: {
    height: 50,
    width: 250
  },
  registerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    flexDirection: 'row',
  }
})

export default LoginScreen;
