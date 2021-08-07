import { GET_COMMENTS_BY_POST, EDIT_COMMENT, CREATE_COMMENT, VOTE_FOR_COMMENT, DELETE_COMMENT } from '../actions/comments'

export function comments (state = {}, action) {
	switch(action.type) {
		case GET_COMMENTS_BY_POST: 
			return {
				...state,
				[action.parentId]: action.comments  
			};

		case EDIT_COMMENT:
			let parentId = action.parentId
			let filtered_object = state[parentId].filter(obj => obj.id === action.id)[0]
			let unfiltered_objects = state[parentId].filter(obj => obj.id !== action.id).length ? state[parentId].filter(obj => obj.id !== action.id) : null 
		
			if (unfiltered_objects) {
				return {
					...state,
					[parentId]: 
						unfiltered_objects.concat({
							...filtered_object,
							timestamp: action.comment.timestamp,
							body: action.comment.body
						})
				}
			} else {
				return {
					...state,
					[parentId]: [{
						...filtered_object,
						timestamp: action.comment.timestamp,
						body: action.comment.body
					}]
				}
			}

		case CREATE_COMMENT: 
			return {
				...state,
				[action.newComment.parentId]: 
					state[action.newComment.parentId].concat([{
						id: action.newComment.id,
					    parentId: action.newComment.parentId,
					    timestamp: action.newComment.timestamp,
					    body: action.newComment.body,
					    author: action.newComment.author,
					    voteScore: 0,
					    deleted: false,
					    parentDeleted: false,
					    likes: [],
      					dislikes: [],
					}])
			}

		case VOTE_FOR_COMMENT:
		let filtered_object2 = state[action.parentId].filter(obj => obj.id === action.id)[0]
		let unfiltered_objects2 = state[action.parentId].filter(obj => obj.id !== action.id).length ? state[action.parentId].filter(obj => obj.id !== action.id) : null 

		if (action.option === 'upVote' && !action.toggle) {
			// username must be added to likes array
			if (unfiltered_objects2) {
				return {
					...state,
					[action.parentId]: 
						unfiltered_objects2.concat({
							...filtered_object2,
							voteScore: filtered_object2.voteScore + 1,
							likes: filtered_object2['likes'].find(user => user === action.user) 
								? filtered_object2['likes']
								: filtered_object2['likes'].concat(action.user),
						})
				};
			} else {
				return {
					...state,
					[action.parentId]: [{
						...filtered_object2,
						voteScore: filtered_object2.voteScore + 1,
						likes: filtered_object2['likes'].find(user => user === action.user) 
							? filtered_object2['likes']
							: filtered_object2['likes'].concat(action.user),
					}]	
				};
			}
		} else if (action.option === 'upVote' && action.toggle) {
			// username must be removed from dislikes array 
			if (unfiltered_objects2) {
				return {
					...state,
					[action.parentId]: 
						unfiltered_objects2.concat({
							...filtered_object2,
							voteScore: filtered_object2.voteScore + 1,
							dislikes: filtered_object2['dislikes'].filter(user => user !== action.user),
						})
				};
			} else {
				return {
					...state,
					[action.parentId]: [{
						...filtered_object2,
						voteScore: filtered_object2.voteScore + 1,
						dislikes: filtered_object2['dislikes'].filter(user => user !== action.user),
					}]	
				};
			}
		} else if (action.option === 'downVote' && !action.toggle) {
			// username must be added to dislikes array 
			if (unfiltered_objects2) {
				return {
					...state,
					[action.parentId]: 
						unfiltered_objects2.concat({
							...filtered_object2,
							voteScore: filtered_object2.voteScore - 1,
							dislikes: filtered_object2['dislikes'].find(user => user === action.user) 
								? filtered_object2['dislikes']
								: filtered_object2['dislikes'].concat(action.user),
						})
				};
			} else {
				return {
					...state,
					[action.parentId]: [{
						...filtered_object2,
						voteScore: filtered_object2.voteScore - 1,
						dislikes: filtered_object2['dislikes'].find(user => user === action.user) 
								? filtered_object2['dislikes']
								: filtered_object2['dislikes'].concat(action.user),
					}]	
				};
			}
		} else if (action.option === 'downVote' && action.toggle) {
			// username must be removed from likes array 
			if (unfiltered_objects2) {
				return {
					...state,
					[action.parentId]: 
						unfiltered_objects2.concat({
							...filtered_object2,
							voteScore: filtered_object2.voteScore - 1,
							likes: filtered_object2['likes'].filter(user => user !== action.user),
						})
				};
			} else {
				return {
					...state,
					[action.parentId]: [{
						...filtered_object2,
						voteScore: filtered_object2.voteScore - 1,
						likes: filtered_object['likes'].filter(user => user !== action.user),
					}]	
				};
			}
		}	
		break		

		case DELETE_COMMENT: 
			return {
				...state,
				[action.parentId]: state[action.parentId].filter(obj => obj.id !== action.id)
			}

		default: return state 
	}
}