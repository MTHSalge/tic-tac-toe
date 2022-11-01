const boardRegions = document.querySelectorAll("#gameBoard span");
let vBoard = [];
let playerTurn = "";

function updateTitle() {
  const playerInput = document.getElementById(playerTurn);
  document.getElementById("playerTurn").innerText = playerInput.value;
}

function initGame() {
  vBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  playerTurn = "player1";
  document.querySelector("h2").innerHTML =
    'Player Turn: <span id="playerTurn"></span>';
  updateTitle();
  boardRegions.forEach(function (element) {
    element.classList.remove("win");
    element.innerText = "";
    element.classList.add("cursor-pointer");
    element.addEventListener("click", handleBoardClick);
  });
}

function getWinCondition() {
  const winCondition = [];
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[0][1] &&
    vBoard[0][0] === vBoard[0][2]
  )
    winCondition.push("0.0", "0.1", "0.2");
  if (
    vBoard[1][0] &&
    vBoard[1][0] === vBoard[1][1] &&
    vBoard[1][0] === vBoard[1][2]
  )
    winCondition.push("1.0", "1.1", "1.2");
  if (
    vBoard[2][0] &&
    vBoard[2][0] === vBoard[2][1] &&
    vBoard[2][0] === vBoard[2][2]
  )
    winCondition.push("2.0", "2.1", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][0] &&
    vBoard[0][0] === vBoard[2][0]
  )
    winCondition.push("0.0", "1.0", "2.0");
  if (
    vBoard[0][1] &&
    vBoard[0][1] === vBoard[1][1] &&
    vBoard[0][1] === vBoard[2][1]
  )
    winCondition.push("0.1", "1.1", "2.1");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][2] &&
    vBoard[0][2] === vBoard[2][2]
  )
    winCondition.push("0.2", "1.2", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][1] &&
    vBoard[0][0] === vBoard[2][2]
  )
    winCondition.push("0.0", "1.1", "2.2");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][1] &&
    vBoard[0][2] === vBoard[2][0]
  )
    winCondition.push("0.2", "1.1", "2.0");
  return winCondition;
}

function disableRegion(element) {
  element.classList.remove("cursor-pointer");
  element.removeEventListener("click", handleBoardClick);
}

function handleWin(regions) {
  regions.forEach(function (region) {
    document
      .querySelector('[data-region="' + region + '"]')
      .classList.add("win");
  });
  const playerName = document.getElementById(playerTurn).value;
  document.querySelector("h2").innerHTML = playerName + " won!!";
}

function handleBoardClick(ev) {
  const span = ev.currentTarget;
  const region = span.dataset.region; // N.N
  const dataSplit = region.split("."); // ["N", "N"]
  const row = dataSplit[0];
  const column = dataSplit[1];
  if (playerTurn === "player1") {
    span.innerText = "X";
    vBoard[row][column] = "X";
  } else {
    span.innerText = "O";
    vBoard[row][column] = "O";
  }
  disableRegion(span);
  const winCondition = getWinCondition();
  if (winCondition.length > 0) {
    handleWin(winCondition);
    endGame();
  } else if (vBoard.flat().includes("")) {
    playerTurn = playerTurn === "player1" ? "player2" : "player1";
    updateTitle();
  } else {
    document.querySelector("h2").innerHTML = "Draw!";
  }
}

function endGame() {
  boardRegions.forEach(function (element) {
    element.removeEventListener("click", handleBoardClick);
    element.classList.remove("cursor-pointer");
  });
}

document.getElementById("start").addEventListener("click", initGame);
