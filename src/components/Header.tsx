import React, { useState } from 'react';
import { Menu, X, Info } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onToggleSidebar }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="header-nav">
      <div className="container nav-container">
        {/* Brand Logo & Name */}
        <div className="logo-wrapper" onClick={() => handleNavClick('home')}>
          <svg className="logo-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Sketch lines background grid */}
            <line x1="20" y1="10" x2="20" y2="90" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
            <line x1="80" y1="10" x2="80" y2="90" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
            <line x1="10" y1="30" x2="90" y2="30" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
            <line x1="10" y1="70" x2="90" y2="70" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />

            {/* Neural Net Nodes & Sketch Line 'S' shape */}
            {/* Draw Path for 'S' representing Sketch, Web, Tech */}
            <path
              d="M75 30C75 20 60 15 50 15C35 15 25 25 25 35C25 50 75 50 75 65C75 75 65 85 50 85C35 85 25 80 25 70"
              stroke="url(#logo-grad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="4 4"
              style={{ animation: 'pulse-glow 3s infinite ease-in-out' }}
            />

            {/* Node Dots (Brain/AI nodes connecting the sketch line) */}
            <circle cx="50" cy="15" r="5" fill="#06b6d4" />
            <circle cx="25" cy="35" r="5" fill="#8b5cf6" />
            <circle cx="50" cy="50" r="5" fill="#06b6d4" />
            <circle cx="75" cy="65" r="5" fill="#8b5cf6" />
            <circle cx="50" cy="85" r="5" fill="#06b6d4" />

            {/* Connecting logical lines of the AI brain network */}
            <line x1="50" y1="15" x2="25" y2="35" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="1.5" />
            <line x1="25" y1="35" x2="50" y2="50" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="1.5" />
            <line x1="50" y1="50" x2="75" y2="65" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="1.5" />
            <line x1="75" y1="65" x2="50" y2="85" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="1.5" />

            <defs>
              <linearGradient id="logo-grad" x1="25" y1="15" x2="75" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div>
            <div className="logo-text-title">
              <span className="logo-sketch-word">Sketch</span> Web Tech
            </div>
            <div className="logo-tagline">Crafting Intelligent Digital Experiences</div>
          </div>
        </div>

        {/* Desktop Navigation Links & Info Button Container */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }} className="nav-desktop-only">
          <nav>
            <ul className="nav-links">
              {navItems.map((item) => (
                <li
                  key={item.id}
                  className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </nav>
          <button
            onClick={onToggleSidebar}
            className="btn btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Info size={14} className="text-gradient" /> Quick Info
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '80px',
            left: 0,
            width: '100%',
            backgroundColor: 'rgba(11, 15, 25, 0.98)',
            borderBottom: '1px solid var(--glass-border)',
            padding: '20px 24px',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            backdropFilter: 'blur(16px)'
          }}
        >
          {navItems.map((item) => (
            <div
              key={item.id}
              style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: activeTab === item.id ? 'var(--accent-cyan)' : 'var(--text-primary)',
                cursor: 'pointer',
                padding: '8px 0'
              }}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};
