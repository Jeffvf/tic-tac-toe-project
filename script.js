const gameBoard = (() => {
    const board = document.getElementById('game-board');
    const boardValues = new Array(9);

    const makeBoard = (currentSign) => {
        board.innerHTML = '';
        for(let i=0; i<9; i++){
            const div = document.createElement('div');
            div.classList.add('board-square');
            div.textContent = boardValues[i];
            div.addEventListener('click', () => insertValue(currentSign, i))
            board.appendChild(div);
        }
    }

    const insertValue = (value, index) => {
        const boardSquare = document.getElementsByClassName('board-square')[index];
        if(!boardSquare.innerHTML){
            boardValues[index] = value;
        }

        makeBoard(value);
    }

    const resetBoard = () => {
        for(i=0; i<9; i++){
            boardValues[i] = '';
        }
        makeBoard();
    }

    return {makeBoard, insertValue, resetBoard};
})();

const Player = (name) => {
    let score = 0, choice = '';

    const getScore = () => {
        return score;
    }

    const setChoice = (option) => {
        choice = option;
    }

    const getChoice = () => {
        return choice;
    }

    return {name, getScore, setChoice, getChoice};
}

const jeff = Player('Jeff');

const game = (gameBoard, player) => {
    const body = document.getElementById('main-body');
    let computerScore = 0;

    body.childNodes[1].innerHTML = `<h1>${player.name} Score: <p>${player.getScore()}</p></h1>`;
    body.childNodes[5].innerHTML = `<h1>Computer Score: <p>${computerScore}</p></h1>`;
    gameBoard.makeBoard();
}

const options = document.getElementsByClassName('opt');

for(let button of options){
    button.addEventListener('click', () => {
        gameBoard.resetBoard();
        jeff.setChoice(button.textContent);
        gameBoard.makeBoard(jeff.getChoice());
    })
}
game(gameBoard, jeff);