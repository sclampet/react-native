import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const Header = (props) => {

    renderHeader = () => {
        if(props.isEditPage) {
            return (
                <View style={[styles.row, styles.section]}>
                    <Text style={styles.cancel}>
                        Cancel
                    </Text>
                    <View>
                        <Text>Logo/Title</Text>
                    </View>
                    <Text style={styles.done}>
                        Done
                    </Text>
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            {this.renderHeader()}
        </View>
    );
};


const width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: width,
        backgroundColor: 'teal',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        top: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    cancel: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    done: {
        flex: 1,
        justifyContent: 'flex-end',
        left: 100,
    }
});

export default Header;