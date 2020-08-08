import React from "react";
import PropTypes from "prop-types";
import "./PlayBoard.css";

const PlayBoard = (props) => {
  return (
    <div className="game-board">
      <div className="relative board">{props.children}</div>
    </div>
  );
};

PlayBoard.propTypes = {};

export default PlayBoard;
