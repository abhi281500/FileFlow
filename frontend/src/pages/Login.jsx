import React from 'react';
import LoginForm from '../components/LoginForm';

import { useNavigate } from 'react-router-dom';
import { userlogin } from '../services/auth.service.js';

function Login() {
  const navigate = useNavigate();

  const handleLoginSubmit = async ({identifier, password}) => {
    try {

      const response = await userlogin({identifier, password});
      localStorage.setItem('token', response.data.token);

      alert("Login Success!");
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div>
      <h2>Login </h2>
      <LoginForm onSubmit={handleLoginSubmit} />
    </div>
  );
}
export default Login;