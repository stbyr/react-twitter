const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2, 
    likes: [],
    dislikes: [],
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0,
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

function getByCategory (category) {
  return new Promise((res) => {
    let posts = getData()
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (id) {
  return new Promise((res) => {
    const posts = getData()
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function add (post) {
  return new Promise((res) => {
    let posts = getData()

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 0,
      deleted: false,
      commentCount: 0,
      likes: [],
      dislikes: [],
    }

    res(posts[post.id])
  })
}

function vote (id, option, user, toggle) {
  return new Promise((res) => {
    let posts = getData()
    post = posts[id]
    switch(option) {
        case "upVote":
            if (!toggle) {
              post.voteScore = post.voteScore + 1
              post.likes = post['likes'].find(item => item === user)
                ? post['likes']
                : post['likes'].concat(user)
            } else if (toggle) {
              post.voteScore = post.voteScore + 1
              post.dislikes = post['dislikes'].filter(item => item !== user)
            }
            break
        case "downVote":
            if (!toggle) {
              post.voteScore = post.voteScore - 1
              post.dislikes = post['dislikes'].find(item => item === user)
                ? post['dislikes']
                : post['dislikes'].concat(user)
            } else if (toggle) {
              post.voteScore = post.voteScore - 1
              post.likes = post['likes'].filter(item => item !== user)
            }
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (id) {
    return new Promise((res) => {
      let posts = getData()
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (id, post) {
    return new Promise((res) => {
        let posts = getData()
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(id, count) {
  const data = getData()
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  incrementCommentCounter
}
