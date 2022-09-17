const gameBoard = (() => {
    const board = document.getElementById('game-board');
    const boardValues = Array(3).fill().map(() => Array(3).fill());
    let countFilledFields = 0;

    const makeBoard = (currentPlayer, nextPlayer) => {
        board.innerHTML = '';
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                const div = document.createElement('div');
                div.classList.add('board-square');
                div.textContent = boardValues[i][j];
                div.addEventListener('click', () => insertValue(currentPlayer, nextPlayer, i, j));
                board.appendChild(div);
            }
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

        console.log(boardValues.length);
        for(let row=0; row<3; row++){
            for(let column=0; column<3; column++){
                if(boardValues[row][column] != sign){
                    continue;
                }
                if(row == 0 && column == 0){
                    if(boardValues[row][column] == boardValues[row+1][column+1] && boardValues[row+1][column+1] == boardValues[row+2][column+2]){
                        announceWinner(currentPlayer);
                        return;
                    }
                }
                else if(row == 0 && column == 2){
                    if(boardValues[row][column] == boardValues[row+1][column-1] && boardValues[row+1][column-1] == boardValues[row+2][column-2]){
                        announceWinner(currentPlayer);
                        return;
                    }
                }
                if(row == 0){
                    if(boardValues[row][column] == boardValues[row+1][column] && boardValues[row+1][column] == boardValues[row+2][column]){
                        announceWinner(currentPlayer);
                        return;
                    }
                }
                if(column == 0){
                    if(boardValues[row][column] == boardValues[row][column+1] && boardValues[row][column+1] == boardValues[row][column+2]){
                        announceWinner(currentPlayer);
                        return;
                    }
                }
            }
        }

        if(countFilledFields == 9){
            alert('Draw!');
            resetBoard();
        }
    }
    
    const insertValue = (currentPlayer, nextPlayer, row, column) => {
        const boardSquare = document.getElementsByClassName('board-square')[(row * 3) + column];
        if(!boardSquare.innerHTML){
            countFilledFields++;
            boardValues[row][column] = currentPlayer.getSign();
            evaluateBoard(currentPlayer);
            
            if (nextPlayer.isAI){
                const pos = []
                for(let i=0; i<3; i++){
                    for(let j=0; j<3; j++){
                        if(!boardValues[i][j]){
                            pos.push([i,j]);
                        }
                    }
                }
                
                if(countFilledFields < 9){
                    const index = Math.floor(Math.random() * pos.length);
                    boardValues[pos[index][0]][pos[index][1]] = nextPlayer.getSign();
                    countFilledFields++;
                    evaluateBoard(nextPlayer);
                }
                
                makeBoard(currentPlayer, nextPlayer);
            }
            else{
                makeBoard(nextPlayer, currentPlayer);
            }

        }
    }
    
    const resetBoard = () => {
        for(i=0; i<3; i++){
            for(j=0; j<3; j++){
                boardValues[i][j] = '';
            }
        }
        makeBoard();
    }
    
    return {makeBoard, insertValue, resetBoard};
})();

const Player = (name, isAI) => {
    let sign = '';

    const setSign = (option) => {
        sign = option;
    }

    const getSign = () => {
        return sign;
    }

    return {name, isAI, setSign, getSign};
}

const game = (() => {
    const body = document.getElementById('main-body');

    let player1, player2;

    const createPlayers = (p1Name, p1isAI, p2Name, p2isAI) => {
        player1 = Player(p1Name, p1isAI);
        player2 = Player(p2Name, p2isAI);
    }

    const showPlayers = () => {
        body.children[0].innerHTML = `<h1>${player1.name}`;
        body.children[2].innerHTML = `<h1>${player2.name}`;
    }
    
    const chooseSign = (p1Sign, p2Sign) => {
        player1.setSign(p1Sign);
        player2.setSign(p2Sign);
    }
    const play = () => {
        showPlayers();
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

gameBoard.makeBoard();