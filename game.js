const wordGrid = document.getElementById("wordGrid");
// This is the grid where the words will be displayed
const wordRows = wordGrid.children;
// This is the collection of rows in the grid

let wordRowCount = 0;
// This is the first row in the grid, where the user will input their guess

let colCount = 0;
// This is the count of columns in the current row, starting at 1

/*const correctWord = {
    letterOne: {
        letter: 'L',
        location: '1',
    },
    letterTwo: {
        letter: 'E',
        location: '2',
    },
    letterThree: {
        letter: 'A',
        location: '3',
    },
    letterFour: {
        letter: 'S',
        location: '4',
    },
    letterFive: {
        letter: 'T',
        location: '5',
    },
} */

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

document
  .querySelector(".tester-input")
  .addEventListener("keydown", function (event) {
    // uses the isLetter function from above
    if (!isLetter(event.key)) {
      event.preventDefault();
      return;
    }
    // Prevent default action for non-letter keys

    if (wordRowCount >= wordRows.length) {
      // If all rows are filled, prevent further input
      event.preventDefault();
      return;
    }
    
    const input = event.target;
    const letter = event.key.toUpperCase();

    const row = wordRows[wordRowCount]; // get the current row

    
    if (colCount < 5) {
      const box = row.children[colCount];
      box.textContent = letter;
      colCount++;
    }

    if (colCount === 5) {
      // Check if the word is valid here
      // If valid, proceed to the next row
      wordRowCount++;
      colCount = 0;
    }

  });
