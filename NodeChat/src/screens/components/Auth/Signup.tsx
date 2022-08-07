import React, {type FC} from 'react'
import { SafeAreaView, Text, View, StyleSheet} from 'react-native'


const SignUpComponent: FC<{}> = ( ) => { 
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>회원가입은 이곳에서 할 수 있습니다.</Text>
        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    container: {flex:1,backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center'},
    text: {color: 'black', fontSize: 12, }
})
export default SignUpComponent 