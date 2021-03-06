import {
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_ALL_USERS_SUCCESS,
  MAKE_PICKS_SUCCESS,
  UPDATE_SCORES_SUCCESS,
} from '../actions/users';

const initialState = {
  user: null,
  error: null,
  allUsers: null
};

export default function reducer(state = initialState, action) {
  if (action.type === GET_USER_SUCCESS) {
    return Object.assign({}, state, {
      user: action.data,
      error: null
    });
  }
  else if (action.type === GET_USER_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  else if (action.type === GET_ALL_USERS_SUCCESS) {
    return Object.assign({}, state, {
      allUsers: action.data,
      error: null
    });
  }
  else if (action.type === MAKE_PICKS_SUCCESS) {
    return Object.assign({}, state, {
      user: action.data,
      error: null
    });
  }
  else if (action.type === UPDATE_SCORES_SUCCESS) {
    return Object.assign({}, state, {
      allUsers: action.data,
      error: null
    });
  }
  return state;
};