import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/CreatePost.css'
import { editPost } from '../actions/shared'
import Redirecter from './Redirect'
import NotFound from './NotFound'

function EditPost (props) {
	const dispatch = useDispatch()
	const user = localStorage.getItem('user')
	const category = useSelector((state) => state.activeCategory)
	const { id } = props.match.params 
	const posts = Object.keys(useSelector((state) => state.postById))
	const post = posts.find(post => post === id)
	const helper = {
		title: 'title',
		body: 'body',
	}
  	const locationState = props.location.state ? props.location.state : helper
  	const { title, body } = locationState
  	const [ inputTitle, setInputTitle ] = useState(title)
	const [ inputBody, setInputBody ] = useState(body)

	if (!post && user) {
		return <NotFound />
	} else if (!post && !user) {
		return <Redirecter referrer="/notfound" />
	} 

	const handleChangeTitle = (event) => {
		setInputTitle(event.target.value) 
	}

	const handleChangeBody = (event) => {
		setInputBody(event.target.value) 
	}

	const send = () => {
		dispatch(editPost(id, { 
		    title: inputTitle,
		    body: inputBody,
		}, category))
	}

	return (
		<div className="create-container">
            <Redirecter referrer={`/edit/post/${id}`} />
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