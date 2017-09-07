import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../styles/MyMeetupList';

class MyMeetupList extends Component {
  render() {
    const meetups = this.props.meetups;
    console.log('meetups: ' + meetups);

    return (
      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.title}>Meetup List</Text>
        </View>
        <View style={styles.contentContainer}>
          <ScrollView horizontal>
            {meetups.map((meetup, i) => {
            return  <View key={i} style={styles.meetupCard}>
                      <View style={styles.meetupCardContainer}>
                        <Text style={styles.meetupCardTitle}>
                          {meetup.title}
                        </Text>
                      </View>
                      <View style={styles.meetupCardButtonContainer}>
                        <Text style={styles.meetupCardMetaName}>
                          {meetup.group.name}
                        </Text>
                        <Text style={styles.meetupCardMetaName}>
                          Mar 2m 6:00pm
                        </Text>
                      </View>
                    </View>
            })}
          </ScrollView>

        </View>
      </View>
    );
  }
}
export default MyMeetupList;
