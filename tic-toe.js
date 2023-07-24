
// Gameboard 
const gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
  
    const updateBoard = (index, player) => {
      board[index] = player.getMark();
    };
  
    const getBoard = () => {
      return [...board];
    };
  
    const resetBoard = () => {
      board = ["", "", "", "", "", "", "", "", ""];
    };
  
    return { updateBoard, getBoard, resetBoard };
  })();
  
  // Player 
  const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { getName, getMark };
  };
  
  // Game 
  const game = (() => {
    const player1 = Player("Player 1", "🍰");
    const player2 = Player("Player 2", "🤎");
    let currentPlayer = player1;
    let isGameOver = false;
  
    const cells = document.querySelectorAll(".cell");
    const restartBtn = document.getElementById("restart-btn");
    const message = document.getElementById("message");
  
    const updateCell = (cell, mark) => {
      cell.textContent = mark;
    };
  
    const cellClick = (e) => {
      const cell = e.target;
      const index = Array.from(cells).indexOf(cell);
  
      if (gameboard.getBoard()[index] === "" && !isGameOver) {
        gameboard.updateBoard(index, currentPlayer);
        updateCell(cell, currentPlayer.getMark());
        checkGameStatus();
        switchCurrentPLayer();
      }
    };
  
    const switchCurrentPLayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    };
  
    const checkGameStatus = () => {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      const board = gameboard.getBoard();
  
      for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          isGameOver = true;
          displayMessage(`${currentPlayer.getName()} winner!`);
          return;
        }
      }
  
      if (board.every((cell) => cell !== "")) {
        isGameOver = true;
        displayMessage("It's a tie!!");
      }
    };
  
    const restartGame = () => {
      gameboard.resetBoard();
      cells.forEach((cell) => (cell.textContent = ""));
      isGameOver = false;
      currentPlayer = player1;
      message.textContent = "";
    };
  
    const displayMessage = (msg) => {
      message.textContent = msg;
    };
  
  
    cells.forEach((cell) => cell.addEventListener("click", cellClick));
    restartBtn.addEventListener("click", restartGame);
  
    return { restartGame };
  })();
  
  game.restartGame();
  
