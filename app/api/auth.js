import { auth } from './../config/constants'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
var Selfie = require('./server.js');

var onAuthStateChangedCallbacks = [];



export function getAccessToken () {
 
  // TODO remove this debug code
  AccessToken.getCurrentAccessToken().then(function(token){
    console.log(token);

  })
  return AccessToken.getCurrentAccessToken()
}

export function onAuthStateChanged(callback) { 
  console.log('Registering a new callback on Auth State changed' , callback);
  onAuthStateChangedCallbacks.push(callback);
}


export function authWithToken (accessToken) {
  console.log('trying to access with token ')

  console.log(accessToken);
  var selfie = new Selfie({facebookToken: accessToken});

  return selfie.profile().then(function(profile){
    console.log(profile);
      // allign profile to user
      user = {
          displayName: profile.displayName,
          email: profile.email,
          emailVerified: true,
          isAnonymous: false,
          photoURL: null,  
          uid: profile.id
      };
      // call onAuthStateChange
      for (var i = onAuthStateChangedCallbacks.length - 1; i >= 0; i--) {
        console.log('calling callbacks',onAuthStateChangedCallbacks[i]);
        onAuthStateChangedCallbacks[i](user);
      }
      return user;
  })
  // auth.signInWithCredential(accesToken)
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