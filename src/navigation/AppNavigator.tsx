import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { DefaultTheme } from "react-native-paper";
import RegisterScreen from "../screens/RegisterScreen";


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{title:"Login"}}
                >
                </Stack.Screen>
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        headerBackVisible: false,
                        gestureEnabled: false
                    }}
                >

                </Stack.Screen>
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    
                >

                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;