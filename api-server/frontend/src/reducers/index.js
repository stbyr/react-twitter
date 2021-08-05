import { combineReducers } from 'redux'
import { categories, activeCategory } from './categories'
import { postsByCategory, postById } from './posts'
import { comments } from './comments'
import { sortByTime } from './sort'
import { loggedUser } from './user'

export default combineReducers({
	categories,
	activeCategory,
	sortByTime, 
	postsByCategory,
	postById,
	comments,
	loggedUser,
})