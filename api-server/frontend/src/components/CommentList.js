import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/CommentList.css'
import Comment from './Comment.js'
import { getAllCommentsByPost, addOneNewComment } from '../actions/shared.js'
import { v4 as uuidv4 } from 'uuid'
import { token } from './App'

function CommentList (props) {
	const [ formText, setFormText ] = useState('')
	const [ formName, setFormName ] = useState('')
	const { id } = props
	const dispatch = useDispatch()

	useEffect(() => {
        dispatch(getAllCommentsByPost(token, id))
    }, [dispatch, id])

    const comments = useSelector((state) => state.comments)
    comments[id] && comments[id].sort((a, b) => b.timestamp - a.timestamp)

	const handleChangeComment = (event) => {
		setFormText(event.target.value) 
	}

	const handleChangeName = (event) => {
		setFormName(event.target.value) 
	}

	const submit = () => {
		dispatch(addOneNewComment(token, {
			id: uuidv4(),
			timestamp: Date.now(),
			body: formText,
			author: formName,
			parentId: id,
		}))
		setFormText('')
		setFormName('')
	}

	return (
		<div className="comments-container">
			<div className="form-container">
				<input 
					type="text" 
					placeholder="Write a comment ..."
					value={formText} 
					onChange={handleChangeComment} 
				/>
				<div className="form-second-line">
					<input 
						type="text" 
						placeholder="Write your name ..."
						value={formName} 
						onChange={handleChangeName} 
					/>
					<button className="send" onClick={submit}>Publish</button>
				</div>
			</div>
			{comments[id] && comments[id].map((comment) => (
				<Comment key={comment.id} id={comment.id} parentId={id} />
			)) }
		</div>
	)
}

export default CommentList;