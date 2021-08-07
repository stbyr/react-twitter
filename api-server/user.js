const clone = require('clone')
const config = require('./config')

let db = {}

const defaultData = {
  user: ''
}

function getData () {
  let data = db['token']
  if (data == null) {
    data = db['token'] = clone(defaultData)
  }
  return data
}

function getUser () {
  return new Promise((res) => {
    const user = getData()
    const result = user['user']
    res(result)
  })
}

function setUser (user) {
  return new Promise((res) => {
    const defaultUser = getData()
    defaultUser['user'] = user['user'] 
    res(defaultUser['user'])
  })
}

module.exports = {
  getUser,
  setUser
}