import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

import { Alarm, Sounds } from './src/screens';
import { AlarmSettings, Analytics } from './src/components/body';
import Header from './src/components/header/Header';

export default class App extends React.Component {

  state = {
   
  };

  render() {
    const { currentAlarm } = this.state;
    return (
      <View style={styles.container}>
        {/* <Alarm /> */}
        <Sounds />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
