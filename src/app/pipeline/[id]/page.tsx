'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, Cpu, BrainCircuit, GraduationCap, Briefcase, FileSearch } from 'lucide-react';
import { mockCandidates, mockJobDescription } from '@/lib/mockData';
import './page.css';

export default function CandidateProfile({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const candidate = mockCandidates.find(c => c.id === unwrappedParams.id);
  
  if (!candidate) {
    notFound();
  }

  return (
    <div className="profile-page">
      <header className="profile-header">
        <Link href="/pipeline" className="back-link">
          <ArrowLeft size={16} /> Back to Pipeline
        </Link>
        <div className="profile-actions">
          <button className="btn-secondary danger-outline"><XCircle size={16} /> Reject</button>
          <button className="btn-primary"><CheckCircle size={16} /> Shortlist</button>
        </div>
      </header>

      <div className="profile-layout">
        {/* Left Column: Core Profile */}
        <div className="profile-left">
          <div className="candidate-card glass-panel">
            <div className="profile-top">
              <div className="avatar-lg">{candidate.name.charAt(0)}</div>
              <div className="candidate-info">
                <h2>{candidate.name}</h2>
                <p className="role-title">{candidate.role}</p>
                {candidate.status === 'shortlisted' && <span className="status-pill success">Shortlisted</span>}
                {candidate.status === 'rejected' && <span className="status-pill danger">Rejected</span>}
              </div>
            </div>
            
            <div className="profile-section">
              <h3 className="section-title"><Briefcase size={18} /> Experience</h3>
              <p className="section-text">{candidate.experience}</p>
            </div>
            
            <div className="profile-section">
              <h3 className="section-title"><GraduationCap size={18} /> Education</h3>
              <p className="section-text">{candidate.education}</p>
            </div>

            <div className="profile-section">
              <h3 className="section-title"><Cpu size={18} /> Extracted Skills</h3>
              <div className="skills-grid">
                {candidate.skills.map(s => (
                  <div key={s.name} className={`skill-box ${s.category}`}>
                    <span className="skill-name">{s.name}</span>
                    <span className="skill-level">{s.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Explainability */}
        <div className="profile-right">
          <div className="explainability-card glass-panel">
            <div className="card-header">
              <h2><BrainCircuit size={22} className="text-accent" /> AI Evaluation Report</h2>
              <div className="overall-score">
                <span className="score-val">{candidate.overallScore}</span>
                <span className="score-label">/100</span>
              </div>
            </div>

            {candidate.biasFlag && (
              <div className="bias-alert-box">
                <AlertTriangle size={20} className="text-warning" />
                <div>
                  <h4>Bias Warning Detected</h4>
                  <p>{candidate.biasReason}</p>
                </div>
              </div>
            )}

            <div className="score-breakdown">
              <div className="breakdown-item">
                <div className="breakdown-header">
                  <span>Skills Match</span>
                  <span>{candidate.matchBreakdown.skills}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${candidate.matchBreakdown.skills}%`, background: '#8b5cf6' }}></div>
                </div>
              </div>
              <div className="breakdown-item">
                <div className="breakdown-header">
                  <span>Experience Relevance</span>
                  <span>{candidate.matchBreakdown.experience}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${candidate.matchBreakdown.experience}%`, background: '#3b82f6' }}></div>
                </div>
              </div>
              <div className="breakdown-item">
                <div className="breakdown-header">
                  <span>Education Match</span>
                  <span>{candidate.matchBreakdown.education}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${candidate.matchBreakdown.education}%`, background: '#10b981' }}></div>
                </div>
              </div>
            </div>

            <div className="reasoning-box">
              <h3 className="sub-heading"><FileSearch size={16} /> Match Explainability</h3>
              <p className="reasoning-text">{candidate.explainability}</p>
              
              {candidate.counterfactual && (
                <div className="counterfactual-box">
                  <h4>Counterfactual Insight</h4>
                  <p>{candidate.counterfactual}</p>
                </div>
              )}
            </div>
            
            <div className="requirements-check">
              <h3 className="sub-heading">Job Description Alignment</h3>
              <ul className="req-list">
                {mockJobDescription.requirements.map(req => {
                  const hasSkill = candidate.skills.some(s => s.name === req.skill || s.name.includes(req.skill.split(' ')[0]));
                  return (
                    <li key={req.skill} className={hasSkill ? 'req-met' : 'req-unmet'}>
                      {hasSkill ? <CheckCircle size={16} /> : <XCircle size={16} />}
                      <span className="req-name">{req.skill}</span>
                      <span className="req-type">{req.type}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
