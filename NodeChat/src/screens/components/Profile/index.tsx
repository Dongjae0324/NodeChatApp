import React, {type FC, useState} from 'react'
import { SafeAreaView, Text, View, StyleSheet, Alert, Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Input from '../../utils/Input';
import {AppState, logoutAction, User} from '../../../store'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateAction } from '../../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const ProfileComponent = () => { 

    const currentUser = useSelector<AppState,User>((state)=> state.loggedUser)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    
    const [profileImage, setProfileImage] = useState<string>(currentUser.profileImage)
    const [name, setName] = useState({
        type: "noError", 
        value: currentUser.name
    })
    const [comment, setComment] = useState({
        type: "noError", 
        value: currentUser.comment
    })
    
    const selectImage = async(options?:any) => {
        try{
            const result = await launchImageLibrary(options)
            const uri = result.assets[0].uri
            setProfileImage(uri)
        } 
        catch(e){console.log(e)}
    }


    const changeProfile = async() => { 
        try{
            const response = await axios.post('http://localhost:3000/user/update', {
             id: currentUser.id,
             name: name.value,
             comment: comment.value,
             profileImage: profileImage
            })

            if(response.data.status === "success") {

                dispatch(updateAction({
                    id: currentUser.id,
                    name: name.value,
                    comment: comment.value,
                    profileImage: profileImage
                }))    
                Alert.alert("","프로필 변경에 성공하였습니다", [{text: '확인'}])
            }
        } 
        catch(e){
            console.log(e)
            alert('프로필 변경에 실패했습니다.')
        }
    }

    const logOut = async() => {
        try{
            await AsyncStorage.removeItem('jwt');
            dispatch(logoutAction())
            console.log('로그아웃 완료')
            navigation.navigate('Loading')
        }
        catch(e){
            console.log(e) 
            alert('로그아웃에 실패했습니다. 다시 시도해주세요')
        }
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '9%', width: '100%', backgroundColor: 'white'}}>
                <Text style={styles.headerText}>프로필</Text>
            </View>

            <View style={{flex:1, alignItems: 'center', width:'80%'}}>
                <View style={{height: "10%"}}/> 

                <View style={{borderRadius: 100, elevation: 4}}>
                     <Image source={{uri: profileImage}} style={{width: 100, height: 100, borderRadius: 100}}/> 
                </View>

                <TouchableOpacity onPress={()=>{selectImage()}}style={{width: "90%", alignItems: 'center'}}>
                    <Text style={{color: 'black', paddingTop: 20, textDecorationLine: 'underline'}}>사진 변경하기</Text>
                </TouchableOpacity>
                <View style={{height:'6%'}}/> 
                <Text style={{alignSelf:'flex-start',paddingLeft: 12, paddingBottom:4, color: 'black', fontSize: 15}}>이름</Text>
                <Input type={name.type} value={name.value} onChangeText={(val)=>{setName({type:"noError", value:val})}}/>
                <View style={{height:'2%'}}/> 
                <Text style={{alignSelf:'flex-start',paddingLeft: 12, paddingBottom:4, color: 'black', fontSize: 15}}>한줄 소개</Text>
                <Input type={comment.type} value={comment.value} onChangeText={(val)=>{setComment({type:"noError", value:val})}}/>

                <View style={{height:'4%'}}/> 
                <TouchableOpacity onPress={()=>{changeProfile()}}style={{width: "100%", alignItems: 'center', borderRadius: 20, backgroundColor: '#52796f', justifyContent:'center'}}>
                    <Text style={{color: 'white', fontWeight: '400', padding: 13}}>프로필 변경하기</Text>
                </TouchableOpacity>
                <View style={{height:'3%'}}/> 
                <TouchableOpacity onPress={()=>{Alert.alert("","정말로 로그아웃 하시겠습니까?",[{text: "확인", onPress: ()=>{logOut()}}, {text: '취소'}])}}style={{width: "100%", alignItems: 'center', borderRadius: 20, backgroundColor: '#2f3e46', justifyContent:'center'}}>
                    <Text style={{color: 'white', fontWeight: '400', padding: 13}}>로그아웃</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    headerText: {color: '#354f52', fontSize: 16, fontWeight: '600', paddingHorizontal: 25}, 
    container: {flex:1, alignItems: 'center', backgroundColor: '#cad2c5'},
    text: {color: 'black', fontSize: 12, },

})


export default ProfileComponent