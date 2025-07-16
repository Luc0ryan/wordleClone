const wordGrid = document.querySelector(".wordGrid");
const wordRows = wordGrid.querySelectorAll('.wordRow');

const grid = Array.from(wordRows).map(row => Array.from(row.children));

let currentRow = 0;
let currentCol = 0;
let currentWord = [];


function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function removeLetter(){
  currentCol--;
  currentWord.pop();
  grid[currentRow][currentCol].textContent = '';
}

function insertLetter(letter){
  grid[currentRow][currentCol].textContent = letter;
  currentWord.push(letter);
  currentCol++;
}

function nextRow(){
  currentRow++;
  currentCol = 0;
  currentWord = [];
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    if (currentCol > 0) {
      removeLetter();
    }
  } else if (isLetter(e.key) && currentCol < 5) {
    const letter = e.key.toUpperCase();
    insertLetter(letter);
    }
    if (currentCol === 5 && e.key === 'Enter') {
      nextRow();
    }
});
