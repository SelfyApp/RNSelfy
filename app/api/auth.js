import { auth } from './../config/constants'
import { AccessToken, LoginManager } from 'react-native-fbsdk'

export function getAccessToken () {
 
  // TODO remove this debug code
  AccessToken.getCurrentAccessToken().then(function(token){
    console.log(token);

  })
  return AccessToken.getCurrentAccessToken()
}

export function authWithToken (accesToken) {
  return auth
    .signInWithCredential(accesToken)
}

export function updateUser (user) { 
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 100, user);
  }); 
}

export function logout () {
  LoginManager.logOut()
  auth.signOut()
  //ref.off()
}