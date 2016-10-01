import { ref } from './../config/constants'

export function fetchScore (uid) {
	console.log(' fetching score of the user ')
   return new Promise(
    // return the user score
    function(resolve, reject) {
      resolve(10);
    });
}

// we probably don't need this yet
export function increaseScore (uid, amount) {
   return new Promise(
    // return the user score
    function(resolve, reject) {
      resolve(10);
    });
}
// we probably don't need this yet either 
export function decreaseScore (uid, amount) {
   return new Promise(
    // return the user score
    function(resolve, reject) {
      resolve(10);
    });
}