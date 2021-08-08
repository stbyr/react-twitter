import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import '../styles/Login.css'
import { setUser } from '../actions/shared'
import axios from 'axios'

function Login () {
  	const dispatch = useDispatch()
	const [ username, setUsername ] = useState("")
	const [ password, setPassword ] = useState("")
	const history = useHistory()

	const login = () => {
		if (!username) {
			return alert('You must provide a username to login.')
		} else if (!password) {
			return alert('Please enter your password.')
		}

		axios.post('http://localhost:3001/login', {
			username: username, 
			password: password,
		}).then((response) => {
			if (response.data.message) {
				return alert(response.data.message)
			} else {
				dispatch(setUser(username))
				localStorage.setItem('user', username)
				history.push('/')
			}
		})
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
					value={username} 
					onChange={(event) => {setUsername(event.target.value)}} 
				/>
				<input
					className="input-body"
					type="password" 
					placeholder="Insert password ..."
					value={password} 
					onChange={(event) => {setPassword(event.target.value)}}
				/>
            </div>
            <div className="send-container">
                <Link to="/" className="link-login">
                	<button className="send" onClick={login}>Login</button>
                </Link>
            </div>
            <h2 id="register-link">Don't have an account yet? Go to <Link to="/register">Register</Link></h2>
        </div>
  	);
}

export default Login