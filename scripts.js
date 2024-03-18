const gridElements = document.querySelectorAll('.grid-item');
const displayMessagesElement = document.querySelector('.display-messages');

function displayTurn() {
    if(turn%2 === 0) {
        displayMessagesElement.textContent = 'It\'s X\'s turn';
    }
    else {
        displayMessagesElement.textContent = 'It\'s O\'s turn';
    }
}

let turn = 0;
let gameCount = 0;
let playerOneWins = 0;
let playerTwoWins = 0;

displayTurn();

function enableClicks() {
    gridElements.forEach((element) => {
        element.addEventListener('click', handleClick);
    })
}

function disableClicks() {
    gridElements.forEach((element) => {
        element.removeEventListener('click', handleClick);
    })
}

enableClicks();

function drawTurn (element) {
    if((turn%2)===0)
    {
        element.textContent = 'X';
        turn++;
    } else {
        element.textContent = 'O';
        turn++;
    }
}

function displayWinner(winner) {
    displayMessagesElement.textContent = `${winner} Wins This Round!`
}

const playerOneScoreContainer = document.querySelector('.player-1-score');
const playerTwoScoreContainer = document.querySelector('.player-2-score');


function addScore(winner) {

    const playerOneScoreElement = document.createElement('div');
    const playerTwoScoreElement = document.createElement('div');

    playerOneScoreElement.classList.add('player-score-game');
    playerTwoScoreElement.classList.add('player-score-game');

    if(winner === 'X') {
        playerOneWins++;
        gameCount++;
        changeTotalScore('X');

        playerOneScoreElement.textContent = `Game ${gameCount}: Win`;
        playerOneScoreContainer.appendChild(playerOneScoreElement);

        playerTwoScoreElement.textContent = `Game ${gameCount}: Loss`;
        playerTwoScoreContainer.appendChild(playerTwoScoreElement);

    } else if(winner === 'O') {
        playerTwoWins++;
        gameCount++;
        changeTotalScore('O');

        playerOneScoreElement.textContent = `Game ${gameCount}: Loss`;
        playerOneScoreContainer.appendChild(playerOneScoreElement);

        playerTwoScoreElement.textContent = `Game ${gameCount}: Win`;
        playerTwoScoreContainer.appendChild(playerTwoScoreElement);

    } else if(winner === 'Draw') {
        gameCount++;

        playerOneScoreElement.textContent = `Game ${gameCount}: Draw`;
        playerTwoScoreElement.textContent = `Game ${gameCount}: Draw`;
        playerOneScoreContainer.appendChild(playerOneScoreElement);
        playerTwoScoreContainer.appendChild(playerTwoScoreElement);
    }

}

const playerOneTotalWinsElement = document.querySelector('.player-1-wins');
const playerTwoTotalWinsElement = document.querySelector('.player-2-wins')

function changeTotalScore(winner) {
    if(winner === 'X') {
        playerOneTotalWinsElement.textContent = `Player-1 Wins : ${playerOneWins}`;
    } else {
        playerTwoTotalWinsElement.textContent = `${playerTwoWins} : Player-2 Wins`;
    }
}

function handleClick() {
    drawTurn(this);
    displayTurn();

    if(checkForWinner()) {
        disableClicks();
        if((turn%2)===0)
        {
            displayWinner('O');
            addScore('O');
        } else {
            displayWinner('X');
            addScore('X');
        }
    } else if(checkForDraw()) {
        disableClicks();
        addScore ('Draw');
    }
    this.removeEventListener('click',handleClick);
}

function checkForWinner () 
{
    let turnsArr = Array.from(gridElements);

    //Check Rows
    for (let i = 0; i < 9; i+=3) {
       if((turnsArr[i].textContent === turnsArr[i+1].textContent && turnsArr[i+1].textContent === turnsArr[i+2].textContent) && turnsArr[i].textContent !== '') {
        return true;
       }
    }

    //Check Columns
    for (let i = 0; i < 3; i++) {
        if((turnsArr[i].textContent === turnsArr[i+3].textContent && turnsArr[i+3].textContent === turnsArr[i+6].textContent) && turnsArr[i].textContent !== '') {
          return true;
        }
     }

     //Check diagonals
     if((turnsArr[0].textContent === turnsArr[4].textContent && turnsArr[4].textContent === turnsArr[8].textContent) && turnsArr[0].textContent !== '') {
        return true;   
    }
    
    if((turnsArr[2].textContent === turnsArr[4].textContent && turnsArr[4].textContent === turnsArr[6].textContent) && turnsArr[2].textContent !== '') {
        return true;   
    }
    
    return false;
}

function checkForDraw() {
    let turnsArr = Array.from(gridElements);

    for (let i = 0; i < 9; i++) {
        if (turnsArr[i].textContent === '') {
            return false;
        }
    }
    return true;
}

function clearGrid() {
    let turnsArr = Array.from(gridElements);
    for (let i = 0; i < 9; i++) {
            turnsArr[i].textContent = '';
    }
}

const btnNewGame = document.querySelector('.new-game-btn');
const btnReset = document.querySelector('.reset-btn');

btnNewGame.addEventListener('click',() => {
    clearGrid();

    if(checkForWinner()) {
        gameCount++;
    }

    if(gameCount%2===0) {
        turn = 0;
    } else {
        turn = 1;
    }

    displayTurn();
    enableClicks();
});

btnReset.addEventListener('click', () => {
    playerOneScoreContainer.innerHTML='';
    playerTwoScoreContainer.innerHTML='';
    gameCount = 0;
    playerOneWins = 0;
    playerTwoWins = 0;
    playerOneTotalWinsElement.textContent = 'Player-1 Wins : 0';
    playerTwoTotalWinsElement.textContent = '0 : Player-2 Wins';
})

