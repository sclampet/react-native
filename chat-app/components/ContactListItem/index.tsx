import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { User } from "../../types";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { API, Auth, graphqlOperation } from "aws-amplify";
import {
  createChatRoom,
  createChatRoomUser,
} from "../../src/graphql/mutations";

export type ContactListItemProps = {
  user: User;
};

const ContactListItem = (props: ContactListItemProps) => {
  const navigation = useNavigation();
  const { user } = props;

  const onPress = async () => {
    try {
      //1. Create new ChatRoom
      const newChatRoomData = await API.graphql(
        graphqlOperation(createChatRoom, { input: {} })
      );

      if (!newChatRoomData.data) {
        console.log("Failed to create new ChatRoom");
        return;
      }

      const newChatRoom = newChatRoomData.data.createChatRoom;

      //2. Add 'user' to ChatRoom
      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: {
            userID: user.id,
            chatRoomID: newChatRoom.id,
          },
        })
      );

      //3. Add authenticated user to ChatRoom
      const userInfo = await Auth.currentAuthenticatedUser();
      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: {
            userID: userInfo.attributes.sub,
            chatRoomID: newChatRoom.id,
          },
        })
      );

      navigation.navigate("ChatRoom", {
        id: newChatRoom.id,
        name: "Harcoded Name",
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: user.imageUri }} style={styles.avatar} />

        <View style={styles.contentContainer}>
          <Text style={styles.username}>{user.name}</Text>
          <Text numberOfLines={1} style={styles.status}>
            {user.status}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ContactListItem;
