const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'React resources',
    body: 'Hi guys, I want to learn React. Any recommendations on good resources for learning? Thanks!!',
    author: 'maria89',
    category: 'react',
    voteScore: 56,
    deleted: false,
    commentCount: 2, 
    likes: [],
    dislikes: [],
  },
  "4wf0y6qiyjabcozdd550nd3": {
    id: '4wf0y6qiyjabcozdd550nd3',
    timestamp: 1567166872634,
    title: 'Lifecycle events and hooks',
    body: "Is there an equivalent of lifecycle events like componentDidMount, componentDidUpdate etc. for functional components?",
    author: 'alicedexxter',
    category: 'react',
    voteScore: 48,
    deleted: false,
    commentCount: 1, 
    likes: [],
    dislikes: [],
  },
  "z4ni6oktym5mf1p3ln1e": {
    id: 'z4ni6oktym5mf1p3ln1e',
    timestamp: 1496945482050,
    title: 'React Hooks',
    body: "What is y'alls opinion on hooks? Do you use them? What are the benefits?",
    author: 'arthursmom',
    category: 'react',
    voteScore: 123,
    deleted: false,
    commentCount: 0,
    likes: [],
    dislikes: [],
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Redux is so complicated to setup',
    body: 'For me as a beginner it is so much work to get a Redux store running. Writing the correct reducers can be so hard. Any recommendations on how to make my life easier?',
    author: 'rickyrick',
    category: 'redux',
    voteScore: 142,
    deleted: false,
    commentCount: 0,
    likes: [],
    dislikes: [],
  },
  "33ni7ok3xo7mf1p33lnjj": {
    id: '33ni7ok3xo7mf1p33lnjj',
    timestamp: 1488469767190,
    title: 'API calls',
    body: 'Hey guys, what is the best place in my Redux app to put my api calls? I have seen people put them in the actions folder. Why is that?',
    author: 'robyn02',
    category: 'redux',
    voteScore: 47,
    deleted: false,
    commentCount: 0,
    likes: [],
    dislikes: [],
  },
  "28di6ok3yw7mf1p3l1nrk": {
    id: '28di6ok3yw7mf1p3l1nrk',
    timestamp: 1368579767199,
    title: 'Middleware',
    body: 'When is middleware applied in relationship to actions and reducers?? Help me out here pleaaase!',
    author: 'margaritasalldaylong',
    category: 'redux',
    voteScore: 35,
    deleted: false,
    commentCount: 0,
    likes: [],
    dislikes: [],
  },
  "7xi6ok3ym4mf1p13lnex": {
    id: '7xi6ok3ym4mf1p13lnex',
    timestamp: 1468499767190,
    title: 'History',
    body: "Can someone explain the history object to me? I don't really get it...",
    author: 'rickyrick',
    category: 'react router',
    voteScore: 23,
    deleted: false,
    commentCount: 0,
    likes: [],
    dislikes: [],
  },
  "88qi6ok2ynn4f1p13laet": {
    id: '88qi6ok2ynn4f1p13laet',
    timestamp: 1572499767190,
    title: 'Nested routing in react router v4 + 5',
    body: "Just found out that in react-router-v4 and 5 you don't nest <Routes />. Instead, you put them inside another <Component />. Wow. Are they going to change that for v6?",
    author: 'Lalari',
    category: 'react router',
    voteScore: 84,
    deleted: false,
    commentCount: 0,
    likes: [],
    dislikes: [],
  },
  "90ri8ok4yw4mf1p13ljm": {
    id: '90ri8ok4yw4mf1p13ljm',
    timestamp: 1538427767190,
    title: 'match.path / match.url',
    body: "What is the difference between match.path and match.url? Can someone explain it to me?",
    author: 'mamaRu',
    category: 'react router',
    voteScore: 48,
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
