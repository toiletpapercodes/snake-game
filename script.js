const board = document.getElementById("board");
let currentPlayer = "X";
const cells = [];

function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  if (cells.every(cell => cell)) {
    return "draw";
  }
  return null;
}

function handleCellClick(event) {
  const cell = event.target;
  if (!cell.textContent) {
    cell.textContent = currentPlayer;
    cells[cell.dataset.index] = currentPlayer;
    const winner = checkWinner();
    if (winner) {
      if (winner === "draw") {
        alert("Unentschieden!");
      } else {
        alert(`Spieler ${winner} gewinnt!`);
      }
      location.reload();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;
  cell.addEventListener("click", handleCellClick);
  cells.push(null);
  board.appendChild(cell);
}