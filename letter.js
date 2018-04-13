var Letter = function(character) {
   	this.appear = false;
   	this.character = character.toUpperCase();
   	this.letterReveal = function() {
     
     	if (this.character == " ") { 
       	this.appear = true;
       	return " ";
     
     	} if (this.appear = false) { 
       	return  " _ ";
     
     	} else { 
       	return this.character;
     	};
     	
   	};

 };

//Testing and debugging
var testLetter = new Letter ("a");
console.log(testLetter.letterReveal());


 //The Letter constructor should define:

  //* A string value to store the underlying character for the letter

  //* A boolean value that stores whether that letter has been guessed yet

  //* A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore) if the letter has not been guessed

  //* A function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correct