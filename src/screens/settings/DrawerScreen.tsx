import { createDrawerNavigator } from '@react-navigation/drawer';
import WorkspaceScreen from '../workspace/WorkspaceScreen';
import ProfileScreen from '../ProfileScreen';
import SettingScreen from './SettingScreen';
import { Appbar, Drawer as PaperDrawer } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootNavigationProp } from '../../types/types';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useAuthStore } from "../../store/authStore";
import { clearTokens } from "../../services/Auth/tokenService";
import { RootStackParamList } from '../../types/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from "react-native";
import { Platform, StatusBar } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator<RootStackParamList>();


const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0079BF' },
        headerTintColor: '#fff',
        headerBackVisible: false,
        headerShown: true
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={({ navigation }) => ({
          title: 'Settings',
          headerLeft: () => (
            <Appbar.Action
              icon="arrow-left"
              color="#fff"
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const DrawerContent = (props: any) => {
  console.log(props)
  const { state, navigation } = props;
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const handleLogout = async () => {
    await clearTokens();
    setIsAuthenticated(false);
  };

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: "#1f1f1f" }}>
      <PaperDrawer.Section title="" >
        <PaperDrawer.Item
          label="Your workspace"
          active={state.index === 0}
          onPress={() => navigation.navigate('Workspace')}
          icon="star"
          style={{ backgroundColor: state.index === 0 ? '#64ffda' : 'transparent' }}
        />
        <PaperDrawer.Item
          label="Profile"
          active={state.index === 1}
          onPress={() => navigation.navigate('Profile')}
          icon="inbox"
        />
      </PaperDrawer.Section>
      <PaperDrawer.Section>
        <PaperDrawer.Item
          label="Settings"
          active={state.index === 2}
          onPress={() => navigation.navigate('MainStack', { screen: 'Settings' })}
          icon="cog"
        />
        <PaperDrawer.Item
          label="Logout"
          onPress={handleLogout}
          icon="logout"
          style={{ backgroundColor: '#f4f4f4' }}
        />
      </PaperDrawer.Section>
    </DrawerContentScrollView>
  );
};

const DrawerScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0079BF",
          },
          headerTintColor: '#fff',
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="Workspace"
          component={WorkspaceScreen}
          options={{
            title: 'Trello Workspace',
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
          }}
        />
        <Drawer.Screen
          name="MainStack"
          component={MainStackNavigator}
          options={{
            title: 'Stack Screens',
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </SafeAreaView>
  );
};

export default DrawerScreen;