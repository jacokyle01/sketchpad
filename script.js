const NUM_BUTTONS = 10;
const DEFAULT_BRUSH_SIZE = "small";
const DEFAULT_MODE = "color";
const DEFAULT_COLOR = "#000000";

const container = document.querySelector(".container");
const output = document.querySelector(".output");
const palette = document.querySelector(".color-palette");
const input = document.getElementById("slider");
const add = document.getElementById("add");
const colorPicker = document.getElementById("color-picker");
const drawingState = document.getElementById("drawing-state");

//initialized at runtime based on defaults
let selectedColor = null;
let brushSize = null;
let mode = null;
let colorCount = 7;

window.onload = function () {
  initializeGrid(NUM_BUTTONS);
  output.innerHTML = NUM_BUTTONS;

  initializePalette();
  initializeBrushSizes();
  initializeModes();
  initializeAdd();
  activateDefaultSettings();
  updateDrawingState();
};

function activateDefaultSettings() {
  const defaultBrushSize = document.querySelector(`#${DEFAULT_BRUSH_SIZE}`);
  defaultBrushSize.dispatchEvent(new MouseEvent("click"));

  // const defaultColor = document.querySelector(`#${DEFAULT_COLOR}`);
  // defaultColor.dispatchEvent(new MouseEvent("click"));
  selectedColor = DEFAULT_COLOR;
  colorPicker.value = DEFAULT_COLOR;

  const defaultMode = document.querySelector(`#${DEFAULT_MODE}`);
  defaultMode.dispatchEvent(new MouseEvent("click"));
}

function updateDrawingState() {
  let message = `In ${mode} mode with brush size ${brushSize}`;
  drawingState.innerHTML = message;
}

function initializeAdd() {
  add.addEventListener("click", function () {
    if (colorCount >= 15) return;

    const value = colorPicker.value;
    const addedColor = document.createElement("div");
    addedColor.classList.add("color");
    addedColor.id = value;
    addedColor.style.backgroundColor = value;
    addedColor.addEventListener("click", function () {
      console.log("id " + addedColor.id)
      colorPicker.value = addedColor.id;
      selectedColor = colorPicker.value;
    });

    palette.appendChild(addedColor);
    colorCount++;
  });
}

//called once on load
function initializePalette() {
  const colors = document.querySelectorAll(".color");
  colors.forEach((color) => {
    color.style.backgroundColor = color.id;
    color.addEventListener("click", function () {
      // updatePalette(color);
      // colors.forEach((color) => (color.style.border = "1px solid black"));
      // color.style.border = "3px solid red";
      colorPicker.value = color.id;
      selectedColor = colorPicker.value;
    });
  });

  const colorPicker = document.querySelector("#color-picker");
  colorPicker.oninput = (e) => (selectedColor = e.target.value);
}

function initializeBrushSizes() {
  const sizes = document.querySelectorAll(".brush-size");
  sizes.forEach((size, index) => {
    size.addEventListener("click", function () {
      brushSize = index;
      updateDrawingState();
      sizes.forEach((size) => (size.style.border = "none"));
      size.style.border = "3px solid red";
    });
  });
}

function initializeModes() {
  const modes = document.querySelectorAll(".mode");
  modes.forEach((modeBox) => {
    modeBox.addEventListener("click", function () {
      mode = modeBox.id;
      updateDrawingState();
      modes.forEach((modeBox) => (modeBox.style.border = "none"));
      modeBox.style.border = "3px solid red";
    });
  });
}

//called when slider is updated
function initializeGrid(size) {
  for (let i = 0; i < size * size; ++i) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.addEventListener("mouseenter", paint);
    square.addEventListener("mousedown", paint);

    square.setAttribute("data-row", Math.floor(i / size));
    square.setAttribute("data-col", i % size);
    square.style.width = 100 / size + "%";
    square.style.height = 100 / size + "%";
    square.style.backgroundColor = "rgb(255,255,255)";

    container.appendChild(square);
  }
}

function querySquaresInRange(sourceSquare, range) {
  const sourceRow = +sourceSquare.getAttribute("data-row");
  const sourceCol = +sourceSquare.getAttribute("data-col");
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
      console.log("selected color " + selectedColor);
      square.style.backgroundColor = selectedColor;
      break;

    case "rainbow":
      square.style.backgroundColor = randomColor();
      break;

    default:
      square.style.backgroundColor = adjustShade(square.style.backgroundColor);
      break;
  }
}

function adjustShade(color) {
  let getColorArray = (s) => s.slice(4, -1).split(", ");
  let getRGBString = (s) => "rgb(" + s.join(", ") + ")";

  let colorAsArray;

  if (mode === "darken") {
    colorAsArray = getColorArray(color).map((color) => {
      return Math.max(0, +color - 25.5);
    });
  } else if (mode === "lighten") {
    colorAsArray = getColorArray(color).map((color) => {
      return Math.min(255, +color + 25.5);
    });
  }

  return getRGBString(colorAsArray);
}

function hexToRgb(hex) {
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return "rgb(" + r + "," + g + "," + b + ")";
}

function randomColor() {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${blue}, ${green})`;
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
