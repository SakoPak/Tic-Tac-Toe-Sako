'use strict'

const store = require('../store.js')

const onSignUpSuccess = function () {
  $('#sign-up-success').html('<p>Thanks for signing up!</p>')
  $('form').trigger('reset')
}

const onSignUpFailure = function (response) {
  $('#sign-up-success').html('<p>Error, please try again.</p>')
  $('form').trigger('reset')
}

const onSignInSuccess = function (response) {
  $('#sign-in-success').html('<p>Get ready to play Tic Tac Toe!</p>')
  $('form').trigger('reset')
  store.user = response.user
}

const onSignInFailure = function () {
  $('#auth-display').html('<p>Could not verify player, please sign in again!</p>')
  $('form').trigger('reset')
}

const onSignOutSuccess = function () {
  $('#auth-display').html('<p>You are signed out, thanks for playing!</p>')

  $('form').trigger('reset')
}

const onSignOutFailure = function () {
  $('#auth-display').html('<p>Error while signing out, please try again.</p>')
}

const onCreateGameSuccess = function (response) {
  $('#auth-display').html('<p>Begin playing! You are X.</p>')
  console.log(response)
  store.game = response.game
}

const onCreateGameFailure = function () {
  $('#auth-display').html('<p>Error, please try again.</p>')
  $('form').trigger('reset')
}

// retrieving data every time user makes a new move
const gameArray = ['', '', '', '', '', '', '', '', '']
const onUpdateGame = function (index, value, gameStanding) {
  gameArray[index] = index
  store.currentPlayer = value
  store.gameStanding = gameStanding
}

const onUpdateGameFailure = function () {
  $('#auth-display').html('<p>Error, please try again.</p>')
  $('form').trigger('reset')
}

const onPlayAgain = function () {
  $('#auth-display').html('<p>Glad you had fun! Let`s` play again!</p>')
  $('form').trigger('reset')
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
  onPlayAgain
}
