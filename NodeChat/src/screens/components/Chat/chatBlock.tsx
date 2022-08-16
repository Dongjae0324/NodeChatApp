import React from 'react'
import { TouchableOpacity, SafeAreaView, Text, View, StyleSheet, Alert, Image, Pressable, Modal, ImageBackground} from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import {ChatProps} from '../../types'
import {useSelector} from 'react-redux';



const ChatBlock = ({chat,intoChatRoom}:ChatProps)=> {

    
    const roomTitle = chat.title
    const roomOwner = chat.owner
    const user = useSelector(state => state.loggedUser)

    return(
      
        <View> 
            <TouchableOpacity style={styles.container} onPress={()=>{intoChatRoom({user: user.name, title: roomTitle})}}>
                <View style={{backgroundColor: '#3b6064', width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center'}}>
                <Text style={{fontSize: 15, color: 'white'}}>{roomTitle}</Text>    
                </View>
            
                <View style={{backgroundColor: 'white', width: '100%', padding:10, }}>
                  <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontSize: 13, color: 'black', paddingLeft: 10}}>방장: {roomOwner}</Text>
                  </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {alignItems: 'center', wdith: "100%", elevation: 3, borderRadius: 15, backgroundColor: '#cad2c5'},
    profileImage: {width: 40, height: 40, borderRadius: 10},
    profileDetailImage: { borderRadius: 25, width: 80, height: 80}, 
    nameText: {color: 'black', fontSize: 14},
    commentText: {color: 'grey', fontSize: 13, paddingVertical: 2},
    backImage: {flex:1, alignItems: 'center', width: '100%'}
    
})


export default ChatBlock