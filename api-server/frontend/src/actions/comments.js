export const GET_COMMENTS_BY_POST = 'GET_COMMENTS_BY_POST'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const VOTE_FOR_COMMENT = 'VOTE_FOR_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function getCommentsByPost (comments, parentId) {
	return {
		type: GET_COMMENTS_BY_POST,
		comments,
		parentId 
	}
}

export function editExistingComment (id, parentId, comment) {
	return {
		type: EDIT_COMMENT, 
		id, 
		parentId,
		comment 
	}
}

export function addNewComment (newComment) {
	return {
		type: CREATE_COMMENT,
		newComment
	}
}

export function voteForComment (id, parentId, option) {
	return {
		type: VOTE_FOR_COMMENT,
		id,
		parentId,
		option
	}
}

export function deleteComment (parentId, id) {
	return {
		type: DELETE_COMMENT,
		parentId,
		id 
	}
}