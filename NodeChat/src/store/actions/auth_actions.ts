import {AUTH_Loading, AUTH_Change} from '../types'


export function authload(data:object) {

    return {
        type: AUTH_Loading,
        payload: {
            id: data.id,
            name: data.name,
            profileImage: data.profileImage,
            comment: data.comment
        } 
    }
}

export function authChange(data:object) {
    
    return {
        type: AUTH_Change,
        payload: {
            name: data.name,
            profileImage: data.profileImage,
            comment: data.comment
        }
        
    }
}