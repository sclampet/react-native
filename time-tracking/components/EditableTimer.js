//import liraries
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet 
} from 'react-native';

import TimerForm from './TimerForm';
import Timer from './Timer';


export default class EditableTimer extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        project: PropTypes.string.isRequired,
        elapsed: PropTypes.number.isRequired,
        isRunning: PropTypes.bool.isRequired,
        onFormSubmit: PropTypes.func.isRequired,
        onRemovePress: PropTypes.func.isRequired,
        onStartPress: PropTypes.func.isRequired,
        onStopPress: PropTypes.func.isRequired,
    };

    state = {
        editFormOpen: false,
    };

    closeForm = () => {
        this.setState({ editFormOpen: false });
    }

    openForm = () => {
        this.setState({ editFormOpen: true });
    }

    handleSubmit = timer => {
        const { onFormSubmit } = this.props;

        onFormSubmit(timer);
        this.closeForm();
    }

    handleEditPress = () => {
        this.openForm();
    }

    handleFormClose = () => {
        this.closeForm();
    }

    render() {
        const { id, title, project, elapsed, 
                isRunning, onRemovePress, onStartPress,
                onStopPress
                } = this.props;
        const { editFormOpen } = this.state;

        if (editFormOpen) {
            return <TimerForm 
                        id={id} 
                        title={title} 
                        project={project} 
                        onFormSubmit={this.handleSubmit}
                        onFormClose={this.handleFormClose}
                    />;
        }
        
        return (
            <Timer
                id={id}
                title={title}
                project={project}
                elapsed={elapsed}
                isRunning={isRunning}
                onEditPress={this.handleEditPress}
                onRemovePress={onRemovePress}
                onStartPress={onStartPress}
                onStopPress={onStopPress}
            />
        );
    }
}

