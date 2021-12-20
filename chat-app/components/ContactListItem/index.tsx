import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { User } from "../../types";
import moment from "moment";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";

export type ContactListItemProps = {
  user: User;
};

const ContactListItem = (props: ContactListItemProps) => {
  const navigation = useNavigation();
  const { user } = props;

  const onPress = () => {
    //navigate to chatroom with this
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
