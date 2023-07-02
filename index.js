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

// color functionality
const colorSelector = document.getElementById('favcolor');

let isDrawing = false;

// set color of clicked grid element to input value
container.addEventListener('mousedown', function (event) {
  if (event.target.matches('.grid-div')) {
    isDrawing = true;
    event.target.style.backgroundColor = colorSelector.value;
  }
});

container.addEventListener('mouseup', function () {
  isDrawing = false;
});

container.addEventListener('mouseover', function (event) {
  if (isDrawing && event.target.matches('.grid-div')) {
    event.target.style.backgroundColor = colorSelector.value;
  }
});

// erase setting functionality
const eraser = document.querySelector('.eraser');

eraser.addEventListener('click', function () {
  const gridDivs = document.querySelectorAll('.grid-div');
  gridDivs.forEach(function (gridDiv) {
    gridDiv.style.backgroundColor = 'whitesmoke';
  });
});

// create grid setting functionality
const gridSetting = document.querySelector('.gridSetting');

gridSetting.addEventListener('click', function () {
  const gridDivs = document.querySelectorAll('.grid-div');
  gridSetting.classList.toggle('gridActive');
  gridDivs.forEach(function (gridDiv) {
    if (gridDiv.classList.contains('borderSetting')) {
      gridDiv.classList.remove('borderSetting');
    } else {
      gridDiv.classList.add('borderSetting');
    }
  });
});

// slide value and tooltip
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
