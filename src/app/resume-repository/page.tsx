'use client';

import React, { useState } from 'react';
import { Database, Search, Filter, Cpu, GraduationCap, Briefcase } from 'lucide-react';
import { mockCandidates } from '@/lib/mockData';
import './page.css';

export default function ResumeRepositoryPage() {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  
  const selectedCandidate = selectedCandidateId 
    ? mockCandidates.find(c => c.id === selectedCandidateId) 
    : null;

  return (
    <div className="repo-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Resume Repository</h1>
          <p className="page-subtitle">Centralized database of all parsed candidate profiles.</p>
        </div>
      </header>

      <div className="repo-content">
        {/* Left Side: Candidate List */}
        <div className="candidate-list-panel glass-panel">
          <div className="list-header">
            <div className="search-bar">
              <Search size={16} className="search-icon" />
              <input type="text" placeholder="Search candidates..." className="search-input" />
            </div>
            <button className="icon-btn"><Filter size={18} /></button>
          </div>
          
          <div className="candidates-scroll">
            {mockCandidates.map(candidate => (
              <div 
                key={candidate.id} 
                className={`repo-candidate-item ${selectedCandidateId === candidate.id ? 'active' : ''}`}
                onClick={() => setSelectedCandidateId(candidate.id)}
              >
                <div className="avatar-sm">{candidate.name.charAt(0)}</div>
                <div className="candidate-info">
                  <h4>{candidate.name}</h4>
                  <p>{candidate.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Candidate Details */}
        <div className="candidate-details-panel glass-panel">
          {selectedCandidate ? (
            <div className="details-content">
              <div className="details-header">
                <div className="avatar-lg">{selectedCandidate.name.charAt(0)}</div>
                <div>
                  <h2>{selectedCandidate.name}</h2>
                  <p className="role-title">{selectedCandidate.role}</p>
                  <div className="tags-row">
                    {selectedCandidate.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="tag-sm">{skill.name}</span>
                    ))}
                    {selectedCandidate.skills.length > 3 && (
                      <span className="tag-sm more">+{selectedCandidate.skills.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="details-body">
                <section className="profile-section">
                  <h3 className="section-title"><Briefcase size={18} /> Experience</h3>
                  <p className="section-text">{selectedCandidate.experience}</p>
                </section>
                
                <section className="profile-section">
                  <h3 className="section-title"><GraduationCap size={18} /> Education</h3>
                  <p className="section-text">{selectedCandidate.education}</p>
                </section>

                <section className="profile-section">
                  <h3 className="section-title"><Cpu size={18} /> Extracted Skills Overview</h3>
                  <div className="skills-grid">
                    {selectedCandidate.skills.map(s => (
                      <div key={s.name} className={`skill-box ${s.category}`}>
                        <span className="skill-name">{s.name}</span>
                        <span className="skill-level">{s.level}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <Database size={48} className="empty-icon text-secondary" />
              <h3>Select a Candidate</h3>
              <p className="text-secondary">Click on a candidate from the repository to view their detailed extracted resume data.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
