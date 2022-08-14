import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, {type FC, useEffect, useState} from 'react'
import { SafeAreaView, Text, Animated, View, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {connect} from 'react-redux';
import {authload} from '../../../store/actions/auth_actions' 
import {bindActionCreators} from 'redux';
import Modal from 'react-native-modal'
import Input from '../../utils/Input'

const AppLogo = require('../../../assets/images/mainLogo.png')

const LoadingComponent= (props) => { 

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

    const onLoad = ( ) => { 
        Animated.timing(opacity,{
            toValue: 1, 
            duration: 1500,
            useNativeDriver: true 
        }).start(()=>{ 
            setModal(!modal)
        });
    }

    const validate = async() => {
        try{
           const response = await axios.post('http://172.24.241.250:3000/user/login',{
            id: pwInput.value,
            pw: pwInput.value
           })

           if(response.data.status === "success") {
              //redux updata 
              props.authload({
                id: response.data.profile.id,
                name: response.data.profile.name,
                profileImage: response.data.profile.profileImage,
                comment: response.data.profile.comment
              })
              navigation.replace('Home')
           } else {
              setIdInput({type: 'error', value: ""})
              setPwInput({type: 'error', value: ""})
              Alert.alert("","사용자 정보를 찾을 수 없습니다", [{text: '확인'}])
           }
        }catch(e) {
           console.log(e)   
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

function mapStateToProps(state) {
    return {
        User: state.User
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({authload}, dispatch); 
} 

export default connect(mapStateToProps, mapDispatchToProps)(LoadingComponent);
