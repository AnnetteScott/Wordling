var randomWord;
var enteredLetters = '';

function randomProperty(obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

function pickRandomWord(){
    let randomDict = randomProperty(masterDict);
    randomWord = randomProperty(randomDict);
}
pickRandomWord();

function handleKeyPress(event){
    $('.letter_square .inner p').each((index, elem) => {
        if($(elem).text() == ''){
            $(elem).text(event.key.toUpperCase());
            enteredLetters += event.key.toLowerCase();
            return false;
        }
    });
}

function backspace(){
	$($('.letter_square .inner p').get().reverse()).each((index, elem) => {
		if($(elem).text() != ''){
            $(elem).text('');
            enteredLetters = enteredLetters.substring(0, (enteredLetters.length - 1));
            return false;
        }
	});
}

function handleInput(){
    if(masterDict[enteredLetters[0].toUpperCase()].includes(enteredLetters)){
        // Get the index of the last full row.
        let row_index = undefined;
        $('.letter_row').each((index, row) => {
            if(row.querySelector('p').innerText == ''){
                row_index = index;
                return false;
            }
        });
        $(`.letter_row:nth-of-type(${row_index})`).addClass('done');

        if(enteredLetters === randomWord){//Correct Guess
            console.log('Correct Guess');
            $(`.letter_row:nth-of-type(${row_index})`).children().addClass('correct');
            window.removeEventListener("keydown", keyDownFunction);
            
        }else{//Handle indvidual letters
            for (let i = 0; i < enteredLetters.length; i++) {
                if(randomWord.indexOf(enteredLetters.charAt(i)) < 0){// Incorrect Letter
                    console.log('Incorrect Letter');
					$(`.letter_row:nth-of-type(${row_index})`).children().eq(i).addClass('wrong');

                }else if(enteredLetters.charAt(i) == randomWord.charAt(i)){//Correct Letter, Right Place
                    console.log('Correct Letter, Right Place');
					$(`.letter_row:nth-of-type(${row_index})`).children().eq(i).addClass('correct');
                    
                }else{//Correct Letter, Wrong Place
                    console.log('Correct Letter, Wrong Place');
                    console.log();
					$(`.letter_row:nth-of-type(${row_index})`).children().eq(i).addClass('nearly');

                }
            }
        }
        enteredLetters = '';
    }else{//Word Invalid
        console.log('Invalid Word');

    }
}
console.log(randomWord)

window.addEventListener("keydown", keyDownFunction);

function keyDownFunction(event){
   if(event.key.length === 1 && /[a-z]/gi.test(event.key) && (enteredLetters.length < randomWord.length)){
        handleKeyPress(event);
    }else if(event.key === 'Backspace' && enteredLetters.length > 0){
        backspace();
    }else if(event.key === 'Enter' && enteredLetters.length == randomWord.length){
        handleInput();
    }  
}

function reSetGameBoard(){
    window.addEventListener("keydown", keyDownFunction);
    $('.letter_square .inner p').each((index, elem) => {
        $(elem).text('');
    });
    $('.letter_row').each((index, elem) => {
        $(elem).removeClass('done');
    });
    $('.letter_square').each((index, elem) => {
        $(elem).removeClass('correct');
        $(elem).removeClass('nearly');
        $(elem).removeClass('wrong');
    });
}

function drawPlayBoard(wordLength, guessAmount){
    let letter_grid = '';
    let letter_row = '';
    for(let r = 0;r < guessAmount;r++){
        letter_row = '';
        for(let c = 0;c < wordLength;c++){
            letter_row += DOM_Blocks.letter_square('');
        }
        letter_grid += DOM_Blocks.letter_row(letter_row);
    }
    $('#letter_grid').empty();
    $('#letter_grid').append(letter_grid);
}