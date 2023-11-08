let gridState = 0;
let gridCells;
let cellColor;


function fillGrid() {
  const cellArray = [];
  gridState++;

  if(gridState % 3 === 1) {
    for(i = 0; i <= 3248; i++) {
      cellArray.push('<div class="cell small"></div>');
    }
  }
  else if (gridState % 3 == 2) {
    for(i = 0; i <= 483; i++) {
      cellArray.push('<div class="cell medium"></div>');
    }
  }
  else {
    for(i = 0; i <= 168; i++) {
      cellArray.push('<div class="cell large"></div>');
    }
  }
  const htmlCells = cellArray.reduce((acc,cur) => acc + cur);
  grid.innerHTML = htmlCells;
  attachCellListeners();
}

function attachCellListeners() {
  gridCells = Array.from(document.querySelectorAll('.cell')); 
  gridCells.map((cell) => {
    cell.addEventListener('mousedown',function() {
      cell.style.backgroundColor = cellColor;

      gridCells.map((cell) => {
        cell.addEventListener('mousemove',paintCell);
      });

      window.addEventListener('mouseup',removeHandler); 
    });
  });
}

function paintCell() { 
  this.style.backgroundColor = cellColor;
}

function removeHandler() { 
  gridCells.map((cell) => {
    cell.removeEventListener('mousemove', paintCell);
  });
}

const buttons = Array.from(document.querySelectorAll('.button'));
const colorPicker = document.querySelector('.color-picker');
const grid = document.querySelector('.grid-area');
const gridBtn = document.querySelector('.grid-btn');
const resetBtn = document.querySelector('.reset-btn');

window.addEventListener('load',fillGrid);
gridBtn.addEventListener('click',fillGrid);

buttons.map((button) => { 
  button.addEventListener('mouseover', function() {
    button.children[0].classList.add('move');
  });
  button.addEventListener('mouseout', function() {
    button.children[0].classList.remove('move');
  });
});

resetBtn.addEventListener('click',function() {
  gridState--;
  fillGrid();
});

colorPicker.addEventListener('change', function(event) { 
  cellColor = event.target.value;
});

