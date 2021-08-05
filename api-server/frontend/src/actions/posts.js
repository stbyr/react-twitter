export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'
export const GET_POST_BY_ID = 'GET_POST_BY_ID'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_FOR_POST = 'VOTE_FOR_POST'
export const EDIT_POST = 'EDIT_POST'

export function getPostsByCategory (posts, category) {
	return {
		type: GET_POSTS_BY_CATEGORY,
		posts,
		category 
	}
}

export function getPostById (post, id) {
	return {
		type: GET_POST_BY_ID,
		post,
		id 
	}
}

export function addNewPost (newPost) {
	return {
		type: ADD_POST,
		newPost
	}
}

export function deletePost (id, category) {
	return {
		type: DELETE_POST,
		id,
		category 
	}
}

export function voteForPost (id, option, category, user, toggle) {
	return {
		type: VOTE_FOR_POST,
		id,
		option,
		category,
		user,
		toggle,
	}
}

export function editExistingPost (id, post, category) {
	return {
		type: EDIT_POST, 
		id, 
		post, 
		category 
	}
}