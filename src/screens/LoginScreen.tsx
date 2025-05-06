import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Button, MD3Colors, Text, TextInput } from 'react-native-paper';
import Icon from '@react-native-vector-icons/fontawesome6';
import { RootNavigationProp } from '../types/types';
import authService from '../services/Auth/authService';
import { saveTokens } from '../services/Auth/tokenService';
import { useAuthStore } from '../store/authStore';
import * as Keychain from "react-native-keychain";



const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<RootNavigationProp<'Login'>>();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const handleLogin = async (email:string,password:string) => {
    console.log("email",email)
    const res = await authService.login(email,password);
    
    console.log("password",password)
    console.log(res)
    console.log(res.data.access,res.data.refresh)
    if(res && res.code === "SUCCESS"){
      await saveTokens(res.data.access,res.data.refresh);
      setIsAuthenticated(true);
    }
  
  }



  return (
    <View style={styles.container}>
      <Icon name="trello" size={50} color="#0079BF" iconStyle='brand' />
      <Text variant='headlineLarge'>Welcome !</Text>
      <TextInput style={styles.input} mode='outlined' placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} mode='outlined' placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button mode='contained' onPress={()=>handleLogin(email,password)}>Login</Button>
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
