'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Search, UserCircle, Sun, Moon } from 'lucide-react';
import './Header.css';

export default function Header() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
    setIsDark(!isLightMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  return (
    <header className="top-nav">
      <div className="search-bar glass-panel">
        <Search size={18} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search candidates, jobs, or skills..." 
          className="search-input"
        />
      </div>
      
      <div className="nav-actions">
        <button className="action-btn" onClick={toggleTheme}>
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="action-btn">
          <Bell size={20} />
          <span className="badge-indicator"></span>
        </button>
        <div className="user-profile">
          <UserCircle size={32} className="avatar-icon" />
          <div className="user-info">
            <span className="user-name">Sarah Recruiter</span>
            <span className="user-role">Talent Acquisition</span>
          </div>
        </div>
      </div>
    </header>
  );
}
