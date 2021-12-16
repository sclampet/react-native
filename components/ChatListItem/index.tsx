import React from "react";
import { View, Text, Image } from "react-native";
import { ChatRoom } from "../../types";
import moment from "moment";
import styles from "./style";

export type ChatListItem = {
  chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItem) => {
  const { chatRoom } = props;
  // Assuming that the second user is the primary user for now
  const user = chatRoom.users[1];

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: user.imageUri }} style={styles.avatar} />

        <View style={styles.contentContainer}>
          <Text style={styles.username}>{user.name}</Text>
          <Text numberOfLines={1} style={styles.message}>
            {chatRoom.lastMessage.content}
          </Text>
        </View>
      </View>

      <Text style={styles.time}>{moment(new Date()).format("DD/MM/YYYY")}</Text>
    </View>
  );
};

export default ChatListItem;
