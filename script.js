const NUM_BUTTONS = 10;
const container = document.querySelector(".container");
const output = document.querySelector(".output");
const input = document.querySelector("input");

window.onload = function() {
    initializeGrid(NUM_BUTTONS);
    output.innerHTML = NUM_BUTTONS;
}


function initializeGrid(size) {
  for (let row = 0; row < size; row++) {
    const row = document.createElement("div");
    row.className = "row";
    container.appendChild(row);
    for (let i = 0; i < size; i++) {
      const square = document.createElement("div");
      square.className = "square";
      row.appendChild(square);
    }
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
