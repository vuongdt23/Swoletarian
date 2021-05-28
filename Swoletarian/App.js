import React from 'react';
import userContext from './src/context/userContext';
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
