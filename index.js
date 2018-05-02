//Dependencies
var inquirer = require('inquirer');
var Word = require('./word.js');
var game = require('./game.js');


var randomWord = game.randomWord;


var hangman = {
    randomWord: game.randomWord,
    guessesLeft: 15,

    //Empty array to hold letters guessed by user
    guessedLetters: [],

    wordToGuess: null,

    //Initiates the game
    startGame: function() {
      var that = this;

        //Empties the guessedLetters array for the next round.
        if (this.guessedLetters.length > 0) {
            this.guessedLetters = [];
        }

        this.newGame();

    },


    //Sets up for a new game
    newGame: function() {

        if (this.guessesLeft === 15) {
            console.log("Welcome! Try to guess the names of some of the world's best cheeses:");
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

            //Pulls random word from game.js (randomWord)
            var randomWord;  
            this.wordToGuess = new Word(this.randomWord);
            this.wordToGuess.getLetters();
            console.log("this random word: " + this.randomWord);

            //Displays current word as blanks.
            console.log(this.wordToGuess.displayWord());
            this.userPrompt();
        } else {
            this.resetGuessesLeft();
            this.newGame();
        }
    },

    //Resets guess left to 15; maybe should consider 10 instead.
    resetGuessesLeft: function() {
        this.guessesLeft = 15;
    },

    //Function to prompt player for a letter
    userPrompt: function() {

        var that = this;

        inquirer.prompt([{
            name: "selectLetter",
            type: "input",
            message: "Select a letter:",
            validate: function(character) {

                //Checks to make sure it's not a number or other forbidden character.
                if (character.match(/^[a-zA-Z]*$/)) {
                    return true;

                } else {
                    return false;
                }
            }

        }]).then(function(character) {

            //Changes letter inputs to capital letters to match the words to guess which are all in caps.     
            var guessesMade = (character.selectLetter).toUpperCase();

            //Adds letter to the guessedLetters array
            var attemptedGuesses = false;
            for (var i = 0; i < that.guessedLetters.length; i++) {

                if (guessesMade === that.guessedLetters[i]) {
                    attemptedGuesses = true;
                }
            }

            //If the letter is guessed, push it to the attempted guesses array.
            if (attemptedGuesses === false) {
                that.guessedLetters.push(guessesMade);

                var foundLetter = that.wordToGuess.checkLetters(guessesMade);               

                //If there is no match, the player is informed.
                if (foundLetter === 0) {
                    console.log("Incorrect! Better luck next time.");

                    //updates guesses left
                    that.guessesLeft--;
                    that.display++;
                    console.log("Guesses left: " + that.guessesLeft);

                    console.log("\n~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log(that.wordToGuess.displayWord());
                    console.log('\n~~~~~~~~~~~~~~~~~~~~~~~');

                    console.log("Letters already guessed: " + that.guessedLetters);

                } else {
                    console.log("Correct, good job!");

                    //Checks to see if player wins
                    if (that.wordToGuess.wordFound() === true) {
                        console.log(that.wordToGuess.displayWord());
                        console.log("Congratulations! You win!!");


                    } else {
                        // Otherwise show the player how many guesses are left
                        console.log("Guesses left: " + that.guessesLeft);
                        console.log(that.wordToGuess.displayWord());
                        console.log("\n~~~~~~~~~~~~~~~~~~~~~");
                        console.log("Letters already guessed: " + that.guessedLetters);
                    }
                }

                //Continue to prompt the player for a letter if guesses left are more than zero. 
                if (that.guessesLeft > 0 && that.wordToGuess.correctGuess === false) {
                    that.userPrompt();

                    //Otherwise, the game is over and the correct word is revealed 
                } else if (that.guessesLeft === 0) {
                    console.log("Game over!");
                    console.log("The correct cheese is: " + that.wordToGuess.word);
                }

                //Or use this if the play types a letter that has been guessed already.	
            } else {
                console.log("You've guessed that letter already. Please try again.")
                that.userPrompt();
            }
        });
    }
}

hangman.startGame();