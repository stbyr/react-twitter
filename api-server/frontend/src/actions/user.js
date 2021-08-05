export const GET_LOGGED_USER = 'GET_LOGGED_USER'
export const SET_LOGGED_USER = 'SET_LOGGED_USER'

export function getLoggedUser (data) {
	return {
		type: GET_LOGGED_USER,
		data
	}
}

export function setLoggedUser (user) {
	return {
		type: SET_LOGGED_USER,
		user
	}
}