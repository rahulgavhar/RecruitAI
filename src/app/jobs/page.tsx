'use client';

import React from 'react';
import { FileText, Plus, Layers, Target, CheckCircle, ShieldAlert } from 'lucide-react';
import { mockJobDescription } from '@/lib/mockData';
import './page.css';

export default function JobFrameworksPage() {
  return (
    <div className="jobs-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Job Frameworks</h1>
          <p className="page-subtitle">Manage structured requirements for AI semantic matching</p>
        </div>
        <button className="btn-primary">
          <Plus size={18} /> New Framework
        </button>
      </header>

      <div className="jobs-content">
        <div className="jobs-list glass-panel">
          <div className="list-header">
            <h3>Active Roles</h3>
          </div>
          <div className="job-item active">
            <div className="job-icon primary">
              <Layers size={20} />
            </div>
            <div className="job-details">
              <h4>Senior AI Engineer</h4>
              <p>Machine Learning Platform</p>
            </div>
            <div className="job-status">
              <span className="status-dot green"></span> Active
            </div>
          </div>
          <div className="job-item">
            <div className="job-icon">
              <Target size={20} />
            </div>
            <div className="job-details">
              <h4>Data Scientist</h4>
              <p>Risk & Analytics</p>
            </div>
            <div className="job-status">
              <span className="status-dot gray"></span> Draft
            </div>
          </div>
        </div>

        <div className="framework-details glass-panel">
          <div className="detail-header">
            <h2>{mockJobDescription.title}</h2>
            <div className="detail-meta">
              <span>{mockJobDescription.department}</span>
              <span>&bull;</span>
              <span>{mockJobDescription.location}</span>
            </div>
          </div>

          <div className="detail-body">
            <section className="req-section">
              <h3>Role Overview</h3>
              <p className="description-text">{mockJobDescription.description}</p>
            </section>

            <section className="req-section">
              <h3>Parsed AI Attributes & Weights</h3>
              <div className="attributes-grid">
                {mockJobDescription.requirements.map(req => (
                  <div key={req.skill} className="attribute-card glass-panel">
                    <div className="attr-header">
                      <span className="attr-name">{req.skill}</span>
                      <span className={`attr-type ${req.type === 'Must-have' ? 'must' : req.type === 'Good-to-have' ? 'good' : 'optional'}`}>
                        {req.type}
                      </span>
                    </div>
                    <div className="attr-weight">
                      <div className="weight-label">
                        <span>Model Weight</span>
                        <span>{req.weight}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${req.weight}%`, backgroundColor: req.type === 'Must-have' ? '#8b5cf6' : req.type === 'Good-to-have' ? '#38bdf8' : '#9ca3af' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="req-section">
              <h3>System Monitors Attached</h3>
              <ul className="monitor-list">
                <li><CheckCircle size={16} className="text-success" /> Semantic Adjacency Graph (ML Domain)</li>
                <li><ShieldAlert size={16} className="text-warning" /> Bias Detector: Seniority & Age Proxy</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
