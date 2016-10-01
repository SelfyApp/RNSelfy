import { ref } from './../config/constants'

export function setTimer (duration, uid) {
    return new Promise(
        // we return here all the settings related to the user uid.
        function(resolve, reject) {
          var settings = {
            timerDuration: 0.1,
            restDuration: 5
          }
          resolve(settings);
        });
}

export function setRest (duration, uid) {
    return new Promise(
        // we return here all the settings related to the user uid.
        function(resolve, reject) {
          var settings = {
            timerDuration: 0.1,
            restDuration: 5
          }
          resolve(settings);
        });
}

export function fetchSettings (uid) {
  console.log('TRYING TO GET SETTING HERE' , uid)
  return new Promise(
        // we return here all the settings related to the user uid.
        function(resolve, reject) {
          var settings = {
            timerDuration: 0.1,
            restDuration: 5
          }
          resolve(settings);
        });

}