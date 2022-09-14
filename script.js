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
    let score = 0, sign = '';

    const getScore = () => {
        return score;
    }

    const setSign = (option) => {
        sign = option;
    }

    const getSign = () => {
        return sign;
    }

    return {name, getScore, setSign, getSign};
}

const game = (() => {
    const body = document.getElementById('main-body');

    let player1, player2;

    const createPlayers = (p1Name, p2Name) => {
        player1 = Player(p1Name);
        player2 = Player(p2Name);
    }

    const refreshScore = () => {
        body.children[0].innerHTML = `<h1>${player1.name} Score: <p>${player1.getScore()}</p></h1>`;
        body.children[2].innerHTML = `<h1>${player2.name} Score: <p>${player2.getScore()}</p></h1>`;
    }
    
    const chooseSign = (p1Sign, p2Sign) => {
        player1.setSign(p1Sign);
        player2.setSign(p2Sign);

        console.log(player1.getSign(), player2.getSign())

        return true;
    }
    
    const play = () => {
        createPlayers('Jeff', 'Computer');
        
        refreshScore();
        gameBoard.makeBoard(player1.getSign());
    }

    return {play, chooseSign};
})();

const options = document.getElementsByClassName('opt');

for(let button of options){
    button.addEventListener('click', () => {
        gameBoard.resetBoard();
        const sign = button.textContent;
        game.chooseSign(sign, sign == 'X' ? 'O':'X');
    });
}

game.play();