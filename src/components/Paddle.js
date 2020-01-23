import React from "react";
import "./Paddle.css";

export default function Paddle({ isPlayerTwo, positionY }) {
  console.log(positionY);
  return (
    <div
      className={isPlayerTwo ? "paddle playerTwo" : "paddle playerOne"}
      style={{
        transform: `translateY(calc(-50% - ${positionY}px))`
      }}
    />
  );
}
