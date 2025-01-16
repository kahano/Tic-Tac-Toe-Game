const gameboard = document.querySelector("#GameBoard")
const infoDisplay = document.querySelector("#info")
const GameOver = document.querySelector("#finish")
let go = "circle"
const startCells = ["", "", "","", "", "", "", "", ""]

infoDisplay.textContent = "Circle goes first"

function createBoards(){

    startCells.forEach((cell,index) =>{
       const cellElement =  document.createElement("div");
        cellElement.classList.add("square")
        cellElement.id = index;
        cellElement.addEventListener("click",addGo)
       gameboard.appendChild(cellElement);
    })

}

createBoards()

function addGo(e){
    const goDisplay = document.createElement("div");
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "circle" ? "cross": "circle"
    infoDisplay.textContent = "it is now " + go + " 's turn"
    e.target.removeEventListener("click",addGo)
    checkScore()
}

function checkScore(){
    const squares = document.querySelectorAll(".square")
    const winningCombos = [
        [0,1,2] , [3,4,5] , [6,7,8],
        [0,3,6] , [1,4,7] , [2,5,8], 
        [0,4,8] , [2,4,6]
    ]

   

    let circleWins = false;
    let crossWins = false;

    winningCombos.forEach(arr => {
        if (arr.every(elem => squares[elem].firstChild?.classList.contains("circle"))) {
            circleWins = true;
        }

        if (arr.every(elem => squares[elem].firstChild?.classList.contains("cross"))) {
            crossWins = true;
        }
    });

    if (circleWins) {
        infoDisplay.textContent = "Circle Wins!";
        GameOver.textContent = "Game Over !";
        squares.forEach(square => square.replaceWith(square.cloneNode(true)));
    } else if (crossWins) {
        infoDisplay.textContent = "Cross Wins!";
        GameOver.textContent = "Game Over !";
        squares.forEach(square => square.replaceWith(square.cloneNode(true)));
    } else if (Array.from(squares).every(square => square.firstChild)) {
        // Check for a draw if all squares are filled
        infoDisplay.textContent = "It's a Draw!";
        GameOver.textContent = "Game Over !";
        squares.forEach(square => square.replaceWith(square.cloneNode(true)));
    } else {
        // Game is still ongoing
        infoDisplay.textContent = "Game is still ongoing";
    }

   
}

