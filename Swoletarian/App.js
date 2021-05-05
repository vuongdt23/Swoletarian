/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import StartNavigator from './src/navigators/StartNavigator';
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <StartNavigator></StartNavigator>;
  }
}

export default App;
