import React, { useEffect, useReducer } from "react";
import Paddle from "./components/Paddle";
import Ball from "./components/Ball.js";
import "./styles.css";

const initialState = {
  paddle1: {
    y: 0
  },
  paddle2: {
    y: 0
  },
  ball: {
    x: 200,
    y: 150,
    dx: 5,
    dy: 5
  }
};

function reducer(state, action) {
  switch (action.type) {
    case "MOVE_PADDLE_1":
      return { ...state, paddle1: action.payload };
    case "MOVE_PADDLE_2":
      return { ...state, paddle2: action.payload };
    case "MOVE_BALL":
      return { ...state, ball: action.payload };
    default:
      throw new Error("did not match event");
  }
}

export default function App() {
  // const [playerOnePosition, setPlayerOnePosition] = useState(10);
  // const [playerTwoPosition, setPlayerTwoPosition] = useState(10);
  const [state, dispatch] = useReducer(reducer, initialState);

  const container = {
    width: "400",
    height: "300"
  };
  const containerH = parseInt(container.height, 10);
  const containerW = parseInt(container.width, 10);
  const ball = {
    diameter: 20
  };

  function handleKeyPress(res) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event

    switch (res.code) {
      case "KeyW":
        // code block
        dispatch({
          type: "MOVE_PADDLE_1",
          payload: {
            y: state.paddle1.y + 10
          }
        });
        break;
      case "KeyS":
        // code block
        dispatch({
          type: "MOVE_PADDLE_1",
          payload: {
            y: state.paddle1.y - 10
          }
        });
        break;
      case "KeyO":
        // code block
        dispatch({
          type: "MOVE_PADDLE_2",
          payload: {
            y: state.paddle2.y + 10
          }
        });
        break;
      case "KeyL":
        // code block
        dispatch({
          type: "MOVE_PADDLE_2",
          payload: {
            y: state.paddle2.y - 10
          }
        });
        break;
      default:
        throw new Error("key press caused issues");
    }
  }

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [state]);

  useEffect(() => {
    const bounceHandle = setTimeout(() => {
      let dx = state.ball.dx;
      let dy = state.ball.dy;
      let x = state.ball.x;
      let y = state.ball.y;
      let p1y = state.paddle1.y;
      let p2y = state.paddle2.y;

      // console.log(`p1y = ${p1y}, y = ${y}, dy = ${dy}, x = ${x}`);

      if (x + dx > 400 - 20 || x + dx < 0) {
        dx = -dx;
      }
      if (y + dy > 300 - 20 || y + dy < 0) {
        dy = -dy;
      }

      if (
        p1y < y + dy &&
        p1y + 100 > y + dy &&
        x === 40
        // ||
        // (p2y < y + dy && p2y + 100 > y + dy && x > containerW - 60)
      ) {
        console.log("true");
        dx = -dx;
      }
      // console.log(dx)
      dispatch({
        type: "MOVE_BALL",
        payload: {
          dx,
          dy,
          x: state.ball.x + dx,
          y: state.ball.y + dy
        }
      });
    }, 50);
    return () => clearTimeout(bounceHandle);
  }, [state.ball]);

  return (
    <div
      className="container"
      style={{
        width: `${container.width}px`,
        height: `${container.height}px`
      }}
    >
      <Paddle positionY={state.paddle1.y} />
      <Paddle positionY={state.paddle2.y} isPlayerTwo />
      <Ball pos={state.ball} />
    </div>
  );
}
