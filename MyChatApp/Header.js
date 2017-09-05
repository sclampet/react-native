import React, { Component } from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <StatusBar backgroundColor="lightseagreen" barStyle="light-content" />
        <Text style={styles.title}>
          #{this.props.title}
        </Text>
      </View>
    );
  };
};
export default Header;

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: 'lightseagreen',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
})
