const gridTotalWidth = 600;

let gridCells = generateGrid(16);
const clearBtn = document.querySelector('#clear-btn');

clearBtn.addEventListener('click', generateNewGrid);

//Generate a grid of divs within grid-container with x rows and columns
//Returns an array of grid-cells
function generateGrid(x){
    //space between cells in px
    const spacing = x < 32 ? 1 : 0;
    const gContainer = document.querySelector('.grid-container');
    const widthPerCell = (gridTotalWidth - (x - 1) * spacing) / x;

    let cellsArr = [];

    gContainer.setAttribute('style',
     `grid-template-columns: repeat(${x}, ${widthPerCell + spacing}px);
      grid-template-rows: repeat(${x}, ${widthPerCell + spacing}px)`);
    
    for(i = 0; i < x*x; i++){
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.style.width = widthPerCell + 'px';
        cell.style.height = widthPerCell + 'px';
        cell.addEventListener('mouseover', cellOnHover);

        gContainer.appendChild(cell);
        cellsArr.push(cell);
    }

    return cellsArr;
}

//Generates a new empty grid based on the user num via a prompt
function generateNewGrid(){
    let num;
    num = parseInt(prompt("New grid resolution (squares per side, max. limit : 64)", 16));
    
    //Rejects odd user input
    while(isNaN(num) || num > 64 || num < 2){
        num = prompt("Invalid num, please try again. (Max. limit : 64)", 16);
    }

    deleteAllCells();
    gridCells = generateGrid(num);
}

//Clears all the cells to the normal whitesmoke colour
function clearCells(){
    gridCells.forEach(cell => {
        cell.style.backgroundColor = 'whitesmoke';
    });
}

//Deletes all the cell divs from the DOM
function deleteAllCells(){
    clearCells();
    gridCells.forEach((cell) => {
        cell.parentNode.removeChild(cell);
    });

    gridCells = [];
}

function cellOnHover(e){
    e.target.style.backgroundColor = 'black';
}