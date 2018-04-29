import React, { Component } from 'react'
import {
    DatePickerIOS,
    View,
    StyleSheet,
} from 'react-native'

export default class Picker extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            chosenTime: new Date(), 
        };

    }

    onTimeChange = (time) => {
        this.props.setTime(time);
        this.setState({chosenTime: time});
    }

    render() {
        const { chosenTime } = this.state;
        return (
            <View style={styles.container}>
                <DatePickerIOS
                    date={chosenTime}
                    mode="time"
                    onDateChange={this.onTimeChange}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
})