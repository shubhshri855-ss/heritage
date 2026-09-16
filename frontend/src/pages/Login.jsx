import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data);
        // Redirect based on role
        if (data.role === 'artisan') navigate('/dashboard/artisan');
        else if (data.role === 'organization') navigate('/dashboard/organization');
        else if (data.role === 'expert') navigate('/dashboard/expert');
        else navigate('/');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  return (
    <div className="pt-32 px-12 min-h-screen bg-background flex items-center justify-center">
      <div className="bg-surface p-8 rounded-lg max-w-md w-full border border-white/5">
        <h2 className="text-3xl font-cinzel mb-6 text-primary text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-text-secondary mb-2">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full bg-background border border-white/10 p-3 rounded text-white focus:border-primary focus:outline-none transition-colors" 
              required 
            />
          </div>
          <div>
            <label className="block text-text-secondary mb-2">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full bg-background border border-white/10 p-3 rounded text-white focus:border-primary focus:outline-none transition-colors" 
              required 
            />
          </div>
          <button type="submit" className="w-full bg-primary text-background px-6 py-3 rounded font-medium hover:bg-primary/90 transition-colors">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
