import React from "react";
import { View, Text, FlatList, ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/native";
import ChatMessage from "../components/ChatMessage";

import chatRoomData from "../data/Chats";
import BG from "../assets/images/BG.png";

const ChatRoomScreen = () => {
  const route = useRoute();
  console.log(route.params);

  return (
    <ImageBackground style={{ width: "100%", height: "100%" }} source={BG}>
      <FlatList
        data={chatRoomData.messages}
        renderItem={({ item }) => <ChatMessage message={item} />}
        keyExtractor={(item) => item.id}
        inverted
      />
    </ImageBackground>
  );
};

export default ChatRoomScreen;
