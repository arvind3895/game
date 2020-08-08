import React, { useEffect } from "react";
import "./Tile.css";

Tile.propTypes = {};

function Tile(props) {
  return (
    <div
      className={props.goal ? "success tile" : "tile"}
      style={{
        top: props?.position?.top ? props.position.top + "px" : "0",
        left: props?.position?.left ? props.position.left + "%" : "0",
      }}
    >
      {props.image ? <img src={props.image} /> : ""}
      {props.name}
    </div>
  );
}
export default Tile;
