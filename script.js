const gridCells = generateGrid(16, 400);
const clearBtn = document.querySelector('#clear-btn');

clearBtn.addEventListener('click', clearCells);

//Generate a grid of divs within grid-container 
//with x rows and columns, and total width of w px
//Returns an array of grid-cells
function generateGrid(x, w){
    //space between cells in px
    const spacing = 2;
    const gContainer = document.querySelector('.grid-container');
    const widthPerCell = (w - (x - 1) * spacing) / x;

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

function clearCells(){
    gridCells.forEach(cell => {
        cell.style.backgroundColor = 'whitesmoke';
    });
}

function cellOnHover(e){
    e.target.style.backgroundColor = 'black';
}