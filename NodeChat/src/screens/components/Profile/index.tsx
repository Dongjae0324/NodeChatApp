import React, {type FC, useState} from 'react'
import { SafeAreaView, Text, View, StyleSheet, Alert, Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import {userData} from '../../data/userData'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Input from '../../utils/Input';


const ProfileComponent: FC<{}> = ( ) => { 

    const [profileImage, setProfileImage] = useState<string>(userData.profileImage)
    const [name, setName] = useState({
        type: "noError", 
        value: userData.name
    })
    const [comment, setComment] = useState({
        type: "noError", 
        value: userData.comment
    })
    
    const selectImage = async(options?:any) => {
        try{
            const result = await launchImageLibrary(options)
            const uri = result.assets[0].uri

            setProfileImage(uri)
          
        } 
        catch(e){console.log(e)}
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

                <TouchableOpacity style={{width: "90%", alignItems: 'center'}}>
                    <Text style={{color: 'black', paddingTop: 20, textDecorationLine: 'underline'}}>프로필 변경하기</Text>
                </TouchableOpacity>
                <View style={{height:'6%'}}/> 
                <Text style={{alignSelf:'flex-start',paddingLeft: 12, paddingBottom:4, color: 'black', fontSize: 15}}>이름</Text>
                <Input type={name.type} value={name.value} onChangeText={(val)=>{setName({type:"noError", value:val})}}/>
                <View style={{height:'2%'}}/> 
                <Text style={{alignSelf:'flex-start',paddingLeft: 12, paddingBottom:4, color: 'black', fontSize: 15}}>한줄 소개</Text>
                <Input type={comment.type} value={comment.value} onChangeText={(val)=>{setComment({type:"noError", value:val})}}/>

                <View style={{height:'4%'}}/> 
                <TouchableOpacity style={{width: "100%", alignItems: 'center', borderRadius: 20, backgroundColor: '#52796f', justifyContent:'center'}}>
                    <Text style={{color: 'white', fontWeight: '400', padding: 13}}>프로필 변경하기</Text>
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