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

    handleFormClose = () => {
        this.setState({ isOpen: false });
    }

    handleFormSubmit = timer => {
        const { onFormSubmit } = this.props;

        onFormSubmit(timer);
        this.setState({ isOpen: false });
    }

    render() {
        const { isOpen } = this.state;

        return(
            <View style={[styles.container, !isOpen && styles.buttonPadding]}>
                {isOpen ? (
                    <TimerForm
                        onFormSubmit={this.handleFormSubmit}
                        onFormClose={this.handleFormClose}
                    />
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


