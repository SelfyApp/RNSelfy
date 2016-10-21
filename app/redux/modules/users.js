const ADD_USER = 'ADD_USER'
const ADD_MULTIPLE_USERS = 'ADD_MULTIPLE_USERS'
const USER_ONBOARDED = 'USER_ONBOARDED'

export function addUser(id, user) {
  return {
    type: ADD_USER,
    id,
    user,
  }
}

export function addMultipleUsers (users) {
  return {
    type: ADD_MULTIPLE_USERS,
    users,
  }
}
export function userOnboarded(){
  return {
    type: USER_ONBOARDED
  }
}

// this state is for isNew. 
const initialState = {
  isNew: false,
}

export default function users (state = {}, action) { 
  switch (action.type) {
    case ADD_USER :
      return {
        ...state,
        [action.id]: action.user,
        isNew: false,
      }
    case ADD_MULTIPLE_USERS :
      return {
        ...state,
        ...action.users,
      }
    case USER_ONBOARDED:
      return {
        ...state,
        isNew: false
      }
    default :
      return state
  }
}