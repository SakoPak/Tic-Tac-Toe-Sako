'use strict'
const getFormFields = require('../../lib/get-form-fields')
const authApi = require('./api.js')
const authUi = require('./ui.js')

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

  // get data from form
  const form = event.target
  const data = getFormFields(form)
  console.log(data)

  authApi
    .createGame(data)
  // JavaScript Promises
  // if the request/response is successful, run this callback
    .then((response) => authUi.onCreateGameSuccess(response))
  // if the request/response has an error, run this callback
    .catch(() => authUi.onCreateGameFailure())
}

const onUpdateGame = function (event) {
  event.preventDefault()

  // get data from form
  const form = event.target
  const data = getFormFields(form)
  console.log(data)

  authApi
    .updateGame(data)
  // JavaScript Promises
  // if the request/response is successful, run this callback
    .then((response) => authUi.onUpdateGameSuccess(response))
  // if the request/response has an error, run this callback
    .catch(() => authUi.onUpdateGameFailure())
}

const turn = document.getElementById('turn')
const boxes = document.querySelectorAll('#main div')
let X_or_O = 0

function selectWinnerBoxes (b1, b2, b3) {
  b1.classList.add('win')
  b2.classList.add('win')
  b3.classList.add('win')
  turn.innerHTML = b1.innerHTML + ' wins!'
  turn.style.fontSize = '40px'
}

function getWinner () {
  const box1 = document.getElementById('box1')
  const box2 = document.getElementById('box2')
  const box3 = document.getElementById('box3')
  const box4 = document.getElementById('box4')
  const box5 = document.getElementById('box5')
  const box6 = document.getElementById('box6')
  const box7 = document.getElementById('box7')
  const box8 = document.getElementById('box8')
  const box9 = document.getElementById('box9')

  if (
    box1.innerHTML !== '' && box1.innerHTML === box2.innerHTML && box1.innerHTML === box3.innerHTML
  ) { selectWinnerBoxes(box1, box2, box3) }

  if (
    box4.innerHTML !== '' && box4.innerHTML === box5.innerHTML && box4.innerHTML === box6.innerHTML
  ) { selectWinnerBoxes(box4, box5, box6) }

  if (
    box7.innerHTML !== '' && box7.innerHTML === box8.innerHTML && box7.innerHTML === box9.innerHTML
  ) { selectWinnerBoxes(box7, box8, box9) }

  if (
    box1.innerHTML !== '' && box1.innerHTML === box4.innerHTML && box1.innerHTML === box7.innerHTML
  ) { selectWinnerBoxes(box1, box4, box7) }

  if (
    box2.innerHTML !== '' && box2.innerHTML === box5.innerHTML && box2.innerHTML === box8.innerHTML
  ) { selectWinnerBoxes(box2, box5, box8) }

  if (
    box3.innerHTML !== '' && box3.innerHTML === box6.innerHTML && box3.innerHTML === box9.innerHTML
  ) { selectWinnerBoxes(box3, box6, box9) }

  if (
    box1.innerHTML !== '' && box1.innerHTML === box5.innerHTML && box1.innerHTML === box9.innerHTML
  ) { selectWinnerBoxes(box1, box5, box9) }

  if (
    box3.innerHTML !== '' && box3.innerHTML === box5.innerHTML && box3.innerHTML === box7.innerHTML
  ) { selectWinnerBoxes(box3, box5, box7) }
}

for (let i = 0; i < boxes.length; i++) {
  boxes[i].onclick = function () {
    if (this.innerHTML !== 'X' && this.innerHTML !== 'O') {
      if (X_or_O % 2 === 0) {
        console.log(X_or_O)
        this.innerHTML = 'X'
        turn.innerHTML = 'O Turn Now'
        getWinner()
        X_or_O += 1
      } else {
        console.log(X_or_O)
        this.innerHTML = 'O'
        turn.innerHTML = 'X Turn Now'
        getWinner()
        X_or_O += 1
      }
    }
  }
}

const onPlayAgain = function () {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].classList.remove('win')
    boxes[i].innerHTML = ''
    turn.innerHTML = 'Play'
    turn.style.fontSize = '40px'
  }
}
document.getElementById('playAgain').addEventListener('click', onPlayAgain)

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onCreateGame,
  onUpdateGame,
  onPlayAgain
}
