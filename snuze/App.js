import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import moment from 'moment';

import Alarm from './src/screens/Alarm';
import { AlarmSettings, Analytics } from './src/components/body';
import Header from './src/components/header/Header';

export default class App extends React.Component {

  state = {
   
  };

  render() {
    const { currentAlarm } = this.state;
    return (
      <View style={styles.container}>
        <Alarm />
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
