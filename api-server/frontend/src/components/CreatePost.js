import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/CreatePost.css'
import { addOneNewPost } from '../actions/shared.js'
import { v4 as uuidv4 } from 'uuid'
import { token } from './App'

function CreatePost (props) {
	const [ inputTitle, setInputTitle ] = useState('')
	const [ inputBody, setInputBody ] = useState('')
	const dispatch = useDispatch()
	const category = useSelector((state) => state.activeCategory)
	const user = useSelector((state) => state.loggedUser)

	const handleChangeTitle = (event) => {
		setInputTitle(event.target.value) 
	}

	const handleChangeBody = (event) => {
		setInputBody(event.target.value) 
	}

	const send = () => {
		dispatch(addOneNewPost(token, {
			id: uuidv4(),
		    timestamp: Date.now(), 
		    title: inputTitle,
		    body: inputBody,
		    author: user,
		    category: category,
		}))
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
                	<button className="send" onClick={send}>Publish</button>
                </Link>
            </div>
        </div>
	)
}

export default CreatePost;