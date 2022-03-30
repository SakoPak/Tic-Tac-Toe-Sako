'use strict'

const store = require('../store.js')
const authEvents = require('./events.js')

const onSignUpSuccess = function () {
  $('#sign-up-success').html('<p>Thanks for signing up!</p>')
  $('form').trigger('reset')
}

const onSignUpFailure = function (response) {
  $('#sign-up-success').html('<p>Error, please try again.</p>')
  $('form').trigger('reset')
}

const onSignInSuccess = function (response) {
  $('#sign-in-success').html('<p>Signed in! Get ready to play Tic Tac Toe!</p>')
  $('form').trigger('reset')
  store.user = response.user
  $('#sign-in-success').show()
}

const onSignInFailure = function () {
  $('#auth-display').html('<p>Could not verify player, please sign in again!</p>')
  $('form').trigger('reset')
}

const onSignOutSuccess = function () {
  $('#auth-display').show()
  $('#auth-display').html('<p>You are signed out, thanks for playing!</p>')

  $('form').trigger('reset')
  $('#signOut').hide()
  $('#currentGame').hide()
  $('#reset-board').hide()
  $('#login-button').show()
}

const onSignOutFailure = function () {
  $('#auth-display').html('<p>Error while signing out, please try again.</p>')
}

const onCreateGameSuccess = function (response) {
  $('.cell').on('click', authEvents.onCellClick)
  $('.cell').on('click', authEvents.switchPlayer)
  $('#auth-display').html('<p>Begin playing! You are X.</p>')
  console.log(response)
  store.game = response.game
  $('#sign-in-success').hide()
  $('#currentGame').show()
  $('#signOut').show()
  $('#reset-board').show()
  $('.cell').html('')
  $('.welcome').hide()
  $('.cell').on('click', authEvents.onCellClick)
  $('.cell').on('click', authEvents.switchPlayer)
}

const onCreateGameFailure = function () {
  $('#auth-display').html('<p>Not a new game, please try again.</p>')
  $('#signIn').show()
  $('form').trigger('reset')
}

// retrieving data every time user makes a new move
const gameArray = ['', '', '', '', '', '', '', '', '']
const onUpdateGame = function (index, value, gameOver) {
  gameArray[index] = index // 'cell'
  store.currentPlayer = value // 'X' or 'O'
  store.gameOver = gameOver // boolean
}
const onUpdateGameSuccess = function () {
  $('form').trigger('reset')
  $('.cell').on('click', authEvents.onCellClick)
  $('.game-standing').show()
}

const onUpdateGameFailure = function () {
  $('#auth-display').show()
  $('#auth-display').html('<p>Update error, please try again.</p>')
  $('form').trigger('reset')
}

const onPlayAgain = function () {
  $('#auth-display').show()
  $('#auth-display').html('<p>Glad you had fun! Let`s` play again!</p>')
  $('.cell').on('click', authEvents.onCellClick)
  $('.cell').on('click', authEvents.switchPlayer)
  $('form').trigger('reset')
  // $('#login-button').show()
  $('.welcome').show()
  $('.cell').html('')
}

const findWinner = function () {
  $('.game-standing').show()
}

const ifOWins = function () {
  $('#auth-display').show()
  $('#auth-display').html('<p>O is the winner!</p>')
}

const ifXWins = function () {
  $('#auth-display').show()
  $('#auth-display').html('<p>X is the winner!</p>')
}

const ifTie = function () {
  $('#auth-display').show()
  $('#auth-display').html('<p>It is a tie!</p>')
}

const gameOver = function () {
  $('.cell').off('click', authEvents.onCellClick)
  $('#reset-board').show()
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onCreateGameSuccess,
  onCreateGameFailure,
  onUpdateGame,
  onUpdateGameFailure,
  onPlayAgain,
  onUpdateGameSuccess,
  findWinner,
  ifOWins,
  ifXWins,
  gameOver,
  ifTie

}
