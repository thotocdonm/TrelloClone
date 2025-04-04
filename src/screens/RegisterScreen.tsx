import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Button, MD3Colors, Text, TextInput } from 'react-native-paper';
import Icon from '@react-native-vector-icons/fontawesome6';
import { RootNavigationProp } from '../types/types';


const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const navigation = useNavigation<RootNavigationProp<'Register'>>();


  return (
    <View style={styles.container}>
      <Icon name="trello" size={50} color="#0079BF" iconStyle='brand' />
      <Text variant='headlineLarge'>Register</Text>
      <TextInput style={styles.input} mode='outlined' placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} mode='outlined' placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} mode='outlined' placeholder="Re-enter Password" secureTextEntry value={rePassword} onChangeText={setRePassword} />
      <Button mode='contained' onPress={() =>
        navigation.navigate('Login')
      }>Register</Button>
    </View>
  );
};


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    gap:20
  },
  input:{
    height:50,
    width:250
  }
})

export default RegisterScreen;
