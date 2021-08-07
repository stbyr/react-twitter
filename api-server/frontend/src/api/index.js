import axios from 'axios'

export const fetchPostsByCategory = (category) => axios.get(`http://localhost:3001/${category}/posts`)
export const fetchPostById = (id) => axios.get(`http://localhost:3001/posts/${id}`)
export const postNewPost = (newPost) => axios.post('http://localhost:3001/posts', newPost)
export const deletePost = (id) => axios.delete(`http://localhost:3001/posts/${id}/`)
export const voteForPost = (id, option, user, toggle) => axios.post(`http://localhost:3001/posts/${id}/`, { option, user, toggle })
export const editPost = (id, post) => axios.put(`http://localhost:3001/posts/${id}/`, post)

export const fetchCommentsByPost = (parentId) => axios.get(`http://localhost:3001/posts/${parentId}/comments`)
export const editComment = (id, comment) => axios.put(`http://localhost:3001/comments/${id}/`, comment)
export const postNewComment = (newComment) => axios.post('http://localhost:3001/comments', newComment)
export const voteForComment = (id, option, user, toggle) => axios.post(`http://localhost:3001/comments/${id}/`, { option, user, toggle })
export const deleteComment = (id) => axios.delete(`http://localhost:3001/comments/${id}/`)

export const fetchCategories = () => axios.get('http://localhost:3001/categories')

export const fetchUser = () => axios.get('http://localhost:3001/user')
export const setUser = (user) => axios.post('http://localhost:3001/user', { user })