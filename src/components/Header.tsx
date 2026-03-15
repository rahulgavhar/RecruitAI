'use client';

import React from 'react';
import { Bell, Search, UserCircle } from 'lucide-react';
import './Header.css';

export default function Header() {
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
