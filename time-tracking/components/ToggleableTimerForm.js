//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import TimerForm from './TimerForm';
import TimerButton from './TimerButton';

export default class ToggleableTimerForm extends React.Component {
    state = {
        isOpen: false,
    };

    handleOpen = () => {
        this.setState({ isOpen: true });
    };

    render() {
        const { isOpen } = this.state;

        return(
            <View style={[styles.container, !isOpen && styles.buttonPadding]}>
                {isOpen ? (
                    <TimerForm />
                ) : (
                    <TimerButton title="+" color="black" onPress={this.handleOpen} />
                )}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    buttonPadding: {
        paddingHorizontal: 15,
    },
});


