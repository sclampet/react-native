import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import FBLogin from './FBLogin';

class APP extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <FBLogin />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default APP;
