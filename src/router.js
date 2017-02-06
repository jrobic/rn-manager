import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

import LoginForm from './components/login/LoginForm';
import EmployeeList from './components/employee/EmployeeList';
import EmployeeCreate from './components/employee/EmployeeCreate';
import EmployeeEdit from './components/employee/EmployeeEdit';

const RouterComponent = () => (
  <Router sceneStyle={{ paddingTop: 70 }}>
    <Scene key="auth">
      <Scene key="login" component={LoginForm} title="Login" initial />
    </Scene>

    <Scene key="main">
      <Scene
        initial
        key="employeeList"
        component={EmployeeList}
        title="Employees"
        rightTitle="Add"
        onRight={() => Actions.employeeCreate()}
      />
      <Scene
        key="employeeCreate"
        component={EmployeeCreate}
        title="Create Employee"
      />
      <Scene
        key="employeeEdit"
        component={EmployeeEdit}
        title="Edit Employee"
      />
    </Scene>
  </Router>
);

export default RouterComponent;
