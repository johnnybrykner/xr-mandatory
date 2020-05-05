import React from "react";
import { View, AppRegistry } from "react-360";
import { MemoryRouter as Router, Route } from "react-router";
import Scenario from "./views/scenario";
import ModelContainer from "./components/modelContainer";
import Home from "./views/home";

export default class xr_mandatory extends React.Component {
  state = {
    scenes: [
      {
        name: "City",
        image: "city.jpg",
        models: [
          {
            name: "astronaut",
            position: [1, 1, 1],
          },
          {
            name: "octopus",
            position: [-1, -1, -1],
          },
        ],
      },
      {
        name: "Sky",
        image: "sky.jpg",
        models: [],
      },
    ],
  };

  _getSceneByName(sceneName) {
    return this.state.scenes.find((scene) => scene.name === sceneName);
  }

  _getModelsByScene(sceneName) {
    const activeScene = this._getSceneByName(sceneName);
    return activeScene.models;
  }

  render() {
    return (
      <Router>
        <View>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route
            path="/scene/:name"
            render={(props) => (
              <View>
                <Scenario
                  {...props}
                  getSceneByName={(sceneName) =>
                    this._getSceneByName(sceneName)
                  }
                />
                <ModelContainer
                  {...props}
                  getModelsByScene={(sceneName) =>
                    this._getModelsByScene(sceneName)
                  }
                />
              </View>
            )}
          />
        </View>
      </Router>
    );
  }
}

AppRegistry.registerComponent("xr_mandatory", () => xr_mandatory);
