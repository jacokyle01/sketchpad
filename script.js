const NUM_BUTTONS = 10;
const container = document.querySelector(".container");

//generate rows
for (let row = 0; row < NUM_BUTTONS; row++) {
  const row = document.createElement("div");
  row.id = "row";
  container.appendChild(row);

  //generate buttons
  for (let i = 0; i < NUM_BUTTONS; i++) {
    const button = document.createElement("button");
    row.appendChild(button);
  }
}
