import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Plus, ShoppingBag, User } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleSellClick = () => {
    navigate('/marketplace?sell=true');
  };

  return (
    <nav className="site-nav">
      <div className="page-home site-nav__inner">
        
        {/* Brand Logo */}
        <div className="site-nav__logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ width: '36px', height: '36px', backgroundColor: 'var(--page-accent)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '900', fontSize: '20px', boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)' }}>
            C
          </div>
          <span style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CampusMart</span>
        </div>
        
        {/* Navigation Links */}
        <div className="site-nav__links">
          <span 
            onClick={() => navigate('/')} 
            style={{ cursor: 'pointer', fontWeight: location.pathname === '/' ? '600' : '400', color: location.pathname === '/' ? 'var(--page-accent)' : 'inherit', transition: 'color 0.2s' }}
          >
            Home
          </span>
          <span 
            onClick={() => navigate('/marketplace')} 
            style={{ cursor: 'pointer', fontWeight: location.pathname === '/marketplace' ? '600' : '400', color: location.pathname === '/marketplace' ? 'var(--page-accent)' : 'inherit', transition: 'color 0.2s' }}
          >
            Marketplace
          </span>
        </div>

        {/* Action Buttons */}
        <div className="site-nav__actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {user ? (
            <>
              {/* Sell Button */}
              <button 
                onClick={handleSellClick}
                className="primary-button" 
                style={{ padding: '8px 16px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Plus size={16} />
                <span>Sell Item</span>
              </button>

              {/* User Profile display */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid var(--page-border)', paddingLeft: '16px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--page-accent)' }}>
                  <User size={16} />
                </div>
                <span style={{ fontWeight: '600', fontSize: '13px', color: 'var(--page-text)' }}>
                  {user.name}
                </span>
              </div>

              {/* Logout Button */}
              <button 
                onClick={() => { logout(); navigate('/'); }}
                className="secondary-button"
                style={{ padding: '8px', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', backgroundColor: 'transparent' }}
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => navigate('/signin')} 
                className="secondary-button"
                style={{ padding: '8px 16px', borderRadius: '10px' }}
              >
                Login
              </button>
              
              <button 
                onClick={() => navigate('/signup')}
                className="primary-button" 
                style={{ padding: '8px 16px', borderRadius: '10px' }}
              >
                Get started
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}