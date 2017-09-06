import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { fetchMeetups } from './constants/api';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      meetups: []
    };

  };

  // static defaultProps = {
  //   // fetchMeetups
  // };


  async componentDidMount() {
    this.setState({ loading: true });
    fetchMeetups()
      .then((res) => {
        this.setState({
          loading: false,
          meetups: res.meetups
        });
        console.log('meetups: ' + this.state.meetups);
      });
  };

  render() {
    const meetups = this.state.meetups.map((meetup, i) => {
      <Text key={i}>{meetup.title}</Text>
    });

    if(this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text>Meetup!</Text>
        {meetups}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
