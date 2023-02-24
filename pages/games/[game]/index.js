import Dicee from "../../../Components/Dicee/Dicee";
import { useRouter } from "next/router";
import { useContext } from "react";
import GAME_CONTEXT from "../../../store/Games_Context";
import SimonSays from "../../../Components/SimonSays/SimonSays";

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

    default:
      const lastGame = gameCtx.getLastGameState();
      console.log("LAST GAME: ", lastGame);
    //   if (lastGame) {
    //     router.push(lastGame);
    //   } else {
    //     router.push("/games");
    //   }
  }
};

export default Game;
