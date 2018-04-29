//import liraries
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    List, 
    ListItem, 
    ListView,
    Dimensions
} from 'react-native';

import Picker from './picker/Picker';

// create a component
class AlarmSettings extends Component {
    

    state = {
        chosenTime: new Date(),
    };
    

    setAlarm = (newTime) => {
        console.log('Time Change ', newTime)
        this.setState({chosenTime: newTime});
    };

    renderRow = (rowData, sectionID) => {
        const list = [
            {
                title: 'Sounds',
                currentSelection: 'Ring',
            },
            {
                title: 'Snüze Amount',
                currentSelection: '.25',
            },
        ]
        return (
            list.map((item, i) => (
                <View key={i} style={[styles.row, styles.section]}>
                    <Text style={styles.rowText}>
                        {item.title}
                    </Text>
                    <Text style={styles.rowSelection}>
                        {item.currentSelection}
                    </Text>
                </View>
            ))
        );
    } ;


    render() {
        const { chosenTime, list } = this.state;


        return (
            <View style={styles.container}>
                <View style={{height: 50, width: 200}}>
                    <Text>New Time: {String(chosenTime)}</Text>
                </View>
                <View style={[styles.section, styles.alarmClock]}>
                    <Picker chosenTime={chosenTime} setTime={this.setAlarm} />
                </View>
                {this.renderRow()}
            </View>
        );
    }
}
const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full heigt
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: width,
    },
    section: {
        flex: 0,
        height: 55,
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
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
        top: 100,
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: 'grey',
        borderWidth: .3,
    },
    rowText: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    rowSelection: {
        flex: 1,
        justifyContent: 'flex-end',
        left: 130,
    }
});

//make this component available to the app
export default AlarmSettings;
