import { Link, useLocation } from 'react-router-dom'
import '../styles/TopMenu.css'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { BsPerson } from 'react-icons/bs'
import { currentUser } from './App'

function TopMenu () {
  	const location = useLocation()

  	return (
	    <div className="top-menu-container">
	    	{ location.pathname !== "/" ? (
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
		    <div className="login">
		    	<BsPerson style={{ 
			    	fontSize: '26px',
			    	margin: '10px',
			    	fill: '#ED2515', 
			    }} />
		    	<p>{currentUser}</p>
		    </div>
	    </div>
  	);
}

export default TopMenu;