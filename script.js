const gridTotalWidth = 600;

let drawMode = 0;
let gridCells = generateGrid(16);

const clearBtn = document.querySelector('#clear-btn');
const normalBtn = document.querySelector('#normal-btn');
const additiveBtn = document.querySelector('#additive-btn');
const randomBtn = document.querySelector('#random-btn');

clearBtn.addEventListener('click', generateNewGrid);
normalBtn.addEventListener('click', () => {clearCells(); drawMode = 0});
additiveBtn.addEventListener('click', () => {clearCells(); drawMode = 1});
randomBtn.addEventListener('click', () => {clearCells(); drawMode = 2});

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
        cell.style.backgroundColor = '#f5f5f5';
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

//Returns a random colour (string) in the form of rgb(r, g, b)
function getRandomColor(){
    let rgb = [0, 0, 0];
    for(i = 0; i < 3; i++){
        const val = Math.floor(Math.random() * 256);
        rgb[i] = val;
    }

    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

//Callback for each cell when hovered, changes color based on 
//which drawMode is selected
function cellOnHover(e){
    //drawMode 0/default - change to black
    //drawMode 1 - add 10% black to the color
    //drawMode 2 - change to a random color
    if(drawMode === 1){
        const curColor = e.target.style.backgroundColor;
        const rgb = curColor.match(/\d+/g);
        const colorOffset = 255 * 10 / 100;

        for(i = 0; i < 3; i++){
            rgb[i] = Math.max(+rgb[i] - colorOffset, 0);
        }
        
        e.target.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }
    else if(drawMode === 2){
        e.target.style.backgroundColor = getRandomColor();
    }
    else{
        e.target.style.backgroundColor = 'black';
    }
}