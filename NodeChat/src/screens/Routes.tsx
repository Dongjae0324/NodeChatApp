import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { RouteProp, ParamListBase, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Loading from '../screens/components/Auth/Loading'
import SignUp from '../screens/components/Auth/Signup'
import Friends from '../screens/components/Friends'
import ChatList from '../screens/components/Chat'
import ChatRoom from './components/Chat/chatRoom';
import CreateChatRoom from './components/Chat/createChatRoom'


import Profile from '../screens/components/Profile' 
import { Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

//Screens 


const Stack = createStackNavigator(); 
const Tab = createBottomTabNavigator(); 
/*
 모든 작업은 firebase 없이 Node로만 해보자!
 stack Navigator 
    - Stack Screen A Loading(로그인이 안되어있을때 보여주는 로그인 페이지)
    - Stack Screen B SignUp(회원가입으로 넘어가는 로그인 페이지 )
 
 Stack Navigator 
    - Tab Navigator 
        - Tab Screen A - 유저 목록
        - Tab Screen B - 채팅방
        - Tab Screen c - 프로필 수정
*/ 

type TabBarIconProps = {focused: boolean; color: string; size: number}
const Icons: Record<string, string[]> = {
    Friends: ['account-supervisor', 'account-supervisor-outline'],
    Chat: ['chat', 'chat-outline'], 
    Profile: ['account', 'account-outline'] 
}
const screenOptionsTab = ({route}: {route: RouteProp<ParamListBase, string>}) => {
    return{
      headerShown: false, 
      tabBarIcon: ({focused, color, size}: TabBarIconProps) => {
        const {name} = route
        const focusedSize = focused ? size + 5: size 
        const focusedColor = focused ? '#84a98c': '#52796f'
        const iconName = focused ? Icons[name][0] : Icons[name][1]
        return <Icon name={iconName} color={focusedColor} size={focusedSize}/>
      },
      tabBarStyle: { height: 60},
      tabBarHideOnKeyboard: true
    }
}


const MainComponent = () => {
    
    return (
        <Tab.Navigator screenOptions={screenOptionsTab} initialRouteName={"Friends"}>
            <Tab.Screen name="Friends" component={Friends} options={{tabBarLabel: '친구', tabBarLabelStyle: {fontSize: 10, color: 'black', paddingBottom: 10, ...Platform.select({ios:{paddingBottom: 0, fontSize: 1}})}}}/> 
            <Tab.Screen name="Chat" component={ChatList} options={{tabBarLabel: '채팅', tabBarLabelStyle: {fontSize: 10, color: 'black', paddingBottom: 10, ...Platform.select({ios:{paddingBottom: 0, fontSize: 1}})}}}/> 
            <Tab.Screen name="Profile" component={Profile} options={{tabBarLabel: '프로필', tabBarLabelStyle: {fontSize: 10, color: 'black', paddingBottom: 10, ...Platform.select({ios:{paddingBottom: 0, fontSize: 1}})}}}/> 
        </Tab.Navigator>
    )
}


const ChatComponent = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"Main"}>
            <Stack.Screen name="Main" component={MainComponent}/>
            <Stack.Screen name='CreateChatRoom' component={CreateChatRoom}/>
            <Stack.Screen name="ChatRoom" component={ChatRoom}/>
        </Stack.Navigator>
    )
}

export const RootNavigator = () => {

    return(
        <Stack.Navigator screenOptions= {{headerShown: false}} initialRouteName={'Loading'}>
            <Stack.Screen name="Loading" component={Loading}/>  
            <Stack.Screen name="SignUp" component ={SignUp}/> 
            <Stack.Screen name="Home" component={ChatComponent}/>
        </Stack.Navigator>
    ) 
}