const wrapper = document.querySelector('#wrapper')
const containerDiv = document.querySelector('#container');
const cols = 32;
const rows = 32;

//generate and display grid
const makeGrid = () => {
	return new Array(cols).fill(null)
		.map(() => new Array(rows).fill(0))
}

let grid = makeGrid();

const renderGrid = () => {
    containerDiv.innerHTML = null;

	let x = -0x1;
	let y = 0x0;
  
	grid.forEach(
	(row) => {
		for (let i = 0; i < row.length; i++) {
			const tileElement = document.createElement('div');
      
			if (x == (row.length - 1)) {
				x = 0x0;
				y += 0x1;
			} else {
				x += 0x1;
			}
      
			tileElement.id = 'x' + x.toString(32) + 'y' + y.toString(32);
			tileElement.className = 'tile-status-' + row[i];
      
			containerDiv.appendChild(tileElement);
		}
	})
}

// make elements in the grid interactive


const readTilesToGrid = () => {
    tileElements.forEach((element) => {
        if (element.classList.contains('tile-status-1')) {
            console.log(element);

            grid[parseInt(element.id[3], 32)][parseInt(element.id[1], 32)] = 1;
        }
    })
}

/* make generations 
 *
 * RULES OF GENERATION TO GENERATION CELL BEHAVIOUR:
 * CELL DIES WHEN LESS THAN 2 NEIGHBOURS DUE TO UNDERPOPULATION;
 * CELL DIES WHEN MORE THAN 3 NEIGHBOURS DUE TO OVERPOPULATION;
 * CELL LIVES WHEN 2 OR 3 NEIGHBOURS AND MOVES TO NEXT GENERATION;
 * DEAD CELL BECOMES LIVING WHEN SURROUNDED BY 3 NEIGHBOURS;
 */

const generateNextGen = (grid) => {
    const nextGenGrid = grid.map(item => [...item]);
	
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            let neighbourSum = 0
            /**
             * NEIGHBOUR CHECK:
             * Checks all neighbours around a cell from (x-1, y-1) to (x+1, y+1);
             */
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    // Ignores current cell to avoid adding itself as a 'neighbour';
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    const xCell = col + i;
                    const yCell = row + j;

                    if (xCell >= 0 && yCell >= 0 && xCell < cols && yCell < rows) {
                        const currentNeightbour = grid[col + i][row + j];
                        neighbourSum += currentNeightbour;
                    }
                }
            }

            // Implementation of the rules here
            if (cell === 1 && neighbourSum < 2) {
                nextGenGrid[col][row] = 0;
            } else if (cell === 1 && neighbourSum > 3) {
                nextGenGrid[col][row] = 0;
            } else if (cell === 0 && neighbourSum === 3) {
                nextGenGrid[col][row] = 1;
            }

        }
    }
    //console.log(nextGenGrid);
    return nextGenGrid;
}

const showNextGeneration = () => {
    grid = generateNextGen(grid);
    tileElements.forEach((element) => {
        if (grid[parseInt(element.id[3], 32)][parseInt(element.id[1], 32)] === 1) {
            element.classList.replace('tile-status-0', 'tile-status-1');
        } else {
            element.classList.replace('tile-status-1', 'tile-status-0');
        }
    })
}

let generation = 0;
const bringTilesToLife = (generationAmount) => {    
    setTimeout(() => {
        showNextGeneration();
        generation++;
        if (generation < generationAmount) {
            bringTilesToLife();
        }
    }, 100);
}

// on site load:

renderGrid(grid);
const tileElements = document.querySelectorAll('#container > div');

tileElements.forEach((element) => {
	element.addEventListener('click', () => {
        element.classList.replace('tile-status-0', 'tile-status-1');
        readTilesToGrid(grid);
	});
});
