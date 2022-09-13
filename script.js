const gameBoard = (() => {
    const gameBoard = document.getElementById('game-board');
    const boardValues = new Array(9);

    const makeBoard = () => {
        for(let i=0; i<9; i++){
            const div = document.createElement('div');
            div.classList.add('board-square');
            div.textContent = boardValues[i];
            gameBoard.appendChild(div);
        }
    }

    return {makeBoard};
})();

const Player = (name) => {
    let score = 0;

    const getScore = () => {
        return score;
    }

    return {name, getScore};
}

const jeff = Player('Jeff');

const game = (gameBoard, player) => {
    const body = document.getElementById('main-body');
    let computerScore = 0;

    body.childNodes[1].innerHTML = `<h1>${player.name} Score: <p>${player.getScore()}</p></h1>`;
    body.childNodes[5].innerHTML = `<h1>Computer Score: <p>${computerScore}</p></h1>`;
    gameBoard.makeBoard();
}

game(gameBoard, jeff);