import css from "./SimonSays.module.css";
import HEADING from "../../../Merkurial/Components/UI/SectionHeaders/Headers/HEADING";
import {
  COLUMN,
  ROW,
} from "../../../Merkurial/Components/UI/BootStrap/BootStrapGridder";
import BootStrapContainer from "../../../Merkurial/Components/UI/BootStrap/BootStrapContainer";
import { useClass } from "../../../Merkurial/hooks/usehooks";
import { useEffect, useState } from "react";
import { produceSound } from "./useSound";
import $ from "jquery";

let timer;

const SimonSays = () => {
  const defaultMessage = "Press Play To Start";
  const [level, setLevel] = useState(0);
  const buttonColours = ["red", "blue", "green", "yellow"];
  const [gamePattern, setGamePattern] = useState([]);
  const [userClickedPattern, setUserClickedPattern] = useState([]);
  const [message, setMessage] = useState(defaultMessage);
  const [started, setStarted] = useState(false);
  const [isPlayersTurn, setIsPlayersTurn] = useState(false);
  const [playersMoves, setPlayersMoves] = useState(0);
  const [gameover, setGameOver] = useState(false);

  useEffect(() => {
    if (started) {
      if (
        userClickedPattern.length === gamePattern.length &&
        gamePattern.length !== 0
      ) {
        setIsPlayersTurn(false);
        setPlayersMoves(0);
      }

      if (started && userClickedPattern.length > 0) {
        checkAnswer(playersMoves - 1);
      }
    }
  }, [userClickedPattern, gamePattern, started]);

  useEffect(() => {
    if (gameover) {
      produceSound(null, gameover);
    }
  }, [gameover]);

  const resetGame = () => {
    setMessage(defaultMessage);
    setStarted(false);
    setGamePattern([]);
    setUserClickedPattern([]);
    setLevel(0);
    setPlayersMoves(0);
    setGameOver(false);
    setIsPlayersTurn(false);
    clearTimeout(timer);
  };

  const endGame = () => {
    setMessage(`You Lose! Points: ${level}`);
    setStarted(false);
    setGamePattern([]);
    setUserClickedPattern([]);
    setLevel(0);
    setIsPlayersTurn(false);
    setPlayersMoves(0);
    setGameOver(true);
    setTimeout(() => {
      setGameOver(false);
    }, 1000);
    clearTimeout(timer);
  };

  const startGame = () => {
    setStarted(true);
    nextSequence(true);
    setMessage(`Points: ${level}`);
  };

  const animateButton = (currentColor) => {
    $("#" + currentColor).addClass(css.pressed);
    $("#" + currentColor)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    produceSound(currentColor);
    setTimeout(function () {
      $("#" + currentColor).removeClass(css.pressed);
    }, 100);
  };

  const playersTurn = (color) => {
    produceSound(color);
    animateButton(color);
    setUserClickedPattern((prev) => {
      return [...prev, color];
    });
    setPlayersMoves((prev) => prev + 1);
  };

  const nextSequence = (playing) => {
    //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    if (playing) {
      setUserClickedPattern([]);
      const randomNumber = Math.floor(Math.random() * 4);
      const randomChosenColour = buttonColours[randomNumber];
      const gameChoices = [...gamePattern, randomChosenColour];
      setGamePattern(gameChoices);
      gameChoices.forEach((color, index) => {
        const num = index;
        timer = setTimeout(() => {
          //   console.log("PLAYING COMPUTER'S SOUND");
          animateButton(color);
          produceSound(color);
        }, 1000 * num);
      });

      setTimeout(() => {
        setIsPlayersTurn(true);
      }, 1000 * gameChoices.length);
    }
  };

  const checkCurrentAnswer = (userStepNum) => {
    if (gamePattern[userStepNum] === userClickedPattern[userStepNum]) {
      return true;
    } else {
      endGame();
      return false;
    }
  };

  const checkAllAnswers = () => {
    for (let i = 0; i < gamePattern.length; i++) {
      const userAnswer = userClickedPattern[i];
      const gameChoice = gamePattern[i];
      if (userAnswer != gameChoice) {
        console.log("YOU LOSE!");
        endGame();
        return false;
      }
    }

    setLevel((prev) => {
      console.log("YOU WIN, ON TO THE NEXT LEVEL!");
      return prev + 1;
    });
    setMessage(`Points: ${level + 1}`);

    //5. Call nextSequence() after a 1000 millisecond delay.
    setTimeout(function () {
      nextSequence(started);
    }, 1000);

    return true;
  };

  const checkAnswer = (currentLevel, gameChoices, userChoices) => {
    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (checkCurrentAnswer(currentLevel)) {
      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length) {
        checkAllAnswers();
      }
    }
  };

  return (
    <div className={css.main}>
      <HEADING className={`${css.levelTitle}`} text={message} />
      {!started && (
        <button
          className={`${css.playButton} btn-primary btn-light`}
          onClick={startGame}
        >
          Play
        </button>
      )}
      <div className={css.container}>
        <BootStrapContainer fluid={true}>
          <ROW className={css.littlePadding}>
            <COLUMN xs={6} sm={6}>
              <Button
                colorClass={css.green}
                color="green"
                onClick={playersTurn}
                disabled={!isPlayersTurn}
              />
              <Button
                colorClass={css.red}
                color="red"
                onClick={playersTurn}
                disabled={!isPlayersTurn}
              />
            </COLUMN>
            {/* </ROW>
          <ROW className={css.littlePadding}> */}
            <COLUMN xs={6} sm={6}>
              <Button
                colorClass={css.yellow}
                color="yellow"
                onClick={playersTurn}
                disabled={!isPlayersTurn}
              />
              <Button
                colorClass={css.blue}
                color="blue"
                onClick={playersTurn}
                disabled={!isPlayersTurn}
              />
            </COLUMN>
          </ROW>
        </BootStrapContainer>
        <button
          className={`${css.playButton} btn-primary btn-light`}
          onClick={resetGame}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default SimonSays;

const Button = (props) => {
  const classes = useClass([props.colorClass, css.btn]);
  const [currentClass, setCurrentClass] = useState(classes);
  const handleClick = (e) => {
    e.preventDefault();
    if (!props.disabled) {
      //   console.log(e);
      props.onClick(props.color);
      const newClass = `${classes} ${css.pressed}`;
      setCurrentClass(newClass);
      setTimeout(() => {
        setCurrentClass(classes);
      }, 100);
    }
  };
  return (
    <div
      type="button"
      className={currentClass}
      id={props.color}
      onClick={handleClick}
      disabled={props.disabled}
    />
  );
};
