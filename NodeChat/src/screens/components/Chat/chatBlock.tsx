import React, {type FC, useState, useCallback}from 'react'
import { TouchableOpacity, SafeAreaView, Text, View, StyleSheet, Alert, Image, Pressable, Modal, ImageBackground} from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import {ChatProps} from '../../interface'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'



const ChatBlock = ({chat}:ChatProps)=> {
    
    const customDate = moment(chat.lastMessage.createdAt).format('MM/DD')
    const navigation = useNavigation() 
    
    return(
      
        <View> 
            <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate("ChatRoom", {User: chat.User})}}>
            <Image source={{uri: chat.User[0].profileImage}} style={{width: 50, height: 50, borderRadius: 100}}/> 
            <View style={{paddingHorizontal: 15, flex: 1}}>
                <View style={{flexDirection: 'row', width: "100%", justifyContent: 'space-between'}}> 
                <Text style={{fontWeight: "600", fontSize: 15, color: '#dde5b6'}}>{chat.User[0].name}</Text>
                <Text>{customDate}</Text>
                </View>
                <View style={{padding: 2}}/> 
                <Text style={{fontSize: 13}}>{chat.lastMessage.content}</Text>
            </View> 
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 16, wdith: "100%", elevation: 3, backgroundColor: '#3b6064', borderRadius: 15},
    profileImage: {width: 40, height: 40, borderRadius: 10},
    profileDetailImage: { borderRadius: 25, width: 80, height: 80}, 
    nameText: {color: 'black', fontSize: 14},
    commentText: {color: 'grey', fontSize: 13, paddingVertical: 2},
    backImage: {flex:1, alignItems: 'center', width: '100%'}
    
})

export default ChatBlock