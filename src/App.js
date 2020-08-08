import React, { useReducer, useEffect } from "react";
import Header from "./CommonComponents/Header/Header";
import PlayBoard from "./feature/components/PlayBoard/PlayBoard";
import Tile from "./feature/components/Tile/Tile";
import Button from "./CommonComponents/Button/Button";
import "./App.css";
import player from "./assets/black-dragon.png";
import goal from "./assets/white-dragon.png";

const initialState = {
  playerPosition: {
    top: 0,
    left: 0,
  },
  points: 0,
  goalPosition: {
    top: Math.floor(Math.random() * 4) * 100,
    left: Math.floor(Math.random() * 6) * 14.25,
  },
  history: [],
};
const insertToHistory = (state) => {
  if (state && Array.isArray(state.history)) {
    let newHistory = [];
    if (state.history.length < 5) {
      newHistory = [...state.history];
      const stateCopy = { ...state };
      delete stateCopy.history;
      newHistory.push(stateCopy);
    } else {
      newHistory = [...state.history.slice(1, 5)];
      const stateCopy = { ...state };
      delete stateCopy.history;
      newHistory.push(stateCopy);
    }
    return newHistory;
  }
  console.warn(
    "WARNING! The state was attempting capture but something went wrong. Please check if the state is controlled correctly."
  );
  return state.history || [];
};
function reducer(state, action) {
  let top = state.playerPosition.top;
  let left = state.playerPosition.left;
  switch (action.type) {
    case "Up":
      top = state.playerPosition.top;
      if (top) {
        top = state.playerPosition.top - 100;
      }
      return {
        ...state,
        playerPosition: { ...state.playerPosition, top: top },
        history: insertToHistory(state),
      };
    case "Down":
      top = state.playerPosition.top;
      if (top < 300) {
        top = state.playerPosition.top + 100;
      }
      return {
        ...state,
        playerPosition: { ...state.playerPosition, top: top },
        history: insertToHistory(state),
      };
    case "Left":
      left = state.playerPosition.left;
      if (left) {
        left = state.playerPosition.left - 14.25;
      }
      return {
        ...state,
        playerPosition: { ...state.playerPosition, left: left },
        history: insertToHistory(state),
      };
    case "Right":
      left = state.playerPosition.left;
      if (left < 75) {
        left = state.playerPosition.left + 14.25;
      }
      return {
        ...state,
        playerPosition: { ...state.playerPosition, left: left },
        history: insertToHistory(state),
      };
    case "Goal Reached":
      return {
        ...state,
        goalPosition: {
          top: Math.floor(Math.random() * 4) * 100,
          left: Math.floor(Math.random() * 6) * 14.25,
        },
        points: state.points + 1,
      };
    case "undo": {
      const isEmpty = !state.history.length;
      if (isEmpty) return state;
      return {
        ...state.history[state.history.length - 1],
        history: state.history.slice(0, state.history.length - 1),
      };
    }
    case "Reset":
      return { ...initialState, history: state.history };
    default:
      throw new Error();
  }
}

function App() {
  function initialStateFromLocalStorage() {
    let localState = localStorage.getItem("ApplicationState");
    return localState ? JSON.parse(localState) : initialState;
  }
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    initialStateFromLocalStorage
  );

  document.onkeydown = function (e) {
    e.preventDefault();
    switch (e.key) {
      case "ArrowUp":
        dispatch({ type: "Up" });
        break;
      case "ArrowDown":
        dispatch({ type: "Down" });
        break;
      case "ArrowLeft":
        dispatch({ type: "Left" });
        break;
      case "ArrowRight":
        dispatch({ type: "Right" });
        break;
      default:
    }
  };

  useEffect(() => {
    checkGoalReached(state);
  }, [state]);

  function checkGoalReached(state) {
    if (
      state.playerPosition.top === state.goalPosition.top &&
      state.playerPosition.left === state.goalPosition.left
    ) {
      dispatch({ type: "Goal Reached" });
    } else {
      localStorage.setItem("ApplicationState", JSON.stringify(state));
    }
  }

  return (
    <>
      <Header points={state.points} dispatch={dispatch}></Header>
      <PlayBoard>
        <Tile goal name="Goal" image={goal} position={state.goalPosition} />
        <Tile name="Player" image={player} position={state.playerPosition} />
      </PlayBoard>
      <div className="d-flex undo-wrap">
        <Button
          name="Undo"
          onClick={() => dispatch({ type: "undo" })}
          disabled={state.history.length === 0}
          type="secondary"
        />
      </div>
    </>
  );
}

export default App;
