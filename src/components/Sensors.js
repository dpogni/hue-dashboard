import React from "react";

const Sensors = () => {
  return (
    <>
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
    </>
  );
};

export default Sensors;
