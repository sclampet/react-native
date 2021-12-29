import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { View } from "../../components/Themed";
import ChatListItem from "../../components/ChatListItem";

import NewMessageButton from "../../components/NewMessageButton";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { getUser } from "./queries";

export default function ChatsScreen() {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();

        const userData = await API.graphql(
          graphqlOperation(getUser, {
            id: userInfo.attributes.sub,
          })
        );

        setChatRooms(userData.data.getUser.chatRoomUser.items);
      } catch (e) {
        console.log(e);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
        keyExtractor={(item) => item.id}
        style={{ width: "100%" }}
      />

      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
