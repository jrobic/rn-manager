import React, { Component, PropTypes } from 'react';
import { View, Picker, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { employeePropUpdate } from '../../actions/employeeActions';

import { CardSection, Input } from '../common';

class EmployeeForm extends Component {

  handleChange(prop, value) {
    this.props.actions.employeePropUpdate({ prop, value: value.trim() });
  }

  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="John Doe"
            onChangeText={text => this.handleChange('name', text)}
            value={this.props.name}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Phone"
            placeholder="+33 690909090"
            keyboardType="phone-pad"
            onChangeText={text => this.handleChange('phone', text)}
            value={this.props.phone}
          />
        </CardSection>
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerTextStyle}>Shift</Text>
          <Picker
            selectedValue={this.props.shift}
            onValueChange={day => this.handleChange('shift', day)}
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </CardSection>
      </View>
    );
  }
}

EmployeeForm.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  shift: PropTypes.string.isRequired,
  actions: PropTypes.shape().isRequired,
};

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20,
  },
};


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ employeePropUpdate }, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(EmployeeForm);
