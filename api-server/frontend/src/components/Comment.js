import React, { useState } from 'react'
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
    const date = comment ? new Date(comment.timestamp).toLocaleDateString("en-US") : null 
    const time = comment ? new Date(comment.timestamp).toLocaleTimeString("en-US") : null 

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
        setLikeActive(!likeActive)
        likeActive ? dispatch(voteComment(token, id, parentId, 'downVote')) : dispatch(voteComment(token, id, parentId, 'upVote')) 
        if (!likeActive && dislikeActive) {
            setDislikeActive(!dislikeActive)
            dispatch(voteComment(token, id, parentId, 'upVote'))
        }
    }

    const toggleDislike = (ev) => {
        ev.preventDefault()
        setDislikeActive(!dislikeActive)
        dislikeActive ? dispatch(voteComment(token, id, parentId, 'upVote')) : dispatch(voteComment(token, id, parentId, 'downVote'))
        if (likeActive && !dislikeActive) {
            setLikeActive(!likeActive)
            dispatch(voteComment(token, id, parentId, 'downVote'))
        } 
    }

    const onDelete = () => {
        dispatch(deleteOneComment(token, parentId, id)) 
    }

    return (
		<div className="comment">
            <div className="comment-buttons">
            	<div className="num-votes">
            		<p>{ comment && comment.voteScore } votes</p>
            	</div>
                <div className="btn" onClick={toggleLike}>
                    {likeActive ? <AiFillLike style={{ fill: '#F04437' }}/> : <AiOutlineLike/>}
                </div>
                <div className="btn" onClick={toggleDislike}>
                    {dislikeActive ? <AiFillDislike style={{ fill: '#F04437' }}/> : <AiOutlineDislike/>}
                </div>
                <div 
                    className="btn" 
                    onClick={toggleMenu} 
                    tabIndex="0" 
                    onBlur={blurMenu} 
                    style={ editMenuHidden ? {background: '#000'} : {background: '#262B34'} }
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