import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.auth, action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return { ...state, loading: true, error: initialState.auth.error };

    case types.EMAIL_CHANGED:
      return { ...state, email: action.payload.email };

    case types.PASSWORD_CHANGED:
      return { ...state, password: action.payload.password };

    case types.LOGIN_USER_SUCCESS:
      return { ...state, ...initialState.auth, user: action.payload.user };

    case types.LOGIN_USER_FAIL: {
      const newState = { ...state, error: action.payload.error, loading: false };

      if (action.error.code === 'auth/user-not-found') {
        newState.email = initialState.auth.email;
      } else {
        newState.password = initialState.auth.password;
      }

      return newState;
    }

    default:
      return state;
  }
};
