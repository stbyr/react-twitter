import { GET_POSTS_BY_CATEGORY, GET_POST_BY_ID, ADD_POST, DELETE_POST, VOTE_FOR_POST, EDIT_POST } from '../actions/posts'

export function postsByCategory (state = {}, action) {
	switch(action.type) {
		case GET_POSTS_BY_CATEGORY: 
			return {
				...state,
				[action.category]: action.posts  
			};

		case VOTE_FOR_POST:
			let key = action.category
			let filtered_object = state[key].filter(obj => obj.id === action.id)[0]
			let unfiltered_objects = state[key].filter(obj => obj.id !== action.id).length ? state[key].filter(obj => obj.id !== action.id) : null 
			
			if (action.option === 'upVote' && !action.toggle) {
				// username must be added to likes array
				if (unfiltered_objects) {
					return {
						...state, 
						[key]: 
							unfiltered_objects.concat({
								...filtered_object,
								likes: filtered_object['likes'].find(user => user === action.user) 
									? filtered_object['likes']
									: filtered_object['likes'].concat(action.user),
								voteScore: filtered_object.voteScore + 1
							})
					};
				} else {
					return {
						...state, 
						[key]: [
							{
								...filtered_object,
								likes: filtered_object['likes'].find(user => user === action.user) 
									? filtered_object['likes']
									: filtered_object['likes'].concat(action.user),
								voteScore: filtered_object.voteScore + 1
							}
						]
					};
				}
		} else if (action.option === 'upVote' && action.toggle) {
			// username must be removed from dislikes array 
			if (unfiltered_objects) {
					return {
						...state, 
						[key]: 
							unfiltered_objects.concat({
								...filtered_object,
								dislikes: filtered_object['dislikes'].filter(user => user !== action.user),
								voteScore: filtered_object.voteScore + 1
							})
					};
				} else {
					return {
						...state, 
						[key]: [
							{
								...filtered_object,
								dislikes: filtered_object['dislikes'].filter(user => user !== action.user),
								voteScore: filtered_object.voteScore + 1
							}
						]
					};
				}

		} else if (action.option === 'downVote' && !action.toggle) {
			// username must be added to dislikes array 
			if (unfiltered_objects) {
					return {
						...state, 
						[key]: 
							unfiltered_objects.concat({
								...filtered_object,
								dislikes: filtered_object['dislikes'].find(user => user === action.user) 
									? filtered_object['dislikes']
									: filtered_object['dislikes'].concat(action.user),
								voteScore: filtered_object.voteScore - 1
							})
					};
				} else {
					return {
						...state, 
						[key]: [
							{
								...filtered_object,
								dislikes: filtered_object['dislikes'].find(user => user === action.user) 
									? filtered_object['dislikes']
									: filtered_object['dislikes'].concat(action.user),
								voteScore: filtered_object.voteScore - 1
							}
						]
					};
				}
		} else if (action.option === 'downVote' && action.toggle) {
			// username must be removed from likes array 
			if (unfiltered_objects) {
					return {
						...state, 
						[key]: 
							unfiltered_objects.concat({
								...filtered_object,
								likes: filtered_object['likes'].filter(user => user !== action.user),
								voteScore: filtered_object.voteScore - 1
							})
					};
				} else {
					return {
						...state, 
						[key]: [
							{
								...filtered_object,
								likes: filtered_object['likes'].filter(user => user !== action.user),
								voteScore: filtered_object.voteScore - 1
							}
						]
					};
				}
		}
		break

		case ADD_POST:
			return {
				...state,
				[action.newPost.category]: 
					state[action.newPost.category].concat([{
						id: action.newPost.id,
					    timestamp: action.newPost.timestamp,
					    title: action.newPost.title,
					    body: action.newPost.body,
					    author: action.newPost.author,
					    category: action.newPost.category,
					    voteScore: 1,
					    deleted: false,
					    commentCount: 0,
					    likes: [],
    					dislikes: [],
					}])
			};

		case EDIT_POST: 
			let key2 = action.category
			let filtered_object2 = state[key2].filter(obj => obj.id === action.id)[0]
			let unfiltered_objects2 = state[key2].filter(obj => obj.id !== action.id).length ? state[key2].filter(obj => obj.id !== action.id) : null 
			if (unfiltered_objects2) {
				return {
					...state,
					[key2]: 
						unfiltered_objects2.concat({
							...filtered_object2,
							title: action.post.title,
							body: action.post.body
						})
				};
			} else {
				return {
					...state,
					[key2]: [
						{
							...filtered_object2,
							title: action.post.title,
							body: action.post.body
						}
					]
				};
			}

		case DELETE_POST: 
			let key3 = action.category
			return {
				...state, 
				[key3]: state[key3].filter(value => value.id !== action.id)
			};

		default: return state; 
	}
}

export function postById (state = {}, action) {
	switch(action.type) {
		case GET_POST_BY_ID:
			return {
				...state,
				[action.id]: action.post 
			};

		case VOTE_FOR_POST:
			if (action.option === 'upVote' && !action.toggle) {
				// username must be added to likes array 
				return {
					...state,
					[action.id]: {
							...state[action.id],
							likes: state[action.id]['likes'].find(user => user === action.user) 
									? state[action.id]['likes']
									: state[action.id]['likes'].concat(action.user),
							voteScore: state[action.id].voteScore + 1
					}
				};
			} else if (action.option === 'upVote' && action.toggle) {
				// username must be removed from dislikes array 
				return {
					...state,
					[action.id]: {
							...state[action.id],
							dislikes: state[action.id]['dislikes'].filter(user => user !== action.user),
							voteScore: state[action.id].voteScore + 1
					}
				};
			} else if (action.option === 'downVote' && !action.toggle) {
				// username must be added to dislikes array 
				return {
					...state,
					[action.id]: {
							...state[action.id], 
							dislikes: state[action.id]['dislikes'].find(user => user === action.user) 
									? state[action.id]['dislikes']
									: state[action.id]['dislikes'].concat(action.user),
							voteScore: state[action.id].voteScore - 1
					}
				};
			} else if (action.option === 'downVote' && action.toggle) {
				// username must be removed from likes array 
				return {
					...state,
					[action.id]: {
							...state[action.id], 
							likes: state[action.id]['likes'].filter(user => user !== action.user),
							voteScore: state[action.id].voteScore - 1
					}
				};
			}
		break

		case ADD_POST:
			return {
				...state,
				[action.newPost.id]: {
					id: action.newPost.id,
				    timestamp: action.newPost.timestamp,
				    title: action.newPost.title,
				    body: action.newPost.body,
				    author: action.newPost.author,
				    category: action.newPost.category,
				    voteScore: 0,
				    deleted: false,
				    commentCount: 0,
				    likes: [],
    				dislikes: [],
				}
			};

		case EDIT_POST: 
			return {
				...state,
				[action.id]: {
						...state[action.id],
						title: action.post.title,
						body: action.post.body
				}
			};

		case DELETE_POST: 
			const filterObject = (obj, filter, filterValue) => 
			   Object.keys(obj).reduce((acc, val) => 
			   (obj[val][filter] === filterValue ? acc : {
			       ...acc,
			       [val]: obj[val]
			   }                                        
			), {});

			return filterObject(state, "id", action.id);

		default: return state;
	}
}