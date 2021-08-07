const clone = require('clone')
const posts = require('./posts')

let db = {}

const defaultData = {
  "894tuq4ut84ut8v4t8wun89g": {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false,
    likes: [],
    dislikes: [],
  },
  "8tu4bsun805n8un48ve89": {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false,
    likes: [],
    dislikes: [],
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByParent (token, parentId) {
  return new Promise((res) => {
    let comments = getData(token)
    let keys = Object.keys(comments)
    filtered_keys = keys.filter(key => comments[key].parentId === parentId && !comments[key].deleted)
    res(filtered_keys.map(key => comments[key]))
  })
}

function add (token, comment) {
  return new Promise((res) => {
    let comments = getData(token)

    comments[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      voteScore: 0,
      deleted: false,
      parentDeleted: false,
      likes: [],
      dislikes: [],
    }

    posts.incrementCommentCounter(token, comment.parentId, 1)
    res(comments[comment.id])
  })
}

function vote (token, id, option, user, toggle) {
  return new Promise((res) => {
    let comments = getData(token)
    comment = comments[id]
    switch(option) {
        case "upVote":
            if (!toggle) {
              comment.voteScore = comment.voteScore + 1
              comment.likes = comment['likes'].find(item => item === user)
                ? comment['likes']
                : comment['likes'].concat(user)
            } else if (toggle) {
              comment.voteScore = comment.voteScore + 1
              comment.dislikes = comment['dislikes'].filter(item => item !== user)
            }
            break
        case "downVote":
            if (!toggle) {
              comment.voteScore = comment.voteScore - 1
              comment.dislikes = comment['dislikes'].find(item => item === user)
                ? comment['dislikes']
                : comment['dislikes'].concat(user)
            } else if (toggle) {
              comment.voteScore = comment.voteScore - 1
              comment.likes = comment['likes'].filter(item => item !== user)
            }
            break
        default:
            console.log(`comments.vote received incorrect parameter: ${option}`)
    }
    res(comment)
  })
}

function disableByParent (token, post) {
    return new Promise((res) => {
        let comments = getData(token)
        keys = Object.keys(comments)
        filtered_keys = keys.filter(key => comments[key].parentId === post.id)
        filtered_keys.forEach(key => comments[key].parentDeleted = true)
        res(post)
    })
}

function disable (token, id) {
    return new Promise((res) => {
      let comments = getData(token)
      comments[id].deleted = true
      posts.incrementCommentCounter(token, comments[id].parentId, -1)
      res(comments[id])
    })
}

function edit (token, id, comment) {
    return new Promise((res) => {
        let comments = getData(token)
        for (prop in comment) {
            comments[id][prop] = comment[prop]
        }
        res(comments[id])
    })
}

module.exports = {
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit
}
