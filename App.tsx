import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Grid from "./components/Grid";
import { useState } from "react";

import OpponentSelector from "./components/OpponentSelector";

export default function App() {
  const [playerType, setPlayerType] = useState(null);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setPlayerType(null)}>
        <Image source={require("./assets/Title.png")} style={styles.image} />
      </TouchableWithoutFeedback>

      {playerType ? (
        <Grid playerType={playerType} />
      ) : (
        <OpponentSelector setPlayerType={setPlayerType} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffb4797a",
  },
  image: {
    width: "90%",
    resizeMode: "contain",
    marginBottom: -150,
  },
});
