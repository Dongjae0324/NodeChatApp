import { useNavigation } from '@react-navigation/native'
import React, {type FC, useEffect, useState} from 'react'
import { SafeAreaView, Text, Animated, View, StyleSheet, TouchableOpacity, Modal} from 'react-native'

const AppLogo = require('../../../assets/images/mainLogo.png')


const SignInModal: FC<{}> = ( ) => {
    return(
        <Modal
        
        >

        </Modal> 
    )
}




const LoadingComponent: FC<{}> = ( ) => { 

    const [modal, setModal] = useState(false)
    const navigation = useNavigation()
    const opacity= new Animated.Value(0)
   

    const onLoad = ( ) => { 
        Animated.timing(opacity,{
            toValue: 1, 
            duration: 1500,
            useNativeDriver: true 
        }).start(()=>{ 
 
        });
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
        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    container: {flex:1, alignItems: 'center', backgroundColor: '#1b4332'},
    text: {color: 'black', fontSize: 12, }
})
export default LoadingComponent