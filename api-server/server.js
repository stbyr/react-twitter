require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const categories = require('./categories')
const posts = require('./posts')
const comments = require('./comments')
const user = require('./user')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const saltRounds = 10

const app = express()

app.use(express.static('public'))
app.use(cors())

// database for login data
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "usersdb",
})

app.post('/register', bodyParser.json(), (req, res) => {
  const username = req.body.username
  const password = req.body.password

  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.query(
      "SELECT * FROM users WHERE username = ?",
      username, 
      (err, result) => {
        if (err) {
          res.send({ err: err })
        } 
          
        if (result.length > 0) {
          res.send({ message: "This username already exists. Please choose another one." })
        } else {
          db.query(
            "INSERT INTO users (username, password) VALUES (?, ?)", 
            [username, hash], 
            (err, result) => {
              console.log(err)
              res.send(result)
            }
          )}
      })
  })
})

app.post('/login', bodyParser.json(), (req, res) => {
  const username = req.body.username
  const password = req.body.password

  db.query(
    "SELECT * FROM users WHERE username = ?",
    username, 
    (err, result) => {
      if (err) {
        res.send({ err: err })
      } 
        
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            res.send(result)
          } else {
            res.send({ message: "Wrong username/password combination." })
          }
        })
      } else {
        res.send({ message: "User doesn't exist." })
      }
    }
  )
})

app.get('/categories', (req, res) => {
    categories.getAll()
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

app.get('/:category/posts', (req, res) => {
    posts.getByCategory(req.params.category)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

app.post('/posts', bodyParser.json(), (req, res) => {
    posts.add(req.body)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                 error: 'There was an error.'
          })
        }
      )
})

app.get('/posts/:id', (req, res) => {
    posts.get(req.params.id)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

app.delete('/posts/:id', (req, res) => {
    posts.disable(req.params.id)
      .then(post => comments.disableByParent(post))
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

app.post('/posts/:id', bodyParser.json(), (req, res) => {
    const { option, user, toggle } = req.body
    const id = req.params.id
    posts.vote(id, option, user, toggle)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

app.put('/posts/:id', bodyParser.json(), (req, res) => {
    posts.edit(req.params.id, req.body)
      .then(
        (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

app.get('/posts/:id/comments', (req, res) => {
    comments.getByParent(req.params.id)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

app.put('/comments/:id', bodyParser.json(), (req, res) => {
    comments.edit(req.params.id, req.body)
      .then(
        (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

app.post('/comments', bodyParser.json(), (req, res) => {
    comments.add(req.body)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

app.post('/comments/:id', bodyParser.json(), (req, res) => {
    const { option, user, toggle } = req.body
    comments.vote(req.params.id, option, user, toggle)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

app.delete('/comments/:id', (req, res) => {
    comments.disable(req.params.id)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

app.get('/user', (req, res) => {
    user.getUser()
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

app.post('/user', bodyParser.json(), (req, res) => {
    user.setUser(req.body)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})
