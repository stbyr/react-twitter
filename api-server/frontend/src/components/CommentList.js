import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/CommentList.css'
import Comment from './Comment.js'
import { getAllCommentsByPost, addOneNewComment } from '../actions/shared.js'
import { v4 as uuidv4 } from 'uuid'

function CommentList (props) {
	const [ formText, setFormText ] = useState('')
	const { id } = props
	const dispatch = useDispatch()
	const user = useSelector((state) => state.loggedUser)

	useEffect(() => {
        dispatch(getAllCommentsByPost(id))
    }, [dispatch, id])

    const comments = useSelector((state) => state.comments)
    comments[id] && comments[id].sort((a, b) => b.timestamp - a.timestamp)

	const handleChangeComment = (event) => {
		setFormText(event.target.value) 
	}

	const submit = (event) => {
		if (event.key === "Enter") {
			dispatch(addOneNewComment({
				id: uuidv4(),
				timestamp: Date.now(),
				body: formText,
				author: user,
				parentId: id,
			}))
			setFormText('')
		}
	}

	return (
		<div className="comments-container">
			<div className="form-container">
				<input 
					type="text" 
					placeholder="Write a comment ..."
					value={formText} 
					onChange={handleChangeComment} 
					onKeyPress={submit}
				/>
			</div>
			{comments[id] && comments[id].map((comment) => (
				<Comment key={comment.id} id={comment.id} parentId={id} />
			)) }
		</div>
	)
}

export default CommentList;