import { firebaseAuth, facebookProvider, ref } from './../config/constants'
import { AccessToken, LoginManager } from 'react-native-fbsdk'

export function getAccessToken () {
  return AccessToken.getCurrentAccessToken()
}

export function authWithToken (accesToken) {
  return firebaseAuth
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
  firebaseAuth.signOut()
  //ref.off()
}