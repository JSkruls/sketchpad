let state = 1;

function createCells() {
  const cellArray = []; 
  for(i = 0; i <= 3248; i++) {
    cellArray.push('<div class="cell-small"></div>');
  }
  const htmlCells = cellArray.reduce((acc,cur) => acc + cur);
  return grid.innerHTML = htmlCells;
}

function drawGrid() {
  const cellArray = [];
  state++;
  if(state % 3 === 1) {
    for(i = 0; i <= 3248; i++) {
      cellArray.push('<div class="cell-small"></div>');
    }
  }
  else if (state % 3 == 2) {
    for(i = 0; i <= 483; i++) {
      cellArray.push('<div class="cell-medium"></div>');
    }
  }
  else {
    for(i = 0; i <= 168; i++) {
      cellArray.push('<div class="cell-large"></div>');
    }
  }
  
  const htmlCells = cellArray.reduce((acc,cur) => acc + cur);
  return grid.innerHTML = htmlCells;
}

const grid = document.querySelector('.grid-area');
const gridBtn = document.querySelector('.grid-btn');

gridBtn.addEventListener('click',drawGrid);
window.addEventListener('load',createCells);