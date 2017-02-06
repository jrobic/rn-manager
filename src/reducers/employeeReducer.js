import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.employees, action) => {
  switch (action.type) {
    case types.EMPLOYEES_FETCH_SUCCES:
      return action.payload.employees;
    default:
      return state;
  }
};
