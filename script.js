//Generate a grid of divs within grid-container 
//with x rows, y columns, and cell width w (px)
function generateGrid(x, y, w){
    //space between cells in px
    const spacing = 5;
    const gContainer = document.querySelector('.grid-container');
    const containerWidth = (y - 1) * spacing + y * w;

    gContainer.style.width = containerWidth;
    gContainer.setAttribute('style',
     `grid-template-columns: repeat(${x}, ${w + spacing}px);
      grid-template-rows: repeat(${y}, ${w + spacing}px)`);
    
    for(i = 0; i < x*y; i++){
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.style.width = w + 'px';
        cell.style.height = w + 'px';

        gContainer.appendChild(cell);
    }
}

generateGrid(16, 16, 20);