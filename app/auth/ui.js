'use strict'

const store = require('../store.js')

const onSignUpSuccess = function () {
  $('#auth-display').html('<p>Thanks for signing up!</p>')
  $('form').trigger('reset')
}

const onSignUpFailure = function (response) {
  $('#auth-display').html('<p>Error, please try again.</p>')
  $('form').trigger('reset')
}

const onSignInSuccess = function (response) {
  $('#auth-display').html('<p>Get ready to play Tic Tac Toe!</p>')
  $('form').trigger('reset')
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

const onCreateGameSuccess = function () {
  $('#auth-display').html('<p>Begin playing! You are X.</p>')
  $('form').trigger('reset')
}

const onCreateGameFailure = function () {
  $('#auth-display').html('<p>Error, please try again.</p>')
  $('form').trigger('reset')
}

const onUpdateGameSuccess = function () {
  // $('#auth-display').html('<p>Error, please try again.</p>')
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
