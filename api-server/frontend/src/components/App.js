import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import '../styles/App.css'
import Home from './Home.js'
import SingleViewPost from './SingleViewPost.js'
import CreatePost from './CreatePost.js'
import EditPost from './EditPost.js'
import EditComment from './EditComment.js'
import TopMenu from './TopMenu.js'

export const token = 'tokenXY'
export const currentUser = 'stefaniebeyer123'

export function App () {
  	return (
	   	<Router>	
		    <div className="body">
			    <div className="black-background">
			    <TopMenu />
			      	<Switch>
			      		<Route path="/" exact component={Home} />
			      		<Route path="/create-post" component={CreatePost} />
			      		<Route path="/posts/:id" component={SingleViewPost} />
			      		<Route path="/edit/post/:id" component={EditPost} />
			      		<Route path="/edit/comment/:parentId/:id" component={EditComment} />
			      	</Switch>
			    </div>
		    </div>
	    </Router>
  	);
}


