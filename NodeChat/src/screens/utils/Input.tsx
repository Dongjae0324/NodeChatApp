import React,  {useState, useEffect, FC}from 'react'
import {View, TextInput, StyleSheet, TextInputProps}from 'react-native'

interface TextProps extends TextInputProps{
    type: string
}

const Input =  (props: TextProps) => {
    let template = null 
    
    
    switch(props.type) {
        case "noError": 
            template = <TextInput 
               {...props}
               placeholderTextColor={'grey'}
               style={styles.input}/>
        break;
        case "error": 
            template = <TextInput 
                {...props}
                placeholderTextColor={'grey'}
                style={styles.errorInput}/>
        break;
        default: 
        return template
    }
    return template
}


const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        width: "100%",
        alignSelf:'center',
        borderWidth: 4,
        borderColor: '#84a98c',
        borderRadius: 20,
        fontSize: 16,
        padding: 12, 
        color: "black",
    },

    errorInput: {
        backgroundColor: 'white',
        width: "100%",
        alignSelf:'center',
        borderWidth: 4,
        borderColor: '#ff595e',
        borderRadius: 20,
        fontSize: 16,
        padding: 12, 
        color: "black",
    }    
})

export default Input; 