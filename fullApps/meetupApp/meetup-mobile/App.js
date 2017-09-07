import React from 'react';
import Exponent from 'expo';
import EStylesheet from 'react-native-extended-stylesheet';
import Colors from './constants/Colors';
import { HomeScreen } from './src/screens';

EStylesheet.build(Colors);

export default class App extends React.Component {
  render() {
    return (
      <HomeScreen />
    );
  }
}
