const clone = require('clone')
const config = require('./config')

let db = {}

const defaultData = {
  categories: [
      {
        name: 'react',
        path: 'react'
      },
      {
        name: 'redux',
        path: 'redux'
      },
      {
        name: 'react router',
        path: 'react router'
      }
  ]
}

function getData () {
  let data = db['token']
  if (data == null) {
    data = db['token'] = clone(defaultData)
  }
  return data
}

function getAll () {
  return new Promise((res) => {
    res(getData())
  })
}

module.exports = {
  getAll
}
