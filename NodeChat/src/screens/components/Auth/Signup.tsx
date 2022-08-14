import React, {type FC, useState} from 'react'
import { TouchableOpacity, SafeAreaView, Text, View, StyleSheet, Touchable} from 'react-native'

import Input from '../../utils/Input'

const SignUpComponent: FC<{}> = ( ) => { 

    const [idInput, setIdInput] = useState({
        type: "noError", 
        value: ""
    })

    const [pwInput, setPwInput] = useState({
        type: "noError", 
        value: ""
    })

    const [nameInput , setNameInput] = useState({ 
        type: "noError",
        value: ""
    })

    return(
        <SafeAreaView style={styles.container}>
            <View style={{height:70}}/>
            <Text style={{alignSelf:'center', fontWeight: "700", color: 'grey', fontSize: 16}}>회원가입</Text>
            <View style={{width: "80%", paddingTop: 20}}>
                <Input type={idInput.type} value={idInput.value} placeholder={"ID를 입력해주세요"} onChangeText={(val)=>{setIdInput({type:"noError", value:val})}}/>
                <View style={{height: 10}}/> 
                <Input type={pwInput.type} value={pwInput.value} placeholder={"비밀번호를 입력해주세요"} onChangeText={(val)=>{setPwInput({type:"noError", value:val})}}/>
                <View style={{height: 40}}/> 
                <Input type={nameInput.type} value={nameInput.value} placeholder={"이름을 임력해주세요"} onChangeText={(val)=>{setNameInput({type:"noError", value:val})}}/>           
            </View>

            <TouchableOpacity style={{position: 'absolute', backgroundColor: '#1b4332', bottom: 40, width: "80%", borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{paddingVertical: 14, fontWeight: '700', fontSize: 15,}}>가입하기</Text> 
            </TouchableOpacity>
           
        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    container: {flex:1, alignItems: 'center'},
    text: {color: 'black', fontSize: 12, }
})
export default SignUpComponent 