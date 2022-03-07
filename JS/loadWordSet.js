let fs = require("fs");
let wordNameList = [5,6,7];
var numberSelected = 5;
var masterDict;

//Read a file from a given location.
function read_file(path){
    return fs.readFileSync(path, 'utf8');
}

function loadWordSet(){
    numberSelected = $("#word_selection_box option:selected").attr('number')
    masterDict = JSON.parse(read_file(`Wordfiles/${number}-letter.json`));
    drawPlayBoard(numberSelected, numberSelected + 1);
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

function reSetGameBoard(){
    drawPlayBoard(numberSelected, numberSelected + 1);
    pickRandomWord();
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

wordOptionSelect();
masterDict = JSON.parse(read_file(`Wordfiles/${5}-letter.json`));
drawPlayBoard(numberSelected, numberSelected + 1)