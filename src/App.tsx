import React from 'react';
import { useColorScheme } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import {
  DefaultTheme as PaperDefaultTheme,
  MD3DarkTheme as PaperDarkTheme,
  PaperProvider,
} from 'react-native-paper';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const LightTheme = {
    ...PaperDefaultTheme,
    colors: {
      ...PaperDefaultTheme.colors,
      primary: '#0079BF', // Trello Blue
      accent: '#61BD4F',
      background: '#F4F5F7',
      surface: '#FFFFFF',
      text: '#172B4D',
      placeholder: '#A5ADBA',
      disabled: '#C1C7D0',
      card: '#E2E4E9',
      border: '#DFE1E6',
    },
  };

  const DarkTheme = {
    ...PaperDarkTheme,
    colors: {
      ...PaperDarkTheme.colors,
      primary: '#0079BF',
      accent: '#61BD4F',
      background: '#1E1E1E',
      surface: '#2C2C2C',
      text: '#FFFFFF',
      placeholder: '#A5ADBA',
      disabled: '#3C3C3C',
      card: '#2A2A2A',
      border: '#444444',
    },
  };

  const theme = isDarkMode ? DarkTheme : LightTheme;


  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
}

export default App;
