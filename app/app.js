// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events.js')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#auth-display').hide()
  $('#turn-display').hide()
  $('#currentGame').hide()
  $('#signOut').hide()
  $('#reset-board').hide()
  $('#signUp').on('submit', authEvents.onSignUp)
  $('#signIn').on('submit', authEvents.onSignIn)
  $('#signOut').on('click', authEvents.onSignOut)
  $('#createGame').on('click', authEvents.onCreateGame)
  $('.cell').on('click', authEvents.onCellClick)
  $('.cell').on('click', authEvents.switchPlayer)
  $('.cell').on('click', authEvents.onUpdateGame)
  $('#reset-board').on('click', authEvents.onPlayAgain)
  $('#createGame').on('click', authEvents.onHide)
  $('#auth-display').on('click', authEvents.onShow)
})
