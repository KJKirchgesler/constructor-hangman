//Pull in letter data from letters. js
var Letter = require("./letter.js");

//Function to create word object
function Word(word) {
  this.word = word;
  //Stores letters into an array
  this.letters = [];
  //correctGuess defaults to false to keep letters hidden until guessed
  this.correctGuess = false;
  	
  //Pushes letter objects into this.letters array
  this.getLetters = function() {
    	
    	for (var i = 0; i < this.word.length; i++) {
     	 	
     	var newLetter = new Letter(this.word[i]);
      	
      this.letters.push(newLetter);


    };
  };

//Evaluates whether the word is guessed
this.wordFound = function() {
  if (this.letters.every(function(character) {
      
    return character.appear === true;
    
  }))

  {
    this.correctGuess = true;
    return true;
  };
};
 

//Checks each letter to see if it matches the guessed letters
this.checkLetters = function(guessedLetter) {
  var successfulGuess = 0;
  this.letters.forEach(function(character) {
    if (character.letter === guessedLetter) {
      character.appear = true;
      successfulGuess++;
    };
  });
    return successfulGuess;
};
  
//Shows the word with letters guesses and remaining blanks 
this.displayWord = function() {
  var display = " ";
    this.letters.forEach(function(character) {
      var currentLetter = character.revealLetter();
      display += currentLetter;
    });
    return display;
  };
};

module.exports = Word;



// Word. js creates an object representing the current word the user is attempting to guess. 

	//Definitions

		//* An array of `new` Letter objects representing the letters of the underlying word

		//* A function that returns a string representing the word. 
		//This should call the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.

		//* A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)