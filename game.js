//Random cheese to select and export
var wordsToGuess = ['MANCHEGO','GOUDA','BRIE','STILTON','EPOISSES','CHEDDAR','MUNSTER','SWISS','HAVARTI','LIMBURGER','GORGONZOLA','AMERICAN','GRUYERE'];
var randomize = Math.floor(Math.random() * wordsToGuess.length);
var randomWord = wordsToGuess[randomize];
exports.randomWord = randomWord;