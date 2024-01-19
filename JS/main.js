const gameboardEl = document.querySelector(".gameboard");
const newGameButton = document.querySelector("#new-game");
const scoreEl = document.querySelector("#score");

const bombsQTY = 16;
let score = 0;
let level;
let bombsMax;
const bombs = [];

newGameButton.addEventListener("click", function () {
  generateLevelSelector(gameboardEl);
  setLevelButton();

  this.classList.add("disabled");
  gameboardEl.classList.remove("gameover");

  score = 0;
  scoreEl.innerText = 0;

  const runButton = document.querySelector('[role="run"]');
  runButton.addEventListener("click", function () {
    level = getLevel();
    console.log(level);
    let gridDim;
    if (level == "hard") gridDim = 7;
    if (level == "normal") gridDim = 9;
    if (level == "easy") gridDim = 10;

    bombs.splice(0, bombsQTY);

    for (let i = 0; i < bombsQTY; i++) {
      let newBomb;

      while (bombs.includes(newBomb) || !newBomb) {
        newBomb = getRandomNumber(gridDim * gridDim);
      }

      bombs.push(newBomb);
    }
    console.log(bombs);
    newGameButton.classList.remove("disabled");

    generateBoxGrid(gridDim, gridDim, gameboardEl, "box");
  });
});

newGameButton.click();
