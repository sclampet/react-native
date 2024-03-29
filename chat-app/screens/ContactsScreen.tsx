import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { View } from "../components/Themed";

import ContactListItem from "../components/ContactListItem";
import { API, graphqlOperation } from "aws-amplify";
import { listUsers } from "../src/graphql/queries";

export default function ContactsScreen() {
  const [users, setUsers] = useState([]);

  //Get all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await API.graphql(graphqlOperation(listUsers));
        setUsers(usersData.data.listUsers.items);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
        style={{ width: "100%" }}
      />
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
