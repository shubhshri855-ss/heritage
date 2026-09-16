import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
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
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  return (
    <div className="pt-32 px-12 min-h-screen bg-background flex items-center justify-center">
      <div className="bg-surface p-8 rounded-lg max-w-md w-full border border-white/5">
        <h2 className="text-3xl font-cinzel mb-6 text-primary text-center">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-text-secondary mb-2">Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="w-full bg-background border border-white/10 p-3 rounded text-white focus:border-primary focus:outline-none transition-colors" 
              required 
            />
          </div>
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
          <div>
            <label className="block text-text-secondary mb-2">Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
              className="w-full bg-background border border-white/10 p-3 rounded text-white focus:border-primary focus:outline-none transition-colors" 
              required 
            />
          </div>
          <div>
            <label className="block text-text-secondary mb-2">Role</label>
            <select 
              value={role} 
              onChange={e => setRole(e.target.value)}
              className="w-full bg-background border border-white/10 p-3 rounded text-white focus:border-primary focus:outline-none transition-colors"
            >
              <option value="student">Student / User</option>
              <option value="artisan">Artisan / Artist</option>
              <option value="organization">Cultural Organization</option>
              <option value="expert">Cultural Expert</option>
              <option value="tourist">Tourist / Visitor</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-primary text-background px-6 py-3 rounded font-medium hover:bg-primary/90 transition-colors">
            Create Account
          </button>
        </form>
        <p className="mt-4 text-center text-text-secondary">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
