import React, { useState } from 'react'
import { Link } from 'react-router-dom';
function LoginForm({ onSubmit}) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState("")

  const handlesubmit = async (e) => {
    e.preventDefault(); 
    onSubmit({identifier, password})
  }
  return (
    <div className="login-form">
     
      <form onSubmit={handlesubmit}>
        <label htmlFor="identifier">Username or Email:</label>
        <input
          type="text"
          id="identifier"
          name="identifier"
          autoComplete='identifier'
          required
          onChange={(e) => setIdentifier(e.target.value)} />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete='current-password'
           onChange={(e) => setPassword(e.target.value)} required />


        <button type="submit">Login</button>

        <p className="form-footer">
          Don't have an account? 
          <Link to="/signup" className="login-link"> Signup</Link>
        </p>

      </form>

    </div>
  )
}

export default LoginForm