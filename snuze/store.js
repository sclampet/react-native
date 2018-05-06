let state = {
    isFetchingSnuzeInfo: true,
    isFetchingUser: true,
    user: {
        name: 'Scott C',
        currentAlarm: '5:00 AM',
        amountToSnuze: .25,
        sound: 'Ring',
    },
    snuzeInfo: {
        totalDonated: 500,
    },
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
