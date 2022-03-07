let fs = require("fs");
let wordNameList = [5];
var numberSelected = 5;
var masterDict;

//Read a file from a given location.
function read_file(path){
    return fs.readFileSync(path, 'utf8');
}

function loadWordSet(){
    numberSelected = $("#word_selection_box option:selected").attr('number')
    masterDict = JSON.parse(read_file(`Wordfiles/${number}-letter.json`));
}

function wordOptionSelect(){
    elem = '<label for="wordSetSelection">Choose a Word Set:</label>';
    elem += '<select onchange="loadWordSet()" name="wordSetSelection" id="wordSetSelection">';
    wordNameList.forEach(function(number){
        elem += DOM_Blocks.word_selection(number);
    })
    elem += '</select>';
    $('#word_selection_box').empty();
    $('#word_selection_box').append(elem);
}

wordOptionSelect();
masterDict = JSON.parse(read_file(`Wordfiles/${5}-letter.json`));