const gameBoard = (() => {
    const board = document.getElementById('game-board');
    const boardValues = new Array(9);
    let countFilledFields = 0;

    const makeBoard = (currentPlayer, nextPlayer) => {
        board.innerHTML = '';
        for(let i=0; i<9; i++){
            const div = document.createElement('div');
            div.classList.add('board-square');
            div.textContent = boardValues[i];
            div.addEventListener('click', () => insertValue(currentPlayer, nextPlayer, i));
            board.appendChild(div);
        }
    }

    const announceWinner = (currentPlayer) => {
        alert(currentPlayer.name + ' wins!');
        resetBoard();
    }
    
    const evaluateBoard = (currentPlayer) => {
        if(countFilledFields < 5){
            return;
        }
        
        const sign = currentPlayer.getSign();
        
    }
    
    const insertValue = (currentPlayer, nextPlayer, index) => {
        const boardSquare = document.getElementsByClassName('board-square')[index];
        if(!boardSquare.innerHTML){
            countFilledFields++;
            boardValues[index] = currentPlayer.getSign();
            
            if (nextPlayer.isAI){
                const pos = []
                for(let i=0; i<9; i++){
                    if(!boardValues[i]){
                        pos.push(i);
                    }
                }
                
                if(countFilledFields < 9){
                    const index = Math.floor(Math.random() * pos.length);
                    boardValues[pos[index]] = nextPlayer.getSign();
                    countFilledFields++;
                    evaluateBoard(nextPlayer);
                }
                
                makeBoard(currentPlayer, nextPlayer);
            }
            else{
                makeBoard(nextPlayer, currentPlayer);
            }

            evaluateBoard(currentPlayer);
        }
    }
    
    const resetBoard = () => {
        for(i=0; i<9; i++){
            boardValues[i] = '';
        }
        makeBoard();
    }
    
    return {makeBoard, insertValue, resetBoard};
})();

const Player = (name, isAI) => {
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

    return {name, isAI, getScore, setSign, getSign};
}

const game = (() => {
    const body = document.getElementById('main-body');

    let player1, player2;

    const createPlayers = (p1Name, p1isAI, p2Name, p2isAI) => {
        player1 = Player(p1Name, p1isAI);
        player2 = Player(p2Name, p2isAI);
    }

    const refreshScore = () => {
        body.children[0].innerHTML = `<h1>${player1.name} Score: <p>${player1.getScore()}</p></h1>`;
        body.children[2].innerHTML = `<h1>${player2.name} Score: <p>${player2.getScore()}</p></h1>`;
    }
    
    const chooseSign = (p1Sign, p2Sign) => {
        player1.setSign(p1Sign);
        player2.setSign(p2Sign);
    }
    const play = () => {
        refreshScore();
        gameBoard.makeBoard(player1, player2);
    }

    return {play, chooseSign, createPlayers};
})();

const options = document.getElementsByClassName('opt');

for(let button of options){
    button.addEventListener('click', () => {
        gameBoard.resetBoard();
        const sign = button.textContent;
        game.createPlayers('Jeff', false, 'Computer', true);
        game.chooseSign(sign, sign == 'X' ? 'O':'X');
        game.play();
    });
}
