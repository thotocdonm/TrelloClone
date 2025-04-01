import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

type RootStackParamList = {
    Login: undefined;
    Profile: { name: string };
  };
  
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NavigationProp>();


  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={() =>
        navigation.navigate('Profile',{name:'Son'})
      } />
    </View>
  );
};

export default LoginScreen;
