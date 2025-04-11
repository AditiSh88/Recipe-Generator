import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle user login/signup logic here
    // Redirect to dashboard upon success
    history.push('/dashboard');
  };

  return (
    <div>
      <h1>Login / Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Login / Sign Up</button>
      </form>
    </div>
  );
};

export default LoginSignup;
