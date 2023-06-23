const container = document.querySelector('.container');
let drawEnabled = false;

let divPrSide = prompt('How many squares do you want pr. side?', '50');

for (let i = 0; i <= divPrSide; i++) {
  const gridDiv = document.createElement('div');
  const divWidth = `calc((${divPrSide} / 960) * ${divPrSide}px)`;

  gridDiv.style.border = '1px solid red';
  gridDiv.style.width = divWidth;
  container.appendChild(gridDiv);

  gridDiv.addEventListener('mousedown', function () {
    drawEnabled = true;
  });

  gridDiv.addEventListener('mouseup', function () {
    drawEnabled = false;
  });

  gridDiv.addEventListener('mouseover', function () {
    if (drawEnabled == true) {
      gridDiv.classList.add('draw');
    }
  });
}
