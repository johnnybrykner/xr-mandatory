import React from "react";
import { StyleSheet, VrButton, Text, View } from "react-360";

export default class home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <VrButton
          onClick={() => this.props.history.push("./scene/Desert")}
          style={styles.button}
        >
          <Text style={styles.greeting}>To first scene</Text>
        </VrButton>

        <VrButton
          onClick={() => this.props.history.push("./scene/Venice")}
          style={styles.button}
        >
          <Text style={styles.greeting}>To second scene</Text>
        </VrButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    flexDirection: "row",
    width: "max-content",
    height: "max-content",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "red",
    width: 250,
    padding: 50,
    margin: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    color: "rgb(255, 255, 255)",
  },
});
