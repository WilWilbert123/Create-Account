// HomeStackNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Detail from "../screens/Detail";
import DetailScreen from "../screens/DetailsScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPassword";
import SettingsScreen from "../screens/Settings";
const Stack = createNativeStackNavigator();
const screenOptionStyle = {
  headerShown: false
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
