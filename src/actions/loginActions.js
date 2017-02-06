import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import * as types from './actionTypes';

export const emailChanged = email => ({
  type: types.EMAIL_CHANGED,
  payload: { email },
});

export const passwordChanged = password => ({
  type: types.PASSWORD_CHANGED,
  payload: { password },
});

export const loginUserSuccess = (dispatch, user) => {
  dispatch({ type: types.LOGIN_USER_SUCCESS, payload: { user } });
  Actions.main();
};

export const loginUserFail = (dispatch, error) => {
  console.log(error);
  dispatch({ type: types.LOGIN_USER_FAIL, payload: { error } });
};

export const loginUser = ({ email, password }) =>
  async (dispatch) => {
    dispatch({ type: types.LOGIN_USER });
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      loginUserSuccess(dispatch, user);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        dispatch(createUser({ email, password }));
      } else {
        loginUserFail(dispatch, error);
      }
    }
  };

export const createUser = ({ email, password }) =>
  async (dispatch) => {
    try {
      const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
      loginUserSuccess(dispatch, user);
    } catch (error) {
      loginUserFail(dispatch, error);
    }
  };
