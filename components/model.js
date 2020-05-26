import React from "react";
import { asset, Animated, AppRegistry } from "react-360";
import Entity from "Entity";

const AnimatedEntity = Animated.createAnimatedComponent(Entity);

export default class model extends React.Component {
  rotation = new Animated.Value(0);

  componentDidMount() {
    Animated.timing(this.rotation, {
      toValue: 46080,
      duration: 600000,
    }).start();
  }

  render() {
    return (
      <AnimatedEntity
        style={{ transform: [{ rotateY: this.rotation }, { scale: 10 }] }}
        source={{
          obj: asset(`${this.props.name}.obj`),
          mtl: asset(`${this.props.name}.mtl`),
        }}
      />
    );
  }
}

AppRegistry.registerComponent("model", () => model);
