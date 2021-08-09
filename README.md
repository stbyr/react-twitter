# Content and Comment Web App

In this content and comment web app users are able to post content to three predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

The App was developed using React, Redux and a backend API Server to interact with the frontend. The frontend modules consist of functional components using React Hooks. The design is responsive so that the app can be used on desktop or mobile screens.

The app is an optional project of the Udacity React Nanodegree. The starter code provided by Udacity, which mostly includes the backend server, can be found [here](https://github.com/udacity/reactnd-project-readable-starter). All modifications to the backend server code as well as the entire frontend and design are developed by Stefanie Beyer, Berlin 2021. She also added a login / register system where the data gets stores in a MySQL database. Passwords are hashed via the bcrypt library.

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

## Video demonstration

For a short video demonstration, click [here](https://www.youtube.com/watch?v=m97L8NIy5i0).

## Unsolved Error Message

When navigating to a page on which you can edit a post or comment, sometimes there will be an error message saying "Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function."
This is caused by a setTimeout in the components that lead to the edit pages: Post.js, PostDetail.js and Comment.js. A setTimeout function was used in these three components to postpone onBlur events so that they fire after onClick events on the button with the three dots. I didn't find a good solution to reverse the event order and I wasn't able to cancel the setTimeout function after these components unmounted. I am open for suggestions though!