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

  const containerWidth = container.offsetWidth;
  const divSize = containerWidth / gridSize;

  for (let i = 0; i < totalSquares; i++) {
    const gridDiv = document.createElement('div');

    gridDiv.classList.add('grid-div');
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

// color functionality

const colorLabel = document.querySelector('.colorLabel');
const colorSelector = document.getElementById('favcolor');

colorSelector.addEventListener('mouseover', function () {
  colorLabel.classList.add('labelStyleHover');
});

colorSelector.addEventListener('mouseout', function () {
  colorLabel.classList.remove('labelStyleHover');
});

// erase setting functionality
const eraser = document.querySelector('.eraser');

eraser.addEventListener('click', function () {
  const gridDivs = document.querySelectorAll('.grid-div'); // create nodelist of all divs with .grid-div class
  gridDivs.forEach(function (gridDiv) {
    // create a forEach loop that iterates over all created divs, and removes draw class
    gridDiv.classList.remove('draw');
  });
});

// create grid setting functionality
const gridSetting = document.querySelector('.gridSetting');

gridSetting.addEventListener('click', function () {
  const gridDivs = document.querySelectorAll('.grid-div'); // create nodelist of all divs with .grid-div class
  gridSetting.classList.toggle('gridActive');
  gridDivs.forEach(function (gridDiv) {
    // create a forEach loop that iterates over all created divs, and removes draw class
    if (gridDiv.classList.contains('borderSetting')) {
      gridDiv.classList.remove('borderSetting');
    } else {
      gridDiv.classList.add('borderSetting');
    }
  });
});

// slide value and tooltib
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
