/* eslint-disable no-tabs */
/* eslint-disable indent */
/* eslint-disable no-undef */
'use strict'
const getFormFields = require('../../lib/get-form-fields')
const authApi = require('./api.js')
const authUi = require('./ui.js')

// Switch players from 'X' to 'O'
function switchPlayer () {
	if (currentPlayer === 'X') {
		currentPlayer = 'O'
	} else {
		currentPlayer = 'X'
	}
}

const hideMain = () => {
  $('#currentGame').hide()
  $('#reset-board').hide()
  $('#signOut').hide()
}
const onHide = () => {
	$('#login-button').hide()
}

const onShow = () => {
  $('#createGame').show()
}

const onSignUp = (event) => {
	event.preventDefault()
	console.log('in event listener!!!!!')

	// get data from form

	const form = event.target
	const data = getFormFields(form)

	// check the Network tab!
	authApi
		.signUp(data)
		// JavaScript Promises
		// if the request/response is successful, run this callback
		.then(() => authUi.onSignUpSuccess())
		// if the request/response has an error, run this callback
		.catch(() => authUi.onSignUpFailure())
}

const onSignIn = (event) => {
	event.preventDefault()

	// get data from form
	const form = event.target
	const data = getFormFields(form)
	console.log(data)

	authApi
		.signIn(data)
		// JavaScript Promises
		// if the request/response is successful, run this callback
		.then((response) => authUi.onSignInSuccess(response))
		// if the request/response has an error, run this callback
		.catch(() => authUi.onSignInFailure())
}

const onSignOut = function () {
	authApi
		.signOut()
		.then(() => authUi.onSignOutSuccess())
		.catch(() => authUi.onSignOutFailure())
}

const onCreateGame = function (event) {
	event.preventDefault()

	authApi
		.createGame()
		// JavaScript Promises
		// if the request/response is successful, run this callback
		.then((response) => authUi.onCreateGameSuccess(response))
		// if the request/response has an error, run this callback
		.catch(() => authUi.onCreateGameFailure())
}

// const hideThings = function (response) {
//   let targetDiv = document.getElementById(response)
//   if (targetDiv.style.display !== 'none') {
//     targetDiv.style.display = 'none'
//   } else {
//     targetDiv.style.display = 'block'
//   }
// }





// Game Flow Logic
// 1. Track if a cell has been clicked - event handler
// 2. Check if user checked an empty box - conditional
// 3. If user checks already occupied box, nothing should be added.
// 4. Update the game data for every move. - store data
// 5. Check the score - has user won or it is a tie. - check current cell picks against winning conditions
// 6. Display winner or declare a tie. - console.log
// 7. Stop the game - user can no longer add to board.
// 8. Give player option to play again or sign out.

// Create Required Variables and Functions
// Step 1: Set up variables
// 'player' is player. 'gameBoard' is the empty board represented as an empty array of 9 cells.
// 'gameStanding' denotes the current game status - if there's a winner/loser or it's a tie.
// 'continueGame' is a boolean, checks if game should continue or stop

let currentPlayer = 'X'
// let $gameStanding = $('.game-standing')
let continueGame = true
let gameBoard = {
	game: {
		cells: ['', '', '', '', '', '', '', '', ''],
		index: 0,
		value: '',
		over: false
	}
}
// Variable for declaring winner, loser or tie
const declareWin = () => currentPlayer + ' has won!'
const declareTie = () => 'It is a tie!'
const currentPlayerTurn = () => currentPlayer + "'" + ' s turn!'

// Display whose turn it is
$('.gameStanding').html(currentPlayerTurn())

// Step 2: Create Functions

// Check if cell has been clicked. If it's not clicked, game can continue
const onCellClick = function (event) {
	event.preventDefault()
	console.log('cell clicked')
	// store event handler data from user's click into 'clickedCell'
	const clickedCell = event.target
	const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'))

	if ($(this).is(':empty')) {
		$(this).html(currentPlayer)
		gameBoard.game.cells[clickedCellIndex] = currentPlayer
		// gameBoard.game.cells[i] = clickedCellIndex
	}

	// store data in API
	authApi
		.updateGame(
		clickedCellIndex,
		gameBoard.game.cells[clickedCellIndex],
		false
		)
		.then((response) => console.log(response))
		.catch(() => authUi.onUpdateGameFailure())

  gameBoard.game.value = currentPlayer
  switchPlayer()
	console.log(clickedCellIndex)

	// display whose turn it is on page
	$('.gameStanding').html(currentPlayerTurn())
	// Check if clicked cell is empty/been played or if 'continueGame' is false
	//   if (gameBoard[clickedCellIndex] !== '' || !continueGame) {
	//     return continueGame
	//   }
}

// function playerMove (clickedCell, clickedCellIndex) {
//   gameBoard[clickedCellIndex] = currentPlayer
//   clickedCell.innerHTML = currentPlayer
// }

// Create array of winning move combos 'winCombo'

const winCombo = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

// Find winner using conditionals

function findWinner () {
	let roundWon = false
	for (let i = 0; i <= 7; i++) {
		const winCombo = winCombo[i]
		const a = gameBoard[winCondition[0]]
		const b = gameBoard[winCondition[1]]
		const c = gameBoard[winCondition[2]]
		if (a === '' || b === '' || c === '') {
			continue
		}
		if (a === b && b === c) {
			roundWon = true
			break
		}
	}

	if (roundWon) {
		gameStanding.innerHTML = declareWin()
		continueGame = false
		return
	}
	// check for tie
	const tieRound = !gameBoard.includes('')
	if (tieRound) {
		gameStanding.innerHTML = declareTie()
		continueGame = false
		return
	}

	switchPlayer()

	// if 'continueGame' is false, then disable clicks to stop play
	if (continueGame === false) {
		document
			.querySelectorAll('.cell')
			.forEach((element) => element.removeEventListener('click', onCellClick))
	}
  // 'play 'again button' should display
  $('#reset-board').show()
}

// Reset board and player to 'X'
function onPlayAgain () {
	continueGame = true
	currentPlayer = 'X'
	gameBoard = {
		game: {
			cells: ['', '', '', '', '', '', '', '', ''],
			index: 0,
			value: '',
			over: false
		}
	}
	$('.gameStanding').html(currentPlayerTurn())
}

// document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', onCellClick))
// document.querySelector('#reset-board').addEventListener('click', onPlayAgain)

module.exports = {
	onSignUp,
	onSignIn,
	onSignOut,
	onCreateGame,
	onPlayAgain,
	switchPlayer,
	findWinner,
	onHide,
	onCellClick,
  onShow,
  hideMain
}
