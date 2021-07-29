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
			if (unfiltered_objects) {
				return {
					...state, 
					[key]: 
						unfiltered_objects.concat({
							...filtered_object,
							voteScore: action.option === 'upVote'
							? filtered_object.voteScore + 1
							: filtered_object.voteScore - 1
						})
				};
			} else {
				return {
					...state, 
					[key]: [
						{
							...filtered_object,
							voteScore: action.option === 'upVote'
							? filtered_object.voteScore + 1
							: filtered_object.voteScore - 1
						}
					]
				};
			}

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
					    commentCount: 0
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
			return {
				...state,
				[action.id]: {
						...state[action.id],
						voteScore: action.option === 'upVote'
						? state[action.id].voteScore + 1
						: state[action.id].voteScore - 1
				}
			};

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
				    commentCount: 0
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

export function likes (state = {}, action) {
	switch(action.type) {
		case VOTE_FOR_POST:
			if (action.option === 'upVote') {
				
				if (state[action.id]) {
					return {
						...state,
						[action.id]: state[action.id].concat(action.user) 
					};
				} else {
					return {
						...state,
						[action.id]: [action.user]
					};
				}
				
			} else {
				return state;
			}

		default: return state;
	}
}

