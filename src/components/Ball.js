import React, { useEffect, useState } from "react";
import "./Ball.css";

export default function Ball({ containerH, containerW }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState({ x: 5, y: 5 });

  containerH = parseInt(containerH, 10);
  containerW = parseInt(containerW, 10);

  const ball = {
    diameter: 20
  };

  useEffect(() => {
    const bounceHandle = setTimeout(() => {
      let dx = delta.x;
      let dy = delta.y;

      if (pos.x + delta.x > containerW - ball.diameter || pos.x + delta.x < 0) {
        dx = -dx;
      }
      if (pos.y + delta.y > containerH - ball.diameter || pos.y + delta.y < 0) {
        dy = -dy;
      }
      setDelta({ x: dx, y: dy });
      setPos({ x: pos.x + delta.x, y: pos.y + delta.y });
    }, 50);
    return () => clearTimeout(bounceHandle);
  }, [pos, delta]);

  return (
    <div
      className="ball"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`
      }}
    />
  );
}
