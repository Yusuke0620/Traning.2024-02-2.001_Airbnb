let slider = document.getElementById("night-slider");
let display = document.getElementById("nights-display");

slider.oninput = () => {
  display.innerText = slider.value;
};
