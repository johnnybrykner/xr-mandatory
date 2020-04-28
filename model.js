import React from "react";
import { asset, Animated, VrButton, AppRegistry } from "react-360";
import Entity from "Entity";
import AmbientLight from "AmbientLight";
import PointLight from "PointLight";

const AnimatedEntity = Animated.createAnimatedComponent(Entity);

export default class model extends React.Component {
  rotation = new Animated.Value(0);

  componentDidMount() {
    Animated.timing(this.rotation, { toValue: 360, duration: 20000 }).start();
  }

  render() {
    return (
      <VrButton onClick={(event) => console.log(event.nativeEvent)}>
        <AmbientLight intensity={1.0} color={"#ffffff"} />
        <PointLight
          intensity={1.0}
          style={{ transform: [{ translate: [-3, -3, -5] }] }}
        />
        <AnimatedEntity
          style={{ transform: [{ rotateY: this.rotation }, { scale: 0.5 }] }}
          source={{ obj: asset("Astronaut.obj"), mtl: asset("Astronaut.mtl") }}
        />
      </VrButton>
    );
  }
}

AppRegistry.registerComponent("model", () => model);
