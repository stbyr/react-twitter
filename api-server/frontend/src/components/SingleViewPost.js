import '../styles/SingleViewPost.css'
import { useSelector } from 'react-redux'
import PostDetail from './PostDetail'
import CommentList from './CommentList'
import Redirecter from './Redirect'
import NotFound from './NotFound'

function SingleViewPost (props) {
	const { id } = props.match.params 
	const user = localStorage.getItem('user')
	const posts = Object.keys(useSelector((state) => state.postById))
	const post = posts.find(post => post === id)

	if (!post && user) {
		return <NotFound />
	} else if (!post && !user) {
		return <Redirecter referrer="/notfound" />
	}

	return (
		<div className="post-comments-container">
        	<Redirecter referrer={`/posts/${id}`} />
        	<PostDetail id={id} />
        	<CommentList id={id} />
        </div>
	)
}

export default SingleViewPost;