'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText, Settings, ShieldAlert, Workflow } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/pipeline', label: 'Candidate Pipeline', icon: Users },
  { href: '/jobs', label: 'Job Frameworks', icon: FileText },
  { href: '/bias-audits', label: 'Bias Audits', icon: ShieldAlert },
  { href: '/agent-logs', label: 'Agent Logs', icon: Workflow },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon"></div>
          <h2>RecruitAI</h2>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
            const Icon = item.icon;
            
            return (
              <li key={item.href}>
                <Link href={item.href} className={`nav-link ${isActive ? 'active' : ''}`}>
                  <Icon size={20} className="nav-icon" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="agent-status glass-panel">
          <div className="status-indicator online"></div>
          <div>
            <p className="status-title">Orchestrator</p>
            <p className="status-text">All Agents Active</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
