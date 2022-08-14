import React, {type FC} from 'react'
import { SafeAreaView, Text, View, StyleSheet, Alert} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/EvilIcons'
import PersonBlock from './Person'
import { userFriendData } from '../../data/userFriendData'


const FriendsComponent: FC<{}> = ( ) => { 
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '9%', width: '100%', backgroundColor: 'white'}}>
                <Text style={styles.headerText}>친구</Text>
                <View style={{paddingHorizontal: 25}}>
                  <Icon name={'search'} size={26} color={'#354f52'} onPress={()=>{Alert.alert("dsa")}}/>
                </View>
            </View>

            <View style={{padding: "5%"}}/>
             <FlatList 
                style={{width: '90%'}}
                data={userFriendData}
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