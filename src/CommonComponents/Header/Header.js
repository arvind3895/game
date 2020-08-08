import React from "react";
import "./Header.css";
import logo from "../../assets/logo.gif";
function Header({ dispatch, points }) {
  return (
    <header id="header" className="header">
      <div className="row">
        <div className="col-2 logo-wrapper">
          <img src={logo} />
        </div>
        <div className="col-4 app-header-title">Soul Mate</div>
        <div className="col-6 d-flex right-align">
          <div className="points-wrapper">
            level {Math.floor(points / 5)}
            <br />
            points {points}
          </div>
          <div style={{ textAlign: "right" }}>
            <button onClick={() => dispatch({ type: "Reset" })}>
              Start new Game
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
