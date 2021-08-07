import * as api from '../api'
import { getCategories } from './categories.js'
import { getPostsByCategory, getPostById, addNewPost, deletePost, voteForPost, editExistingPost } from './posts.js'
import { getCommentsByPost, editExistingComment, addNewComment, voteForComment, deleteComment } from './comments.js'
import { getLoggedUser, setLoggedUser } from './user.js'

export function getAllCategories () {
	return (dispatch) => {
		return api.fetchCategories()
			.then(({ data }) => {
				dispatch(getCategories(data))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function getUser () {
	return (dispatch) => {
		return api.fetchUser()
			.then(({ data }) => {
				dispatch(getLoggedUser(data))
			}) 
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function setUser (user) {
	return (dispatch) => {
		return api.setUser(user)
			.then(() => {
				dispatch(setLoggedUser(user))
			}) 
			.catch((e) => {
				console.log(e.message)
			})
	}
} 

export function getAllPostsByCategory (category) {
	return (dispatch) => {
		return api.fetchPostsByCategory(category)
			.then(({ data }) => {
				dispatch(getPostsByCategory(data, category))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function getOnePostById (id) {
	return (dispatch) => {
		return api.fetchPostById(id)
			.then(({ data }) => {
				dispatch(getPostById(data, id))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function getAllCommentsByPost (parentId) {
	return (dispatch) => {
		return api.fetchCommentsByPost(parentId)
			.then(({ data }) => {
				dispatch(getCommentsByPost(data, parentId))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function addOneNewPost (newPost) {
	return (dispatch) => {
		return api.postNewPost(newPost)
			.then(() => {
				dispatch(addNewPost(newPost))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function deleteOnePost (id, category) {
	return (dispatch) => {
		return api.deletePost(id)
			.then(() => {
				dispatch(deletePost(id, category))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function votePost (id, option, category, user, toggle) {
	return (dispatch) => {
		return api.voteForPost(id, option, user, toggle)
			.then(() => {
				dispatch(voteForPost(id, option, category, user, toggle))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function editPost (id, post, category) {
	return (dispatch) => {
		return api.editPost(id, post)
			.then(() => {
				dispatch(editExistingPost(id, post, category))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function editComment (id, parentId, comment) {
	return (dispatch) => {
		return api.editComment(id, comment)
			.then(() => {
				dispatch(editExistingComment(id, parentId, comment))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function addOneNewComment (newComment) {
	return (dispatch) => {
		return api.postNewComment(newComment)
			.then(() => {
				dispatch(addNewComment(newComment))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function voteComment (id, parentId, option, user, toggle) {
	return (dispatch) => {
		return api.voteForComment(id, option, user, toggle)
			.then(() => {
				dispatch(voteForComment(id, parentId, option, user, toggle))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}

export function deleteOneComment (parentId, id) {
	return (dispatch) => {
		return api.deleteComment(id)
			.then(() => {
				dispatch(deleteComment(parentId, id))
			})
			.catch((e) => {
				console.log(e.message)
			})
	}
}