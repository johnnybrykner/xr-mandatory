import React from "react";
import { View, AppRegistry } from "react-360";

import { MemoryRouter as Router, Route } from "react-router";

import Scenario from "./scenario";

import Home from "./home";

function Second() {
  return <Scenario nth="second" image="something"></Scenario>;
}

function First() {
  return <Scenario nth="first" image="venice"></Scenario>;
}

export default class xr_mandatory extends React.Component {
  render() {
    return (
      <Router>
        <View>
          <Route exact path="/" component={Home} />
          <Route exact path="/first" component={First} />
          <Route exact path="/second" component={Second} />
        </View>
      </Router>
    );
  }
}

AppRegistry.registerComponent("xr_mandatory", () => xr_mandatory);
