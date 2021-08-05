import { GET_LOGGED_USER, SET_LOGGED_USER } from '../actions/user'

export function loggedUser (state = "", action) {
	switch(action.type) {
		case GET_LOGGED_USER:
			return action.data;
		case SET_LOGGED_USER:
			return action.user;

		default:
			return state;
	}
}