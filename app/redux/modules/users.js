const ADD_USER = 'ADD_USER'
const ADD_MULTIPLE_USERS = 'ADD_MULTIPLE_USERS'

export function addUser(uid, user) {
  console.log('ADD USER ')
  console.log(uid, user)
  return {
    type: ADD_USER,
    uid,
    user,
  }
}

export function addMultipleUsers (users) {
  return {
    type: ADD_MULTIPLE_USERS,
    users,
  }
}

export default function users (state = {}, action) {
  console.log('Register user', action.user, action.type)
  switch (action.type) {
    case ADD_USER :
      return {
        ...state,
        [action.uid]: action.user,
      }
    case ADD_MULTIPLE_USERS :
      return {
        ...state,
        ...action.users,
      }
    default :
      return state
  }
}