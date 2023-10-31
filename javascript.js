function createCells() {
  const cellArray = [];

  for(i = 0; i <= 3248; i++) {
    cellArray.push('<div class="cell-small"></div>');
  }

  const htmlCells = cellArray.reduce((acc,cur) => acc + cur);
  return grid.innerHTML = htmlCells;
  
}

const grid = document.querySelector('.grid-small');
window.addEventListener('load',createCells);