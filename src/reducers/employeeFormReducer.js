import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.employeeForm, action) => {
  switch (action.type) {
    case types.EMPLOYEE_PROP_UPDATE: {
      const { prop, value } = action.payload;
      return {
        ...state,
        [prop]: value,
      };
    }
    case types.EMPLOYEE_CREATE_SUCCES:
      return initialState.employeeForm;
    case types.EMPLOYEE_SAVE_SUCCES:
      return initialState.employeeForm;
    default:
      return state;
  }
};
