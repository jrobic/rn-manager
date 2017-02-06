import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { employeeCreate } from '../../actions/employeeActions';

import { CardSection, Card, Button } from '../common';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { name, phone, shift } = this.props;
    this.props.actions.employeeCreate({ name, phone, shift });
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          <Button onPress={this.onSubmit}>Create</Button>
        </CardSection>
      </Card>
    );
  }
}

EmployeeCreate.propTypes = {
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
    actions: bindActionCreators({ employeeCreate }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCreate);
