import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import * as types from './actionTypes';

export const employeePropUpdate = ({ prop, value }) => ({
  type: types.EMPLOYEE_PROP_UPDATE,
  payload: { prop, value },
});

export const employeeCreateSuccess = () => ({
  type: types.EMPLOYEE_CREATE_SUCCES,
});

export const employeeSaveSuccess = () => ({
  type: types.EMPLOYEE_SAVE_SUCCES,
});

export const employeeDeleteSuccess = () => ({
  type: types.EMPLOYEE_DELETE_SUCCES,
});

export const employeeFetchSuccess = employees => ({
  type: types.EMPLOYEES_FETCH_SUCCES,
  payload: { employees },
});

export const employeeCreate = ({ name, phone, shift }) =>
  async (dispatch) => {
    const { currentUser } = firebase.auth();

    try {
      await firebase.database()
        .ref(`/users/${currentUser.uid}/employees`)
        .push({ name, phone, shift });

      dispatch(employeeCreateSuccess());
      Actions.employeeList({ type: 'reset' });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const employeeSave = ({ name, phone, shift, uid }) =>
  async (dispatch) => {
    const { currentUser } = firebase.auth();

    try {
      await firebase.database()
        .ref(`/users/${currentUser.uid}/employees/${uid}`)
        .set({ name, phone, shift });

      dispatch(employeeSaveSuccess());
      Actions.employeeList({ type: 'reset' });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const employeeDelete = uid =>
  async (dispatch) => {
    const { currentUser } = firebase.auth();

    try {
      await firebase.database()
        .ref(`/users/${currentUser.uid}/employees/${uid}`)
        .remove();

      dispatch(employeeDeleteSuccess());
      Actions.employeeList({ type: 'reset' });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const employeesFetch = () =>
  (dispatch) => {
    const { currentUser } = firebase.auth();

    firebase.database()
      .ref(`/users/${currentUser.uid}/employees`)
      .on('value', (snapshot) => {
        dispatch(employeeFetchSuccess(snapshot.val()));
      });
  };
