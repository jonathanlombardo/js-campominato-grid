/**
 * Generates a random alphanumeric string
 *
 * @param {number} stringLenght string lenght (default 10)
 * @returns {string | false} returns alphanumeric string (false in error)
 */
function getAlphaNumString(stringLenght = 10) {
  stringLenght = parseInt(stringLenght);
  let string = "";

  if (isNaN(stringLenght) || stringLenght <= 0) {
    console.error("param must be a number bigger than zero");
    return false;
  }

  for (i = 0; i < stringLenght; i++) {
    string += `${Math.random().toString(36).slice(2, 3)}`;
  }

  return string;
}

/**
 * Generates a random number between min and max (included)
 *
 * @param {number} max maximum number (default 10)
 * @param {number} min minimum number (default 1)
 * @returns {number | false} returns a random number
 */
function getRandomNumber(max = 10, min = 1) {
  min = parseInt(min);
  max = parseInt(max);

  if (isNaN(min) || isNaN(max) || max < min) {
    console.error("params must be numbers and max must be equal or bigger than min");
    return false;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random letter
 *
 * @returns {string} returns a random letter from a to z
 */
function getRandomLetter() {
  return getRandomNumber(35, 10).toString(36);
}

/**
 * Check if number is Even
 *
 * @param {number} number number to check
 * @returns {boolean} returns true if number is even
 */
function isEven(number) {
  number = parseInt(number);

  if (isNaN(number)) {
    console.error("param must be a number");
    return NaN;
  }

  return number % 2 == 0;
}

/**
 * Check if number is Odd
 *
 * @param {number} number number to check
 * @returns {boolean} returns true if number is odd
 */
function isOdd(number) {
  number = parseInt(number);

  if (isNaN(number)) {
    console.error("param must be a number");
    return NaN;
  }

  return !(number % 2 == 0);
}

// # ---------------

/**
 *
 *
 * @param {number} rows number of grid rows
 * @param {number} colums number of columns
 * @param {Element} container container of grid
 * @param {string} boxClasses classes of single cell (space separated)
 * @param {string} boxText text in the box
 */
function generateBoxGrid(rows, colums, container, boxClasses = "", boxText = "") {
  const boxWidth = `calc(100% / ${colums})`;
  const gridDimension = rows * colums;
  container.innerHTML = "";
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.classList.remove("flex-column");

  for (let i = 0; i < gridDimension; i++) {
    const newCell = generateCell(boxText, boxClasses);
    newCell.setAttribute("data-grid-box-index", i + 1);
    newCell.style.width = boxWidth;
    newCell.style.aspectRatio = "1";

    container.append(newCell);
  }

  // const cells = document.querySelectorAll(".box");
  // for (let i = 0; i < cells.length; i++) {
  //   cells[i].innerText = cells[i].getAttribute("data-grid-box-index");
  // }
}

function generateCell(text = "", classes = "") {
  const cell = document.createElement("div");
  cell.className = classes;
  cell.innerText = text;

  cell.addEventListener("click", function () {
    cellClickHandler(this);
  });

  return cell;
}

function clearBoxGrid(container) {
  container.innerHTML = "";
  container.style.display = "";
  container.style.flexWrap = "";
  container.style.height = "";
}

function cellClickHandler(element) {
  if (element.classList.contains("clicked")) return;

  element.classList.add("clicked");
  // element.classList.add("off");

  let boxClicked = parseInt(element.getAttribute("data-grid-box-index"));

  if (bombs.includes(boxClicked)) {
    gameOver();
    return;
  } else {
    score++;
  }

  scoreEl.innerText = score;
}

function generateLevelSelector(element) {
  element.classList.add("flex-column");

  element.innerHTML = `
  <h3>Seleziona la difficoltà:</h3>
  <div class="btn-wrapper mb-3">
    <button id="easy" role="level" class="btn btn-outline-primary mb-3">Easy Peasy</button>
    <button id="normal" role="level" class="btn btn-outline-primary mb-3">Harder</button>
    <button id="hard" role="level" class="btn btn-outline-primary mb-3">Master of Cerimonies</button>
  </div>
  <div class="btn-wrapper">
    <button class="btn btn-primary" role="run">Gioca</button>
  </div>
  `;
}

function setLevelButton() {
  const levels = document.querySelectorAll('[role="level"]');

  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];

    level.addEventListener("click", function () {
      for (let i = 0; i < levels.length; i++) {
        levels[i].classList.remove("clicked");
      }
      this.classList.add("clicked");
    });
  }
}

function getLevel() {
  const levels = document.querySelectorAll('[role="level"]');
  let levelValue;

  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    if (level.classList.contains("clicked")) {
      levelValue = level.id;
    }
  }

  return levelValue;
}

function gameOver() {
  const cells = document.querySelectorAll(".box");

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const cellIndex = parseInt(cell.getAttribute("data-grid-box-index"));
    if (bombs.includes(cellIndex)) {
      cell.classList.add("bombClicked");
    }
    // cell.classList.add("off");
  }

  gameboardEl.classList.add("gameover");

  scoreEl.innerText = `Game Over: your score is: ${score}`;
}
