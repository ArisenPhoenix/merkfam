let randomNumber = function() {
  var num1 = Math.floor(Math.random() * 6 + 1)
  var num2 = Math.floor(Math.random() * 6 + 1)
  return [num1, num2]
}

const message = document.querySelector(".message");

const changeTextSize = function() {
  if ((message.textContent === "Draw!") && (window.innerWidth <= 767.8)) {
    message.style.padding = "80px 0 0 0"
  } else if ((window.innerWidth <= 767.8) & (message.style.padding !== "40px 0 0 0 0")) {
    message.style.padding = "40px 0 0 0"
  } else if ((window.innerWidth > 767.8) & (message.style.padding !== "80px 0 0 0 0")) {
    message.style.padding = "80px 0 0 0"
  }
};

const rollDice = function() {
  const [num1, num2] = randomNumber()

  document.querySelector(".img1").src = `../../Dicee/dicee-images/dice${num1}.png`
  document.querySelector(".img2").src = `../../Dicee/dicee-images/dice${num2}.png`

  if (num1 === num2) {
    message.textContent = "Draw!"
    message.style.padding = "80px 0 0 0"
    changeTextSize()
  } else if (num1 > num2) {
    message.textContent = "Player 1 Wins!"
    changeTextSize()
  } else if (num2 > num1) {
    message.textContent = "Player 2 Wins!"
    changeTextSize()
  }
}
window.addEventListener("resize", changeTextSize);
document.querySelector(".button").addEventListener("click", rollDice);
