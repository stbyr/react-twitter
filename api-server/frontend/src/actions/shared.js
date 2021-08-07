import * as api from '../api'
import { getCategories } from './categories.js'
import { getPostsByCategory, getPostById, addNewPost, deletePost, voteForPost, editExistingPost } from './posts.js'
import { getCommentsByPost, editExistingComment, addNewComment, voteForComment, deleteComment } from './comments.js'
import { getLoggedUser, setLoggedUser } from './user.js'

export function getAllCategories (token) {
	return (dispatch) => {
		return api.fetchCategories(token)
			.then(({ data }) => {
				dispatch(getCategories(data))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function getUser (token) {
	return (dispatch) => {
		return api.fetchUser(token)
			.then(({ data }) => {
				dispatch(getLoggedUser(data))
			}) 
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function setUser (token, user) {
	return (dispatch) => {
		return api.setUser(token, user)
			.then(() => {
				dispatch(setLoggedUser(user))
			}) 
			.catch((e) => {
				console.log(e.message)
			})
	}
} 

export function getAllPostsByCategory (token, category) {
	return (dispatch) => {
		return api.fetchPostsByCategory(token, category)
			.then(({ data }) => {
				dispatch(getPostsByCategory(data, category))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function getOnePostById (token, id) {
	return (dispatch) => {
		return api.fetchPostById(token, id)
			.then(({ data }) => {
				dispatch(getPostById(data, id))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function getAllCommentsByPost (token, parentId) {
	return (dispatch) => {
		return api.fetchCommentsByPost(token, parentId)
			.then(({ data }) => {
				dispatch(getCommentsByPost(data, parentId))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function addOneNewPost (token, newPost) {
	return (dispatch) => {
		return api.postNewPost(token, newPost)
			.then(() => {
				dispatch(addNewPost(newPost))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function deleteOnePost (token, id, category) {
	return (dispatch) => {
		return api.deletePost(token, id)
			.then(() => {
				dispatch(deletePost(id, category))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function votePost (token, id, option, category, user, toggle) {
	return (dispatch) => {
		return api.voteForPost(token, id, option, user, toggle)
			.then(() => {
				dispatch(voteForPost(id, option, category, user, toggle))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function editPost (token, id, post, category) {
	return (dispatch) => {
		return api.editPost(token, id, post)
			.then(() => {
				dispatch(editExistingPost(id, post, category))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function editComment (token, id, parentId, comment) {
	return (dispatch) => {
		return api.editComment(token, id, comment)
			.then(() => {
				dispatch(editExistingComment(id, parentId, comment))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function addOneNewComment (token, newComment) {
	return (dispatch) => {
		return api.postNewComment(token, newComment)
			.then(() => {
				dispatch(addNewComment(newComment))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function voteComment (token, id, parentId, option, user, toggle) {
	return (dispatch) => {
		return api.voteForComment(token, id, option, user, toggle)
			.then(() => {
				dispatch(voteForComment(id, parentId, option, user, toggle))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function deleteOneComment (token, parentId, id) {
	return (dispatch) => {
		return api.deleteComment(token, id)
			.then(() => {
				dispatch(deleteComment(parentId, id))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}