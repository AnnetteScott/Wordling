let DOM_Blocks = {
    word_selection: function (num){
        return `<option number="${num}">${num} letters</option>`
    },
    
    keyBoard_key: function (letter){
        return `<div class="keyboard_key" key="${letter}">${letter}</div>`
    },

    letter_row: function (squares = ''){
        return `<div class="letter_row">${squares}</div>`;
    },

    letter_square: function (letter = false){
        return `<div class="letter_square">
                    <div class="inner">
                        <p>${(letter ? letter.toUpperCase() : '')}</p>
                    </div>
                </div>`;
    }
}