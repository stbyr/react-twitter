export const SORT_BY_TIME = 'SORT_BY_TIME'
export const SORT_BY_VOTES = 'SORT_BY_VOTES'

export function sortByTime () {
	return {
		type: SORT_BY_TIME
	}
}

export function sortByVotes () {
	return {
		type: SORT_BY_VOTES 
	}
}