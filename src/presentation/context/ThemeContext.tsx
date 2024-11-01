import { createContext, PropsWithChildren } from "react";

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';

import { adaptNavigationTheme, PaperProvider } from 'react-native-paper';
import { useColorScheme } from "react-native";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const ThemeContext = createContext({
  isDark: false,
  theme: LightTheme
})

export const ThemeContextProvider = ({children}: PropsWithChildren) => {
  const colorScheme = useColorScheme()
  const isDarkTheme = colorScheme === 'dark'
  const theme = isDarkTheme ? DarkTheme : LightTheme

  return (
      <PaperProvider theme={theme}>
        <ThemeProvider value={theme}>
          <ThemeContext.Provider value={{
            isDark: isDarkTheme,
            theme
          }}>
            {children}
          </ThemeContext.Provider>
        </ThemeProvider>
      </PaperProvider>
  )
}