import { useEffect } from "react";
import Sounds from "./SimonSaysSounds";

const useSound = (clicked, gameover) => {
  useEffect(() => {
    const [b, g, r, w, y] = Sounds.map((sound) => {
      return new Audio(sound);
    });
    const playSound = async (color) => {
      await color.play();
    };
    if (clicked.clicked) {
      switch (clicked.sound) {
        case "blue":
          playSound(b);
          break;
        case "red":
          playSound(r);
          break;
        case "green":
          playSound(g);
        case "yellow":
          playSound(y);

        default:
          break;
      }
    }

    if (gameover) {
      playSound(w);
    }
  }, [clicked, gameover]);
};

export default useSound;

export const produceSound = (color, gameover = false) => {
  const playSound = (sound) => {
    sound.play();
  };

  const [b, g, r, w, y] = Sounds.map((sound) => {
    return new Audio(sound);
  });

  if (gameover) {
    playSound(w);
  }

  //   if (clicked.clicked) {
  switch (color) {
    case "blue":
      playSound(b);
      break;
    case "red":
      playSound(r);
      break;
    case "green":
      playSound(g);
    case "yellow":
      playSound(y);
    default:
      break;
  }
};
