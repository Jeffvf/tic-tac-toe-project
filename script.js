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

    const announceWinner = (currentPlayer, nextPlayer) => {
        alert(currentPlayer.name + ' wins!');
        resetBoard(nextPlayer, currentPlayer);
    }
    
    const evaluateBoard = (currentPlayer, nextPlayer) => {
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
            resetBoard(nextPlayer, currentPlayer);
        }
    }
    
    const insertValue = (currentPlayer, nextPlayer, row, column) => {
        const boardSquare = document.getElementsByClassName('board-square')[(row * 3) + column];
        if(!boardSquare.innerHTML){
            countFilledFields++;
            boardValues[row][column] = currentPlayer.getSign();
            evaluateBoard(currentPlayer, nextPlayer);
            
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
                    evaluateBoard(nextPlayer, currentPlayer);
                }
                
                makeBoard(currentPlayer, nextPlayer);
            }
            else{
                makeBoard(nextPlayer, currentPlayer);
            }

        }
    }
    
    const resetBoard = (nextPlayer, currentPlayer) => {
        for(i=0; i<3; i++){
            for(j=0; j<3; j++){
                boardValues[i][j] = '';
            }
        }
        countFilledFields = 0;
        makeBoard(nextPlayer, currentPlayer);
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

    const showPlayers = () => {
        body.children[0].innerHTML = `<h1>${player1.name}`;
        body.children[2].innerHTML = `<h1>${player2.name}`;
    }

    const createPlayers = (p1Name, p1isAI, p2Name, p2isAI) => {
        player1 = Player(p1Name, p1isAI);
        player2 = Player(p2Name, p2isAI);

        console.log(player1, player2)
        showPlayers();
    }

    
    const chooseSign = (p1Sign, p2Sign) => {
        player1.setSign(p1Sign);
        player2.setSign(p2Sign);
    }
    const play = () => {
        gameBoard.makeBoard(player1, player2);
    }

    return {play, chooseSign, createPlayers};
})();

const options = document.getElementsByClassName('opt');


for(let button of options){
    button.addEventListener('click', () => {
        gameBoard.resetBoard();
        const sign = button.textContent;
        game.chooseSign(sign, sign == 'X' ? 'O':'X');
        game.play();
    });
}

const modal = (() => {
    const myModal = document.getElementById("myModal");
    const close = document.getElementsByClassName('close')[0];
    const select = document.getElementById('option');
    const confirm = document.getElementById('confirm-players');

    const closeModal = () => {
        close.addEventListener('click', () => {
            myModal.style.display = "none";
        });
        
        window.onclick = function(event) {
            if (event.target == myModal) {
                myModal.style.display = "none";
            }
        }

        confirm.addEventListener('click', () => {
            const player1Name = document.getElementById('player1').value;
            let player2Name;

            if(player2.disabled){
                player2Name = 'Computer';
            }
            else{
                player2Name = player2.value;
            }

            const isAI = player2.disabled;
            game.createPlayers(player1Name, false, player2Name, isAI);
            myModal.style.display = "none";
        })
    }
    
    const addAnotherPlayer = () => {
        player2 = document.getElementById('player2');

        select.addEventListener('change', () => {
            if(select.value == 'no'){
                player2.disabled = false;
            }
            else{
                player2.disabled = true;
            }
        });
    }

    const displayModal = () => {
        myModal.style.display = "block";
        addAnotherPlayer();
        closeModal();
    }


    return {displayModal};
})();

modal.displayModal();
gameBoard.makeBoard();