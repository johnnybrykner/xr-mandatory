import React from "react";
import { asset, Animated, VrButton } from "react-360";
import Entity from "Entity";
import AmbientLight from "AmbientLight";
import PointLight from "PointLight";

const AnimatedEntity = Animated.createAnimatedComponent(Entity);

export default class model extends React.Component {
  rotation = new Animated.Value(0);

  componentDidMount() {
    Animated.timing(this.rotation, { toValue: 720, duration: 20000 }).start();
  }

  render() {
    return (
      <VrButton onClick={(event) => console.log(event.nativeEvent)}>
        <AmbientLight intensity={1.0} color={"#ffffff"} />
        <PointLight
          intensity={1.0}
          // style={{ transform: [{ translate: this.props.position }] }}
        />
        <AnimatedEntity
          style={{ transform: [{ rotateY: this.rotation }, { scale: 10 }] }}
          source={{
            obj: asset(`${this.props.name}.obj`),
            mtl: asset(`${this.props.name}.mtl`),
          }}
        />
      </VrButton>
    );
  }
}
