const main = document.querySelector("main");
const game = document.getElementById("game");
const gameScore = document.querySelector(".points");
const items = [...document.querySelectorAll(".game-container .game-item")];
const housePick = document.querySelector(".house-pick");
const housePickItem = document.querySelector(".house-pick-item");
const housePickImg = document.querySelector(".house-pick-img");
const sideTitle = [...document.querySelectorAll(".side-title")];
const gameResult = document.querySelector(".game-result");
const playAgain = document.getElementById("playAgain");

let spock = false;
let figures = ["rock", "paper", "scissors"];
let score = 12;
let cPlayerPick = "";
let cHousePick = "";
let winner = null;

const getFigures = () => {
  if (spock) {
    figures = ["rock", "paper", "scissors", "lizard", "spock"];
  } else {
    figures = ["rock", "paper", "scissors"];
  }
};

const checkWinner = (a, b) => {
  if (a === b) {
    winner = null;
  } else if (
    (a === "rock" && (b === "scissors" || b === "lizard")) ||
    (a === "paper" && (b === "rock" || b === "spock")) ||
    (a === "scissors" && (b === "paper" || b === "lizard")) ||
    (a === "lizard" && (b === "paper" || b === "spock")) ||
    (a === "spock" && (b === "scissors" || b === "rock"))
  ) {
    winner = true;
    score++;
  } else {
    winner = false;
    if (score > 0) {
      score--;
    }
  }
};

let nIntervId;

const changeFigure = () => {
  nIntervId = setInterval(randomFigure, 100);
};

const randomFigure = () => {
  let random = Math.floor(Math.random() * figures.length);
  housePickItem.id = figures[random];
  housePickImg.setAttribute("src", `./images/icon-${housePickItem.id}.svg`);
  housePickImg.setAttribute("alt", housePickItem.id);
  cHousePick = housePickItem.id;
};

const stopRandomFigure = () => {
  clearInterval(nIntervId);
};

items.forEach((item) => {
  item.addEventListener("click", () => {
    cPlayerPick = item.id;

    game.classList.add("active");
    items.forEach((el) => {
      if (el !== item) {
        el.classList.add("hidden");
      }
    });
    item.classList.add("active");

    setTimeout(() => {
      housePick.classList.add("active");
    }, 250);

    setTimeout(() => {
      sideTitle.forEach((el) => {
        el.classList.add("active");
      });
    }, 400);

    setTimeout(() => {
      changeFigure();
    }, 800);

    setTimeout(() => {
      stopRandomFigure();
      checkWinner(cPlayerPick, cHousePick);
    }, 2800);

    setTimeout(() => {
      if (winner === null) {
        gameResult.firstElementChild.innerHTML = "draw";
      } else if (winner) {
        gameResult.firstElementChild.innerHTML = "you win";
        item.classList.add("win");
      } else {
        gameResult.firstElementChild.innerHTML = "you lose";
        housePickItem.classList.add("win");
      }
      gameScore.innerHTML = score;
      gameResult.classList.add("active");
    }, 3000);
  });
});

const clearGame = () => {
  game.classList.remove("active");
  items.forEach((el) => {
    el.classList.remove("hidden", "active", "win");
  });
  housePick.classList.remove("active");
  sideTitle.forEach((el) => {
    el.classList.remove("active");
  });
  housePickItem.id = "empty";
  housePickItem.classList.remove("win");
  housePickImg.setAttribute("src", "");
  housePickImg.setAttribute("alt", "");
  gameResult.classList.remove("active");
};

playAgain.addEventListener("click", () => {
  clearGame();
});

const rulesBtn = document.getElementById("rulesBtn");
const rules = document.querySelector(".rules");
const newGameBtn = document.getElementById("newGameBtn");
const newGame = document.querySelector(".new-game");
const newRPS = document.getElementById("newRPS");
const newRPSLS = document.getElementById("newRPSLS");

rulesBtn.addEventListener("click", () => {
  main.classList.add("active");
  rules.classList.add("active");
});

newGameBtn.addEventListener("click", () => {
  main.classList.add("active");
  newGame.classList.add("active");
});

// newGameBtn.addEventListener("click", (e) => {
//   clearGame();
//   main.classList.toggle("spock");
//   score = 0;
//   gameScore.innerHTML = score;
//   spock = !spock;
//   getFigures();
// });

newRPS.addEventListener("click", () => {
  clearGame();
  main.classList.remove("spock", "active");
  newGame.classList.remove("active");
  score = 0;
  gameScore.innerHTML = score;
  spock = false;
  getFigures();
});

newRPSLS.addEventListener("click", () => {
  clearGame();
  main.classList.remove("active");
  newGame.classList.remove("active");
  main.classList.add("spock");
  score = 0;
  gameScore.innerHTML = score;
  spock = true;
  getFigures();
});

addEventListener("click", (e) => {
  if (e.target.id === "closeBtn" || e.target === main) {
    main.classList.remove("active");
    rules.classList.remove("active");
    newGame.classList.remove("active");
  }
});
