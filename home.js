const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetButton = document.getElementById('reset');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

// Winning conditions
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Update the game status
function updateStatus(message) {
  statusText.textContent = message;
}

// Show popup message
function showPopup(message) {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.innerHTML = `
    <p>${message}</p>
    <button id="restart">Restart</button>
    <button id="quit">Quit</button>
  `;
  document.body.appendChild(popup);

  // Restart button logic
  document.getElementById('restart').addEventListener('click', () => {
    popup.remove();
    resetGame();
  });

  // Quit button logic
  document.getElementById('quit').addEventListener('click', () => {
    window.close();
  });
}

// Check for winner
function checkWinner() {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      isGameActive = false;
      updateStatus(`Player ${board[a]} wins!`);
      showPopup(`Player ${board[a]} wins!`);
      return;
    }
  }

  if (!board.includes('')) {
    isGameActive = false;
    updateStatus('Game is a draw!');
    showPopup('Game is a draw!');
  }
}

// Handle cell click
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (board[index] !== '' || !isGameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkWinner();

  if (isGameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus(`Player ${currentPlayer}'s turn`);
  }
}

// Reset the game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;

  cells.forEach(cell => (cell.textContent = ''));
  updateStatus(`Player X's turn`);
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
