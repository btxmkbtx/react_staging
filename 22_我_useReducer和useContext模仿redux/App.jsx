import React, { Component } from "react";
import Color from "./component/Color";
import Buttons from "./component/Buttons";

export default class App extends Component {
  render() {
    return (
      <div>
        <Color>
          <Buttons />
        </Color>
      </div>
    );
  }
}
