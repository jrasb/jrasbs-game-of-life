const wrapper = document.querySelector('#wrapper')
const containerDiv = document.querySelector('#container');
const cols = 16;
const rows = 16;

//generate and display grid
const makeGrid = () => {
	return new Array(cols).fill(null)
		.map(() => new Array(rows).fill(0))
}

const grid = makeGrid();

const renderGrid = () => {
	let x = -0x1;
  let y = 0x0;
  
  grid.forEach(
  (row) => {
  	for (let i = 0; i < row.length; i++) {
    	const tileElement = document.createElement('div');
      
      if (x == cols) {
      	x = 0x0;
        y += 0x1;
      } else {
      	x += 0x1;
      }
      
      tileElement.id = 'x' + x.toString(16) + 'y' + y.toString(16);
      tileElement.className = 'tile-class-' + row[i];
      
      container.appendChild(tileElement);
    }
  })
}

renderGrid();

// make elements in the grid interactive
const tileElements = document.querySelectorAll('#container > div');

tileElements.forEach((element, index) => {
	element.addEventListener('click', () => {
		element.classList.add('tile-class-1');
		element.classList.remove('tile-class-0');
	});
});