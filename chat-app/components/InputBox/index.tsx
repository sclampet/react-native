import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
  Fontisto,
} from "@expo/vector-icons";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { createMessage } from "../../src/graphql/mutations";

export type InputBoxProps = {
  chatRoomID: String;
};

const InputBox = (props: InputBoxProps) => {
  const { chatRoomID } = props;
  const [message, setMessage] = useState("");
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setUserID(userInfo.attributes.sub);
    };

    fetchUser();
  }, []);

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

  const sendMessagePressed = async () => {
    try {
      await API.graphql(
        graphqlOperation(createMessage, {
          input: {
            content: message,
            userID: userID,
            chatRoomID,
          },
        })
      );
    } catch (error) {
      console.log(error);
    }

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
