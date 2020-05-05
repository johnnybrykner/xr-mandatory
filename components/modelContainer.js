import React from "react";
import { View, AppRegistry, Text, StyleSheet } from "react-360";
import Model from "./model";

export default class model_container extends React.Component {
  componentDidMount() {
    if (this.props.match) {
      this.setState(
        {
          models: this.props.getModelsByScene(this.props.match.params.name),
        },
        (_) => this._renderModels()
      );
    }
  }

  _renderModels() {
    return this.state && this.state.models ? (
      this.state.models.map((model) => (
        <Model name={model.name} position={model.position} key={model.name} />
      ))
    ) : (
      <Text>Loading...</Text>
    );
  }

  render() {
    return <View style={styles.container}>{this._renderModels()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    padding: 100,
  },
});

AppRegistry.registerComponent("model_container", () => model_container);
