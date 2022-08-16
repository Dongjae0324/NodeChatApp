
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, {type FC, useState, useCallback} from 'react'
import { SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native'
import { useSelector } from 'react-redux'
import { AppState } from '../../../store'
import { ChatRoomData } from '../../types'


const CreateChatRoomComponent = () => { 

    const [roomName, setroomName] = useState<string>('')
    const navigation = useNavigation() 
    const user = useSelector<AppState, User>((state) => state.loggedUser)
    const goMain = useCallback(()=>{navigation.navigate('Main')},[])

    const createRoom = async({title, owner}:ChatRoomData) => {
        //방 길이이가 1자리가 넘으면 데이터베이스에 방 저장 이후 방 리스트 화면으로 나가기
        try{ 
            const makeRoom =  await axios.post('http://localhost:3000/room', {
                                 title: title,
                                 owner: owner
                              })
            if(makeRoom.data.status === "success") {
                goMain()
            } else{
                Alert.alert("","중복되는 방 이름입니다.",[{text: '확인'}] )
            }
        } 
        catch(e){
        console.log(e)
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '9%', width: '100%', backgroundColor: 'white'}}>
                <Text style={styles.headerText}>방 만들기</Text>
            </View>

            <View style={{height: "10%"}}/>
            <Text style={{width:"80%", fontWeight: "600", fontSize: 16, color: 'black', paddingLeft: 10}}>방 제목</Text>
            <TextInput style={styles.input}
            placeholder="방 제목을 설정해주세요"
            placeholderTextColor={'grey'}
            onChangeText={(val) => {setroomName(val)}} 
            /> 
            <View style={{height: 10}}/>

            <TouchableOpacity style={styles.buttonContainer} onPress={()=>{createRoom({title: roomName, owner: user.name})}}>
                <Text style={{color:'white', fontSize: 15,}}>생성하기</Text>
            </TouchableOpacity>
        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    headerText: {color: '#354f52', fontSize: 16, fontWeight: '600', paddingHorizontal: 25}, 
    container: {flex:1,backgroundColor: '#cad2c5', alignItems: 'center',},
    text: {color: 'black', fontSize: 12, },
    input: { margin: 12, borderWidth: 2, color:'black', borderColor: '#3b6064', borderRadius:20,  padding: 10, backgroundColor: "white", width: "80%"},
    buttonContainer: {backgroundColor: '#3b6064', width: '80%', alignItems: 'center', padding:10, borderRadius: 10}

})
export default CreateChatRoomComponent; 