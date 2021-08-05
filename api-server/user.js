const clone = require('clone')
const config = require('./config')

let db = {}

const defaultData = {
  user: ''
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getUser (token) {
  return new Promise((res) => {
    const user = getData(token)
    const result = user['user']
    res(result)
  })
}

function setUser (token, user) {
  return new Promise((res) => {
    const defaultUser = getData(token)
    defaultUser['user'] = user['user'] 
    res(defaultUser['user'])
  })
}

module.exports = {
  getUser,
  setUser
}