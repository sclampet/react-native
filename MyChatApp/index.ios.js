import React from 'react';
import {AppRegistry, StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView} from 'react-native';
import {send, subscribe} from 'react-native-training-chat-server';

const NAME = 'Your name';
const CHANNEL = 'Reactivate';

export default class MyChatApp extends React.Component {
  state = {
    typing: '',
    messages: [],
  };

  componentWillMount() {
    subscribe(CHANNEL, messages => {
      this.setState({messages});
    });
  }

  renderItem({item}) {
    return (
      <View style={styles.row}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    );
  }

  async sendMessage() [
    // send message to our channel, with sender name.
    // the `await` keyword means this function execution
    // waits until the message is sent
    await send({
      channel: CHANNEL,
      sender: NAME,
      message: this.state.typing
    });
    //set the component state (clears text input)
    this.setState({
      typing: '',
    });
  ]

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.messages} renderItem={this.renderItem} />
        <KeyboardAvoidingView behavior='padding'>
          <View style={styles.footer}>
            <TextInput value={this.state.typing}
              onChangeText={text => this.setState({typing: text})}
              style={styles.input}
              borderBottomColor='transparent'
              placeholder='Type something nice'
              />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  message: {
    fontSize: 18,
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#eee'
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    flex: 1
  }
});

AppRegistry.registerComponent('MyChatApp', () => MyChatApp);
