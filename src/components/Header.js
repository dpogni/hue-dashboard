import React from "react";

const Header = props => {
  return (
    <header className="App-header">
      <h1 className="App-header__headline">My Home</h1>
      <p>{props.lights.length} devices connected</p>
    </header>
  );
};

export default Header;
