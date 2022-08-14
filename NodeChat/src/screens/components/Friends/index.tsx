import React, {type FC, useEffect, useState} from 'react'
import { SafeAreaView, Text, View, StyleSheet, Alert, TouchableOpacity} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/EvilIcons'
import PersonBlock from './Person'
import { userFriendData } from '../../data/userFriendData'
import axios from 'axios'


const FriendsComponent: FC<{}> = ( ) => { 

    const [friendData, setFriendData] = useState([]) 
    const [reload, setReload] = useState<boolean>(false)

    useEffect(()=>{
        axios.get('http://172.24.241.250:3000/user')
             .then((value) => {
                setFriendData(value.data.users)
             })
    }, [reload])

    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '9%', width: '100%', backgroundColor: 'white'}}>
                <Text style={styles.headerText}>친구</Text>
            </View>

            <View style={{padding: "5%"}}/>
            <View style={{width: '90%'}}>
              <TouchableOpacity  onPress={()=>{setReload(!reload)}} style={{alignSelf: 'flex-start', backgroundColor: '#283618', borderRadius: 10}}><Text style={{fontWeight: "600", color:'white', paddingHorizontal: 4, paddingVertical: 3}}>새로고침</Text></TouchableOpacity>
            </View> 

            <View style={{padding: 10}}/>
            <FlatList 
                style={{width: '90%'}}
                data={friendData}
                renderItem={({item}) => (
                    <PersonBlock person={item}/>
                 )}
                keyExtractor={(item, index) => item.id}
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
export default FriendsComponent 