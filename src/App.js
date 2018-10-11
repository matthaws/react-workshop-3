import React, { Component, Fragment } from "react";
import PropTypesDemo from "./components/propTypes/PropTypesDemo";
import FragmentDemo from "./components/fragments/fragments";
import HOCDemo from "./components/higherOrderComponents/HOCDemo";
import "./App.css";

class App extends Component {
  render() {
    return <HOCDemo />;
  }
}

export default App;
