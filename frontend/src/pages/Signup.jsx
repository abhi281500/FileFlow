import React from 'react'
import { registerUser } from '../services/auth.service'
import SignupForm from '../components/SignupForm'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()
    const handlesignup = async ({username, email, password}) => {
        await registerUser(username, email, password)
        navigate('/login')
      
    }   



  return (
    <div>
        <h2>Signup</h2>
        <SignupForm onsignup ={handlesignup}/>
        </div>
  )
}

export default Signup