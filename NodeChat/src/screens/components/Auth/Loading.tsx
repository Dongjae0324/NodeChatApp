import { useNavigation } from '@react-navigation/native'
import React, {type FC, useEffect, useState} from 'react'
import { SafeAreaView, Text, Animated, View, StyleSheet, TouchableOpacity, Alert} from 'react-native'

import Modal from 'react-native-modal'
import Input from '../../utils/Input'

const AppLogo = require('../../../assets/images/mainLogo.png')

const LoadingComponent: FC<{}> = ( ) => { 

    const navigation = useNavigation()
    const opacity= new Animated.Value(0)
    const [modal, setModal] = useState(false)
    const [idInput, setIdInput] = useState({
        type: "noError", 
        value: ""
    })

    const [pwInput, setPwInput] = useState({
        type: "noError", 
        value: ""
    })

    const [hasError, setHasError] = useState(false)

    

    const onLoad = ( ) => { 
        Animated.timing(opacity,{
            toValue: 1, 
            duration: 1500,
            useNativeDriver: true 
        }).start(()=>{ 
            setModal(!modal)
        });
    }

    const validation = (id: string, pw: string) => {
        
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
                    <Input type={idInput.type} value={idInput.value} placeholder={"ID를 입력해주세요"} onChangeText={(val)=>{setIdInput({type:"noError", value:val})}}/>
                    <View style={styles.space}/>
                    <Input type={pwInput.type} value={pwInput.value} placeholder={"비밀번호를 입력해주세요"} onChangeText={(val)=>{setPwInput({type:"noError", value:val})}}/>
                    <View style={{padding:4}}/>
                    <TouchableOpacity style={{alignItems:'flex-end', paddingRight: 10}} onPress={()=>{navigation.navigate("SignUp"); setModal(false)}}><Text style={{color: 'grey', fontWeight: "700" }}>회원가입</Text></TouchableOpacity>
                    
                    <View style={{padding:15}}/>
                    {hasError
                        ? <Text style={{color: "red"}}>일치하는 회원정보가 없습니다</Text>
                        : <Text style={{color: "black"}}></Text> }
                </View>

                <TouchableOpacity style={{backgroundColor: '#1b4332', alignItems:'center', width:"90%", alignSelf: 'center', borderRadius: 20}} onPress={()=>navigation.replace("Home")}>
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
export default LoadingComponent