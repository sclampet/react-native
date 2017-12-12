import React, { Component } from 'react';
import { 
    NetInfo,
    Platform,
    StatusBar,
    Text,
    View,
    StyleSheet,
} from 'react-native';

export default class Status extends Component {
    state = {
        info: 'none',
    };

    async componentWillMount() {
        this.subscription = NetInfo.addEventListener('connectionChange', this.handleChange);

        const info = await NetInfo.getConnectionInfo();

        this.setState({ info });
        // setTimeout(() => this.handleChange('none'), 3000);
    }

    
    componentWillUnmount() {
        this.subscription.remove();
    }
    
    handleChange = (info) => {
        this.setState({ info });
        StatusBar.setBarStyle(info === 'none' ? 'light-content' : 'dark-content');
    }

    render() {
        const { info } = this.state;

        const isConnected = info !== 'none';
        const backgroundColor = isConnected ? 'white' : 'red';
        

        const messageContainer = (
            <View style={styles.messageContainer} pointerEvents={'none'}>
                {!isConnected && (
                    <View style={styles.bubble}>
                        <Text style={styles.text}>No network connection</Text>
                    </View>
                )}
            </View>
        )

        if(Platform.OS === 'ios') {
            return <View style={[styles.status, { backgroundColor }]}>{messageContainer}</View>
        };

        return null;
    }
};

const styles = StyleSheet.create({
    messageContainer: {
        zIndex: 1,
        position: 'absolute',
        top: Platform.OS === 'ios' ? 70: 50,
        right: 0,
        left: 0,
        height: 80,
        alignItems: 'center',
    },
    bubble: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'red',
    },
    text: {
        color: 'white',
    },
    status: {
        height: 50,
        zIndex: 1,
    },
});