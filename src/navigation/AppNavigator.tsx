import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WorkspaceScreen from "../screens/WorkspaceScreen";
import DrawerScreen from "../screens/DrawerScreen";
import * as Keychain from "react-native-keychain";
import { useAuthStore } from "../store/authStore";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  useEffect(() => {
    const checkToken = async () => {
      const credentials = await Keychain.getGenericPassword({service: 'com.trello.accessToken'});
      console.log("Credentials: ",credentials)
      setIsAuthenticated(!!credentials);
    };

    checkToken();
  }, [isAuthenticated]);

  console.log("isAuthenticated: ",isAuthenticated)
if (isAuthenticated === null) {
        return null; // or a SplashScreen
}


  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "Drawer" : "Login"}>
        {isAuthenticated ? (
          <Stack.Screen
            name="Drawer"
            component={DrawerScreen}
            options={{
              headerBackVisible: false,
              gestureEnabled: false,
              headerShown: false,
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
    </SafeAreaProvider>
  );
};

export default AppNavigator;
