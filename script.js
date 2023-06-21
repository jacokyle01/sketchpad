const NUM_BUTTONS = 10;
const container = document.querySelector(".container");
const output = document.querySelector(".output");
const input = document.querySelector("input");
let selectedColor = null;

window.onload = function () {
  initializeGrid(NUM_BUTTONS);
  output.innerHTML = NUM_BUTTONS;
  initializePalette();
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
    square.addEventListener("mousemove", changeColor);
    square.addEventListener("mousedown", changeColor);

    square.style.width = 100 / size + "%";
    square.style.height = 100 / size + "%";

    container.appendChild(square);
  }
}

function changeColor(e) {
  if (e.buttons === 1) {
    e.target.style.backgroundColor = selectedColor.id;
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
