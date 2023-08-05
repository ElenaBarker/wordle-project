const prompt = require("prompt");
prompt.start();
const chalk = require("chalk");
const randomWords = require("./randomwords.json");

function getRandomWord() {
  return randomWords[
    Math.floor(Math.random() * randomWords.length)
  ].toUpperCase();
}

async function getGuess() {
  const guess = await prompt.get("guess");
  return guess.guess.toUpperCase();
}

function showWordWithHighlights(expectedWord, guess) {
  let wordWithHighlights = "";
  for (i = 0; i < 5; i++) {
    if (guess[i] === expectedWord[i]) {
      wordWithHighlights += chalk.bgGreen.black(guess[i]);
    } else if (expectedWord.includes(guess[i])) {
      wordWithHighlights += chalk.bgYellow.black(guess[i]);
    } else {
      wordWithHighlights += chalk.bgGray.black(guess[i]);
    }
  }
  console.log(wordWithHighlights);
  return wordWithHighlights;
}

async function playGame() {
  const expectedWord = getRandomWord();
  const totalGuessesAllowed = 6;
  let guessNumber = 1;

  do {
    let guess = await getGuess();
    console.log(expectedWord);

    if (guess === expectedWord) {
      showWordWithHighlights(expectedWord, guess);
      console.log(`You got it in ${guessNumber} guesses`);
      return;
    } else {
      showWordWithHighlights(expectedWord, guess);
      console.log(showWordWithHighlights(expectedWord, guess));

      console.log(`You have ${totalGuessesAllowed - guessNumber} guesses left`);
    }

    guessNumber++;
  } while (guessNumber <= totalGuessesAllowed);

  console.log(`Sorry! The word was ${expectedWord}. Better luck next time :)`);
}

playGame();
