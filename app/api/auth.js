import { auth } from './../config/constants'
import { AccessToken, LoginManager } from 'react-native-fbsdk'

export function getAccessToken () {
 
  AccessToken.getCurrentAccessToken().then(function(token){

  })
  return AccessToken.getCurrentAccessToken()
}

export function authWithToken (accesToken) {
  return auth
    .signInWithCredential(accesToken)
}

export function updateUser (user) {
  console.log('calling update user ' , user)
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 100, user);
  }); 
}

export function logout () {
  LoginManager.logOut()
  auth.signOut()
  //ref.off()
}