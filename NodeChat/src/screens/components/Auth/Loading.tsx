import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, {type FC, useEffect, useState, useCallback} from 'react'
import { SafeAreaView, Text, Animated, View, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import Modal from 'react-native-modal'
import Input from '../../utils/Input'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { loginAction } from '../../../store'

const AppLogo = require('../../../assets/images/mainLogo.png')

const LoadingComponent= () => { 

    const navigation = useNavigation()
    const dispatch = useDispatch() 
    const goHome = useCallback(()=>{navigation.replace('Home')}, [])
    const opacity= new Animated.Value(0)
    const [modal, setModal] = useState<boolean>(false)
    const [idInput, setIdInput] = useState({
        type: "noError", 
        value: ""
    })

    const [pwInput, setPwInput] = useState({
        type: "noError", 
        value: ""
    })

    const onLoad = ( ) => { 
        Animated.timing(opacity,{
            toValue: 1, 
            duration: 1500,
            useNativeDriver: true 
        }).start(()=>{ 
            getToken()
        });
    }

    const validate = async() => {
        try{
           const response = await axios.post('http://localhost:3000/user/login',{
            id: pwInput.value,
            pw: pwInput.value
           })

           if(response.data.status === "success") {
              await AsyncStorage.setItem('jwt', response.data.token) //jwt 저장
              //redux updata 
              dispatch(loginAction({
                id: response.data.profile.id,
                name: response.data.profile.name,
                profileImage: response.data.profile.profileImage,
                comment: response.data.profile.comment
              })) 
              goHome() 
           } else {
              setIdInput({type: 'error', value: ""})
              setPwInput({type: 'error', value: ""})
              Alert.alert("","사용자 정보를 찾을 수 없습니다", [{text: '확인'}])
           }
        }catch(e) {
           console.log(e)   
        }
    }

    const getToken = async() => {
        try{ 
            const jwt = await AsyncStorage.getItem('jwt')
            if(!jwt){ 
                console.log('처음 로그인한 사용자입니다')
                setModal(!modal)
            } else {
                const validity = await axios.post('http://localhost:3000/user/auth',"",{headers: {'Authorization': jwt}})
                if(validity.data.status === "success") {
                    dispatch(loginAction({
                        id: validity.data.userData.id,
                        name: validity.data.userData.name,
                        profileImage: validity.data.userData.profileImage,
                        comment: validity.data.userData.comment
                      })) 
                    goHome()
                } else {
                    console.log(validity.data.message)
                    setModal(!modal) //token의 유효기간이 지남. 
                }  
           }
        }
        catch(e){
            console.log(e)
            alert('앱에 오류가 발생했습니다. 다시 실행해주세요')
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style ={{paddingTop: 100}} > 
            <Animated.Image
                source={AppLogo} 
                style= {{ width: 274.77, height: 200, opacity: opacity}} 
                onLoad = {onLoad}
            >       
            </Animated.Image>
            </View>

            <Modal
            isVisible={modal}
            style={{justifyContent:'flex-end', margin: 0}}
            hasBackdrop={false}
            >
            <View style={{height: "42%", backgroundColor: 'white', borderTopStartRadius: 30, borderTopEndRadius: 30}}>
                
                <View style={{width:"90%", alignSelf:'center'}}>
                    <View style={{padding:15}}/>
                    <Input type={idInput.type} value={idInput.value} placeholder={"ID를 입력해주세요"}  onChangeText={(val)=>{setIdInput({type:"noError", value:val})}}/>
                    <View style={styles.space}/>
                    <Input type={pwInput.type} value={pwInput.value} placeholder={"비밀번호를 입력해주세요"} secureTextEntry={true} onChangeText={(val)=>{setPwInput({type:"noError", value:val})}}/>
                    <View style={{padding:4}}/>
                    <TouchableOpacity style={{alignItems:'flex-end', paddingRight: 10}} onPress={()=>{navigation.navigate("SignUp"); setModal(false)}}><Text style={{color: 'grey', fontWeight: "700" }}>회원가입</Text></TouchableOpacity>
                    
                    <View style={{padding:15}}/>
                </View>

                <TouchableOpacity onPress={()=>{validate()}} style={{backgroundColor: '#1b4332', alignItems:'center', width:"90%", alignSelf: 'center', borderRadius: 20}} onPress={()=>{validate()}}>
                  <Text style={{paddingVertical: 14, fontWeight: '700', fontSize: 15}}>로그인</Text>
                </TouchableOpacity>
            </View>
            </Modal> 
        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    container: {flex:1, alignItems: 'center', backgroundColor: '#1b4332'},
    text: {color: 'black', fontSize: 12},
    space: {padding: 10}
})


export default LoadingComponent;
