import React from "react";
import { View, AppRegistry } from "react-360";
import { MemoryRouter as Router, Route } from "react-router";
import Scenario from "./scenario";
import Home from "./home";

export default class xr_mandatory extends React.Component {
  state = {
    scenes: [
      {
        name: "Venice",
        image: "venice.jpg",
      },
      {
        name: "Desert",
        image: "something.jpg",
      },
    ],
  };

  _findByName(name) {
    return this.state.scenes.find((scene) => scene.name === name);
  }

  render() {
    return (
      <Router>
        <View>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route
            path="/scene/:name"
            render={(props) => (
              <Scenario
                {...props}
                getSceneByName={(name) => this._findByName(name)}
              />
            )}
          />
        </View>
      </Router>
    );
  }
}

AppRegistry.registerComponent("xr_mandatory", () => xr_mandatory);
