import React, { Component } from 'react';
// import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import config from '../config.json';

import configureStore from './store/configureStore';
import Router from './router';


const store = configureStore();

class App extends Component {
  componentWillMount() {
    firebase.initializeApp(config.firebase);
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
