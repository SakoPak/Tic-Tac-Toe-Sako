/* eslint-disable no-tabs */
/* eslint-disable indent */
/* eslint-disable no-undef */
'use strict'
const getFormFields = require('../../lib/get-form-fields')
const authApi = require('./api.js')
const authUi = require('./ui.js')
const store = require('../store.js')

function currentPlayerTurn () {
  return currentPlayer + "'" + ' s turn!'
}

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

let currentPlayer = 'X'
let gameOver = false
// eslint-disable-next-line prefer-const
let winningRound = false
let gameBoard = {
	game: {
		cells: ['', '', '', '', '', '', '', '', ''],
		index: 0,
		value: '',
		over: false
	}
}

// Switch Players and display whose turn it is
function switchPlayer () {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
 $('#auth-display').html(currentPlayerTurn)
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
  $('.game-standing').show()
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

// retrieving data every time user makes a new move
const gameArray = ['', '', '', '', '', '', '', '', '']

function onUpdateGame (index, value, gameOver) {
	gameArray[index] = index // 'cell'
	store.currentPlayer = value // 'X' or 'O'
	store.gameOver = gameOver // boolean

	findWinner(store.currentPlayer)
}

const onSignOut = function () {
	authApi
		.signOut()
		.then(() => authUi.onSignOutSuccess())
		.catch(() => authUi.onSignOutFailure())
}

const onCreateGame = function (event) {
	event.preventDefault()
	gameOver = false
	currentPlayer = 'X'
	gameBoard = {
		game: {
			cells: ['', '', '', '', '', '', '', '', ''],
			index: 0,
			value: '',
			over: false
		}
	}
	authApi
		.createGame()
		.then((response) => authUi.onCreateGameSuccess(response))
		// if the request/response has an error, run this callback
		.catch(() => authUi.onCreateGameFailure())
		// $('.cell').on('click', switchPlayer)
		console.log('Going from onCreateGame to findWinner function.')
findWinner()
}

// switchPlayer()

// removed the variable from this line
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

	console.log(clickedCellIndex)
  $('#auth-display').html(currentPlayerTurn())
	// $('.cell').on('click', onCellClick)
	// $('.cell').on('click', switchPlayer)
  findWinner()
}

// Reset board and player to 'X'
function onPlayAgain (event) {
  event.preventDefault()
  $('.cell').on('click', onCellClick)
	gameOver = false
	currentPlayer = 'X'
	gameBoard = {
		game: {
			cells: ['', '', '', '', '', '', '', '', ''],
			index: 0,
			value: '',
			over: false
		}
	}
  authApi
		.createGame()
		.then((response) => authUi.onCreateGameSuccess(response))
		// if the request/response has an error, run this callback
		.catch(() => authUi.onCreateGameFailure())
	$('#auth-display').html(currentPlayerTurn())
	$('.cell').on('click', switchPlayer)
	findWinner()
}

// Find winner using conditionals
function findWinner () {
  let winningRound = false
  console.log('enter win function')
	for (let i = 0; i <= 7; i++) {
		const winCondition = winCombo[i]
		const a = gameBoard.game.cells[winCondition[0]]
		const b = gameBoard.game.cells[winCondition[1]]
		const c = gameBoard.game.cells[winCondition[2]]
		if (a === '' || b === '' || c === '') {
			continue
		}
		if (a === b && b === c && a === 'O' && b === 'O' && c === 'O') {
			winningRound = true
      authUi.ifOWins()
      gameOver = true
			authUi.gameOver()
      console.log('O is winner!')
		break
      // authUi.onPlayAgain()
    } else if
      (a === b && b === c && a === 'X' && b === 'X' && c === 'X') {
        // eslint-disable-next-line no-unused-vars
        winningRound = true
        authUi.ifXWins()
        gameOver = true
        authUi.gameOver()
        console.log('X is winner!')
		break
        // authUi.onPlayAgain() //
      } else if (authUi.checkIfNull(gameBoard.game.cells) === false) {
		authUi.ifTie()
		gameOver = true
    	authUi.gameOver()
		}
	}
	// switchPlayer()
}

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
	hideMain,
	onUpdateGame
}

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