import React from "react";
import {
  asset,
  StyleSheet,
  Text,
  View,
  VrButton,
  Environment,
} from "react-360";

export default class scenario extends React.Component {
  constructor(props) {
    super(props);
  }

  _setBackground() {
    Environment.setBackgroundImage(asset(`${this.props.image}.jpg`), {
      format: "2D",
    });
  }

  render() {
    return (
      <View style={styles.panel}>
        <VrButton onClick={() => this._setBackground()} style={styles.button}>
          <Text style={styles.greeting}>{this.props.nth}</Text>
        </VrButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    width: 800,
    height: 400,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "rgb(0, 0, 255)",
    padding: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    fontSize: 30,
    color: "rgb(255, 0, 0)",
  },
});
