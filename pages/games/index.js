import { gameItems } from "../../Components/GameItems";
import css from "./games.module.css";
import { NextButton } from "../../Merkurial/Components/UI/Buttons/Button";
import { Fragment } from "react";
import { GAME_CONTEXT_PROVIDER } from "../../store/Games_Context";
import HEADING from "../../Merkurial/Components/UI/SectionHeaders/Headers/HEADING";
import { DE_KEBABIFY, SuperTitleFy } from "../../Merkurial/Helpers/Text/text";

const Games = (props) => {
  return (
    <GAME_CONTEXT_PROVIDER>
      <HEADING text="Games" />
      {gameItems.map((game, index) => {
        return (
          <Fragment key={game}>
            <NextButton
              text={SuperTitleFy(DE_KEBABIFY(game, "-"))}
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
