import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    right: 30,
  },
});

export default styles;
