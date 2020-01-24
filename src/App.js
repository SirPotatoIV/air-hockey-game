import React, { useEffect, useState } from "react";
import Paddle from "./components/Paddle";
import Ball from "./components/Ball.js";
import "./styles.css";

export default function App() {
  const [playerOnePosition, setPlayerOnePosition] = useState(10);
  const [playerTwoPosition, setPlayerTwoPosition] = useState(10);

  const container = {
    width: "400",
    height: "300"
  };

  function handleKeyPress(res) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event
    console.log(res.code);
    switch (res.code) {
      case "KeyW":
        // code block
        setPlayerOnePosition(playerOnePosition + 10);
        break;
      case "KeyS":
        // code block
        setPlayerOnePosition(playerOnePosition - 10);
        break;
      case "KeyO":
        // code block
        console.log("o case occurred");
        setPlayerTwoPosition(playerTwoPosition + 10);
        break;
      case "KeyL":
        // code block
        setPlayerTwoPosition(playerTwoPosition - 10);
        break;
      default:
        setPlayerOnePosition(0);
        setPlayerTwoPosition(0);
    }
  }

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [playerOnePosition, playerTwoPosition]);

  return (
    <div
      className="container"
      style={{
        width: `${container.width}px`,
        height: `${container.height}px`
      }}
    >
      <Paddle positionY={playerOnePosition} />
      <Paddle positionY={playerTwoPosition} isPlayerTwo />
      <Ball containerH={container.height} containerW={container.width} />
    </div>
  );
}
