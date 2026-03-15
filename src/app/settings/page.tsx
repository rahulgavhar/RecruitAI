'use client';

import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Database, Shield, Cpu, BellRing } from 'lucide-react';
import './page.css';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="settings-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">
            <SettingsIcon className="title-icon text-secondary" size={32} /> 
            System Settings
          </h1>
          <p className="page-subtitle">Configure Orchestrator behavior, LLM integrations, and threshold limits.</p>
        </div>
        <button className="btn-primary">
          <Save size={18} /> Save Changes
        </button>
      </header>

      <div className="settings-layout">
        {/* Settings Sidebar */}
        <div className="settings-nav glass-panel">
          <button 
            className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <SettingsIcon size={18} /> General System
          </button>
          <button 
            className={`settings-tab ${activeTab === 'agents' ? 'active' : ''}`}
            onClick={() => setActiveTab('agents')}
          >
            <Cpu size={18} /> Agent Configurations
          </button>
          <button 
            className={`settings-tab ${activeTab === 'bias' ? 'active' : ''}`}
            onClick={() => setActiveTab('bias')}
          >
            <Shield size={18} /> Fairness & Bias
          </button>
          <button 
            className={`settings-tab ${activeTab === 'data' ? 'active' : ''}`}
            onClick={() => setActiveTab('data')}
          >
            <Database size={18} /> Knowledge Graph
          </button>
          <button 
            className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <BellRing size={18} /> Alerts
          </button>
        </div>

        {/* Settings Content Area */}
        <div className="settings-content glass-panel">
          {activeTab === 'general' && (
            <div className="settings-section animate-fade-in">
              <h2>General Preferences</h2>
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" className="form-input" defaultValue="Enterprise Corp" />
              </div>
              <div className="form-group">
                <label>Default LLM Provider</label>
                <select className="form-input">
                  <option>OpenAI GPT-4o (Recommended)</option>
                  <option>Anthropic Claude 3.5 Sonnet</option>
                  <option>Google Gemini 1.5 Pro</option>
                  <option>Local HuggingFace Model</option>
                </select>
              </div>
              <div className="form-group row-align">
                <div>
                  <label>Auto-Approval Threshold</label>
                  <p className="help-text">Candidates scoring above this threshold bypass initial human review.</p>
                </div>
                <div className="slider-container">
                  <input type="range" min="70" max="100" defaultValue="90" className="range-slider" />
                  <span className="slider-val">90%</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'agents' && (
            <div className="settings-section animate-fade-in">
              <h2>Agent Swarm Tuning</h2>
              
              <div className="agent-config-card">
                <div className="agent-config-header">
                  <h3>Parser Agent</h3>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>
                <p className="help-text">Utilizes OCR and layout understanding to structuralize PDF/DOCX resumes.</p>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked /> Extract implicitly defined soft skills
                  </label>
                </div>
              </div>

              <div className="agent-config-card mt-4">
                <div className="agent-config-header">
                  <h3>Semantic Matcher</h3>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="form-group mt-3">
                  <label>Adjacency Aggressiveness</label>
                  <p className="help-text">Higher values infer broader skill mapping (e.g., matching 'React' heavily to 'Vue' reqs).</p>
                  <input type="range" min="1" max="10" defaultValue="6" className="range-slider mt-2" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bias' && (
            <div className="settings-section animate-fade-in">
              <h2>Fairness Controls</h2>
              <p className="help-text mb-4">Configure the strictness of the Bias Monitoring Agent.</p>
              
              <div className="form-group row-align border-bottom pb-4 mb-4">
                <div>
                  <label>University Prestige Penalty</label>
                  <p className="help-text">Automatically normalize scores to prevent heavy bias toward ivy league institutions.</p>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="form-group row-align border-bottom pb-4 mb-4">
                <div>
                  <label>Redact PII from Reviewers</label>
                  <p className="help-text">Hide names, photos, and exact locations during manual candidate pipeline review.</p>
                </div>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          )}

          {(activeTab === 'data' || activeTab === 'notifications') && (
            <div className="settings-section animate-fade-in blank-state">
              <SettingsIcon size={48} className="text-secondary opacity-50 mb-3" />
              <h3>Not Configured</h3>
              <p className="text-secondary text-sm text-center">These settings are managed centrally by the IT Administrator.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
