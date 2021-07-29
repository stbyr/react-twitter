export const GET_CATEGORIES = 'GET_CATEGORIES'
export const SET_CATEGORY = 'SET_CATEGORY'

export function getCategories (categories) {
	return {
		type: GET_CATEGORIES,
		categories
	}
}

export function setCategory (category) {
	return {
		type: SET_CATEGORY,
		category
	}
}