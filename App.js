// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNavigator from "./src/navigator/Navigation";
import OfflineNotice from './src/components/OfflineNotice';
import { ThemeProvider } from "./src/components/ThemeContext";
import ThemeToggle from "./src/components/ThemeToggle";

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <HomeStackNavigator />
        <OfflineNotice />
        <ThemeToggle />
      </NavigationContainer>
    </ThemeProvider>
  );
}
