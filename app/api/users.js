import { ref } from './../config/constants'

export function fetchUser (uid) {
	return new Promise(
        // return a user 
        function(resolve, reject) {
          	user = {
	          displayName: 'nicola',
	          email: 'nicola@selfy.com',
	          emailVerified: true,
	          isAnonymous: false,
	          photoURL: null,  
	          uid: uid
			};
          	resolve(user);
        });
}


 