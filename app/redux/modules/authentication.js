import { getAccessToken, authWithToken, updateUser, logout } from './../../api/auth'
import { fetchSettings } from './../../api/settings'
import { addSettingsTimerDuration, addSettingsRestDuration } from './../../redux/modules/settings'
import { fetchAndHandleScore } from './../../redux/modules/scores'

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

function isAuthed (uid) {
  
  return {
    type: IS_AUTHED,
    uid,
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
          return authWithToken(accessToken) 
        } else {
          // I don't have an access token, I need to relogin via facebook
          dispatch(notAuthed())
        }
      })
      .catch((error) => console.warn('Error in handle auth: ', error))
  }
}

export function onAuthChange (user) { 
  return function (dispatch) { 
    if (!user) {
      dispatch(notAuthed())
    } else {
       
      const { uid, displayName, photoURL } = user
      const { userID } = uid
      console.log('user', userID)
      updateUser({
        userID,
        displayName,
        photoURL,
      })
      .then(() => fetchSettings(userID))
      .then((settings) => Promise.all([
        dispatch(addSettingsTimerDuration(settings.timerDuration)),
        dispatch(addSettingsRestDuration(settings.restDuration)),
        dispatch(fetchAndHandleScore(userID)),
      ]))
      .then(() => dispatch(isAuthed(userID)))
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
  authedId: '',
  isNew: false,
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
        authedId: action.uid,
        isNew: true,
      }
    default :
      return state
  }
}