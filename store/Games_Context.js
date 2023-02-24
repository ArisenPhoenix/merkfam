import { useContext, createContext, useState } from "react";
import {
  SAVE_TO_LOCAL_STORAGE,
  RETREIVE_FROM_LOCAL_STORAGE,
} from "../Merkurial/API_STORAGE/STORAGE/HANDLE_STORAGE";

const GAME_CONTEXT = createContext({
  saveLastGameState: () => {},
  getLastGameState: () => {},
  lastWinner: "",
  DiceeState: (p1Score, p2Score, lastWinner) => {},
});

class DiceeState {
  super(p1Score, p2Score, playerTurn) {
    this.p1Score = p1Score;
    this.p2Score = p2Score;
    this.playerTurn = playerTurn;
  }
}

export const GAME_CONTEXT_PROVIDER = (props) => {
  const [lastGameState, setLastGameState] = useState({});
  console.log("LAST GAME STATE: ", lastGameState);
  const saveLastGameState = (state) => {
    setLastGameState(state);
    const r = SAVE_TO_LOCAL_STORAGE(state, "mostRecentGame");
    print("Save Response", r);
  };

  const getLastGameState = () => {
    const r = RETREIVE_FROM_LOCAL_STORAGE("mostRecentGame");
    print("Get Response", r);
    setLastGameState(r);
  };

  const gameContextvalue = {
    saveLastGameState: saveLastGameState,
    getLastGameState: getLastGameState,
    lastGameState: lastGameState,
    DiceeState: DiceeState,
  };
  return (
    <GAME_CONTEXT.Provider value={gameContextvalue}>
      {props.children}
    </GAME_CONTEXT.Provider>
  );
};

export default GAME_CONTEXT;
