import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default function OpponentSelector({ setPlayerType }) {
  return (
    <View style={styles.selectorContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setPlayerType("player")}
      >
        <Text style={styles.buttonText}>Friend</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonTwo}
        onPress={() => setPlayerType("computer")}
      >
        <Text style={styles.buttonText}>Computer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  selectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#c8c8f8",
  },
  buttonTwo: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#c4e6f1",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
