import {AUTH_Loading, AUTH_Change} from '../types'

export default function(state={}, action) {
    switch(action.type) {

        case AUTH_Loading: 
            return {
                ...state,
                id:  action.payload.id || false,
                name: action.payload.name || false,
                profileImage: action.payload.profileImage || false,
                comment: action.payload.comment || false
            }

        case AUTH_Change: 

            return {
                ...state,
                id: state.id,
                name: action.payload.name || false, 
                profileImage: action.payload.profileImage || false, 
                comment: action.payload.comment || false,
            }
        
        default:
            return state 
    }
}