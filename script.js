const NUM_BUTTONS = 10;
const DEFAULT_BRUSH_SIZE = "small";
const DEFAULT_MODE = "color";
const DEFAULT_COLOR = "black";

const container = document.querySelector(".container");
const output = document.querySelector(".output");
const input = document.querySelector("input");

//initialized at runtime based on defaults
let selectedColor = null;
let brushSize = null;
let mode = null;

window.onload = function () {
  initializeGrid(NUM_BUTTONS);
  output.innerHTML = NUM_BUTTONS;

  initializePalette();
  initializeBrushSizes();
  mode = DEFAULT_MODE;
  activateDefaultSettings();
};

function activateDefaultSettings() {
  const defaultBrushSize = document.querySelector(`#${DEFAULT_BRUSH_SIZE}`);
  defaultBrushSize.dispatchEvent(new MouseEvent("click"));

  const defaultColor = document.querySelector(`#${DEFAULT_COLOR}`);
  defaultColor.dispatchEvent(new MouseEvent("click"));
}

//called once on load
function initializePalette() {
  const colors = document.querySelectorAll(".color");
  colors.forEach((color) => {
    color.style.backgroundColor = color.id;
    color.addEventListener("click", function () {
     // updatePalette(color);
      colors.forEach(color => color.style.border = "1px solid black");
      color.style.border = "3px solid red";
      selectedColor = color;
    });
  });
}

function initializeBrushSizes() {
  const sizes = document.querySelectorAll(".brush-size");
  sizes.forEach((size, index) => {
    size.addEventListener("click", function () {
      brushSize = index;
      sizes.forEach(size => size.style.border = "1px solid black");
      size.style.border = "3px solid red";
    });
  });
}

//called when slider is updated
function initializeGrid(size) {
  for (let i = 0; i < size * size; ++i) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.addEventListener("mousemove", paint);
    square.addEventListener("mousedown", paint);

    square.setAttribute("data-row", Math.floor(i / size));
    square.setAttribute("data-col", i % size);
    square.style.width = 100 / size + "%";
    square.style.height = 100 / size + "%";

    container.appendChild(square);
  }
}

function querySquaresInRange(sourceSquare, range) {
  const sourceRow = +sourceSquare.getAttribute("data-row");
  const sourceCol = +sourceSquare.getAttribute("data-col");
  console.log("source " + "(" + sourceRow + ", " + sourceCol + ")");
  let squaresInRange = [];

  for (
    let targetRow = sourceRow - range;
    targetRow <= sourceRow + range;
    targetRow++
  ) {
    for (
      let targetCol = sourceCol - range;
      targetCol <= sourceCol + range;
      targetCol++
    ) {
      console.log("searching " + "(" + targetRow + " , " + targetCol + ")");
      const selector = `[data-row="${targetRow}"][data-col="${targetCol}"]`;
      const targetSquare = document.querySelector(selector);
      if (targetSquare != null) {
        squaresInRange.push(targetSquare);
      }
    }
  }

  return squaresInRange;
}

function paint(e) {
  if (e.buttons != 1) return;
  const targetSquare = e.target;

  const affectedSquares = querySquaresInRange(targetSquare, brushSize);
  affectedSquares.forEach((square) => changeColor(square));
}

function changeColor(square) {
  switch (mode) {
    case "color":
      square.style.backgroundColor = selectedColor.id;
      break;
  }
}

function resetContainer() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

input.oninput = function () {
  output.innerHTML = this.value;
  resetContainer();
  initializeGrid(this.value);
};
