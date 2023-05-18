import { gameItems } from "../../Components/NavItems";
import css from "../classes.module.css"
import { NextButton } from "../../Merkurial/Components/UI/Buttons/Button";
import { GAME_CONTEXT_PROVIDER } from "../../store/Games_Context";
import { DE_KEBABIFY, SuperTitleFy } from "../../Merkurial/Helpers/Text/text";
import { Fragment } from "react";
import { useClass } from "../../Merkurial/hooks/usehooks";
import animation from "../../Merkurial/CSS/Animations/pop.module.css"

const Games = (props) => {
  const classes = useClass([css.buttonDiv])
  const buttonClasses = useClass([css.button, animation.pop])

  return (
    <GAME_CONTEXT_PROVIDER>
      <div className={css.buttonsDiv}>
        {gameItems.map((game, index) => {
          return (
              <Fragment key={`${index}|${game.text}`}>
                <NextButton
                  text={SuperTitleFy(DE_KEBABIFY(game.text, "-"))}
                  className={classes}
                  buttonClass={buttonClasses} 
                  href={`/games/${game.text}`}
                />
              </Fragment>
          );
        })}
      </div>
    </GAME_CONTEXT_PROVIDER> 
  ); 
};

export default Games;
