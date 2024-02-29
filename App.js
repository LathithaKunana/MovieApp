import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

{/*Route*/}
import AppNavigation from './navigation/appNavigation';

{/*Screens*/}
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <AppNavigation/>
  )
};
