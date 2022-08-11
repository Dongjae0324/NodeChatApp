import { useRoute } from '@react-navigation/native'
import React, {type FC} from 'react'
import { SafeAreaView, Text, View, StyleSheet, Alert, FlatList, Image} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'



const ChatRoom: FC<{}> = ( ) => { 

    const route = useRoute()
    const props = route.params

    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '9%', width: '100%', backgroundColor: 'white'}}>
                <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center', paddingHorizontal: 20}}> 
                    <Image source={{uri: props.User[0].profileImage}} style={{width: 40, height: 40, borderRadius: 100}}/>
                    <Text style={styles.headerText}>{props.User[0].name}</Text>
                </View> 
                <View style={{paddingHorizontal: 25}}>
                  <Icon name={'chatbubble-sharp'} size={26} color={'#354f52'} onPress={()=>{Alert.alert("dsa")}}/>
                </View>
            </View>
            
        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    headerText: {color: '#354f52', fontSize: 16, fontWeight: '600', paddingHorizontal: 10}, 
    container: {flex:1,backgroundColor: '#cad2c5', alignItems: 'center'},
    text: {color: 'black', fontSize: 12, }
})
export default ChatRoom