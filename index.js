const container = document.querySelector('.container');
let drawEnabled = false;

let divPrSide = prompt('How many squares do you want pr. side?', '50');
const totalSquares = divPrSide * divPrSide;

container.addEventListener('mousedown', function () {
  drawEnabled = true;
});

container.addEventListener('mouseup', function () {
  drawEnabled = false;
});

container.addEventListener('mouseover', function (event) {
  if (drawEnabled && event.target.matches('.grid-div')) {
    event.target.classList.add('draw');
  }
});

for (let i = 0; i < totalSquares; i++) {
  const gridDiv = document.createElement('div');
  const divSize = 960 / divPrSide;

  gridDiv.classList.add('grid-div');
  gridDiv.style.border = '1px solid red';
  gridDiv.style.width = divSize + 'px';
  gridDiv.style.height = divSize + 'px';
  container.appendChild(gridDiv);
}
