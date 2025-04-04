import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Button, MD3Colors, Text, TextInput } from 'react-native-paper';
import Icon from '@react-native-vector-icons/fontawesome6';
import { RootNavigationProp } from '../types/types';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<RootNavigationProp<'Login'>>();


  return (
    <View style={styles.container}>
      <Icon name="trello" size={50} color="#0079BF" iconStyle='brand' />
      <Text variant='headlineLarge'>Welcome !</Text>
      <TextInput style={styles.input} mode='outlined' placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} mode='outlined' placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button mode='contained' onPress={() =>
        navigation.replace('Profile',{name:'Son'})
      }>Login</Button>
      <View style={styles.registerContainer}>
        <Text>Don't have an account yet ?</Text>
        <Button onPress={()=>navigation.navigate('Register')}>Register</Button>
      </View>
   
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
  },
  registerContainer:{
    display:'flex',
    justifyContent:'center',
    alignItems:"center",
    flexDirection:'row',
  }
})

export default LoginScreen;
