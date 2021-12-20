import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
  Fontisto,
} from "@expo/vector-icons";

const InputBox = () => {
  const [message, setMessage] = useState("");

  const onPress = () => {
    if (!message) {
      microphonePressed();
    } else {
      sendMessagePressed();
    }
  };

  const microphonePressed = () => {
    console.log("mic pressed");
  };

  const sendMessagePressed = () => {
    console.log(`send message pressed ${message}`);
    //Send message to backend...
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <FontAwesome5
          name="laugh-beam"
          size={24}
          color="grey"
          style={styles.icon}
        />
        <TextInput
          placeholder={"Type a message"}
          style={styles.textInput}
          multiline
          value={message}
          onChangeText={setMessage}
        />
        <Entypo name="attachment" size={24} color="grey" style={styles.icon} />
        {!message && (
          <Fontisto name="camera" size={24} color="grey" style={styles.icon} />
        )}
      </View>

      <TouchableOpacity onPress={onPress}>
        <View style={styles.micButton}>
          {!message ? (
            <MaterialCommunityIcons name="microphone" size={28} color="white" />
          ) : (
            <MaterialCommunityIcons name="send" size={26} color="white" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InputBox;
