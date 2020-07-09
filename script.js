const gridCells = generateGrid(16, 16, 15);

//Generate a grid of divs within grid-container 
//with x rows, y columns, and cell width w (px)
//Returns an array of grid cells
function generateGrid(x, y, w){
    //space between cells in px
    const spacing = 2;
    const gContainer = document.querySelector('.grid-container');

    let cellsArr = [];

    gContainer.setAttribute('style',
     `grid-template-columns: repeat(${x}, ${w + spacing}px);
      grid-template-rows: repeat(${y}, ${w + spacing}px)`);
    
    for(i = 0; i < x*y; i++){
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.style.width = w + 'px';
        cell.style.height = w + 'px';
        cell.addEventListener('mouseover', cellOnHover);

        gContainer.appendChild(cell);
        cellsArr.push(cell);
    }
}

function cellOnHover(e){
    e.target.style.backgroundColor = 'black';
}