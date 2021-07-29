import axios from 'axios'

export const fetchCategories = (token) => axios.get('http://localhost:3001/categories', {
	headers: {
		'Authorization': token
	}
});

/* 
export const fetchPosts = (token) => axios.get('http://localhost:3001/posts', {
	headers: {
		'Authorization': token
	}
});*/ 

export const fetchPostsByCategory = (token, category) => axios.get(`http://localhost:3001/${category}/posts`, {
	headers: {
		'Authorization': token
	}
});

export const fetchPostById = (token, id) => axios.get(`http://localhost:3001/posts/${id}`, {
	headers: {
		'Authorization': token
	}
});

export const fetchCommentsByPost = (token, parentId) => axios.get(`http://localhost:3001/posts/${parentId}/comments`, {
	headers: {
		'Authorization': token
	}
});
/*
export const fetchComment = (token, id) => axios.get(`http://localhost:3001/comments/${id}/`, {
	headers: {
		'Authorization': token
	}
});*/ 

export const postNewPost = (token, newPost) => axios.post('http://localhost:3001/posts', newPost, {
		headers: {
			'Authorization': token
		}
	}
)

export const deletePost = (token, id) => axios.delete(`http://localhost:3001/posts/${id}/`, { 
	headers: {
		'Authorization': token
	} 
})

export const voteForPost = (token, id, option) => axios.post(`http://localhost:3001/posts/${id}/`, { option }, {
		headers: {
			'Authorization': token
		}
	}
)

export const editPost = (token, id, post) => axios.put(`http://localhost:3001/posts/${id}/`, post, {
	headers: {
		'Authorization': token
	}
})

export const editComment = (token, id, comment) => axios.put(`http://localhost:3001/comments/${id}/`, comment, {
	headers: {
		'Authorization': token
	}
})

export const postNewComment = (token, newComment) => axios.post('http://localhost:3001/comments', newComment, {
		headers: {
			'Authorization': token
		}
	}
)

export const voteForComment = (token, id, option) => axios.post(`http://localhost:3001/comments/${id}/`, { option }, {
		headers: {
			'Authorization': token
		}
	}
)

export const deleteComment = (token, id) => axios.delete(`http://localhost:3001/comments/${id}/`, { 
	headers: {
		'Authorization': token
	} 
})