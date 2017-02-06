import React, { Component, PropTypes } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { CardSection } from '../common';

class EmployeeListItem extends Component {
  constructor(props) {
    super(props);

    this.onRowPress = this.onRowPress.bind(this);
  }

  onRowPress() {
    Actions.employeeEdit({ employee: this.props.employee });
  }

  render() {
    const { name } = this.props.employee;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>{name}</Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

EmployeeListItem.propTypes = {
  employee: PropTypes.shape().isRequired,
};

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
  },
};

export default EmployeeListItem;
