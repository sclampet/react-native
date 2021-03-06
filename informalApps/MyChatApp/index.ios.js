import React from 'react';
import { AppRegistry, StyleSheet, Text, View, FlatList, TextInput,
  KeyboardAvoidingView, TouchableOpacity,
  Image,
} from 'react-native';
import {send, subscribe} from 'react-native-training-chat-server';
import ReversedFlatList from 'react-native-reversed-flat-list';
import Header from './Header';

const NAME = 'Scott';
const CHANNEL = 'Reactivate';
const AVATAR = 'https://avatars1.githubusercontent.com/u/17322126?v=4&u=016e5eb729c1c0c14b4747197684e48b7a0efd6b&s=400';

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
        <Image style={styles.avatar} source={{uri: item.avatar}} />
        <View style={styles.rowText}>
          <Text style={styles.sender}>{item.sender}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </View>
    );
  }

  async sendMessage() {
    // send message to our channel, with sender name.
    // the `await` keyword means this function execution
    // waits until the message is sent
    await send({
      channel: CHANNEL,
      sender: NAME,
      avatar: AVATAR,
      message: this.state.typing
    });
    //set the component state (clears text input)
    this.setState({
      typing: '',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={CHANNEL} />
        <ReversedFlatList data={this.state.messages} renderItem={this.renderItem} />
        <KeyboardAvoidingView behavior='padding'>
          <View style={styles.footer}>
            <TextInput value={this.state.typing}
              onChangeText={text => this.setState({typing: text})}
              style={styles.input}
              borderBottomColor='transparent'
              placeholder='Type something nice'
              />
            <TouchableOpacity onPress={this.sendMessage.bind(this)}>
              <Text style={styles.send}>Send</Text>
            </TouchableOpacity>
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
  },
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10,
  },
  rowText: {
    flex: 1,
  }
});

AppRegistry.registerComponent('MyChatApp', () => MyChatApp);
