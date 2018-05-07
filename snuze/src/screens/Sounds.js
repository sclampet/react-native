//import liraries
import React, { Component } from 'react';
import { View, 
    Text, 
    StyleSheet,
    ActivityIndicator,
    FlatList
} from 'react-native';
import SoundListItem from '../components/body/alarm/sounds/SoundListItem';

import store from '../../store';
// import { fetchSounds } from '../utils/api';
import colors from '../utils/colors';

const keyExtractor = ({ id }) => id;

// create a component
class Sounds extends Component {
    state = {
        sounds: store.getState().sounds,
        loading: true,
        error: false,
    }

    async componentDidMount() {
        // try {
        //     const sounds = await fetchSounds();
        //     this.setState({ sounds, loading: false, error: false });
        // } catch (e) {
        //     this.setState({ loading: false, error: true });
        // }
        this.unsubscribe = store.onChange(() =>
            this.setState({
                sounds: store.getState().sounds,
                loading: store.getState().isFetchingSounds,
                error: store.getState().error,
            }));
        store.setState({isFetchingSounds: false});
    }

    renderSound = ({item}) => {
        const { title } = item;

        return <SoundListItem title={title} />
    }
    
    render() {
        const { sounds, loading, error } = this.state;

        const soundsSorted = sounds.sort((a, b) =>
            a.title.localeCompare(b.title));

        return (
            <View style={styles.container}>
                {loading && <ActivityIndicator size="large" />}
                {error && <Text>Error...</Text>}
                {!loading &&
                    !error && (
                        <FlatList
                            data={soundsSorted}
                            keyExtractor={keyExtractor}
                            renderItem={this.renderSound}
                        />
                    )}
            </View>
            );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
    },
    sound: {
        flex: 1,
        backgroundColor: 'white',
    },
});

//make this component available to the app
export default Sounds;
