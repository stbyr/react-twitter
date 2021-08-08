import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import '../styles/Login.css'
import { setUser } from '../actions/shared'
import axios from 'axios'

function Register () {
  	const dispatch = useDispatch()
	const [ usernameReg, setUsernameReg ] = useState("")
	const [ passwordReg, setPasswordReg ] = useState("")
	const history = useHistory()

	const register = () => {
		if (!usernameReg) {
			return alert('You must provide a username to register.')
		} else if (!passwordReg) {
			return alert('Please enter a password.')
		}

		axios.post('http://localhost:3001/register', {
			username: usernameReg, 
			password: passwordReg,
		}).then((response) => {
			if (response.data.message) {
				return alert(response.data.message)
			} else {
				dispatch(setUser(usernameReg))
				localStorage.setItem('user', usernameReg)
				history.push('/')
			}
		})
	}

  	return (
	   	<div className="create-container">
            <h1>Welcome to the React Social App!</h1>
            <h2>Please register to continue</h2>
            
            <div className="input-field-login">
                <input 
					className="input-body"
					type="text" 
					placeholder="Insert username ..."
					value={usernameReg} 
					onChange={(event) => {setUsernameReg(event.target.value)}} 
				/>
				<input
					className="input-body"
					type="password" 
					placeholder="Insert password ..."
					value={passwordReg} 
					onChange={(event) => {setPasswordReg(event.target.value)}}
				/>
            </div>
            <div className="send-container">
                <div className="link-login">
                	<button className="send" onClick={register}>Register</button>
                </div>
            </div>
            <h2 id="register-link">Already have an account? Go to <Link to="/login">Login</Link></h2>
        </div>
  	);
}

export default Register 