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
  }
};

function reducer(state, action) {
  switch (action.type) {
    case "MOVE_PADDLE_1":
      return { ...state, paddle1: action.payload };
    case "MOVE_PADDLE_2":
      return { ...state, paddle2: action.payload };
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

  function handleKeyPress(res) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event
    // console.log(res.code);
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
      <Ball containerH={container.height} containerW={container.width} />
    </div>
  );
}
