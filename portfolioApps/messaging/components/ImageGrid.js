//import liraries
import React, { PureComponent } from 'react';
import { Permissions } from 'expo';
import PropTypes from 'prop-types';
import { 
    CameraRoll,
    Image,
    TouchableOpacity,
    StyleSheet 
} from 'react-native';

import Grid from './Grid';

const keyExtractor = ({ uri }) => uri;

export default class ImageGrid extends PureComponent {
    loading = false;
    cursor = null;

    static propTypes = {
        onPressImage: PropTypes.func,
    };

    static defaultProps = {
        onPressImage: () => {},
    };

    state = {
        images: [],
    };

    componentDidMount() {
        this.getImages();
    };

    getImages = async (after) => {
        if(this.loading) return;

        this.loading = true;

        const results = await CameraRoll.getPhotos({
            first: 20,
            after,
        });

        const { edges, page_info: { has_next_page, end_cursor } } = results;

        const loadedImages = edges.map(item => item.node.image);

        //use completion callback to make sure we access state after it has been updated
        this.setState(
            {
                images: this.state.images.concat(loadedImages),
            },
            () => {
                this.loading = false;
                this.cursor = has_next_page ? end_cursor : null;
            },
        );
    };

    getNextImages = () => {
        if(!this.cursor) return;

        this.getImages(this.cursor);
    };
    

    renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
        const { onPressImage } = this.props;

        const style = {
            width: size,
            height: size,
            marginLeft,
            marginTop,
        };

        return (
            <TouchableOpacity
                key={uri}
                activeOpacity={0.75}
                onPress={() => onPressImage(uri)}
                style={style}
            >
                <Image source={{ uri }} style={style} />
            </TouchableOpacity>
        );
    };

    render() {
        const { images } = this.state;

        return (
            <Grid
                data={images}
                renderItem={this.renderItem}
                keyExtractor={keyExtractor}
                onEndReached={this.getNextImages}
            />
        );
    };
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
});