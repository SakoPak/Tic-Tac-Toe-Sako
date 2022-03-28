'use strict'

const store = require('../store.js')

const onSignUpSuccess = function () {
  $('#sign-up-success').html('<p>Signed up successfully!</p>')
  $('#signUp').trigger('reset')
  $('#sign-up-success').trigger('reset')
}

const onSignUpFailure = function (response) {
  $('#auth-display').html('<p>Error, please try again.</p>')
  $('form').trigger('reset')
}

const onSignInSuccess = function (response) {
  $('#sign-in-success').html('<p>Thanks for signing in! Let Us Play Tic Tac Toe!</p>')
  store.user = response.user
  $('#sign-in-success').trigger('reset')
}

const onSignInFailure = function () {
  $('#auth-display').html('Could not verify player, please sign in again!')
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
  $('#container-modal').hide()
  $('#main').show()
  console.log(response)

  $('#newGame').html('<p>Begin playing! You are X.</p>')
  store.game = response.game
  store.gameId = response.game.id
  return true
}

const onCreateGameFailure = function () {
  $('#auth-display').html('<p>Error, please try again.</p>')
  $('form').trigger('reset')
}

const onUpdateGameSuccess = function (response) {
  console.log(response)
  store.gameId = response.gameId
  $('form').trigger('reset')
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
  onUpdateGameSuccess,
  onUpdateGameFailure,
  onPlayAgain
}
