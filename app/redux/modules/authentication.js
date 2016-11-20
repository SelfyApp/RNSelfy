import { getAccessToken, authWithToken, updateUser, logout } from './../../api/auth'
import { fetchSettings } from './../../api/settings'
import { addSettingsTimerDuration, addSettingsRestDuration } from './../../redux/modules/settings'
import { fetchAndHandleScore } from './../../redux/modules/scores'
import { addUser } from './users'



const AUTHENTICATING = 'AUTHENTICATING'
const NOT_AUTHED = 'NOT_AUTHED'
const IS_AUTHED = 'IS_AUTHED'
export const LOGGING_OUT = 'LOGGING_OUT'

function authenticating () {
  return {
    type: AUTHENTICATING,
  }
}

function notAuthed () {
  
  return {
    type: NOT_AUTHED,
  }
}

function isAuthed (id) {
  
  return {
    type: IS_AUTHED,
    id,
  }
}

function loggingOut () {
  return {
    type: LOGGING_OUT
  }
}

export function handleAuthRemotely () {
  return function (dispatch, getState) {
    dispatch(authenticating()) 
    return getAccessToken()
      .then(function (accessToken) {
        if(accessToken){
          // I have an access token
          console.log('i got token', accessToken.accessToken)
          return authWithToken(accessToken.accessToken) 
        } else {
          // I don't have an access token, I need to relogin via facebook
          console.log('i didnt get token');
          dispatch(notAuthed())
        }
      })
      .catch((error) => console.warn('Error in handle auth: ', error))
  }
}



export function onAuthChange (user) { 
  console.log('got auth change')
  return function (dispatch) { 
    if (!user) {
      dispatch(notAuthed())
    } else {
      console.log(' I HAVE A USER ')
      const { id } = user
      // UPDATE THE MAIN USER 
      console.log(user)
      dispatch(addUser(id, user));

      fetchSettings(id)
      .then((settings) => Promise.all([
        dispatch(addSettingsTimerDuration(settings.timerDuration)),
        dispatch(addSettingsRestDuration(settings.restDuration)),
       // dispatch(fetchAndHandleScore(id)),
      ]))
      .then(() => dispatch(isAuthed(id)))
    }
  }
}

export function handleUnauth () {
  return function (dispatch) {
    logout()
    dispatch(loggingOut())
  }
}

const initialState = {
  isAuthed: false,
  isAuthenticating: false,
  id: -1, 
}

export default function authentication (state = initialState, action) { 
  switch (action.type) {
    case AUTHENTICATING :
      return {
        ...state,
        isAuthenticating: true,
      }
    case NOT_AUTHED :
      return {
        isAuthenticating: false,
        isAuthed: false,
        authedId: '',
      }
    case IS_AUTHED :
      return {
        isAuthed: true,
        isAuthenticating: false,
        id: action.id, 
      }
    default :
      return state
  }
}