/*----- app's state (variables) -----*/
/*----- constants -----*/

const playerOne = 'x'
const playerTow = 'circle'
//5-creating array for all the wining compnations
const winingComb = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]

]
// 1-first we need to select all the CellElements.
// 2-we can loop through them ,and add event listner when you click the cell once you can't
//click it again
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()
//12 we creat event listner every time we click restert button to call the start game function

restartButton.addEventListener('click', startGame)
/*----- event listeners -----*/
// so when we start the game apply the hover state we put our elements inside, then check for wins or draws
function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(playerOne)
    cell.classList.remove(playerTow)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}
/*----- functions -----*/
 //placeMark
 //check for win
 //check for Draw
 //switch turns this is before check for win or draw 
 /*----- event listeners -----*/
//3- we creat the function to handle click, and get the board first.

function handleClick(e) {
  const cell = e.target
  //4-placeMrk, we need to know whos turn is, so we creat a varibale o turn if it's true, it's o turn, if false X turn
  const currentClass = circleTurn ? playerTow : playerOne
  //placeMark
  placeMark(cell, currentClass)
  //6-now we can check for win after creating th winin compnations
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}
//8 we creat function end game to show the winning message, but first creat winning mesg elements
//9 set the wining message to be = to check to see who is trun if circle o's wins
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}
//10 creat function isdraw so we can print out draw mesg
//11 we have to check if every single cell is fell
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(playerOne) || cell.classList.contains(playerTow)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}
// if its circle turn we switch to the oppside of circle turn
function swapTurns() {
  circleTurn = !circleTurn
}
//applying the hover state
//we want to make sure to set to who is turn currently is, first get out board
function setBoardHoverClass() {
  board.classList.remove(playerOne)
  board.classList.remove(playerTow)
  if (circleTurn) {
    board.classList.add(playerTow)
  } else {
    board.classList.add(playerOne)
  }
}
//7 creat function checkwins,and pass current class
function checkWin(currentClass) {
  // return true if all of the inside true if any of the values inside is true, and loop over the compnations
  // if current class in all the elements of the wining compination you are winner
  return winingComb.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}