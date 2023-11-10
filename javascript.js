let gridState = 0;
let gridCells;

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
      if(buttons[0].classList.contains('.active')) {
        cell.style.backgroundColor = cellColor; 
      }
      if(buttons[1].classList.contains('.active')) {
        cell.style.backgroundColor = randomColor(); 
      }
      if(buttons[2].classList.contains('.active')) {
        cell.style.backgroundColor = 'white'; 
      }
      
      gridCells.map((cell) => {
        cell.addEventListener('mousemove',paintCell);
      });

      window.addEventListener('mouseup',removeHandler); 
    });
  });
}

function paintCell() { 
  if(buttons[0].classList.contains('.active')) {
    this.style.backgroundColor = cellColor; 
  }
  if(buttons[1].classList.contains('.active')) {
    this.style.backgroundColor = randomColor(); 
  }
  if(buttons[2].classList.contains('.active')) {
    this.style.backgroundColor = 'white'; 
  }
}

function removeHandler() { 
  gridCells.map((cell) => {
    cell.removeEventListener('mousemove', paintCell);
  });
}

function randomColor() { 
    return `rgb(
      ${Math.floor(Math.random() * 256)},
      ${Math.floor(Math.random() * 256)},
      ${Math.floor(Math.random() * 256)}
      )`;
  }

const buttons = Array.from(document.querySelectorAll('.button'));
const activeBtns = Array.from(document.querySelectorAll('.active-type'));
const colorPicker = document.querySelector('.color-picker');
const grid = document.querySelector('.grid-area');
const gridBtn = document.querySelector('.grid-btn');
const resetBtn = document.querySelector('.reset-btn');
const diceBtn = document.querySelector('.dice-btn');

window.addEventListener('load',fillGrid);
gridBtn.addEventListener('click',fillGrid);
diceBtn.addEventListener('click',randomColor);

buttons.map((button) => { 
  button.addEventListener('mouseover', function() {
    button.children[0].classList.add('move');
  });
  button.addEventListener('mouseout', function() {
    button.children[0].classList.remove('move');
  });
});

activeBtns.map((button) => {
  button.addEventListener('click', function() {
    activeBtns.forEach((button) => {
      button.classList.remove('.active');
    })
    button.classList.add('.active');
  });
})

resetBtn.addEventListener('click',function() {
  gridState--;
  fillGrid();
});

colorPicker.addEventListener('change', function(event) { 
  cellColor = event.target.value;
});


