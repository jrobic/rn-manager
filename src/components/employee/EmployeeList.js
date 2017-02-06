import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map } from 'lodash';

import { employeesFetch } from '../../actions/employeeActions';
import ListItem from './EmployeeListItem';

const createDataSource = (employees) => {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
  });

  return ds.cloneWithRows(employees);
};

const renderRow = employee => <ListItem employee={employee} />;

class EmployeeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: createDataSource(props.employees),
    };
  }

  componentWillMount() {
    this.props.actions.employeesFetch();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ dataSource: createDataSource(nextProps.employees) });
  }



  render() {
    console.log(this.props.employees);
    return (
      <ListView
        enableEmptySections
        dataSource={this.state.dataSource}
        renderRow={renderRow}
      />
    );
  }
}

EmployeeList.propTypes = {
  actions: PropTypes.shape().isRequired,
  employees: PropTypes.arrayOf(React.PropTypes.shape()).isRequired,
};

function mapStateToProps(state) {
  return {
    employees: map(state.employees, (val, uid) => ({ ...val, uid })),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ employeesFetch }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
