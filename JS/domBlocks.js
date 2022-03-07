let DOM_Blocks = {
    word_selection: function (num){
        return `<option number="${num}">${num}</option>`
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