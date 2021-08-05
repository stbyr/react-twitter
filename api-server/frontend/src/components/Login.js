import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/Login.css'
import { setUser } from '../actions/shared'
import { token } from './App'

function Login () {
  	const dispatch = useDispatch()
	const [ input, setInput ] = useState("")

	const handleChange = (event) => {
		setInput(event.target.value) 
	}

	const send = () => {
		dispatch(setUser(token, input))
		localStorage.setItem('user', input)
	}

  	return (
	   	<div className="create-container">
            <h1>Welcome to the React Social App!</h1>
            <h2>Please login to continue</h2>
            <div className="input-field-login">
                <input 
					className="input-body"
					type="text" 
					placeholder="Insert username ..."
					value={input} 
					onChange={handleChange} 
				/>
            </div>
            <div className="send-container">
                <Link to="/" className="link-login">
                	<button className="send" onClick={send}>Login</button>
                </Link>
            </div>
        </div>
  	);
}

export default Login