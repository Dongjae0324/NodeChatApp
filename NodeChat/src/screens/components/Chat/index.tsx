import React, {type FC} from 'react'
import { SafeAreaView, Text, View, StyleSheet} from 'react-native'


const ChatComponent: FC<{}> = ( ) => { 
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>채팅 스크린입니다.</Text>
        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    container: {flex:1,backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center'},
    text: {color: 'black', fontSize: 12, }
})
export default ChatComponent