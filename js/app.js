/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.getElementById("message");
const resetButton = document.getElementById("reset-button");

/*-------------------------------- Functions --------------------------------*/

function init() {
    console.log("Initializing game");
    board = ["", "", "", "", "", "", "", "", ""];
    turn = "X";
    winner = false;
    tie = false;
    render();
}

function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach((mark, idx) => {
        squareEls[idx].textContent = mark;
    });
}

function updateMessage() {
    if (!winner && !tie) {
        messageEl.textContent = `It's ${turn}'s turn`;
    } else if (!winner && tie) {
        messageEl.textContent = "It's a tie!";
    } else {
        messageEl.textContent = `${turn} wins! Congratulations!`; // Announce current turn as winner
    }
}

function handleClick(event) {
    const squareIndex = event.target.id;
    if (board[squareIndex] || winner) return;

    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    render();

    // Switch turns after render, so the message shows the correct winner
    switchTurn();
}

function placePiece(index) {
    board[index] = turn;
}

function checkForWinner() {
    winningCombos.forEach((combo) => {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = true;
        }
    });
}

function checkForTie() {
    if (board.every((square) => square) && !winner) {
        tie = true;
    }
}

function switchTurn() {
    if (!winner) {
        turn = turn === "X" ? "O" : "X";
    }
}

function resetGame() {
    init();
}

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => {
    square.addEventListener("click", handleClick);
});

resetButton.addEventListener("click", resetGame);

/*------------------------------- Initialize -------------------------------*/

init();
