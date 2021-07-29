import { combineReducers } from 'redux'
import { categories, activeCategory } from './categories'
import { postsByCategory, postById, likes } from './posts'
import { comments } from './comments'
import { sortByTime } from './sort'

export default combineReducers({
	categories,
	activeCategory,
	sortByTime, 
	postsByCategory,
	postById,
	likes,
	comments,
})