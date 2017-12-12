//import liraries
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { 
    Dimensions,
    FlatList,
    PixelRatio, 
    StyleSheet 
} from 'react-native';

export default class Grid extends PureComponent {
    static propTypes = {
        renderItem: PropTypes.func.isRequired,
        numColumns: PropTypes.number,
        itemMargin: PropTypes.number,
    };

    static defaultProps = {
        numColumns: 4,
        itemMargin: StyleSheet.hairlineWidth,
    };

    renderGridItem = (info) => {
        const { index } = info;
        const { renderItem, numColumns, itemMargin } = this.props;
        //calling Dimentsions in render path to account for varying device size, orientation, etc...
        const { width } = Dimensions.get('window');

        const size = PixelRatio.roundToNearestPixel(
            (width - itemMargin * (numColumns - 1)) / numColumns,
        );
        //accounts for first item in row
        const marginLeft = index % numColumns === 0 ? 0 : itemMargin;
        //first row marginTop
        const marginTop = index < numColumns ? 0 : itemMargin;

        return renderItem({ ...info, size, marginLeft, marginTop });
    }

    render() {
        return <FlatList {...this.props} renderItem={this.renderGridItem} />
    }
};

