import React, {type FC} from 'react'
import { SafeAreaView, Text, View, StyleSheet, Alert} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/EvilIcons'
import PersonBlock from './Person'


const data = [
    {
        profileImage: `https://ui-avatars.com/api/?name=gildong`, 
        id: "gildong", 
        name: "김길동",
        comment: "아엠 길동", 
        backgroudImage: "https://loremflickr.com/g/1080/1920"
    }, {
        profileImage: "https://ui-avatars.com/api/?name=dongjae", 
        id: "dongjae", 
        name: "전동재",
        comment: "아엠 동재", 
        backgroudImage: "https://loremflickr.com/g/1080/1920/paris"
    }, {
        profileImage: "https://ui-avatars.com/api/?name=hyeonduck", 
        id: "hyeonduck", 
        name: "공현덕",
        comment: "아엠 현덕", 
        backgroudImage: "https://loremflickr.com/g/1080/1920/paris"
    }
]



const FriendsComponent: FC<{}> = ( ) => { 
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '9%', width: '100%', backgroundColor: 'white'}}>
                <Text style={styles.headerText}>친구</Text>
                <View style={{paddingHorizontal: 25}}>
                  <Icon name={'search'} size={26} color={'#354f52'} onPress={()=>{Alert.alert("dsa")}}/>
                </View>
            </View>

            <View style={{padding: 10}}/>
             <FlatList 
                style={{width: '90%'}}
                data={data}
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