import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/CreatePost.css'
import { editComment } from '../actions/shared.js'
import { token } from './App'

function EditComment (props) {
	const dispatch = useDispatch()
	const { id } = props.match.params 
	const { parentId } = props.match.params 
	const comments = useSelector((state) => state.comments[parentId])
	const commentInfo = comments.find(comment => comment.id === id)
	const [ inputBody, setInputBody ] = useState(commentInfo.body)

	const handleChangeBody = (event) => {
		setInputBody(event.target.value) 
	}

	const send = () => {
		dispatch(editComment(token, id, parentId, { 
		    timestamp: Date.now(),
		    body: inputBody,
		}))
	}

	return (
		<div className="create-container">
            <div className="input-fields">
                <textarea 
					className="input-body"
					type="text" 
					placeholder="Insert text ..."
					value={inputBody} 
					onChange={handleChangeBody} 
					rows="8"
				></textarea>
            </div>
            <div className="send-container">
                <Link to={`/posts/${parentId}`} className="link">
                	<button className="send" onClick={send}>Edit</button>
                </Link>
            </div>
        </div>
	)
}

export default EditComment;