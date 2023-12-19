// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNavigator from "./src/navigator/Navigation";
import OfflineNotice from './src/components/OfflineNotice';

export default function App() {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
      <OfflineNotice />
    </NavigationContainer>
  );
}
