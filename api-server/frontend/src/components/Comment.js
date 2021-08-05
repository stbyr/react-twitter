import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/Comment.css'
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { voteComment, deleteOneComment } from '../actions/shared.js'
import { token } from './App'

function Comment (props) {
	const [ editMenuHidden, setEditMenuHidden ] = useState(true)
    const [ likeActive, setLikeActive ] = useState(false)
    const [ dislikeActive, setDislikeActive ] = useState(false)
    const dispatch = useDispatch()
    const { id, parentId } = props
    const comments = useSelector((state) => state.comments)
    const comment = comments[parentId].find((obj) => obj.id === id)
    const currentUser = useSelector((state) => state.loggedUser)

    const date = comment ? new Date(comment.timestamp).toLocaleDateString("en-US") : null 
    const time = comment ? new Date(comment.timestamp).toLocaleTimeString("en-US") : null 

    const currentUserLikes = comment && id && comment['likes'].find(user => user === currentUser) ? true : false 
    const currentUserDislikes = comment && id && comment['dislikes'].find(user => user === currentUser) ? true : false

    useEffect(() => {
        if (currentUserLikes) {
            setLikeActive(true)
        } else if (currentUserDislikes) {
            setDislikeActive(true)
        } 

    }, [currentUserLikes, currentUserDislikes])

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
            dispatch(voteComment(token, id, parentId, 'downVote', currentUser, true))
        } else if (!likeActive && !dislikeActive) {
            dispatch(voteComment(token, id, parentId, 'upVote', currentUser, false))
        }  
        // if I activate like button but dislike button is already active: deactivate dislike button 
        else if (!likeActive && dislikeActive) {
            setDislikeActive(!dislikeActive)
            // remove username from dislike array 
            dispatch(voteComment(token, id, parentId, 'upVote', currentUser, true))
            dispatch(voteComment(token, id, parentId, 'upVote', currentUser, false))
        }
    }

    const toggleDislike = (ev) => {
        ev.preventDefault()
        setDislikeActive(!dislikeActive)

        //untoggle dislike button 
        if (dislikeActive) {
            dispatch(voteComment(token, id, parentId, 'upVote', currentUser, true))
        } else if (!dislikeActive && !likeActive) { 
            dispatch(voteComment(token, id, parentId, 'downVote', currentUser, false))
        } else if (!dislikeActive && likeActive) {
            setLikeActive(!likeActive)
            dispatch(voteComment(token, id, parentId, 'downVote', currentUser, true))
            dispatch(voteComment(token, id, parentId, 'downVote', currentUser, false))
        } 
    }

    const onDelete = () => {
        dispatch(deleteOneComment(token, parentId, id)) 
    }

    return (
		<div className="comment">
            <div className="comment-buttons">
            	<div className="num-votes">
            		<p>{ comment && comment.voteScore } { comment.voteScore === 1 ? 'vote' : 'votes' }</p>
            	</div>
                <div 
                    className="btn" 
                    onClick={toggleLike}
                    style={
                        (comment.author === currentUser)
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
                        (comment.author === currentUser)
                            ? {display: 'none'}
                            : {display: 'block'} 
                    }
                >
                    {dislikeActive ? <AiFillDislike style={{ fill: '#F04437' }}/> : <AiOutlineDislike/>}
                </div>
                <div 
                    className="btn" 
                    onClick={toggleMenu} 
                    tabIndex="0" 
                    onBlur={blurMenu} 
                    style={ 
                        (comment.author === currentUser) 
                            ? editMenuHidden 
                                ? {background: '#000'} 
                                : {background: '#262B34'}
                            : {display: 'none'}
                    }
                >
                  	<BsThreeDots/>
                </div>
            </div>
            <div className="comment-main">
                <p className="author">{ comment && comment.author } · {date} {time}</p>
                <p className="body">{ comment && comment.body }</p>
            </div>
            <div className="edit-menu-open" hidden={editMenuHidden}>
                <ul>
                    <Link to={`/edit/comment/${parentId}/${id}`}>
                        <li>Edit comment</li>
                    </Link>
                    <li onClick={onDelete}>Delete comment</li>
                </ul>
            </div>
        </div>
	)
}

export default Comment;