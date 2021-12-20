import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    marginRight: 10,
    flex: 1,
    alignItems: "center",
  },
  micButton: {
    backgroundColor: Colors.light.tint,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 8,
  },
});

export default styles;
