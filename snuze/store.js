let state = {
    isFetchingSnuzeInfo: true,
    isFetchingUser: true,
    isFetchingSounds: true,
    user: {
        name: 'Scott C',
        currentAlarm: '5:00 AM',
        amountToSnuze: .25,
        sound: 'Ring',
        totalSnuzes: 20,
    },
    snuzeInfo: {
        totalDonated: 500,
    },
    sounds: [
        { id: '1', title: 'Ring Ring' },
        { id: '2', title: 'Buzz Buzz' },
    ],
    error: false,
};

const listeners = [];

export default {
    getState() {
        return state;
    },
    setState(newState) {
        state = { ...state, ...newState };
        listeners.forEach(listener => listener());
    },
    onChange(newListener) {
        listeners.push(newListener);
        return () => listeners.filter(listener => listener !== newListener);
    },
};
