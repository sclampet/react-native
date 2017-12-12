import PropTypes from 'prop-types';

export const MessageShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['text', 'image', 'location']),
    text: PropTypes.string,
    uri: PropTypes.string,
    coordinate: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }),
});

let messageId = 0;

function getNextId() {
    messageId += 1;
    return messageId;
}

//create text msg
export function createTextMessage(text) {
    return {
        type: 'text',
        id: getNextId(),
        text,
    }
}

//create image msg
export function createImageMessage(uri) {
    return {
        type: 'image',
        id: getNextId(),
        uri,
    }
}

//create location msg
export function createLocationMessage(coordinate) {
    return {
        type: 'location',
        id: getNextId(),
        coordinate,
    }
}