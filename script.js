const NUM_BUTTONS = 10;
const DEFAULT_BRUSH_SIZE = 2;
const DEFAULT_MODE = 'color';

const container = document.querySelector(".container");
const output = document.querySelector(".output");
const input = document.querySelector("input");
let selectedColor = null;
let brushSize = null;
let mode = null;

window.onload = function () {
  initializeGrid(NUM_BUTTONS);
  output.innerHTML = NUM_BUTTONS;
  initializePalette();
  brushSize = DEFAULT_BRUSH_SIZE;
  mode = DEFAULT_MODE;
  //default choice is black
  const black = document.querySelector("#black");
  updatePalette(black);
};

//called once on load
function initializePalette() {
  const colors = document.querySelectorAll(".color");
  colors.forEach((color) => {
    color.style.backgroundColor = color.id;
    color.addEventListener("click", function () {
      updatePalette(color);
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

  for (let targetRow = sourceRow - range; targetRow <= sourceRow + range; targetRow++) {
    for (let targetCol = sourceCol - range; targetCol <= sourceCol + range; targetCol++) {
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
  affectedSquares.forEach(square => changeColor(square));
}

function changeColor(square) {
  switch(mode) {
    case 'color':
      square.style.backgroundColor = selectedColor.id;
      break;
  }
}


//called when palette is updated
function updatePalette(newColor) {
  newColor.style.border = "3px solid red";
  if (selectedColor != null && selectedColor != newColor) {
    selectedColor.style.border = "none";
  }
  selectedColor = newColor;
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
