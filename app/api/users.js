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

export function getFriendsHandler(){
  return  function (dispatch) { 
    return getFriends()
      .then(function(friends){
        dispatch(updateFriends(friends));
      })
  }
}

export function getSubscribingHandler(){
  return function (dispatch) { 
    console.log('HANDLE CALLED')
    return getSubscribing()
      .then(function(subscribing){
        console('GOT SUBSCRIBING REQUEST' + subscribing);
        dispatch(updateSubscribing(subscribing));
      })
  }
}


export function fetchFriends(uid){
	var API_URL = 'http://demo9383702.mockable.io/users';


	fetch(API_URL).then((response) => response.json()).then((responseData) => {
	    var organizations = responseData.results,
	        length = organizations.length,
	        dataBlob = {},
	        sectionIDs = [],
	        rowIDs = [],
	        organization,
	        users,
	        userLength,
	        user,
	        i,
	        j;

	    for (i = 0; i < length; i++) {
	        organization = organizations[i];

	        sectionIDs.push(organization.id);
	        dataBlob[organization.id] = organization.organization;

	        users = organization.users;
	        userLength = users.length;
	        
	        rowIDs[i] = [];

	        for(j = 0; j < userLength; j++) {
	            user = users[j].user;
	            rowIDs[i].push(user.md5);

	            dataBlob[organization.id + ':' + user.md5] = user;
	        }
	    }
 		return [dataBlob, sectionIDs, rowIDs]
	});      



 }
