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
  $('.cell').on('click', authEvents.onCellClick)
}

const onSignOutFailure = function () {
  $('#auth-display').html('<p>Error while signing out, please try again.</p>')
}

const onCreateGameSuccess = function (response) {
  $('.cell').on('click', authEvents.onCellClick)
  $('#auth-display').show()
  $('#auth-display').html('<p>Begin playing! You are X.</p>')
  store.game = response.game
  $('#sign-in-success').hide()
  $('#currentGame').show()
  $('#signOut').show()
  $('#reset-board').show()
  $('.cell').html('')
  $('.welcome').hide()
}

const onCreateGameFailure = function () {
  $('#auth-display').html('<p>Not a new game, please try again.</p>')
  $('#signIn').show()
  $('form').trigger('reset')
}

const onUpdateGameSuccess = function () {
  $('form').trigger('reset')
  $('.cell').on('click', authEvents.onCellClick)
  $('#auth-display').show()
}

const onUpdateGameFailure = function () {
  $('#auth-display').show()
  $('#auth-display').html('<p>Update error, please try again.</p>')
  $('form').trigger('reset')
}

const onPlayAgain = function () {
  // $('#auth-display').hide()
  $('#play-again-display').show()
  $('#play-again-display').html('<p>Glad you had fun! Let`s` play again!</p>')
  $('.cell').on('click', authEvents.onCellClick)
  // $('.cell').html('')
}

const findWinner = function () {
  $('#auth-display').show()
}

const ifOWins = function () {
  $('#auth-display').show()
  $('#auth-display').html('<p>O is the winner!</p>')
}

const ifXWins = function () {
  // $('#auth-display').show()
  $('#auth-display').html('<p>X is the winner!</p>')
}

const ifTie = function () {
  $('#auth-display').show()
  $('#auth-display').html('<p>It is a tie!</p>')
}

const gameOver = function () {
  $('.cell').off()
  // $('#reset-board').show()
}

// Create function that searches array if it's full or not
// will help determine tie
const checkIfNull = function (gameBoard) {
  gameBoard.every(element => element === null)
  return true
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
  onUpdateGameFailure,
  onPlayAgain,
  onUpdateGameSuccess,
  findWinner,
  ifOWins,
  ifXWins,
  gameOver,
  ifTie,
  checkIfNull
}
