import css from "./Dicee.module.css";
import { useState, useContext } from "react";
import Image from "next/image";
import GAME_CONTEXT from "../../../store/Games_Context";
import HEADING from "../../../Merkurial/Components/UI/SectionHeaders/Headers/HEADING";
import Images from "./DiceeImages";

const Dicee = (props) => {
  const gameCtx = useContext(GAME_CONTEXT);
  const [message, setMessage] = useState(null);
  const [images, _] = useState(Images);
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(1);
  const [p1Num, setP1Num] = useState(0);
  const [p2Num, setP2Num] = useState(1);

  let gameState = gameCtx.DiceeState(p1Score, p2Score, playerTurn);

  const randomNumbers = () => {
    var num1 = Math.floor(Math.random() * 6);
    var num2 = Math.floor(Math.random() * 6);
    return [num1, num2];
  };

  const rollDice = function () {
    const [num1, num2] = randomNumbers();
    setP1Num(num1);
    setP2Num(num2);
    if (num1 === num2) {
      setMessage("Draw!");
    } else if (num1 > num2) {
      setMessage("Player 1 Wins!");
      setPlayerTurn(1);
      setP1Score((prev) => {
        return (prev += 1);
      });
    } else if (num2 > num1) {
      setMessage("Player 2 Wins!");
      setPlayerTurn(2);
      setP2Score((prev) => {
        return (prev += 1);
      });
    }
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.messageContainer}>
          <h1 className="message vertical-center">Roll Me</h1>
          {message && <HEADING text={message} />}
        </div>

        <div className={css.di}>
          <div className={css.dice}>
            <p>Player 1</p>
            <Image
              className={`${css.img1} ${css.diceeImages}`}
              src={images[p1Num]}
              alt={`Dice Num: ${p1Num}`}
              priority
            />
          </div>

          <div className="dice">
            <p>Player 2</p>
            <Image
              className={`${css.img2} ${css.diceeImages}`}
              src={images[p2Num]}
              alt={`Dice Num: ${p2Num}`}
              priority
            />
          </div>
        </div>

        <button className={css.button} onClick={rollDice}>
          Roll
        </button>

        <div className={css.di}>
          <div className={css.dice}>
            <p>Player 1 Score</p>
            <h3>{p1Score}</h3>
          </div>

          <div className={css.dice}>
            <p>Player 2 Score</p>
            <h3>{p2Score}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dicee;
