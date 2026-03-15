'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Filter, ChevronDown, CheckCircle, Clock, XCircle, ChevronRight } from 'lucide-react';
import { mockCandidates } from '@/lib/mockData';
import './page.css';

export default function PipelinePage() {
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredCandidates = activeTab === 'all' 
    ? mockCandidates 
    : mockCandidates.filter(c => c.status === activeTab);

  return (
    <div className="pipeline-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Candidate Pipeline</h1>
          <p className="page-subtitle">Manage and review AI-matched candidates for active roles.</p>
        </div>
        
        <div className="header-actions">
          <div className="role-selector glass-panel">
            <span>Senior AI Engineer</span>
            <ChevronDown size={16} />
          </div>
          <button className="btn-secondary">
            <Filter size={18} />
            Filters
          </button>
        </div>
      </header>

      <div className="pipeline-tabs">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Candidates
        </button>
        <button 
          className={`tab-btn ${activeTab === 'shortlisted' ? 'active' : ''}`}
          onClick={() => setActiveTab('shortlisted')}
        >
          Shortlisted
        </button>
        <button 
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending Review
        </button>
        <button 
          className={`tab-btn ${activeTab === 'rejected' ? 'active' : ''}`}
          onClick={() => setActiveTab('rejected')}
        >
          Rejected
        </button>
      </div>

      <div className="pipeline-table-container glass-panel">
        <table className="pipeline-table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Match Score</th>
              <th>Status</th>
              <th>Key Skills</th>
              <th>Bias Check</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map(candidate => (
              <tr key={candidate.id} className="table-row">
                <td className="col-candidate">
                  <div className="candidate-cell">
                    <div className="avatar-sm">{candidate.name.charAt(0)}</div>
                    <div>
                      <div className="candidate-name">{candidate.name}</div>
                      <div className="candidate-role">{candidate.role}</div>
                    </div>
                  </div>
                </td>
                <td className="col-score">
                  <div className={`score-badge ${candidate.overallScore >= 85 ? 'high' : 'medium'}`}>
                    {candidate.overallScore}%
                  </div>
                </td>
                <td className="col-status">
                  {candidate.status === 'shortlisted' && (
                    <span className="status-badge success"><CheckCircle size={14} /> Shortlisted</span>
                  )}
                  {candidate.status === 'pending' && (
                    <span className="status-badge warning"><Clock size={14} /> Pending</span>
                  )}
                  {candidate.status === 'rejected' && (
                    <span className="status-badge danger"><XCircle size={14} /> Rejected</span>
                  )}
                </td>
                <td className="col-skills">
                  <div className="skill-tags-sm">
                    {candidate.skills.slice(0, 2).map((skill, idx) => (
                      <span key={idx} className="tag-sm">{skill.name}</span>
                    ))}
                    {candidate.skills.length > 2 && (
                      <span className="tag-sm more">+{candidate.skills.length - 2}</span>
                    )}
                  </div>
                </td>
                <td className="col-bias">
                  {candidate.biasFlag ? (
                    <span className="bias-alert">Flagged</span>
                  ) : (
                    <span className="bias-clear">Clear</span>
                  )}
                </td>
                <td className="col-actions">
                  <Link href={`/pipeline/${candidate.id}`} className="row-action-btn">
                    Review <ChevronRight size={16} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
