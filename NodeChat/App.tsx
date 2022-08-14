import React, {Component} from "react";
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from "./src/screens/Routes";
import promiseMiddleware from 'redux-promise'
import reducers from './src/store/reducers/index'
import { createStore, applyMiddleware, compose} from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from 'redux-devtools-extension';


const createStoreWithMiddleware = createStore(reducers, composeWithDevTools(
    applyMiddleware(promiseMiddleware)
))


const App = () => {
 
  return (
    <Provider store={createStoreWithMiddleware}>
      <NavigationContainer>
        <RootNavigator/> 
      </NavigationContainer>
    </Provider>
  );
};

export default App;
