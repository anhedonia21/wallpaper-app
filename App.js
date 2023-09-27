/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { View, useColorScheme } from "react-native"

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import 'react-native-gesture-handler';
import AppStack from './navigations/AppStack';
const Stack = createNativeStackNavigator();

function App(){
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
export default App;
