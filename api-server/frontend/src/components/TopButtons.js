import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { sortByTime, sortByVotes } from '../actions/sort'
import '../styles/TopButtons.css'

function TopButtons (props) {
	const [ sortMenuHidden, setSortMenuHidden ] = React.useState(true)
	const dispatch = useDispatch()
	const sortbytime = useSelector((state) => state.sortByTime)

	const toggleMenu = () => {
		setSortMenuHidden(!sortMenuHidden)
	}

	const blurMenu = () => {
		setSortMenuHidden(true) 
	}

	const sortVotes = () => {
		dispatch(sortByVotes())
	}

	const sortTime = () => {
		dispatch(sortByTime())
	}

	return (
		<div className="buttons">
            <button className="sort" onClick={toggleMenu} onBlur={blurMenu}>Sort by</button>
            <Link to="/create-post">
            	<button className="create-post">Create post</button>
            </Link>
            <div className="sort-menu-open" hidden={sortMenuHidden}>
	        	<ul>
	        		<li className={ sortbytime ? 'active' : '' } onMouseDown={sortTime}>Time</li>
	        		<li className={ sortbytime ? '' : 'active' } onMouseDown={sortVotes}>Number of votes</li>
	        	</ul>
        	</div>
        </div>
	)
}

export default TopButtons;


