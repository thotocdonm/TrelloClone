import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Button, MD3Colors, Text, TextInput } from 'react-native-paper';
import Icon from '@react-native-vector-icons/fontawesome6';
import { RootNavigationProp } from '../../types/types';
import authService from '../../services/Auth/authService';


const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [passWord, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [confirmPassWord, setRePassword] = useState('');
  const navigation = useNavigation<RootNavigationProp<'Register'>>();

  const handleRegister = async (email: string, passWord: string, last_name: string, first_name: string, phone_number: string, username: string, confirmPassWord: string) => {
    const res = await authService.register(email, passWord, last_name, first_name, phone_number, username, confirmPassWord);
    if (res && res.code === "SUCCESS") {
      navigation.navigate('Login');
    }
  }

  return (
    <View style={styles.container}>
      <Icon name="trello" size={50} color="#0079BF" iconStyle='brand' />
      <Text variant='headlineLarge'>Register</Text>
      <TextInput style={styles.input} mode='outlined' placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} mode='outlined' placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} mode='outlined' placeholder="Phone number" value={phone_number} onChangeText={setPhoneNumber} />
      <TextInput style={styles.input} mode='outlined' placeholder="First name" value={first_name} onChangeText={setFirstName} />
      <TextInput style={styles.input} mode='outlined' placeholder="Last name" value={last_name} onChangeText={setLastName} />
      <TextInput style={styles.input} mode='outlined' placeholder="Password" secureTextEntry value={passWord} onChangeText={setPassword} />
      <TextInput style={styles.input} mode='outlined' placeholder="Re-enter Password" secureTextEntry value={confirmPassWord} onChangeText={setRePassword} />
      <Button mode='contained' onPress={() =>
        handleRegister(email, passWord, last_name, first_name, phone_number, username, confirmPassWord)
      }>Register</Button>
    </View>
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
  }
})

export default RegisterScreen;
