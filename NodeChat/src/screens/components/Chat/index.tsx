import {useNavigation} from '@react-navigation/native';
import React, {type FC, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  Touchable,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatBlock from './chatBlock';
import {ChatRoomData} from '../../types';
import axios from 'axios';

const ChatList = () => {
  const navigation = useNavigation();
  const intoChatRoom = (props: object) => {
    navigation.navigate('ChatRoom', props);
  };

  const [roomData, setRoomData] = useState<ChatRoomData[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    axios.get('http://localhost:3000/').then(array => {
      setRoomData(array.data.rooms);
    });
  }, [reload]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '9%',
          width: '100%',
          backgroundColor: 'white',
        }}>
        <Text style={styles.headerText}>채팅</Text>
        <View style={{paddingHorizontal: 25}}>
          <Icon
            name={'chatbubble-sharp'}
            size={26}
            color={'#354f52'}
            onPress={() => {
              navigation.navigate('CreateChatRoom');
            }}
          />
        </View>
      </View>

      <View style={{padding: '5%'}} />
      <View style={{flexDirection: 'row', width: '90%', alignItems: 'center'}}>
        <Text style={{color: 'black', alignSelf: 'center', fontWeight: '600'}}>
          채팅방 목록
        </Text>
        <View style={{width: 20}} />
        <TouchableOpacity
          onPress={() => {
            setReload(!reload);
          }}
          style={{
            backgroundColor: '#283618',
            paddingHorizontal: 10,
            borderRadius: 20,
            ...Platform.select({ios: {paddingVertical: 4}}),
          }}>
          <Text style={{color: 'white'}}>새로고침</Text>
        </TouchableOpacity>
      </View>

      <View style={{padding: '2%'}} />
      <FlatList
        data={roomData}
        style={{width: '90%'}}
        renderItem={({item}) => (
          <ChatBlock key={item.title} chat={item} intoChatRoom={intoChatRoom} />
        )}
        keyExtractor={(item, index) => item.title}
        ItemSeparatorComponent={() => <View style={{padding: 6}} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: '#354f52',
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 25,
  },
  container: {flex: 1, backgroundColor: '#cad2c5', alignItems: 'center'},
  text: {color: 'black', fontSize: 12},
});
export default ChatList;
