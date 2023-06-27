const container = document.querySelector('.gridContainer');
const slider = document.getElementById('setGridSize');
const tooltip = document.querySelector('.slider-tooltip');

// set grid size and fill with divs (on load and on value input with slider)
document.addEventListener('DOMContentLoaded', function () {
  updateGrid();
});

slider.addEventListener('input', function () {
  const value = this.value;
  tooltip.textContent = value;
  tooltip.classList.add('show');
  updateGrid();
});

function updateGrid() {
  let gridSize = slider.value;
  let totalSquares = gridSize * gridSize;

  container.innerHTML = '';

  for (let i = 0; i < totalSquares; i++) {
    const gridDiv = document.createElement('div');
    const divSize = 660 / gridSize;

    gridDiv.classList.add('grid-div');
    gridDiv.style.border = '1px solid lightblue';
    gridDiv.style.width = divSize + 'px';
    gridDiv.style.height = divSize + 'px';
    container.appendChild(gridDiv);
  }
}

// draw functionality
let drawEnabled = false;

container.addEventListener('mousedown', function (event) {
  drawEnabled = true;
  if (drawEnabled && event.target.matches('.grid-div')) {
    event.target.classList.add('draw');
  }
});

container.addEventListener('mouseup', function () {
  drawEnabled = false;
});

container.addEventListener('mouseover', function (event) {
  if (drawEnabled && event.target.matches('.grid-div')) {
    event.target.classList.add('draw');
  }
});

// erase functionality
const eraser = document.querySelector('.eraser');

eraser.addEventListener('click', function () {
  const gridDivs = document.querySelectorAll('.grid-div'); // create nodelist of all divs with .grid-div class
  gridDivs.forEach(function (gridDiv) {
    // create a forEach loop that iterates over all created divs, and removes draw class
    gridDiv.classList.remove('draw');
  });
});

// slide value
slider.addEventListener('mousemove', function (event) {
  const thumbWidth = 25; // Width of the slider thumb
  const sliderWidth = this.offsetWidth;
  const tooltipWidth = tooltip.offsetWidth;
  const tooltipPosition = event.offsetX - tooltipWidth / 2 + thumbWidth / 2;

  tooltip.style.left = `${tooltipPosition}px`;

  // Hide the tooltip when the mouse is not over the slider
  if (event.target !== this) {
    tooltip.classList.remove('show');
  }
});

slider.addEventListener('mouseleave', function () {
  tooltip.classList.remove('show');
});
