import { combineReducers } from 'redux';

import auth from './authReducer';
import employeeForm from './employeeFormReducer';
import employees from './employeeReducer';

const rootReducer = combineReducers({
  auth,
  employeeForm,
  employees,
});

export default rootReducer;
