import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/CreatePost.css'
import { editComment } from '../actions/shared'
import Redirecter from './Redirect'
import NotFound from './NotFound'

function EditComment (props) {
	const dispatch = useDispatch()
	const user = localStorage.getItem('user')
	const { id, parentId } = props.match.params 

	const comments = useSelector((state) => state.comments[parentId])
	const commentInfo = comments ? comments.find(comment => comment.id === id) : null 

	const comms = useSelector((state) => state.comments)
	const parendIds = Object.keys(comms).length ? Object.keys(comms) : []
	const parendIdsMatch = parendIds.find(item => item === parentId)
	const ids = Object.keys(comms).length ? comms[parentId] : [] 
	const idsMatch = ids.find(item => item.id === id)

	const helper = {
		title: 'title',
		body: 'body',
	}
	const base = commentInfo ? commentInfo : helper
	const [ inputBody, setInputBody ] = useState(base.body) 

	if ((!parendIdsMatch || !idsMatch) && user) {
		return <NotFound />
	} else if ((!parendIdsMatch || !idsMatch) && !user) {
		return <Redirecter referrer="/login" />
	} 

	const handleChangeBody = (event) => {
		setInputBody(event.target.value) 
	}

	const send = () => {
		dispatch(editComment(id, parentId, { 
		    timestamp: Date.now(),
		    body: inputBody,
		}))
	}

	return (
		<div className="create-container">
            <Redirecter referrer={`/edit/comment/${parentId}/${id}`} />
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

