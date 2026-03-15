'use client';

import React from 'react';
import { Workflow, Terminal, PlayCircle, PauseCircle, RefreshCw } from 'lucide-react';
import { mockAgentLogs } from '@/lib/mockData';
import './page.css';

export default function AgentLogsPage() {
  return (
    <div className="logs-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">
            <Workflow className="title-icon text-accent" size={32} /> 
            Agent Orchestrator Logs
          </h1>
          <p className="page-subtitle">Real-time workflow execution logs for the multi-agent reasoning engine.</p>
        </div>
        
        <div className="log-controls">
          <button className="btn-icon" title="Pause Stream"><PauseCircle size={20} /></button>
          <button className="btn-icon" title="Resume Stream"><PlayCircle size={20} /></button>
          <button className="btn-icon" title="Clear Logs"><RefreshCw size={20} /></button>
        </div>
      </header>

      <div className="terminal-container glass-panel">
        <div className="terminal-header">
          <div className="window-controls">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="terminal-title">
            <Terminal size={14} /> orchestrator-node-01
          </div>
        </div>

        <div className="terminal-body">
          <div className="log-line startup">
            <span className="time">[10:45:00 AM]</span>
            <span className="system">[SYSTEM]</span>
            <span className="message">Initializing RecruitAI Multi-Agent Swarm...</span>
          </div>
          <div className="log-line startup">
            <span className="time">[10:45:01 AM]</span>
            <span className="system">[SYSTEM]</span>
            <span className="message">Loading LLM context windows and Agent instructions (Parser, Analyzer, Matcher, Explainability, Bias).</span>
          </div>
          <div className="log-line startup">
            <span className="time">[10:45:03 AM]</span>
            <span className="system">[SYSTEM]</span>
            <span className="message">All Swarm agents ONLINE and waiting for inputs.</span>
          </div>
          <div className="log-divider">--- BATCH UX-223 INITIATED ---</div>

          {mockAgentLogs.map(log => (
            <div key={log.id} className={`log-line ${log.level}`}>
              <span className="time">[{log.timestamp}]</span>
              <span className={`agent-tag ${log.agent.toLowerCase().replace(' ', '-')}`}>[{log.agent}]</span>
              <span className="message">{log.message}</span>
            </div>
          ))}
          
          <div className="log-line cursor-line">
            <span className="prompt cursor-blink">_</span>
          </div>
        </div>
      </div>
      
      <div className="system-health grid">
        <div className="health-card glass-panel">
          <div className="health-label">API Latency</div>
          <div className="health-val text-success">124ms</div>
        </div>
        <div className="health-card glass-panel">
          <div className="health-label">Context Tokens Used (Today)</div>
          <div className="health-val">1.4M / 10M</div>
        </div>
        <div className="health-card glass-panel">
          <div className="health-label">Active Workflows</div>
          <div className="health-val text-accent">2</div>
        </div>
      </div>
    </div>
  );
}
