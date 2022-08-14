import { useRoute } from '@react-navigation/native'
import React, {type FC, useState, useEffect, useRef} from 'react'
import { SafeAreaView, TextInput, Pressable, TouchableOpacity, Text, View, StyleSheet, Alert, FlatList, Image} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { ChatRoomData, Message } from '../../interface'
import { io } from 'socket.io-client'
import { Item } from 'react-native-paper/lib/typescript/components/List/List'
import axios  from 'axios'

const ChatRoom = ({route}) => { 

    const {title, user} = route.params
    const [message, setMessage] = useState<string>('')
    const [sendServerMessage, setsendServerMessage] = useState(["",])
    const serverMessageList:Message[]=[];
    const webSocket = useRef(null)

    useEffect(()=>{
     webSocket.current = io(`http://172.24.241.250:3000/chat`, {auth: {title: title, user: user}})
     webSocket.current.on('join', (data) => {
     console.log('join')
       const organized = {
          title: title, 
          type: 'join',
          user: data.user,
          chat: data.chat
       }
       serverMessageList.push(organized);
       console.log(serverMessageList)
       setsendServerMessage(serverMessageList)
    }); 

    webSocket.current.on('chat', (data) => {
      console.log('chat')
      const organized = {
        title: title, 
        type: 'chat',
        user: data.user,
        chat: data.chat
      }
      serverMessageList.push(organized);
      setsendServerMessage(serverMessageList);
    });


    webSocket.current.on('exit', (data) => {
      console.log('exit')
      const organized = {
        title: title, 
        type: 'exit',
        user: data.user,
        chat: data.chat
      }
      serverMessageList.push(organized);
      setsendServerMessage(serverMessageList);
    });

    return () => {
      const exitMessage = {
        title: title,
        type: 'exit',
        user: user, 
        chat: `${user}님이 퇴장하셨습니다.`
      };
      webSocket.current.emit('exit', message);
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
          
        const response = await axios.post(`http://172.24.241.250:3000/room/${title}/chat`, data)
  
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
             keyExtractor={(itemm, index) => index}
             renderItem={({item}) => 
                 item.type === "join" || item.type ==="exit" ? (
                   <Text style={{alignSelf: 'center', color: 'grey', paddingVertical: 10}}>{item.chat}</Text>
                 ) : item.user === user ? (
                   <Text style={{alignSelf: 'flex-end', backgroundColor: "#354f52", paddingHorizontal: 10, paddingVertical:2, borderRadius: 10, marginBottom: 2, fontSize: 15}}>{item.chat}</Text>  
                 ) : (
                   <Text>{item.user} {item.chat}</Text>
                 )
            }/>   

           <View style={{position:'absolute', width: '100%', bottom:0}}>
              <View style={{flexDirection: 'row', alignItems: 'center',paddingVertical: 4, backgroundColor: 'white', width: '100%', justifyContent: 'space-around'}}> 
                <TextInput value={message} style={{color: 'black',borderWidth: 1, width: '80%',paddingLeft: 10}} onChangeText={(e)=>{setMessage(e)}}/>
                <TouchableOpacity onPress={()=>{sendMessage()}} style={{backgroundColor: '#344e41', width: "15%", alignItems: 'center', paddingVertical:10, paddingHorizontal:3, borderRadius: 10}}><Text>send</Text></TouchableOpacity>
              </View>
           </View>
        </SafeAreaView>
    ) 
}



const styles = StyleSheet.create({
    headerText: {color: '#354f52', fontSize: 16, fontWeight: '600', paddingHorizontal: 10}, 
    container: {flex:1,backgroundColor: '#cad2c5', alignItems: 'center'},
    text: {color: 'black', fontSize: 12, }
})
export default ChatRoom