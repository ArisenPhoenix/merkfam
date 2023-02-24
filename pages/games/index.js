import { gameItems } from "../../Components/GameItems";
import css from "./games.module.css";
import { NextButton } from "../../Merkurial/Components/UI/Buttons/Button";
// import { useRouter } from "next/router";
import { Fragment } from "react";
import { GAME_CONTEXT_PROVIDER } from "../../store/Games_Context";

const Games = (props) => {
  //   const router = useRouter();
  //   console.log("IN GAMES..................................................");
  return (
    <GAME_CONTEXT_PROVIDER>
      <h1>Games</h1>
      {gameItems.map((game, index) => {
        console.log("GAME: ", game);
        return (
          <Fragment key={game}>
            <NextButton
              text={game}
              className={css.button}
              href={`/games/${game}`}
            />
            <br></br>
          </Fragment>
        );
      })}
    </GAME_CONTEXT_PROVIDER>
  );
};

export default Games;
