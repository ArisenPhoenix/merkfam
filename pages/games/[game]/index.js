import Dicee from "../../../Components/Games/Dicee/Dicee";
import { useRouter } from "next/router";
import { useContext } from "react";
import GAME_CONTEXT from "../../../store/Games_Context";
import SimonSays from "../../../Components/Games/SimonSays/SimonSays";

const Game = (props) => {
  const gameCtx = useContext(GAME_CONTEXT);
  const router = useRouter();
  const game = router.query.game;
  //   console.log("ROUTER: ", router);

  switch (game) {
    case "dicee":
      return <Dicee game={router.asPath} />;
    case "simon-says":
      return <SimonSays />;
    // case "drum-kit":
    //   return <DrumKit />
    default:
      const lastGame = gameCtx.getLastGameState();
      
  }
};

export default Game;
