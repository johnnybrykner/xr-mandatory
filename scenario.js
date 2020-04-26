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
  componentDidMount() {
    this.setState({
      scene: this.props.getSceneByName(this.props.match.params.name),
    });
  }

  _setBackground() {
    Environment.setBackgroundImage(asset(`${this.state.scene.image}`), {
      format: "2D",
    });
  }

  _whatToRender() {
    return this.state ? (
      <VrButton onClick={() => this._setBackground()} style={styles.button}>
        <Text style={styles.greeting}>
          {"Click here to see the " + this.state.scene.name + " scene"}
        </Text>
      </VrButton>
    ) : (
      <Text style={styles.greeting}>Loading...</Text>
    );
  }

  render() {
    return (
      <View style={styles.panel}>
        <VrButton
          onClick={() => this.props.history.goBack()}
          style={styles.button__back}
        >
          <Text style={styles.greeting}>Go back</Text>
        </VrButton>
        {this._whatToRender()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    width: "max-content",
    height: "max-content",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 100,
  },
  button: {
    backgroundColor: "rgb(0, 0, 255)",
    padding: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  button__back: {
    backgroundColor: "rgb(0, 255, 0)",
    width: "max-content",
    height: "max-content",
    marginBottom: 50,
    padding: 10,
  },
  greeting: {
    fontSize: 30,
    color: "rgb(255, 0, 0)",
  },
});
