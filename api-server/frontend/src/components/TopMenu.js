import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '../styles/TopMenu.css'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { BsPerson } from 'react-icons/bs'
import { getUser, setUser } from '../actions/shared'
import { token } from './App'

function TopMenu () {
  	const location = useLocation()
  	const dispatch = useDispatch()
  	const user = localStorage.getItem('user')

  	useEffect(() => {
		dispatch(getUser(token))
	}, [dispatch])

	const logout = () => {
		localStorage.setItem('user', '')
		dispatch(setUser(token, ''))
	}

  	return (
	    <div className="top-menu-container">
	    	{ location.pathname !== "/" && location.pathname !== "/login" ? (
	    		<Link to="/" className="back">
				    <BiLeftArrowAlt style={{ 
				    	fontSize: '26px',
				    	margin: '10px', 
				    	fill: '#ED2515', 
				    }} />
				    <p>Home</p>
			    </Link>
			    ) : <BiLeftArrowAlt style={{ fill: 'black' }} /> 
			}
		    { location.pathname !== "/login" ? (
			    <div className="login">
			    	<BsPerson style={{ 
				    	fontSize: '26px',
				    	margin: '10px',
				    	fill: '#ED2515', 
				    }} />
			    	<p>{ user }</p>
			    	<Link to="/login" onClick={logout}>
			    		logout
			    	</Link>
			    </div>
			    ) : null 
			}
	    </div>
  	);
}

export default TopMenu;