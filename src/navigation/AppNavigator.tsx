import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="login">
                <Stack.Screen
                    name="login"
                    component={LoginScreen}
                    options={{title:"Welcome"}}
                >
                </Stack.Screen>
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    
                >

                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;