import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.scss";

import huejay from "huejay";

let client = new huejay.Client({
  host: "192.168.86.43",
  username: "-08ni6xZGvcsmlPeyYccG1rrWOBIeK7MgVni0odo"
});

function handleClick() {
  client.lights
    .getById(9)
    .then(light => {
      light.on ? (light.on = false) : (light.on = true);

      return client.lights.save(light);
    })
    .then(light => {
      console.log(`Updated light [${light.id}]`);
    })
    .catch(error => {
      console.log("Something went wrong");
      console.log(error.stack);
    });
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button className="App-link" onClick={handleClick}>
            Office Light
          </button>
        </header>
      </div>
    );
  }
}

export default App;
