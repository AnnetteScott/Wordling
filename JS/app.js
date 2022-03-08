var fs = require("fs");
var wordNameList = [5, 6];
var numberSelected = 5;
var masterDict = {};
var randomWord;
var enteredLetters = '';

///////////////////////////////////////////////////////////////////////////
///////////////////////////////General Functions//////////////////////////
///////////////////////////////////////////////////////////////////////////
function randomProperty(obj){
    let keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
}

//Read a file from a given location.
function read_file(path){
    return fs.readFileSync(path, 'utf8');
}

///////////////////////////////////////////////////////////////////////////
///////////////////////////Start up and render functions///////////////////
///////////////////////////////////////////////////////////////////////////
function loadWordSet(){
    numberSelected = parseInt($("#word_selection_box option:selected").attr('number'));
    masterDict = JSON.parse(read_file(`Wordfiles/${numberSelected}-letter.json`));
    drawPlayBoard(numberSelected, numberSelected + 1);
    drawKeyBoard();
    pickRandomWord()
}

function pickRandomWord(){
    let randomDict = randomProperty(masterDict);
    randomWord = randomProperty(randomDict);
    console.log(randomWord);
}

function wordOptionSelect(){
    elem = '<label for="wordSetSelection">Choose a word set: </label>';
    elem += '<select onchange="loadWordSet()" name="wordSetSelection" id="wordSetSelection">';
    wordNameList.forEach(function(number){
        elem += DOM_Blocks.word_selection(number);
    })
    elem += '</select>';
    $('#word_selection_box').empty();
    $('#word_selection_box').append(elem);
}

function drawPlayBoard(wordLength, guessAmount){
    let letter_grid = '';
    let letter_row = '';
    for(let r = 0; r < guessAmount; r++){
        letter_row = '';
        for(let c = 0; c < wordLength; c++){
            letter_row += DOM_Blocks.letter_square('');
        }
        letter_grid += DOM_Blocks.letter_row(letter_row);
    }
    $('#letter_grid').empty();
    $('#letter_grid').append(letter_grid);
}

function drawKeyBoard(){
    let firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    let secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    let thirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    let elem = '<div class="keyboard_row">';
    firstRow.forEach(function(letter){
        elem += DOM_Blocks.keyBoard_key(letter);
    });
    elem += '</div>';
    elem += '<div class="keyboard_row">';
    secondRow.forEach(function(letter){
        elem += DOM_Blocks.keyBoard_key(letter);
    });
    elem += '</div>';
    elem += '<div class="keyboard_row">';
    elem += '<div class="keyboard_key" key="ENTER" style="width: calc(var(--keyboard_key_size) * 1.5);aspect-ratio: 1.12;">ENTER</div>';
    thirdRow.forEach(function(letter){
        elem += DOM_Blocks.keyBoard_key(letter);
    });
    elem += '<div class="keyboard_key" key="BACK" style="width: calc(var(--keyboard_key_size) * 1.5);aspect-ratio: 1.12;">BACK</div>';
    elem += '</div>';
    $('#keyboard').empty();
    $('#keyboard').append(elem);
}

function reSetGameBoard(){
    drawPlayBoard(numberSelected, numberSelected + 1);
    pickRandomWord();
    $('#reset_button').addClass('hidden');
    drawKeyBoard();
    window.addEventListener("keydown", keyDownFunction);
}

///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////Game Play/////////////////////////////
///////////////////////////////////////////////////////////////////////////
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

function handleEnterInput(){
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
            window.removeEventListener("keydown", keyDownFunction);
            $('#reset_button').removeClass('hidden');
            
        }
        //Handle indvidual letters
        for (let i = 0; i < enteredLetters.length; i++) {
            if(randomWord.indexOf(enteredLetters.charAt(i)) < 0){// Incorrect Letter
                console.log('Incorrect Letter');
                $(`.letter_row:nth-of-type(${row_index})`).children().eq(i).addClass('wrong');
                $(`[key=${(enteredLetters.charAt(i).toUpperCase())}]`).addClass('wrong');

            }else if(enteredLetters.charAt(i) == randomWord.charAt(i)){//Correct Letter, Right Place
                console.log('Correct Letter, Right Place');
                $(`.letter_row:nth-of-type(${row_index})`).children().eq(i).addClass('correct');
                $(`[key=${(enteredLetters.charAt(i).toUpperCase())}]`).addClass('correct');
                
            }else{//Correct Letter, Wrong Place
                console.log('Correct Letter, Wrong Place');
                console.log();
                $(`.letter_row:nth-of-type(${row_index})`).children().eq(i).addClass('nearly');
                $(`[key=${(enteredLetters.charAt(i).toUpperCase())}]`).addClass('nearly');
            }
        }
        enteredLetters = '';
    }else{//Word Invalid
        console.log('Invalid Word');

    }
}

function keyDownFunction(event){
		if(event.key.length === 1 && /[a-z]/gi.test(event.key) && (enteredLetters.length < randomWord.length)){
		handleKeyPress(event);
	}else if(event.key === 'Backspace' && enteredLetters.length > 0){
		backspace();
	}else if(event.key === 'Enter' && enteredLetters.length == randomWord.length){
		handleEnterInput();
	}  
}

///////////////////////////////////////////////////////////////////////////
///////////////////////////////Start Up Functions//////////////////////////
///////////////////////////////////////////////////////////////////////////
masterDict = JSON.parse(read_file(`Wordfiles/${5}-letter.json`));
pickRandomWord();
wordOptionSelect();
drawPlayBoard(numberSelected, numberSelected + 1);
drawKeyBoard();
window.addEventListener("keydown", keyDownFunction);