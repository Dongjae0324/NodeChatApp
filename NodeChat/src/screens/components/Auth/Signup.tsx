import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {type FC, useState, useCallback} from 'react';
import {
  Alert,
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import Input from '../../utils/Input';

const SignUpComponent = () => {
  const navigation = useNavigation();
  const gotoLoading = useCallback(() => {
    navigation.navigate('Loading');
  }, []);

  const [idInput, setIdInput] = useState({
    type: 'noError',
    value: '',
  });

  const [pwInput, setPwInput] = useState({
    type: 'noError',
    value: '',
  });

  const [nameInput, setNameInput] = useState({
    type: 'noError',
    value: '',
  });

  const register = async () => {
    try {
      const response = await axios.post('http://localhost:3000/user/signup', {
        id: idInput.value,
        pw: pwInput.value,
        name: nameInput.value,
        comment: 'simple comment',
      });

      if (response.data.status === 'success') {
        alert('회원가입에 성공하였습니다');
        gotoLoading();
      } else {
        alert('중복된 아이디의 유저가 있습니다');
        setIdInput({type: 'error', value: idInput.value});
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: 70}} />
      <Text
        style={{
          alignSelf: 'center',
          fontWeight: '700',
          color: 'grey',
          fontSize: 16,
        }}>
        회원가입
      </Text>
      <View style={{width: '80%', paddingTop: 20}}>
        <Input
          type={idInput.type}
          value={idInput.value}
          placeholder={'ID를 입력해주세요'}
          onChangeText={val => {
            setIdInput({type: 'noError', value: val});
          }}
        />
        <View style={{height: 10}} />
        <Input
          type={pwInput.type}
          secureTextEntry={true}
          value={pwInput.value}
          placeholder={'비밀번호를 입력해주세요'}
          onChangeText={val => {
            setPwInput({type: 'noError', value: val});
          }}
        />
        <View style={{height: 40}} />
        <Input
          type={nameInput.type}
          value={nameInput.value}
          placeholder={'이름을 임력해주세요'}
          onChangeText={val => {
            setNameInput({type: 'noError', value: val});
          }}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          register();
        }}
        style={{
          position: 'absolute',
          backgroundColor: '#1b4332',
          bottom: 40,
          width: '80%',
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{paddingVertical: 14, fontWeight: '700', fontSize: 15}}>
          가입하기
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  text: {color: 'black', fontSize: 12},
});
export default SignUpComponent;
