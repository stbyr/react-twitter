import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import '../styles/Post.css'
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { getOnePostById, votePost, deleteOnePost } from '../actions/shared.js'

function PostDetail (props) {
    const [ editMenuHidden, setEditMenuHidden ] = useState(true)
    const [ likeActive, setLikeActive ] = useState(false)
    const [ dislikeActive, setDislikeActive ] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const postId = props.id ? props.id : null
    const postIds = Object.keys(useSelector((state) => state.postById))

    const postInfo = useSelector((state) => state.postById)
    const post = postInfo[postId]
    const category = useSelector((state) => state.activeCategory)

    const currentUser = useSelector((state) => state.loggedUser)
    const currentUserLikes = post && postId && post['likes'].find(user => user === currentUser) ? true : false 
    const currentUserDislikes = post && postId && post['dislikes'].find(user => user === currentUser) ? true : false

    useEffect(() => {
        dispatch(getOnePostById(postId))
        
        if (currentUserLikes) {
            setLikeActive(true)
        } else if (currentUserDislikes) {
            setDislikeActive(true)
        } 

    }, [dispatch, postId, currentUserLikes, currentUserDislikes])

    const date = (post && postId) ? new Date(post.timestamp).toLocaleDateString("en-US") : null
    const time = (post && postId) ? new Date(post.timestamp).toLocaleTimeString("en-US") : null 

    const toggleMenu = (ev) => {
        ev.preventDefault()
        setEditMenuHidden(!editMenuHidden)
    }

    const blurMenu = (ev) => {
        setTimeout(function(){ 
            setEditMenuHidden(true)
        }, 100)
    }

    const toggleLike = (ev) => {
        ev.preventDefault()
        setLikeActive(!likeActive);

        // untoggle like button
        if (likeActive) {
            dispatch(votePost(postId, 'downVote', category, currentUser, true))
        } else if (!likeActive && !dislikeActive) {
            dispatch(votePost(postId, 'upVote', category, currentUser, false))
        }  
        // if I activate like button but dislike button is already active: deactivate dislike button 
        else if (!likeActive && dislikeActive) {
            setDislikeActive(!dislikeActive)
            // remove username from dislike array 
            dispatch(votePost(postId, 'upVote', category, currentUser, true))
            dispatch(votePost(postId, 'upVote', category, currentUser, false))
        }
    }

    const toggleDislike = (ev) => {
        ev.preventDefault()
        setDislikeActive(!dislikeActive)

        //untoggle dislike button 
        if (dislikeActive) {
            dispatch(votePost(postId, 'upVote', category, currentUser, true))
        } else if (!dislikeActive && !likeActive) { 
            dispatch(votePost(postId, 'downVote', category, currentUser, false))
        } else if (!dislikeActive && likeActive) {
            setLikeActive(!likeActive)
            dispatch(votePost(postId, 'downVote', category, currentUser, true))
            dispatch(votePost(postId, 'downVote', category, currentUser, false))
        } 
    }

    const onDelete = () => {
        dispatch(deleteOnePost(postId, category))
        history.push('/') 
    }

    return (
        (post && postId) ? (
        <div className="post-container">
            <div className="post">
                <div className="post-buttons">
                    <div 
                        className="btn" 
                        onClick={toggleLike}
                        style={
                            (post.author === currentUser)
                                ? {display: 'none'}
                                : {display: 'block'} 
                        }
                    >
                      	{likeActive ? <AiFillLike style={{ fill: '#F04437' }}/> : <AiOutlineLike/>}
                    </div>
                    <div 
                        className="btn" 
                        onClick={toggleDislike}
                        style={
                            (post.author === currentUser)
                                ? {display: 'none'}
                                : {display: 'block'} 
                        }
                    >
                        {dislikeActive ? <AiFillDislike style={{ fill: '#F04437' }}/> : <AiOutlineDislike/>}
                    </div>
                    <div 
                        className="btn dots" 
                        onClick={toggleMenu} 
                        tabIndex="0" 
                        onBlur={blurMenu} 
                        style={ 
                            (post.author === currentUser) 
                                ? editMenuHidden 
                                    ? {background: '#000'} 
                                    : {background: '#262B34'}
                                : {display: 'none'}
                        }
                    >
                      	<BsThreeDots />
                    </div>
                </div>
                <div className="post-main">
                    <h1 className="title">{ post.title }</h1>
                    <p className="author-date">{ post.author } · {date} {time}</p>
                    <p className="body">{ post.body }</p>
                </div>
                <div className="post-footer">
                    <p>{ post.voteScore } { post.voteScore === 1 ? 'vote' : 'votes' } · { post.commentCount } { post.commentCount === 1 ? 'comment' : 'comments' }</p>
                </div>
            </div>
            <div className="edit-menu-open" hidden={editMenuHidden}>
                <ul>
                    { postIds.find(id => id === postId) 
                        ? <Link to={{
                            pathname: `/edit/post/${postId}`,
                            state: {
                                title: post.title,
                                body: post.body,
                            }
                        }}>
                            <li>Edit post</li>
                        </Link>
                        : <Link to="notfound">
                            <li>Edit post</li>
                        </Link>
                    }   
                    <li onClick={onDelete}>Delete post</li>
                </ul>    
            </div>
        </div>
        ) : null 
	)
}

export default PostDetail;