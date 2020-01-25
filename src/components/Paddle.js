import React from "react";
import "./Paddle.css";

export default function Paddle({ isPlayerTwo, positionY }) {
  // console.log(pos);
  return (
    <div
      className={isPlayerTwo ? "paddle playerTwo" : "paddle playerOne"}
      style={{
        top: positionY
      }}
    />
  );
}
