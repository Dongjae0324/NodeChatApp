import type {Action} from 'redux'
import {User} from './appState'


type LoginAction = {
    type: 'login',
    loggedUser: User
}

type LogoutAction = {
    type: 'logout'
}

export type UpdateAction = {
         type: 'update',
         loggedUser: User
}

export type LoginActions = LoginAction | LogoutAction   //로그인 할 때 사용되는 action 

export const loginAction = (loggedUser: User):LoginAction => ({
    type: 'login',
    loggedUser
})

export const logoutAction = ():LogoutAction => ({
    type: 'logout'
})

export const updateAction = (loggedUser: User):UpdateAction => ({
    type: 'update',
    loggedUser
})

