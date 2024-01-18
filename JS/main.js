const gameboardEl = document.querySelector(".gameboard");
const newGameButton = document.querySelector("#new-game");

const cells = document.querySelectorAll(".box");
for (let i = 0; i < cells.length; i++) {
  cells[i].innerText = cells[i].getAttribute("data-grid-box-index");
}

newGameButton.addEventListener("click", function () {
  generateLevelSelector(gameboardEl);
  setLevelButton();

  this.classList.add("disabled");

  const runButton = document.querySelector('[role="run"]');
  runButton.addEventListener("click", function () {
    let level = getLevel();
    console.log(level);
    let gridDim;
    if (level == "hard") gridDim = 7;
    if (level == "normal") gridDim = 9;
    if (level == "easy") gridDim = 10;

    newGameButton.classList.remove("disabled");
    generateBoxGrid(gridDim, gridDim, gameboardEl, "box");
  });
});
