import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setError('');
    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);
    if (result.success) {
      navigate('/marketplace');
    } else {
      setError(result.message || 'Registration failed.');
    }
  };

  return (
    <div className="page-home" style={{ padding: '80px 0', maxWidth: '420px', margin: '0 auto' }}>
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--page-border)',
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)'
      }}>
        <h1 className="hero-section__title" style={{ fontSize: '2rem', marginBottom: '8px', textAlign: 'center' }}>
          Create Account
        </h1>
        <p style={{ color: 'var(--page-muted)', textAlign: 'center', marginBottom: '28px', fontSize: '14px' }}>
          Join CampusMart to trade with verified students
        </p>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: '12px',
            marginBottom: '20px',
            fontSize: '13px',
            fontWeight: '500'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontWeight: '600', fontSize: '13px' }}>Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--page-border)', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }} 
              onFocus={(e) => e.target.style.borderColor = 'var(--page-accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--page-border)'}
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontWeight: '600', fontSize: '13px' }}>Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--page-border)', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }} 
              onFocus={(e) => e.target.style.borderColor = 'var(--page-accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--page-border)'}
            />
            <span style={{ fontSize: '11px', color: 'var(--page-muted)', marginTop: '2px' }}>
              Use your preferred email address
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontWeight: '600', fontSize: '13px' }}>Password</label>
            <input 
              type="password" 
              placeholder="Create a strong password (6+ chars)" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--page-border)', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }} 
              onFocus={(e) => e.target.style.borderColor = 'var(--page-accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--page-border)'}
            />
          </div>

          <button 
            type="submit" 
            className="primary-button" 
            disabled={loading}
            style={{ marginTop: '8px', padding: '14px', borderRadius: '12px', fontSize: '15px' }}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: 'var(--page-muted)', margin: '24px 0 0' }}>
          Already have an account?{' '}
          <Link to="/signin" style={{ color: 'var(--page-accent)', fontWeight: '600', textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}