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
        console.log(score);
    }

    return {name, getScore};
}

gameBoard.makeBoard();