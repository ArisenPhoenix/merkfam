// Drum Button click Code
let previousDrum = "rest"
const originalColor = "rgb(218, 4, 99)"
let counter = 0
let rest = "rest"
const path = "public/Drumkit/drumkit-images"
function hitDrum(drum, previousDrum) {
  counter++
  makeSound(drum)
  if (drum === " ") {
    drum = "rest"
  }
  currentDrum = document.querySelector(`.${drum}`)
  counter ++
    if (currentDrum === null){
      drum = "rest"
      currentDrum = document.querySelector(`.${drum}`)
    }
    if (currentDrum.style.color !== "grey") {
      currentDrum.style.color = "grey";
      currentDrum.classList.add("pressed")
      console.log(`Current Drum: ${currentDrum}`)

      if ((`.${previousDrum}` !== `.${drum}`) && (counter > 1)) {
        console.log(`Previous Drum: ${previousDrum}`)
        document.querySelector(`.${previousDrum}`).style.color = originalColor;
      }
    } else if (currentDrum.style.color === "grey") {
      currentDrum.style.color = originalColor;
      currentDrum.classList.toggle("pressed")
        if ((`.${previousDrum}` !== `.${drum}`) & (counter > 1)) {
          if (previousDrum === null){previousDrum = "rest"};
            document.querySelector(`.${previousDrum}`).style.color = originalColor;
        }

        else{
          document.querySelector(`.${previousDrum}`).style.color = originalColor;
        }
    } else {
      console.log("Conditionals aren't valid")
    }
}

const makeSound = function(drum) {
  console.log(drum)
  switch (drum) {
    case "w":
      var audio = new Audio('../../Drumkit/sounds/kick-bass.mp3');
      audio.play();
      previousDrum = "w"
      break;
    case "a":
      var audio = new Audio('../../Drumkit/sounds/crash.mp3');
      audio.play();
      previousDrum = "a"
      break
    case "s":
      var audio = new Audio('../../Drumkit/sounds/snare.mp3');
      audio.play();
      previousDrum = "s"
      break
    case "d":
      var audio = new Audio('../../Drumkit/sounds/tom-4.mp3');
      audio.play();
      previousDrum = "d"
      break
    case "j":
      var audio = new Audio('../../Drumkit/sounds/tom-3.mp3');
      audio.play();
      previousDrum = "j"
      break
    case "k":
      var audio = new Audio('../../Drumkit/sounds/tom-2.mp3');
      audio.play();
      previousDrum = "k"
      break
    case "l":
      var audio = new Audio('../../Drumkit/sounds/tom-1.mp3');
      audio.play();
      previousDrum = "l"
      break
    default:
      console.log("hit")
  }
};

const numberOfDrums = document.querySelectorAll(".drum").length

for (i = 0; i < numberOfDrums; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function() {
    var drum = this.innerHTML
    hitDrum(drum, previousDrum)
  })
};

document.addEventListener("keydown", function(event) {
  var drum = event.key
  if (drum == "rest" | "w" | "a" | "s" | "d" | "j" | "k" | "l"){
    drum = drum
  }
  hitDrum(drum, previousDrum)
});
