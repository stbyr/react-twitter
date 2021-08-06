import React from 'react'
import { Redirect } from 'react-router-dom'

function Redirecter (props) {
		const { referrer } = props 	
    const authedUser = localStorage.getItem('user')

    if (!authedUser) {
      return (
        <Redirect 
          to={{
            pathname: "/login",
            state: { referrer: referrer }
          }} 
        />
      )
    }

    else {
      return null 
    } 	
}

export default Redirecter