import '../styles/SingleViewPost.css'
import PostDetail from './PostDetail.js'
import CommentList from './CommentList.js'

function SingleViewPost (props) {
	const { id } = props.match.params 

	return (
		<div className="post-comments-container">
        	<PostDetail id={id} />
        	<CommentList id={id} />
        </div>
	)
}

export default SingleViewPost;