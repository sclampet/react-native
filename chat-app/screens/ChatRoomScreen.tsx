import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/native";
import ChatMessage from "../components/ChatMessage";

import chatRoomData from "../data/Chats";
import BG from "../assets/images/BG.png";
import InputBox from "../components/InputBox";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { messagesByChatRoom } from "../src/graphql/queries";

const ChatRoomScreen = () => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [userID, setUserID] = useState(null);

  console.log(route.params.id);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setUserID(userInfo.attributes.sub);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesData = await API.graphql(
        graphqlOperation(messagesByChatRoom, {
          chatRoomID: route.params.id,
          sortDirection: "DESC",
        })
      );

      setMessages(messagesData.data.messagesByChatRoom.items);
    };

    fetchMessages();
  }, []);

  return (
    <ImageBackground style={{ width: "100%", height: "100%" }} source={BG}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <ChatMessage message={item} userID={userID} />
        )}
        keyExtractor={(item) => item.id}
        inverted
      />

      <InputBox chatRoomID={route.params.id} />
    </ImageBackground>
  );
};

export default ChatRoomScreen;
