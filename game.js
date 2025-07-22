const wordGrid = document.querySelector(".wordGrid");
const wordRows = wordGrid.querySelectorAll(".wordRow");

const grid = Array.from(wordRows).map((row) => Array.from(row.children));

let currentRow = 0;
let currentCol = 0;
let currentWord = [];
let correctWord = [];

const wordUrl = "https://words.dev-apis.com/word-of-the-day";

async function getWord() {
  const promise = await fetch(wordUrl);
  const processedWord = await promise.json();
  const wordOfTheDay = processedWord.word;

  for (let i = 0; i < wordOfTheDay.length; i++) {
    const letter = wordOfTheDay[i].toUpperCase();
    correctWord.push(letter);
  }
  console.log("Word of the day:", correctWord.join(""));
}

getWord();

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function removeLetter() {
  currentCol--;
  currentWord.pop();
  grid[currentRow][currentCol].textContent = "";
}

function insertLetter(letter) {
  grid[currentRow][currentCol].textContent = letter;
  currentWord.push(letter);
  currentCol++;
}

const post_url = "https://words.dev-apis.com/validate-word";

async function validateWord(word){
  try {
    const response = await fetch(post_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ word })
    });
     if (!response.ok) {
      throw new Error("Network error");
    }

    const result = await response.json();

    // Assuming the API returns { valid: true } or { valid: false }
    console.log("Word validation result:", result.validWord)
    return result.validWord;
    
  } catch (error) {
    console.error("Error validating word:", error);
    return false;
  }

}

checkLetter = (letter, currentWord) => {
  const currentSpot = currentWord.indexOf(letter);
  if (currentSpot !== -1 && correctWord[currentSpot] === letter) {
    return "correct";
  } else if (correctWord.includes(letter)) {
    return "present";
  }
  else {
    return "absent";
  }
};

function nextRow() {
  currentRow++;
  currentCol = 0;
  currentWord = [];
}

function checkWord() {
  for (let i = 0; i < currentWord.length; i++) {
    const letter = currentWord[i];
    const state = checkLetter(letter, currentWord);
    grid[currentRow][i].dataset.state = state;
  }

  nextRow();
}

document.addEventListener("keydown", async (e) => {
  if (e.key === "Backspace") {
    if (currentCol > 0) {
      removeLetter();
    }
  } else if (isLetter(e.key) && currentCol < 5) {
    const letter = e.key.toUpperCase();
    insertLetter(letter);
  }
  if (currentCol === 5 && e.key === "Enter") {
    const wordToCheck = currentWord.join("");
    const isValid = await validateWord(wordToCheck);
    if (isValid) {
      checkWord();
    }
    else {
      console.log("Invalid word, please try again.");
    }
  }
});
