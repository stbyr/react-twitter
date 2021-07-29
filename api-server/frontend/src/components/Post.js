import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/Post.css'
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { getOnePostById, votePost, deleteOnePost } from '../actions/shared.js'
import { token, currentUser } from './App'

function Post (props) {
    const [ editMenuHidden, setEditMenuHidden ] = useState(true)
    const [ likeActive, setLikeActive ] = useState(false)
    const [ dislikeActive, setDislikeActive ] = useState(false)
    const dispatch = useDispatch()
    const postId = props.id ? props.id : null  

    useEffect(() => {
        let mounted = true 
        if (mounted) {
            dispatch(getOnePostById(token, postId))
        }
        return () => mounted = false;
    }, [dispatch, postId])

    const postInfo = useSelector((state) => state.postById)
    const post = postInfo[postId]
    const category = useSelector((state) => state.activeCategory)

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
        likeActive ? dispatch(votePost(token, postId, 'downVote', category, currentUser)) : dispatch(votePost(token, postId, 'upVote', category, currentUser)) 
        if (!likeActive && dislikeActive) {
            setDislikeActive(!dislikeActive)
            dispatch(votePost(token, postId, 'upVote', category, currentUser))
        }
    }

    const toggleDislike = (ev) => {
        ev.preventDefault()
        setDislikeActive(!dislikeActive)
        dislikeActive ? dispatch(votePost(token, postId, 'upVote', category, currentUser)) : dispatch(votePost(token, postId, 'downVote', category, currentUser))
        if (likeActive && !dislikeActive) {
            setLikeActive(!likeActive)
            dispatch(votePost(token, postId, 'downVote', category, currentUser))
        } 
    }

    const onDelete = () => {
        dispatch(deleteOnePost(token, postId, category))
    }

    return (
        (post && postId) ? (
        <div className="post-container">
            <Link to={`/posts/${postId}`}>
                <div className="post">
                    <div className="post-buttons">
                        <div className="btn" onClick={toggleLike}>
                          	{likeActive ? <AiFillLike style={{ fill: '#F04437' }}/> : <AiOutlineLike/>}
                        </div>
                        <div className="btn" onClick={toggleDislike}>
                            {dislikeActive ? <AiFillDislike style={{ fill: '#F04437' }}/> : <AiOutlineDislike/>}
                        </div>

                        <div 
                            className="btn dots" 
                            onClick={toggleMenu} 
                            tabIndex="0" 
                            onBlur={blurMenu} 
                            style={ editMenuHidden ? {background: '#000'} : {background: '#262B34'} }
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
                        <p>{ post.voteScore } votes · { post.commentCount } comments</p>
                    </div>
                </div>
            </Link>

            <div className="edit-menu-open" hidden={editMenuHidden}>
                <ul>
                    <Link to={`/edit/post/${postId}`}>
                        <li>Edit post</li>
                    </Link>
                    <li onClick={onDelete}>Delete post</li>
                </ul>   
            </div>
        </div>
        ) : null 
	)
}

export default Post;