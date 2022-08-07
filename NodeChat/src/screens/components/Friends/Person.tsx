import React, {type FC, useState, useCallback}from 'react'
import { SafeAreaView, Text, View, StyleSheet, Alert, Image, Pressable, Modal, ImageBackground} from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'

type PersonData = {
    profileImage: string; 
    id: string, 
    name: string,
    comment: string, 
    backgroudImage: string
}


type PersonProps = {
    person: PersonData
}



const PersonBlock: FC<PersonProps> = (props)=> {
    
    const [modal, setModal] = useState(false) 
    
    return(
        <> 
        <View>
            <Pressable style={styles.container} onPress={()=>{setModal(!modal)}}> 
                <Image source={{uri: props.person.profileImage}} style={styles.profileImage}/> 
                <View style={{paddingHorizontal: 10}}> 
                    <Text style={styles.nameText}>{props.person.name}</Text> 
                    <Text style={styles.commentText}>{props.person.comment}</Text>
                </View>
            </Pressable>
        </View>

        <Modal 
            animationType="slide"
            transparent={false}
            visible={modal}
            onRequestClose={()=>{setModal(!modal)}}
        >
              <View style={{flex: 1, alignItems: 'center', width: '100%'}}>
                <ImageBackground style={styles.backImage} source={{uri: props.person.backgroudImage}}>
                <View style={{height: "70%"}}/> 
                <Image source={{uri: props.person.profileImage}} style={styles.profileDetailImage}/> 
                <Text style={{fontSize: 18, paddingTop: 8, fontWeight: "800"}}>{props.person.name}</Text>
                <Text>#{props.person.id}</Text>
                <Text style={{paddingVertical: 20,}}>{props.person.comment}</Text>
                </ImageBackground>
              </View>
        </Modal> 
        </>
    )
}

const styles = StyleSheet.create({
    container: {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 12, wdith: "100%", elevation: 1, backgroundColor: '#edede9', height: 65, borderRadius: 15},
    profileImage: {width: 40, height: 40, borderRadius: 10},
    profileDetailImage: { borderRadius: 25, width: 80, height: 80}, 
    nameText: {color: 'black', fontSize: 14},
    commentText: {color: 'grey', fontSize: 13, paddingVertical: 2},
    backImage: {flex:1, alignItems: 'center', width: '100%'}
    
})

export default PersonBlock