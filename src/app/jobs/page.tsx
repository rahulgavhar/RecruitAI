'use client';

import React, { useState } from 'react';
import { FileText, Plus, Layers, Target, CheckCircle, ShieldAlert, Play, X } from 'lucide-react';
import { mockJobDescription, mockDataScientistJob } from '@/lib/mockData';
import './page.css';

export default function JobFrameworksPage() {
  const [activeJobId, setActiveJobId] = useState<'ai-engineer' | 'data-scientist'>('ai-engineer');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeJob = activeJobId === 'ai-engineer' ? mockJobDescription : mockDataScientistJob;
  const [analyzeState, setAnalyzeState] = useState<'idle' | 'collecting' | 'parsing' | 'matching' | 'done'>('idle');

  const handleAnalyze = () => {
    if (analyzeState !== 'idle') return;
    
    setAnalyzeState('collecting');
    
    setTimeout(() => {
      setAnalyzeState('parsing');
      
      setTimeout(() => {
        setAnalyzeState('matching');
        
        setTimeout(() => {
          setAnalyzeState('done');
          
          // Optional: revert back to idle after some time
          setTimeout(() => {
            setAnalyzeState('idle');
          }, 3000);
          
        }, 3000);
      }, 3000);
    }, 3000);
  };

  return (
    <div className="jobs-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Job Description</h1>
          <p className="page-subtitle">Manage structured requirements for AI semantic matching</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> New Framework
        </button>
      </header>

      <div className="jobs-content">
        <div className="jobs-list glass-panel">
          <div className="list-header">
            <h3>Active Roles</h3>
          </div>
          <div 
            className={`job-item ${activeJobId === 'ai-engineer' ? 'active' : ''}`}
            onClick={() => setActiveJobId('ai-engineer')}
            style={{ cursor: 'pointer' }}
          >
            <div className={`job-icon ${activeJobId === 'ai-engineer' ? 'primary' : ''}`}>
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
          <div 
            className={`job-item ${activeJobId === 'data-scientist' ? 'active' : ''}`}
            onClick={() => setActiveJobId('data-scientist')}
            style={{ cursor: 'pointer' }}
          >
            <div className={`job-icon ${activeJobId === 'data-scientist' ? 'primary' : ''}`}>
              <Target size={20} />
            </div>
            <div className="job-details">
              <h4>Data Scientist</h4>
              <p>Data Analytics</p>
            </div>
            <div className="job-status">
              <span className="status-dot green"></span> Active
            </div>
          </div>
        </div>

        <div className="framework-details glass-panel">
          <div className="detail-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ marginTop: 0 }}>{activeJob.title}</h2>
              <div className="detail-meta">
                <span>{activeJob.department}</span>
                <span>&bull;</span>
                <span>{activeJob.location}</span>
              </div>
            </div>
            <button 
              className="btn-primary" 
              onClick={handleAnalyze}
              disabled={analyzeState !== 'idle' && analyzeState !== 'done'}
              style={{
                backgroundColor: analyzeState === 'done' ? '#10b981' : undefined,
                backgroundImage: analyzeState === 'done' ? 'none' : undefined,
                opacity: (analyzeState === 'collecting' || analyzeState === 'parsing' || analyzeState === 'matching') ? 0.8 : 1
              }}
            >
              {analyzeState === 'idle' && <><Play size={16} /> Start Analyzing All Resumes</>}
              {analyzeState === 'collecting' && <><Plus size={16} className="state-loading-spinner" style={{ animation: 'spin 1.5s linear infinite' }} /> Resumes Ingested</>}
              {analyzeState === 'parsing' && <><FileText size={16} className="state-loading-spinner" style={{ animation: 'pulse 1.5s infinite' }} /> Compared Resumes with JD...</>}
              {analyzeState === 'matching' && <><Target size={16} className="state-loading-spinner" style={{ animation: 'spin 1.5s linear infinite' }} /> Matching & Scoring</>}
              {analyzeState === 'done' && <><CheckCircle size={16} /> Shortlists Generated</>}
            </button>
          </div>

          <div className="detail-body">
            <section className="req-section">
              <h3>Role Overview</h3>
              <p className="description-text">{activeJob.description}</p>
            </section>

            <section className="req-section">
              <h3>Parsed AI Attributes & Weights</h3>
              <div className="attributes-grid">
                {activeJob.requirements.map(req => (
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
                <li><CheckCircle size={16} className="text-success" /> Semantic Adjacency Graph ({activeJobId === 'ai-engineer' ? 'ML Domain' : 'Data Domain'})</li>
                <li><ShieldAlert size={16} className="text-warning" /> Bias Detector: {activeJobId === 'ai-engineer' ? 'Seniority & Age Proxy' : 'Educational Background Proxy'}</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel">
            <div className="modal-header">
              <h2>Create New Job Description</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="form-group">
              <label>Job Title</label>
              <input type="text" className="form-input" placeholder="e.g. Prompt Engineer" />
            </div>
            
            <div className="form-group">
              <label>Department</label>
              <input type="text" className="form-input" placeholder="e.g. Generative AI" />
            </div>
            
            <div className="form-group">
              <label>Location</label>
              <input type="text" className="form-input" placeholder="e.g. Remote / New York" />
            </div>
            
            <div className="form-group">
              <label>Role Overview</label>
              <textarea className="form-textarea" placeholder="Brief description of the role responsibilities..."></textarea>
            </div>
            
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => setIsModalOpen(false)}>Save Framework</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
