import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
  },
  leftContainer: {
    flexDirection: "row",
  },
  contentContainer: {
    justifyContent: "space-between",
    marginVertical: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 30,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  status: {
    fontSize: 16,
    color: "grey",
    width: 100,
  },
});

export default styles;
