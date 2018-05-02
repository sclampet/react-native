import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { AlarmSettings, Analytics } from './src/components/body';
import Header from './src/components/header/Header';

export default class App extends React.Component {

  state = {
    currentAlarm: '6:00 AM',
    sound: '',
    amount: '',
  };

  setAlarm = (time) => {
    console.log('Time in App.js ', time.getMinutes());
    var hours = String(time.getHours());
      if(hours > 12){ 
        hours -= 12;
      };
      if(hours == 0){ 
        hours = '12';
      };
    var min = String(time.getMinutes());
      if(min < 10){ 
        min = `0${min}`;
      };
    const mid = hours != '00' && hours > '12' ? 'PM' : 'AM';
    const newAlarm = `${hours}:${min} ${mid}`;
    this.setState({currentAlarm: newAlarm});
  }

  render() {
    const { currentAlarm } = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <Header isEditPage="true"/>
        </SafeAreaView>
          <AlarmSettings currentAlarm={currentAlarm} setAlarm={this.setAlarm} />
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
