import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import moment from 'moment';

import PropTypes from 'prop-types';
import colors from '../utils/colors';

import { AlarmListItem, AlarmSettings } from '../components/body';
import store from '../../store';



// For fetching user info and amount donated
// import { fetchUserInfo, fetchSnuzeInfo } from '../utils/api';

class Alarm extends Component {
    static navigationOptions = () => ({
        title: 'Alarm',
    });

    state = {
        user: store.getState().user,
        snuzeInfo: store.getState().snuzeInfo,
        loading: store.getState().isFetchingUser,
        loading: store.getState().isFetchingSnuzeInfo,
        error: store.getState().error,
    };

    setAlarm = (time) => {
        // console.log('Time in App.js ', time.getMinutes());

        const newAlarm = moment(time).format('LT');
        store.setState({ user: {currentAlarm: newAlarm} });
    }

    //fetch data from store
    async componentDidMount() {
        this.unsubscribe = store.onChange(() =>
            this.setState({
                user: store.getState().user,
                loading: store.getState().isFetchingUser,
                error: store.getState().error,
            }));
        // const user = await fetchUser(); api call

        store.setState({isFetchingUser: false});

        // try {
        //     const { currentAlarm, totalSnuzes } = await fetchUserInfo();

        //     this.setState({
            //             currentAlarm,
            //             totalSnuzes,
            //         loading: false,
            //         error: false,
            //     });
            // } catch (e) {
                //     this.setState({
                    //         loading: false,
                    //         error: true,
                    //     });
                    // };
        };

    onSoundPress = () => { navigate('Sounds', { id }) };
                
                
                render() {
                    const { user, loading, error } = this.state;
                    
                    return (
                        <View style={styles.container}>
                            {loading && <ActivityIndicator size="large" />}
                            {error && <Text>Error...</Text>}
                            {!loading &&
                                !error && (
                                    <AlarmSettings 
                                        userInfo={user} 
                                        setAlarm={this.setAlarm}
                                        onSoundPress={this.onSoundPress}
                                    />
                                )}
                        </View>
                    );
                }
}

// define your styles
const styles = StyleSheet.create({
    container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
    listTitle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 24,
        borderBottomColor: colors.grey,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    title: {
        borderRadius: 22,
        width: 44,
        height: 44,
    },
    details: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: 20,
    },
    value: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 16,
    },
    subtitle: {
        color: colors.blue,
        fontSize: 15,
        marginTop: 4,
    },
});

//make this component available to the app
export default Alarm;
