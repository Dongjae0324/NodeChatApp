import { useRoute } from '@react-navigation/native'
import React, {type FC, useState, useEffect, useRef} from 'react'
import { SafeAreaView, TextInput, Pressable, TouchableOpacity, Text, View, StyleSheet, Alert, FlatList, Image, Platform} from 'react-native'
import { ChatRoomData, Message } from '../../types'
import { io } from 'socket.io-client'
import axios  from 'axios'

const ChatRoom = ({route}) => { 

    const {title, user} = route.params
    const [message, setMessage] = useState<string>('')
    const [sendServerMessage, setsendServerMessage] = useState([])
    const webSocket = useRef(null)

    useEffect(()=>{
     webSocket.current = io(`http://localhost:3000/chat`, {auth: {title: title, user: user}})
     webSocket.current.on('join', (data) => {
     console.log('join')
       const organized = {
          title: title, 
          type: 'join',
          user: data.user,
          chat: data.chat
       }
       setsendServerMessage(state => [...state, organized])
    }); 

    webSocket.current.on('chat', (data) => {
      console.log('chat')
      const organized = {
        title: title, 
        type: 'chat',
        user: data.user,
        chat: data.chat
      }
      setsendServerMessage(state => [...state, organized])
    });


    webSocket.current.on('exit', (data) => {
      console.log('exit')
      const organized = {
        title: title, 
        type: 'exit',
        user: data.user,
        chat: data.chat
      }
      setsendServerMessage(state => [...state, organized])
    });

    return () => {
      webSocket.current.disconnect();
    };
    },[])

    const sendMessage = async() => {
      try{
        const data = {
          title: title,
          user: user,
          chat: message,
          };
          
        const response = await axios.post(`http://localhost:3000/room/${title}/chat`, data)
  
        if(response.data.status === 'success'){
           setMessage('')
        } else {alert("전송실패")}
      }
      catch(e){
        alert('전송실패')
        console.log(e)
      }
    };

    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '9%', width: '100%', backgroundColor: 'white'}}>
                <Text style={styles.headerText}>{title}</Text>
            </View>   
            <FlatList
             style={{width: '90%', alignSelf: 'center'}}
             data={sendServerMessage}
             keyExtractor={(itemm, index) => itemm.id}
             renderItem={({item}) => 
                 item.type === "join" || item.type ==="exit" ? (
                   <Text style={{alignSelf: 'center', color: 'grey', paddingVertical: 10}}>{item.chat}</Text>
                 ) : item.user === user ? (
                   <View style={{paddingBottom: 10}}>
                     <Text style={styles.myChat}>{item.chat}</Text>
                   </View>
                 ) : (
                  <View style={{paddingBottom: 10}}>
                    <Text style={styles.otherChatUser}>{item.user}</Text>
                    <View style={{height: 2}}/>
                    <Text style={styles.otherChat}>{item.chat}</Text>
                  </View>
                 )
            }/>   

           <View style={{position:'absolute', width: '100%', bottom:0}}>
              <View style={{flexDirection: 'row', alignItems: 'center',paddingVertical: 4, backgroundColor: 'white', width: '100%', justifyContent: 'space-around',...Platform.select({ios:{paddingBottom: 40}})}}> 
                <TextInput value={message} style={{color: 'black',borderWidth: 1, width: '80%',paddingLeft: 10, ...Platform.select({ios: {height: 30}})}} onChangeText={(e)=>{setMessage(e)}}/>
                <TouchableOpacity onPress={()=>{sendMessage()}} style={{backgroundColor: '#344e41', width: "15%", alignItems: 'center', paddingVertical:10, paddingHorizontal:3, borderRadius: 10}}><Text style={{color: 'white'}}>send</Text></TouchableOpacity>
              </View>
           </View>
        </SafeAreaView>
    ) 
}



const styles = StyleSheet.create({
    headerText: {color: '#354f52', fontSize: 16, fontWeight: '600', paddingHorizontal: 10}, 
    container: {flex:1,backgroundColor: '#cad2c5', alignItems: 'center'},
    text: {color: 'black', fontSize: 12, },
    myChat: {alignSelf: 'flex-end', backgroundColor: "#354f52", color: 'white', paddingHorizontal: 10, paddingVertical:2, borderRadius: 10, marginBottom: 2, fontSize: 15, ...Platform.select({ios:{paddingVertical:5}})},
    otherChatUser: {alignSelf: 'flex-start', backgroundColor: "#370617", color: 'white', paddingHorizontal: 10, paddingVertical:2, borderRadius: 5, marginBottom: 2, fontSize: 12},
    otherChat: {alignSelf: 'flex-start', backgroundColor: "#621708", color: 'white', paddingHorizontal: 10, paddingVertical:2, borderRadius: 10, marginBottom: 2, fontSize: 15, ...Platform.select({ios:{paddingVertical:5}})}
})
export default ChatRoom