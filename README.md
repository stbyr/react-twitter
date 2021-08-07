# Content and Comment Web App

In this content and comment web app users are able to post content to three predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

The App was developed using React, Redux and a backend API Server to interact with the frontend. The frontend modules consist of functional components using React Hooks. The design is responsive so that the app can be used on desktop or mobile screens.

The app is an optional project of the Udacity React Nanodegree. The starter code provided by Udacity, which mostly includes the backend server, can be found [here](https://github.com/udacity/reactnd-project-readable-starter). All modifications to the backend server code as well as the entire frontend and design are developed by Stefanie Beyer, Berlin 2021.

## Installation and launching the App

You must have npm (or yarn) installed on your computer.
Install all project dependencies:

```bash
npm install 
````
Start the React App:

```bash 
npm start
````

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## API Server

To install and start the API server, run the following commands in the directory "api-server" in another terminal window:
* `cd api-server`
* `npm install`
* `node server`

### API Endpoint

The following endpoints are available:

| Endpoints       | Usage          |          
|-----------------|----------------|
| `GET /categories` | Get all of the categories available for the app. List is found in `categories.js`. |  |
| `GET /:category/posts` | Get all of the posts for a particular category. |  |
| `POST /posts` | Add a new post. |  |
| `GET /posts/:id` | Get the details of a single post. | |
| `POST /posts/:id` | Used for voting on a post. | **option** - [String]: Either `"upVote"` or `"downVote"`. |
| `PUT /posts/:id` | Edit the details of an existing post. | **title** - [String] <br> **body** - [String] |
| `DELETE /posts/:id` | Sets the deleted flag for a post to 'true'. <br> Sets the parentDeleted flag for all child comments to 'true'. | |
| `GET /posts/:id/comments` | Get all the comments for a single post. | |
| `POST /comments` | Add a comment to a post. |  |
| `POST /comments/:id` | Used for voting on a comment. | **option** - [String]: Either `"upVote"` or `"downVote"`.  |
| `PUT /comments/:id` | Edit the details of an existing comment. |  |
| `DELETE /comments/:id` | Sets a comment's deleted flag to `true`. |  | 