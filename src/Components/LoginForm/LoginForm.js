import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
        navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };
  
  return (
    
      <div className='container1'>
        <h1>Login</h1>
      <form action=''>
        <div className='formelements'>
          <div className="inputs">
              <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required />
              <FaUser className='icons'/>
          </div>

          <div className="inputs">
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
              <FaLock className='icons'/>
          </div>

          <div className="rem-for">
              <label><input type='checkbox' />Remember me</label>
              <a href="#">Forgot password?</a>
          </div>

          <button type="submit" onClick={handleLogin}>Login</button>
          <div className="register">
              <p>Don't have an account? <a href="#">Register</a></p>
          </div>
        </div>
      </form>
    </div>

  )
}

export default LoginForm

