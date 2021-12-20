import React from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const NewMessageButton = () => {
  const navigator = useNavigation();

  const onPress = () => {
    navigator.navigate("Contacts");
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <MaterialCommunityIcons name="message-text" size={28} color="white" />
    </Pressable>
  );
};

export default NewMessageButton;
