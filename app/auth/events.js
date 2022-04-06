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

function switchPlayer () {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
 $('#turn-display').html(currentPlayerTurn)
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
  $('#turn-display').show()
}

const onSignUp = (event) => {
	event.preventDefault()
	const form = event.target
	const data = getFormFields(form)
	authApi
		.signUp(data)
		.then(() => authUi.onSignUpSuccess())
		.catch(() => authUi.onSignUpFailure())
}

const onSignIn = (event) => {
	event.preventDefault()
	const form = event.target
	const data = getFormFields(form)
	console.log(data)

	authApi
		.signIn(data)
		.then((response) => authUi.onSignInSuccess(response))
		.catch(() => authUi.onSignInFailure())
}

const gameArray = ['', '', '', '', '', '', '', '', '']

function onUpdateGame (index, value, gameOver) {
	gameArray[index] = index
	store.currentPlayer = value
	store.gameOver = gameOver

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
		.catch(() => authUi.onCreateGameFailure())
	console.log('Going from onCreateGame to findWinner function.')
	findWinner()
}

const onCellClick = function (event) {
	event.preventDefault()
	console.log('cell clicked')
	const clickedCell = event.target
	const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'))

	if ($(this).is(':empty')) {
		$(this).html(currentPlayer)
		gameBoard.game.cells[clickedCellIndex] = currentPlayer
	}

	authApi
		.updateGame(
		clickedCellIndex,
		gameBoard.game.cells[clickedCellIndex],
		false
		)
		.then((response) => console.log(response))
		.catch(() => authUi.onUpdateGameFailure())

	console.log(clickedCellIndex)
	$('#auth-display').hide()
	$('#turn-display').show()
$('#turn-display').html(currentPlayerTurn())
  findWinner()
}

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
		.catch(() => authUi.onCreateGameFailure())
	$('#turn-display').html(currentPlayerTurn())
	$('.cell').on('click', switchPlayer)
	findWinner()
}

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
    } else if
      (a === b && b === c && a === 'X' && b === 'X' && c === 'X') {
        // eslint-disable-next-line no-unused-vars
        winningRound = true
        authUi.ifXWins()
        gameOver = true
        authUi.gameOver()
        console.log('X is winner!')
		break
      } else if (authUi.checkIfTie(gameBoard.game.cells) === true) {
		authUi.ifTie()
		gameOver = true
    	authUi.gameOver()
		}
	}
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
