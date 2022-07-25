const cellElements = document.querySelectorAll("[data-cell]");
const container = document.querySelector("[data-container]");
const turn = document.querySelector("[data-turn]");
const first = document.querySelector("[data-startButton]");
const messageWinElement = document.querySelector("[data-message-win");
const message = document.querySelector("[data-message]");
const initElement = document.querySelector("[data-first]");
const restartButton = document.querySelector("[data-messageButton]");

let isOTurn;

const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const startGame = () =>{
    isOTurn = false;

    for(const cell of cellElements){
        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {once:true});
    }
    
    containerHoverClass();
    message.classList.remove("showMessage");
    message.classList.add("message");
    turn.innerText = "É A VEZ DE X";
};

const endGame = (isDraw) =>{
    if(isDraw){
        messageWinElement.innerText = "Ninguém ganhou!"
    } else{
        messageWinElement.innerText = isOTurn ? "VITÓRIA de O" : "Vítoria de X"
    };
    message.classList.add("showMessage");
};

const checkForWin = (currentPlayer) =>{
    return winningCombo.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentPlayer);
        })
    })
};

const checkForDrawn = () =>{
    return[...cellElements].every(cell =>{
        return cell.classList.contains("x") || cell.classList.contains("o");
    });
};

const placeMark = (cell, classToAdd) =>{
    cell.classList.add(classToAdd);
};

const containerHoverClass = () =>{
    container.classList.remove("o");
    container.classList.remove("x");

    if (isOTurn){
        container.classList.add("o");
    } else{
        container.classList.add("x");
    }
};

const swapTurns = () =>{
    isOTurn = !isOTurn;
    containerHoverClass();
};
const handleClick = (e) =>{
    const cell = e.target;
    const classToAdd = isOTurn ? "o" : "x";
    if(isOTurn){
        turn.innerText = "É A VEZ DE X"
    } else{
        turn.innerText = "É A VEZ DE O"
    };
    placeMark(cell, classToAdd);
    const isDraw = checkForDrawn();
    const isWin = checkForWin(classToAdd);
    if(isWin){
        endGame(false);
    }else if(isDraw){
        endGame(true);
    }else 
    swapTurns();
};

startGame();
restartButton.addEventListener("click", startGame);