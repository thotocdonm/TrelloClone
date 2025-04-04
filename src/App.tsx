/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AppNavigator from './navigation/AppNavigator';
import { DefaultTheme, PaperProvider } from 'react-native-paper';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';


  const safePadding = '5%';

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#0079BF", // Trello Blue
      accent: "#61BD4F", // Trello Green
      background: "#F4F5F7", // Light Gray
      surface: "#FFFFFF", // White background for cards
      text: "#172B4D", // Dark Gray/Black for readability
      placeholder: "#A5ADBA", // Light gray for placeholders
      disabled: "#C1C7D0", // Muted gray for disabled items
      card: "#E2E4E9", // Light card background
      border: "#DFE1E6", // Subtle border color
    },
  };

  return (
    <PaperProvider theme={theme}>
      <AppNavigator/>
    </PaperProvider>

  );
}



export default App;
