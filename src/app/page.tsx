'use client';

import React from 'react';
import { Users, FileUser, AlertTriangle, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import { pipelineMetrics, mockCandidates } from '@/lib/mockData';
import './page.css';
import Link from 'next/link';

export default function Dashboard() {
  const topCandidates = mockCandidates.slice(0, 3);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1 className="page-title">Recruiter Intelligence</h1>
          <p className="page-subtitle">Overview of active pipeline and AI matching metrics</p>
        </div>
        <Link href="/pipeline" className="btn-primary">
          View Full Pipeline <ArrowRight size={16} />
        </Link>
      </header>

      <section className="metrics-grid">
        <div className="metric-card glass-panel">
          <div className="metric-icon-wrap" style={{ background: 'rgba(56, 189, 248, 0.1)' }}>
            <FileUser className="metric-icon" style={{ color: '#38bdf8' }} size={24} />
          </div>
          <div className="metric-content">
            <h3>Total Resumes</h3>
            <p className="metric-val">{pipelineMetrics.totalProcessed}</p>
          </div>
        </div>
        
        <div className="metric-card glass-panel">
          <div className="metric-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
            <Users className="metric-icon" style={{ color: '#10b981' }} size={24} />
          </div>
          <div className="metric-content">
            <h3>Shortlisted</h3>
            <p className="metric-val">{pipelineMetrics.shortlisted}</p>
          </div>
        </div>

        <div className="metric-card glass-panel">
          <div className="metric-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
            <Activity className="metric-icon" style={{ color: '#8b5cf6' }} size={24} />
          </div>
          <div className="metric-content">
            <h3>Rejected</h3>
            <p className="metric-val">{pipelineMetrics.rejected}</p>
          </div>
        </div>

        <div className="metric-card glass-panel border-warning">
          <div className="metric-icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
            <AlertTriangle className="metric-icon" style={{ color: '#f59e0b' }} size={24} />
          </div>
          <div className="metric-content">
            <h3>Duplicates Detected</h3>
            <p className="metric-val text-warning">{pipelineMetrics.biasAlerts}</p>
          </div>
        </div>
      </section>

      <div className="dashboard-content">
        <section className="main-panel glass-panel">
              <div className="card-header">
                <h3>Top AI Recommendations</h3>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-secondary bg-white/5 px-2 py-1 rounded-md border border-white/5">
                    Target Role: <strong>Senior AI Engineer</strong>
                  </span>
                  <Link href="/pipeline" className="link-button">See all matches</Link>
                </div>
              </div>
          
          <div className="candidate-list">
            {topCandidates.map(candidate => (
              <div key={candidate.id} className="candidate-row">
                <div className="candidate-info">
                  <div className="candidate-avatar">{candidate.name.charAt(0)}</div>
                  <div>
                    <h4>{candidate.name}</h4>
                    <p>{candidate.role}</p>
                  </div>
                </div>
                
                <div className="score-container">
                  <div className="score-circle">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                      <path className="circle-bg"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path className="circle"
                        strokeDasharray={`${candidate.overallScore}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <text x="18" y="20.35" className="percentage">{candidate.overallScore}</text>
                    </svg>
                  </div>
                  <div className="score-label">Match Score</div>
                </div>
                
                <div className="candidate-tags">
                  {candidate.skills.slice(0, 2).map((skill, idx) => (
                    <span key={idx} className={`badge badge-${skill.category}`}>{skill.name}</span>
                  ))}
                  {candidate.skills.length > 2 && (
                    <span className="badge badge-soft">+{candidate.skills.length - 2}</span>
                  )}
                </div>
                
                <div className="candidate-action">
                  <Link href={`/pipeline/${candidate.id}`} className="btn-secondary">Review</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="side-panel glass-panel">
          <div className="panel-header">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} className="text-success" />
              System Status
            </h2>
          </div>
          
          <div className="system-logs">
            <div className="log-item">
              <span className="log-time">10:42 AM</span>
              <p>Orchestrator finished processing batch <strong>#UX-223</strong></p>
            </div>
            <div className="log-item">
              <span className="log-time">09:15 AM</span>
              <p>Bias Agent flagged <span className="text-warning">1 resume</span> in Engineering queue</p>
            </div>
            <div className="log-item">
              <span className="log-time">08:30 AM</span>
              <p>Knowledge Graph updated with 12 new adjacencies</p>
            </div>
            <div className="log-item">
              <span className="log-time">Yesterday</span>
              <p>Parser successfully extracted 45 complex PDF resumes</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
