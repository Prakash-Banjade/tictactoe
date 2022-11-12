//getting the different sections of game
let detailsForm = document.getElementById("playerDetails");
let gameContainer = document.getElementById("gameContainer");
let playersScore = document.getElementById("playersScore");

//importing sounds
let clickSound = new Audio('click.mp3')
let winSound = new Audio('win.mp3')
//players name input field
let player1Name = document.getElementById("player1");
let player2Name = document.getElementById("player2");

//buttons variables
let clearBtn = document.getElementById("clearBtn");
let playBtn = document.getElementById("playBtn");

// instructing the players
let instructText = document.getElementById("instruct");
let instructor = document.getElementById("instructor");

//adding click event in buttons
clearBtn.addEventListener("click", (e) => {
  player1Name.value = "";
  player2Name.value = "";
});

playBtn.addEventListener("click", (e) => {
  detailsForm.style.display = "none";
  gameContainer.style.display = "grid";
  playersScore.style.display = "block";
  //setting the players name in score board
  p1Name.innerHTML = `${player1Name.value} &nbsp;<p style="color: green;">O</p> &nbsp; :`;
  p2Name.innerHTML = `${player2Name.value} &nbsp;<p style="color: red;">X</p> &nbsp; :`;
  instructText.innerHTML = `<b>${player1Name.value}</b> make your move`;
  instructor.classList.add("player1");
});

//Score board players name
let p1Name = document.getElementById("player1Name");
let p2Name = document.getElementById("player2Name");
let p1Score = document.getElementById("p1Score");
let p2Score = document.getElementById("p2Score");

//gameOver container
let gameOverContainer = document.getElementById("gameOverContainer");
let winner = document.getElementById("winner");
//initialing the players score
let player1Score = 0;
let player2Score = 0;

//setting the players score in score board
const setPlayerScore = () => {
  p1Score.innerText = player1Score;
  p2Score.innerText = player2Score;
};
setPlayerScore();

//getting the cells
let cells = document.querySelectorAll("[data-index]");

//setting the matching cells for each cell
const cellIndex = {
  "00": [
    ["01", "02"],
    ["11", "22"],
    ["10", "20"],
  ],
  "01": [
    ["00", "02"],
    ["11", "21"],
  ],
  "02": [
    ["00", "01"],
    ["12", "22"],
    ["11", "20"],
  ],
  10: [
    ["00", "20"],
    ["11", "12"],
  ],
  11: [
    ["01", "21"],
    ["10", "12"],
  ],
  12: [
    ["02", "22"],
    ["11", "10"],
  ],
  20: [
    ["21", "22"],
    ["10", "00"],
    ["11", "02"],
  ],
  21: [
    ["20", "22"],
    ["11", "10"],
  ],
  22: [
    ["00", "11"],
    ["20", "21"],
    ["12", "02"],
  ],
};
// let cell_00 = [[01, 02], [10, 20], [11, 22]]
// let cell_01 = [[00, 02], [11, 21]]
// let cell_02 = [[00, 01], [12, 22], [11, 20]]
// let cell_10 = [[00, 20], [11, 12]]
// let cell_11 = [[01, 21], [10, 12]]
// let cell_12 = [[02, 22], [11, 10]]
// let cell_20 = [[21, 22], [10, 00], [11, 02]]
// let cell_21 = [[20, 22], [11, 10]]
// let cell_22 = [[00, 11], [20, 21], [12, 02]]

//initializing the current assets
let currentMove = "X";
let currentMoveColor = "green";
let box_left = 9;
let matches = false;

//clicking the cells
Array.from(cells).forEach((cell) => {
  cell.addEventListener("click", (e) => {
    if (e.target.innerHTML == "") {
      if (currentMove === "X") {
        clickSound.play();
        e.target.innerHTML = `<p style="color: ${currentMoveColor}">O</p>`;
        currentMove = "O";
        currentMoveColor = "red";
        box_left--;

        let currInd = e.target.dataset.index;
        cellIndex[currInd].forEach((match) => {
          let dataAttr1 = `[data-index = "${match[0]}"]`;
          let neighbour1 = document.querySelector(dataAttr1);
          let dataAttr2 = `[data-index = "${match[1]}"]`;
          let neighbour2 = document.querySelector(dataAttr2);
          if (neighbour1.firstElementChild && neighbour2.firstElementChild) {
            if (
              neighbour1.firstElementChild.innerText == "O" &&
              neighbour2.firstElementChild.innerText == "O"
            ) {
              matches = true;
              if (matches) {
                player1Score++;
                setPlayerScore();
                winner.innerText = `${player1Name.value} wins`;
                gameOverContainer.style.display = "block";
              }
              return;
            }
          }
          instructText.innerHTML = `<b>${player2Name.value}</b> make your move`;
          instructor.classList.replace("player1", "player2");
        });
      } else {
        e.target.innerHTML = `<p style="color: ${currentMoveColor}">X</p>`;
        currentMove = "X";
        currentMoveColor = "green";
        box_left--;
        clickSound.play();

        let currInd = e.target.dataset.index;
        cellIndex[currInd].forEach((match) => {
          let dataAttr1 = `[data-index = "${match[0]}"]`;
          let neighbour1 = document.querySelector(dataAttr1);
          let dataAttr2 = `[data-index = "${match[1]}"]`;
          let neighbour2 = document.querySelector(dataAttr2);
          if (neighbour1.firstElementChild && neighbour2.firstChild) {
            if (
              neighbour1.firstElementChild.innerText == "X" &&
              neighbour2.firstElementChild.innerText == "X"
            ) {
              matches = true;
              if (matches) {
                player2Score++;
                setPlayerScore();
                winner.innerText = `${player2Name.value} wins`;
                gameOverContainer.style.display = "block";
                winSound.play();
              }
              return;
            }
          }
          instructText.innerHTML = `<b>${player1Name.value}</b> make your move`;
          instructor.classList.replace("player2", "player1");
        });
      }
    }
    if (box_left === 0) {
      winner.innerText = `DRAW`;
      gameOverContainer.style.display = "block";
    }
  });
});

//play again button
document.getElementById("playAgain").addEventListener("click", () => {
  Array.from(cells).forEach((cell) => {
    cell.innerHTML = "";
    gameOverContainer.style.display = "none";
    box_left = 9;
  });
});
