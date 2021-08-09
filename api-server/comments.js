const clone = require('clone')
const posts = require('./posts')

let db = {}

const defaultData = {
  "894tuq4ut84ut8v4t8wun89g": {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'I took the Udacity nanodegree course. I can recommend! You will also learn Redux and React Native. You should have a good level of JavaScript though.',
    author: 'andrewloyd',
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
    body: 'There are also some free courses on Udemy or Coursera.',
    author: 'missthing',
    voteScore: 2,
    deleted: false,
    parentDeleted: false,
    likes: [],
    dislikes: [],
  },
  "55wf0y6qiyjabcozdd550nd3": {
    id: '55wf0y6qiyjabcozdd550nd3',
    parentId: "4wf0y6qiyjabcozdd550nd3",
    timestamp: 1469499767190,
    body: 'There is the useEffect hook which is equivalt to componentDidMount.',
    author: 'missthing',
    voteScore: 2,
    deleted: false,
    parentDeleted: false,
    likes: [],
    dislikes: [],
  }
}

function getData () {
  let data = db['token']
  if (data == null) {
    data = db['token'] = clone(defaultData)
  }
  return data
}

function getByParent (parentId) {
  return new Promise((res) => {
    let comments = getData()
    let keys = Object.keys(comments)
    filtered_keys = keys.filter(key => comments[key].parentId === parentId && !comments[key].deleted)
    res(filtered_keys.map(key => comments[key]))
  })
}

function add (comment) {
  return new Promise((res) => {
    let comments = getData()

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

    posts.incrementCommentCounter(comment.parentId, 1)
    res(comments[comment.id])
  })
}

function vote (id, option, user, toggle) {
  return new Promise((res) => {
    let comments = getData()
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

function disableByParent (post) {
    return new Promise((res) => {
        let comments = getData()
        keys = Object.keys(comments)
        filtered_keys = keys.filter(key => comments[key].parentId === post.id)
        filtered_keys.forEach(key => comments[key].parentDeleted = true)
        res(post)
    })
}

function disable (id) {
    return new Promise((res) => {
      let comments = getData()
      comments[id].deleted = true
      posts.incrementCommentCounter(comments[id].parentId, -1)
      res(comments[id])
    })
}

function edit (id, comment) {
    return new Promise((res) => {
        let comments = getData()
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
