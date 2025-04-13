import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import * as Keychain from "react-native-keychain";
import { useAuthStore } from "../store/authStore";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  useEffect(() => {
    const checkToken = async () => {
      const credentials = await Keychain.getGenericPassword({service: 'com.trello.accessToken'});
      console.log(credentials)
      setIsAuthenticated(!!credentials);
    };

    checkToken();
  }, [isAuthenticated]);

if (isAuthenticated === null) {
        return null; // or a SplashScreen
}


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "Profile" : "Login"}>
        {isAuthenticated ? (
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerBackVisible: false,
              gestureEnabled: false,
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Login" }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: "Register" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
