import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { ChatRoom } from "../../types";
import moment from "moment";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";

export type ChatListItem = {
  chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItem) => {
  const { chatRoom } = props;
  const [otherUser, setOtherUser] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const getOtherUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();

      if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
        setOtherUser(chatRoom.chatRoomUsers.items[1].user);
      } else {
        setOtherUser(chatRoom.chatRoomUsers.items[0].user);
      }
    };

    getOtherUser();
  }, []);

  const onPress = () => {
    navigation.navigate("ChatRoom", { id: chatRoom.id, name: otherUser.name });
  };

  if (!otherUser) {
    return null;
  }

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: otherUser.imageUri }} style={styles.avatar} />

        <View style={styles.contentContainer}>
          <Text style={styles.username}>{otherUser.name}</Text>
          <Text numberOfLines={1} style={styles.message}>
            {chatRoom.lastMessage ? chatRoom.lastMessage.content : ""}
          </Text>
        </View>
      </View>

      <Text style={styles.time}>
        {chatRoom.lastMessage &&
          moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}
      </Text>
    </Pressable>
  );
};

export default ChatListItem;
