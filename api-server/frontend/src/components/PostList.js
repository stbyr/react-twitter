import React, { useEffect } from 'react'
import Post from './Post.js'
import '../styles/PostList.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPostsByCategory } from '../actions/shared.js'
import { token } from './App'

function PostList () {
	const dispatch = useDispatch()
	const activeCategory = useSelector((state) => state.activeCategory)

	useEffect(() => {
		let mounted = true 
        if (mounted) { 
            dispatch(getAllPostsByCategory(token, activeCategory))
        }
        return () => mounted = false;
	}, [dispatch, activeCategory])

	const postsByCategory = useSelector((state) => state.postsByCategory[activeCategory])
	const sortByTime = useSelector((state) => state.sortByTime)

	return (
		<div className="post-list">
            {postsByCategory && postsByCategory.sort((a, b) => sortByTime ? (b.timestamp - a.timestamp) : (b.voteScore - a.voteScore))
            	.map((post) => (
            		<Post key={post.id} id={post.id} />	
            ))}
        </div>
	)
}

export default PostList;

