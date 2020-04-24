import React from "react";
import { StyleSheet, VrButton, Text, View } from "react-360";

export default class home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <VrButton
          onClick={() => this.props.history.push("./second")}
          style={styles.button}
        >
          <Text style={styles.greeting}>To second</Text>
        </VrButton>

        <VrButton
          onClick={() => this.props.history.push("./first")}
          style={styles.button}
        >
          <Text style={styles.greeting}>To first</Text>
        </VrButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  button: {
    width: 200,
    height: 100,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    color: "rgb(255, 255, 255)",
  },
});
