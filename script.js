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
  for (let row = 0; row < size; row++) {
    const row = document.createElement("div");
    row.className = "row";
    //row.setAttribute('draggable', 'false');
    container.appendChild(row);
    for (let i = 0; i < size; i++) {
      const square = document.createElement("div");
      square.classList.add("square");

      square.addEventListener('mouseover', changeColor);
      square.addEventListener('mousedown', changeColor);

      
      row.appendChild(square);
    }
  }
}

function changeColor(e) {
  //if (e.type === 'mouseover' && !mouseDown) return
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

console.log();

input.oninput = function () {
  output.innerHTML = this.value;
  resetContainer();
  initializeGrid(this.value);
};
