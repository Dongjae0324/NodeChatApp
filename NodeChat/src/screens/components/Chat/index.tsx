import React, {type FC} from 'react'
import { SafeAreaView, Text, View, StyleSheet, Alert, FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { chatData } from '../../data/chatData'
import { userFriendData } from '../../data/userFriendData'
import ChatBlock from './chatBlock'


const ChatList: FC<{}> = ( ) => { 

    

    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '9%', width: '100%', backgroundColor: 'white'}}>
                <Text style={styles.headerText}>채팅</Text>
                <View style={{paddingHorizontal: 25}}>
                  <Icon name={'chatbubble-sharp'} size={26} color={'#354f52'} onPress={()=>{Alert.alert("dsa")}}/>
                </View>
            </View>

            <View style={{padding: "5%"}}/>
            <Text style={{color:'black', alignSelf: 'center', width:"90%", fontWeight: "600", paddingBottom: 10}}>채팅방 목록</Text>


            <FlatList  
                data={chatData}
                style={{width: '90%'}}
                renderItem={({item}) => (
                    <ChatBlock chat={item}/>
                 )}
                keyExtractor={(item, index) => item.ChatRoomId}
                ItemSeparatorComponent={()=> <View style={{padding: 6}}/>}
                />

            
        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    headerText: {color: '#354f52', fontSize: 16, fontWeight: '600', paddingHorizontal: 25}, 
    container: {flex:1,backgroundColor: '#cad2c5', alignItems: 'center'},
    text: {color: 'black', fontSize: 12, }
})
export default ChatList