import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import '../styles/App.css'
import Home from './Home'
import SingleViewPost from './SingleViewPost'
import CreatePost from './CreatePost'
import EditPost from './EditPost'
import EditComment from './EditComment'
import TopMenu from './TopMenu'
import Login from './Login'
import NotFound from './NotFound'

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
			      		<Route path="/login" component={Login} />
			      		<Route path="/notfound" component={NotFound} />
					    <Route component={NotFound} />
			      	</Switch>
			    </div>
		    </div>
	    </Router>
  	);
}