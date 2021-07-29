import { SORT_BY_TIME, SORT_BY_VOTES } from '../actions/sort'

export function sortByTime (state = true, action) {
	switch(action.type) {
		case SORT_BY_TIME:
			return true;

		case SORT_BY_VOTES:
			return false;

		default:
			return state;
	}
}