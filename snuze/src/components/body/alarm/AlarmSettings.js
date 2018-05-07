//import liraries
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    List, 
    ListItem, 
    ListView,
    Dimensions,
    TouchableHighlight,
} from 'react-native';
import colors from '../../../utils/colors';

import Picker from './picker/Picker';

// create a component
class AlarmSettings extends Component {
    

    state = {
        isEditOpen: false,
    };

    render() {
        const { chosenTime, list } = this.state;


        return (
            <View style={styles.container}>
                <View style={{height: 50, width: 200}}>
                    <Text>New Time: {String(chosenTime)}</Text>
                </View>
                {this.renderAlarm()}
                {this.renderRow()}
            </View>
        );
    }

    renderAlarm = () => {
        const { userInfo } = this.props;
        const { isEditOpen } = this.state;
        const currentAlarm = userInfo.currentAlarm;
        console.log('Current Alarm from user ', currentAlarm)

        return (
            <View>
                {isEditOpen &&
                    <View>
                        <View style={[styles.section, styles.alarmClock]}>
                            <Picker currentAlarm={currentAlarm} setTime={this.setAlarm} />
                        </View>
                        <View>
                            <Text onPress={this.saveAlarm}>Save</Text>
                            <Text onPress={this.closePicker}>Cancel</Text>
                        </View>
                    </View>
                }
                {!isEditOpen &&
                    <View>
                        <View style={[styles.section, styles.alarmClock]}>
                            <Text>Alarm Clock: {userInfo.currentAlarm}</Text>
                        </View>
                        <View>
                            <Text onPress={this.editAlarm}>Edit</Text>
                        </View>
                    </View>
                }
            </View>
        );
    }

    renderRow = () => {
        const { isEditOpen } = this.state;
        const { onSoundPress, userInfo, snuzeInfo } = this.props;
        return (
            <View>
                {isEditOpen &&
                    <View>
                        <TouchableHighlight
                            underlayColor={colors.grey}
                            style={styles.toucheableHighlight}
                            onPress={onSoundPress}
                        >
                        <View style={styles.alarmInfo}>
                            <View style={styles.rows}>
                                <Text style={[styles.title]}>Sounds</Text>
                                <Text style={[styles.toucheableValue]}>{userInfo.sound}</Text>
                            </View>
                        </View>
                        </TouchableHighlight>
                        <View style={styles.alarmInfo}>
                            <Text style={[styles.title]}>Snüze Amount </Text>
                            <Text style={[styles.value]}>{userInfo.amountToSnuze}</Text>
                        </View>
                    </View>
                }
                {!isEditOpen &&
                    <View style={styles.alarmInfo}>
                        <View style={styles.rows}>
                            <Text style={[styles.title]}>Total Snüzes</Text>
                            <Text style={[styles.value]}>{userInfo.totalSnuzes}</Text>
                        </View>
                        <View style={styles.rows}>
                            <Text style={[styles.title]}>Total Donated by all Snüzers</Text>
                            <Text style={[styles.value]}>{snuzeInfo.totalDonated}</Text>
                        </View>
                    </View>
                }
        </View>
        );
    };

    setAlarm = (newTime) => {
        console.log('Time Change ', newTime)
        this.setState({ chosenTime: newTime });
    };

    editAlarm = () => {
        this.setState({isEditOpen: true});
    };

    saveAlarm = () => {
        console.log('Saving alarm and sending time to App.js')
        this.props.setAlarm(this.state.chosenTime);
        this.setState({isEditOpen: false});
    };

    closePicker = () => {
        this.setState({ isEditOpen: false });
    }


}
const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: width,
        paddingLeft: 24,

    },
    toucheableHighlight: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 100,
        width: width,
        paddingLeft: 24,
    },
    alarmInfo: {
        flex: .5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 24,
        borderBottomColor: colors.grey,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    rows: {
        justifyContent: 'flex-start',
        height: 40,
        marginLeft: 20,
    },
    title: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 16,
    },
    toucheableValue: {
        color: colors.blue,
        fontSize: 15,
        marginTop: 4,
    },
    value: {
        color: colors.black,
        fontSize: 15,
        marginTop: 4,
    },
    section: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 20,
    },
    alarmClock: {
        marginTop: 100,
    },
    setAlarm: {
        height: 55,
        width: width,
        top: 200,
        borderColor: 'black',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center', 
    },
});

//make this component available to the app
export default AlarmSettings;
