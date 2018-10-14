import React, { Component } from "react";
import Header from "./components/Header";
import "./App.scss";

import huejay from "huejay";

let client = new huejay.Client({
  host: "192.168.86.43",
  username: "-08ni6xZGvcsmlPeyYccG1rrWOBIeK7MgVni0odo"
});

class App extends Component {
  constructor() {
    super();
    this.state = { lights: [], sensors: [] };
  }

  handleLightClick = id => {
    client.lights
      .getById(id)
      .then(light => {
        light.on ? (light.on = false) : (light.on = true);
        return client.lights.save(light);
      })
      .then(light => {
        console.log(`Updated light [${light.id}]`);
        this.componentDidMount();
      })
      .catch(error => {
        console.log("Something went wrong");
        console.log(error.stack);
      });
  };

  handleSensorClick = id => {
    client.sensors
      .getById(id)
      .then(sensor => {
        console.log(sensor.config.on);

        sensor.config.on
          ? (sensor.config.on = false)
          : (sensor.config.on = true);
        return client.sensors.save(sensor);
      })
      .then(sensor => {
        console.log(`Updated sensor [${sensor.id}]`);
        this.componentDidMount();
      })
      .catch(error => {
        console.log("Something went wrong");
        console.log(error.stack);
      });
  };

  getAllLights = () => {
    client.lights
      .getAll()
      .then(lights => {
        this.setState({ lights });
      })
      .catch(error => {
        console.log(error.stack);
      });
  };

  getAllSensors = () => {
    client.sensors
      .getAll()
      .then(sensors => {
        this.setState({
          sensors: sensors.filter(
            sensor => sensor.attributes.attributes.type === "ZLLPresence"
          )
        });
      })
      .catch(error => {
        console.log(error.stack);
      });
  };

  componentDidMount = () => {
    this.getAllLights();
    this.getAllSensors();
  };

  render() {
    console.log(this.state);

    return (
      <div className="App">
        <Header lights={this.state.lights} />
        <h2 className="headline">Lights</h2>
        <div className="lights-grid">
          {this.state.lights.map(light => (
            <div
              className="App-link"
              key={light.attributes.attributes.id}
              onClick={e =>
                this.handleLightClick(light.attributes.attributes.id)
              }
            >
              <div>{light.attributes.attributes.name}</div>
              <div>{light.state.attributes.on ? "On" : "Off"}</div>
              {light.state.attributes.on && (
                <div>
                  {Math.floor((light.state.attributes.bri / 254) * 100) + "%"}
                </div>
              )}
            </div>
          ))}
        </div>
        <h2 class="headline">Sensors</h2>
        <div className="lights-grid">
          {this.state.sensors.map(sensor => (
            <div
              className="App-link"
              key={sensor.attributes.attributes.id}
              onClick={e =>
                this.handleSensorClick(sensor.attributes.attributes.id)
              }
            >
              <div>{sensor.attributes.attributes.name}</div>
              <div>{sensor.config.attributes.attributes.on ? "On" : "Off"}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
