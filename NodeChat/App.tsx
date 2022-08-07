import React, {Component} from "react";
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from "./src/screens/Routes";


const App = () => {
 
  return (
    <NavigationContainer>
      <RootNavigator/> 
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
