'use strict'
const store = require('../store.js')

const signUp = function (data) {
  console.log(store)
  return $.ajax({
    method: 'POST',
    url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-up',
    data
  })
}
const signIn = function (data) {
  return $.ajax({
    method: 'POST',
    url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-in',
    data
  })
}

const signOut = function () {
  return $.ajax({
    method: 'DELETE',
    url: 'https://tic-tac-toe-api-development.herokuapp.com/signout',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

const createGame = function (data) {
  return $.ajax({
    method: 'POST',
    url: 'https://tic-tac-toe-api-development.herokuapp.com/games',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

const updateGame = function (data) {
  return $.ajax({
    method: 'PATCH',
    url: 'https://tic-tac-toe-api-development.herokuapp.com/games/',
    data,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  createGame,
  updateGame
}
