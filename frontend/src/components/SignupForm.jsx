import React, { useState } from 'react'

import { Link } from 'react-router-dom';

function SignupForm({onsignup}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    

    const handlesubmit = async (e) => {
        e.preventDefault(); 
        onsignup({username, email, password})

      
       

        
      }
  return (
    <div className='signup-form'>
       
        <form onSubmit={handlesubmit}>
       <label htmlFor="username">Username:</label>
       <input type="text"
        id="username"
        value={username}
        autoComplete='username'
        onChange={(e) => setUsername(e.target.value)}
       />

       <label htmlFor="email">Email:</label>
       <input type="email" 
       id="email"
        value={email}
        autoComplete='email'
        onChange={(e) => setEmail(e.target.value)}
       />

       <label htmlFor="password">Password:</label>
       <input type="password" 
       id="password"
        value={password}
        autoComplete='new-password'
        onChange={(e) => setPassword(e.target.value)}
       />

         <button type="submit">Signup</button>

         <p className="form-footer">
          Already have an account? 
          <Link to="/login" className="login-link"> Login</Link>
        </p>

         </form>
        
        </div>
  )
}

export default SignupForm