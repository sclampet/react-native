import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { AlarmSettings, Analytics } from './src/components/body';
import Header from './src/components/header/Header';

export default class App extends React.Component {

  state = {
    currAlarm: '',
    sound: '',
    amount: '',
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <Header isEditPage="true"/>
        </SafeAreaView>
        <SafeAreaView>
          <AlarmSettings />
        </SafeAreaView>
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
