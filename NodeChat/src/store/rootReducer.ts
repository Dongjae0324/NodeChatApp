import { AppState } from './appState'
import type { LoginActions, UpdateAction} from "./actions";

const initialState: AppState = {
   loggedIn : false,
   loggedUser : {
          id: "",
          name: "",
          profileImage: "",
          comment: ""
   }
}

export const rootReducer = (state: AppState = initialState, action: LoginActions | UpdateAction) => {
    switch (action.type) {
        case 'login': return {...state, loggedUser: action.loggedUser, loggedIn: true} 
        case 'update': return {... state, loggedUser: action.loggedUser, loggedIn: true}
        case 'logout': return initialState
    }
}
