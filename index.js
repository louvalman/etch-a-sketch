// make settings panel wider and add rainbow button

const container = document.querySelector('.gridContainer');
const slider = document.getElementById('setGridSize');
const tooltip = document.querySelector('.slider-tooltip');

// Set grid size and fill with divs (on load and on value input with slider)
document.addEventListener('DOMContentLoaded', function () {
  updateGrid();
  showTooltip();
  setTimeout(fadeTooltip, 5000); // Fade the tooltip after 5 seconds
});

let value = slider.value;
tooltip.innerHTML = `<i>${value} x ${value}</i>`;

slider.addEventListener('input', function () {
  value = slider.value;
  tooltip.innerHTML = `<i>${value} x ${value}</i>`;
  updateGrid();
  showTooltip();
  setTimeout(fadeTooltip, 5000); // Fade the tooltip after 5 seconds
});

slider.addEventListener('mouseover', function () {
  showTooltip();
  setTimeout(fadeTooltip, 1000);
});

// Show tooltip function
function showTooltip() {
  tooltip.style.opacity = '1';
}

// Fade tooltip function
function fadeTooltip() {
  tooltip.style.opacity = '0';
}

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

// initialize color and erasing variables and select colorpicker
let isDrawing = false;
let isErasing = false;
let isRainbowing = false;
let isMousePressed = false;

const colorSelector = document.getElementById('favcolor');

// set color of clicked grid element to input value
container.addEventListener('mousedown', function (event) {
  if (event.target.matches('.grid-div')) {
    isMousePressed = true;
    if (isErasing) {
      eraseGridDivs(event.target);
    } else if (isRainbowing) {
      isDrawing = true;
      rainbowGridDiv(event.target);
    } else {
      isDrawing = true;
      event.target.style.backgroundColor = colorSelector.value;
    }
  }
});

container.addEventListener('mouseup', function () {
  isDrawing = false;
  isMousePressed = false;
});

container.addEventListener('mouseover', function (event) {
  if (
    isDrawing &&
    isMousePressed &&
    event.target.matches('.grid-div') &&
    !isErasing
  ) {
    if (isRainbowing) {
      rainbowGridDiv(event.target);
    } else {
      event.target.style.backgroundColor = colorSelector.value;
    }
  } else if (isErasing && isMousePressed) {
    eraseGridDivs(event.target);
  }
});

// rainbow color functionality
const rainbowButton = document.querySelector('.rainbowClass');

rainbowButton.addEventListener('click', function () {
  if (isErasing) {
    isErasing = !isErasing;
    eraserC.classList.remove('gridActive');
  }
  isRainbowing = !isRainbowing;
  rainbowButton.classList.toggle('rainbowActive');
});

// rainbow setting function
function rainbowGridDiv(target) {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  target.style.backgroundColor = randomColor;
}

// erase setting functionality
const eraserC = document.querySelector('.eraserC');

eraserC.addEventListener('click', function () {
  if (isRainbowing) {
    isRainbowing = !isRainbowing;
    rainbowButton.classList.remove('rainbowActive');
  }

  isErasing = !isErasing;
  eraserC.classList.toggle('gridActive');
});

// erase setting function
function eraseGridDivs(target) {
  target.style.backgroundColor = 'whitesmoke';
}

// clear setting functionality
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
