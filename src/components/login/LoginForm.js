import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../actions/loginActions';

import { Card, CardSection, Input, Button, Spinner } from '../common';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onPasswordChange(password) {
    this.props.actions.passwordChanged(password.trim());
  }

  onEmailChange(email) {
    this.props.actions.emailChanged(email.trim());
  }

  onSubmit() {
    const { email, password } = this.props;
    this.props.actions.loginUser({ email, password });
  }

  renderButton() {
    return this.props.loading ?
      <Spinner size="small" />
      : <Button onPress={this.onSubmit}>Login</Button>;
  }

  render() {
    const { email, password, error } = this.props;

    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange}
            value={email}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange}
            value={password}
          />
        </CardSection>
        {
          error &&
          <Text style={styles.errorStyle}>
            {error.message}
          </Text>
        }
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

LoginForm.propTypes = {
  actions: PropTypes.shape().isRequired,
  email: PropTypes.string.isRequired,
  error: PropTypes.shape(),
  password: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

LoginForm.defaultProps = {
  error: null,
};

const styles = {
  errorStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#EF5350',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
};

function mapStateToProps(state) {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
