import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/CreatePost.css'
import { editPost } from '../actions/shared.js'
import { token } from './App'

function EditPost (props) {
	const dispatch = useDispatch()
	const category = useSelector((state) => state.activeCategory)
	const { id } = props.match.params 
	const postInfo = useSelector((state) => state.postById[id])

	const [ inputTitle, setInputTitle ] = useState(postInfo.title)
	const [ inputBody, setInputBody ] = useState(postInfo.body)

	const handleChangeTitle = (event) => {
		setInputTitle(event.target.value) 
	}

	const handleChangeBody = (event) => {
		setInputBody(event.target.value) 
	}

	const send = () => {
		dispatch(editPost(token, id, { 
		    title: inputTitle,
		    body: inputBody,
		}, category))
	}

	return (
		<div className="create-container">
            <div className="input-fields">
                <input 
					type="text" 
					placeholder="Insert title ..."
					value={inputTitle} 
					onChange={handleChangeTitle} 
				/>
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
                <Link to="/" className="link">
                	<button className="send" onClick={send}>Edit</button>
                </Link>
            </div>
        </div>
	)
}

export default EditPost;