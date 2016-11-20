import { ref } from './../../config/constants'
import { fetchScore, increaseScore, decreaseScore } from './../../api/scores'
import { fetchUser } from './../../api/users'
import { addUser, addMultipleUsers } from './../../redux/modules/users'
import { showFlashNotification } from './../../redux/modules/flashNotification'

const FETCHING_SCORE = 'FETCHING_SCORE'
const FETCHING_SCORE_SUCCESS = 'FETCHING_SCORE_SUCCESS'
const UPDATE_LEADERBOARD = 'UPDATE_LEADERBOARD'
const ADD_LISTENER = 'ADD_LISTENER'
const ADD_SCORES = 'ADD_SCORES'
const INCREMENT_SCORE = 'INCREMENT_SCORE'
const DECREMENT_SCORE = 'DECREMENT_SCORE'

function incrementScore (uid, amount) {
  return {
    type: INCREMENT_SCORE,
    uid,
    amount,
  }
}

function decrementScore (uid, amount) {
  return {
    type: DECREMENT_SCORE,
    uid,
    amount,
  }
}

function updateLeaderboard (uids) {
  return {
    type: UPDATE_LEADERBOARD,
    uids,
  }
}

function addScores (scores) {
  return {
    type: ADD_SCORES,
    scores,
  }
}

function addListener () {
  return {
    type: ADD_LISTENER,
  }
}

function fetchingScore () {
  return {
    type: FETCHING_SCORE,
  }
}

function fetchingScoreSuccess (uid, score) {
  return {
    type: FETCHING_SCORE_SUCCESS,
    uid,
    score,
  }
}

export function fetchAndSetScoresListener () {
  return function (dispatch) {
    let listenerSet = false
    /* ref.child('scores')
      .orderByChild('score')
      .limitToLast(15)
      .on('value', (snapshot) => {

        const scores = snapshot.val() || {}

        const leaderboardUids = Object.keys(scores)
          .sort((a,b) => scores[b].score - scores[a].score)
          .filter((uid) => !!scores[uid].score || scores[uid].score > 0)

        const { justScores, users } = leaderboardUids.reduce((prev, uid) => {
          prev.justScores[uid] = scores[uid].score
          prev.users[uid] = {
            displayName: scores[uid].displayName,
            photoURL: scores[uid].photoURL,
            uid: scores[uid].uid,
          }
          return prev
        }, {justScores: {}, users: {}})

        dispatch(updateLeaderboard(leaderboardUids))
        dispatch(addScores(justScores))
        dispatch(addMultipleUsers(users))

        if (listenerSet === false) {
          dispatch(addListener())
          listenerSet = true
        }
      })
      */
      let leaderboardUids =[];
      let justScores= [];
      let users = [];
      for(var i= 4; i< 40; i++) {
          var uid =  Math.floor(1000*Math.random())
          var user = {
            score: i,
            displayName: 'Giasone ' + i,
            photoURL: 'https://s-media-cache-ak0.pinimg.com/236x/8f/9d/c5/8f9dc59a47a389576776eaef35d16d86.jpg',
          }
          users[uid] = user;
          justScores[uid] = i;
          leaderboardUids[id] = id;
      }
      dispatch(updateLeaderboard(leaderboardUids))
      dispatch(addScores(justScores))
      dispatch(addMultipleUsers(users))
      if (listenerSet === false) {
        dispatch(addListener())
        listenerSet = true
      }
  }
}

export function fetchAndHandleScore (uid) {
  console.log('Calling Fetch AND HANDLE SCORE ', uid)
  return function (dispatch, getState) {
    dispatch(fetchingScore())
    return fetchScore(uid)
      .then((scoreInfo) => {
        console.log('SCORE ', scoreInfo)
        dispatch(
          fetchingScoreSuccess(
            uid,
            !scoreInfo || !scoreInfo.score ? 0 : scoreInfo.score
          )
        )

        if (scoreInfo) {
          return dispatch(addUser(uid, {
            uid,
            displayName: scoreInfo.displayName,
            photoURL: scoreInfo.photoURL,
          }))
        } else {
          return fetchUser(uid).then((user) => dispatch(addUser(uid, user)))
        }
      })
  }
}

export function incrementAndHandleScore (amount) {
  return function (dispatch, getState) {
    const { authedId } = getState().authentication
    dispatch(incrementScore(authedId, amount))
    increaseScore(authedId, amount)
      .catch(() => {
        dispatch(decrementScore(authedId, amount))
        dispatch(showFlashNotification({text: 'Error updating your state'}))
      })
  }
}

export function decrementAndHandleScore (amount) {
  return function (dispatch, getState) {
    const { authedId } = getState().authentication
    dispatch(decrementScore(authedId, amount))
    decreaseScore(authedId, amount)
      .catch(() => {
        dispatch(incrementScore(authedId, amount))
        dispatch(showFlashNotification({text: 'Error updating your state'}))
      })
  }
}

function usersScores (state = {}, action) {
  switch (action.type) {
    case FETCHING_SCORE_SUCCESS :
      return {
        ...state,
        [action.id]: action.score,
      }
    case ADD_SCORES :
      return {
        ...state,
        ...action.scores,
      }
    case INCREMENT_SCORE :
      return {
        ...state,
        [action.id]: state[action.id] + action.amount,
      }
    case DECREMENT_SCORE :
      return {
        ...state,
        [action.id]: state[action.id] - action.amount,
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: true,
  listenerSet: false,
  leaderboardUids: [],
  usersScores: {},
}

export default function scores (state = initialState, action) {
  console.log(action.type)
  switch (action.type) {
    case FETCHING_SCORE :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_SCORE_SUCCESS :
      return {
        ...state,
        isFetching: false,
        usersScores: usersScores(state.usersScores, action)
      }
    case UPDATE_LEADERBOARD :
      return {
        ...state,
        leaderboardUids: action.uids,
      }
    case ADD_SCORES :
    case INCREMENT_SCORE :
    case DECREMENT_SCORE :
      return {
        ...state,
        usersScores: usersScores(state.usersScores, action)
      }
    case ADD_LISTENER :
      return {
        ...state,
        listenerSet: true,
      }
    default :
      return state
  }
}