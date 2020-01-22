import React from "react";
import "./styles.css";
import Paddle from "./components/Paddle";

export default function App() {
  return (
    <div className="App">
      <Paddle className="paddle1" />
      <Paddle className="paddle2" />
    </div>
  );
}
