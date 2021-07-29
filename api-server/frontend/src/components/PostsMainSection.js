import '../styles/PostsMainSection.css'
import TopButtons from './TopButtons.js'
import PostList from './PostList.js'

function PostsMainSection (props) {
	return (
		<div className="black-background-main">
          <TopButtons />
          <PostList />
        </div>
	)
}

export default PostsMainSection;