import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Message } from "../../types";
import moment from "moment";
import styles from "./styles";

export type ChatMessageProps = {
  message: Message;
  userID: String;
};

const ChatMessage = (props: ChatMessageProps) => {
  const { message, userID } = props;

  const isMyMessage = () => {
    return message.user.id === userID;
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage() ? "#DCF8C5" : "#fff",
            marginLeft: isMyMessage() ? 80 : 0,
            marginRight: isMyMessage() ? 0 : 80,
          },
        ]}
      >
        {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
        <Text style={styles.message}>{message.content}</Text>
        <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
      </View>
    </View>
  );
};

export default ChatMessage;
