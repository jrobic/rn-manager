import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { each } from 'lodash';
import Communications from 'react-native-communications';

import * as employeeActions from '../../actions/employeeActions';
import { CardSection, Card, Button, Confirm } from '../common';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showConfirm: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onTextPress = this.onTextPress.bind(this);
    this.onDecline = this.onDecline.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onFire = this.onFire.bind(this);
  }

  componentWillMount() {
    each(this.props.employee, (value, prop) => {
      this.props.actions.employeePropUpdate({ prop, value });
    });
  }

  onDecline() {
    this.setState({ showConfirm: false });
  }

  onAccept() {
    this.setState({ showConfirm: false });
    this.props.actions.employeeDelete(this.props.employee.uid);
  }

  onTextPress() {
    const { phone, shift } = this.props;
    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }

  onFire() {
    this.setState({ showConfirm: true });
  }

  onSubmit() {
    const { name, phone, shift } = this.props;
    this.props.actions.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />

        <CardSection>
          <Button onPress={this.onSubmit}>Update</Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTextPress}>Text Schedule</Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onFire}>Fire</Button>
        </CardSection>

        <Confirm
          visible={this.state.showConfirm}
          onAccept={this.onAccept}
          onDecline={this.onDecline}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }
}

EmployeeEdit.propTypes = {
  employee: PropTypes.shape().isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  shift: PropTypes.string.isRequired,
  actions: PropTypes.shape().isRequired,
};

function mapStateToProps(state) {
  return state.employeeForm;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(employeeActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEdit);
