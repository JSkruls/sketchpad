let gridState = 0;
let gridCells;

//Creates initial grid on page load or grid button click
function fillGrid() {
  grid.replaceChildren();
  gridState++;

  if(gridState % 3 === 1) {
    for(i = 0; i <= 3248; i++) {
      const smallCell = document.createElement('div');
      smallCell.classList.add('cell','small');
      grid.appendChild(smallCell);
    }
  }
  else if (gridState % 3 == 2) {
    for(i = 0; i <= 483; i++) {
      const mediumCell = document.createElement('div');
      mediumCell.classList.add('cell','medium');
      grid.appendChild(mediumCell);
    }
  }
  else {
    for(i = 0; i <= 168; i++) {
      const largeCell = document.createElement('div');
      largeCell.classList.add('cell','large');
      grid.appendChild(largeCell);
    }
  }
  attachCellListeners();
}

//Adds mousedown handlers to each cell
//Based on active button, fills cells with chosen color mode
//Filling cells on mousemove only on mousedown is achieved by ...
//Mousedown event creating mousemove and mouseup handlers within itself
function attachCellListeners() {
  gridCells = Array.from(document.querySelectorAll('.cell')); 
  gridCells.map((cell) => {
    cell.addEventListener('mousedown',function() {
      cell.style.backgroundColor = paintCell; 
      gridCells.map((cell) => {
        cell.addEventListener('mousemove',paintCell);
      });
      window.addEventListener('mouseup',removeHandler);
    });
  });
}

//Based on active button, fills cells with color mode
function paintCell() { 
  if(buttons[0].classList.contains('active')) {
    this.style.backgroundColor = cellColor; 
  }
  if(buttons[1].classList.contains('active')) {
    this.style.backgroundColor = randomColor(); 
  }
  if(buttons[2].classList.contains('active')) {
    this.style.backgroundColor = 'white'; 
  }
}

function removeHandler() { 
  gridCells.map((cell) => {
    cell.removeEventListener('mousemove', paintCell);
  });
}

//Produces a random rgb color value
function randomColor() { 
  return `rgb(
    ${Math.floor(Math.random() * 256)},
    ${Math.floor(Math.random() * 256)},
    ${Math.floor(Math.random() * 256)}
    )`;
}

//Disables button icon returning to initial state
//Removal of event listener necessitates function declaration
//Function expression inside event listener didn't work
function mouseOut() {
  this.children[0].classList.remove('move');
}

const buttons = Array.from(document.querySelectorAll('.button'));
const activeBtns = Array.from(document.querySelectorAll('.active-type'));
const colorPicker = document.querySelector('.color-picker');
const grid = document.querySelector('.grid-area');
const gridBtn = document.querySelector('.grid-btn');
const resetBtn = document.querySelector('.reset-btn');
const diceBtn = document.querySelector('.dice-btn');

//Changes button icons on hover and click states
//Hover state is added to all buttons before any is clicked
//Once a button is clicked it acquires active class and 
//Hover state is reapplied to remaining inactive buttons
buttons.map((button) => { 
  if(!button.classList.contains('active')) { 
    button.addEventListener('mouseover', function() {
      button.children[0].classList.add('move');
    });
    button.addEventListener('mouseout', mouseOut);
  }
  
  button.addEventListener('click', function() {
    buttons.map((button) => {
      button.classList.remove('active');
      button.children[0].classList.remove('move'); 

      if(!button.classList.contains('active')) {
        button.addEventListener('mouseover', function() {
          button.children[0].classList.add('move');
        });
        button.addEventListener('mouseout', mouseOut);
      }
    });

    button.classList.add('active');
    button.children[0].classList.add('move');
    button.removeEventListener('mouseout', mouseOut);
  });
});

//Resets current grid type 
resetBtn.addEventListener('click',function() {
  gridState--;
  fillGrid();
});

//Gets color value from html input color wheel
colorPicker.addEventListener('change', function(event) { 
  cellColor = event.target.value;
});

window.addEventListener('load',fillGrid);
gridBtn.addEventListener('click',fillGrid);