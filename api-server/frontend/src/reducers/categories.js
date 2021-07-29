import { GET_CATEGORIES, SET_CATEGORY } from '../actions/categories'

export function categories (state = {}, action) {
	switch(action.type) {
		case GET_CATEGORIES: 
			return {
				...state,
				...action.categories 
			};
		default: return state; 
	}
}

export function activeCategory (state = 'react', action) {
	switch(action.type) {
		case SET_CATEGORY:
			return action.category;
		default: return state;
	}
}