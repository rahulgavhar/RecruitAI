'use client';

import React from 'react';
import { 
  FileText, 
  Files, 
  Briefcase, 
  Filter, 
  BrainCircuit, 
  Lightbulb, 
  Lock,
  ArrowDown
} from 'lucide-react';
import './agents.css';

const agentsData = [
  {
    id: 'parser',
    title: 'Resume Parser',
    description: 'Converts unstructured resumes into structured fields: skills, experience, education, domain. Handles all formats.',
    icon: FileText,
    type: 'ingestion'
  },
  {
    id: 'dedupe',
    title: 'Duplicate Detection',
    description: 'Identifies repeat candidates using email or phone number so same person isn\'t counted twice.',
    icon: Files,
    type: 'cleansing'
  },
  {
    id: 'jd',
    title: 'JD Creation Module',
    description: 'Lets recruiter define must-have skills, good-to-have skills, minimum experience, and location preference.',
    icon: Briefcase,
    type: 'definition'
  },
  {
    id: 'filters',
    title: 'Rules-Based Filters',
    description: 'Hard filters like "must have Python" or "minimum 3 years experience" applied before scoring.',
    icon: Filter,
    type: 'processing'
  },
  {
    id: 'matching',
    title: 'AI Matching Engine',
    description: 'Compares resume against JD and generates a composite match score with sub-scores for skills, experience, and domain.',
    icon: BrainCircuit,
    type: 'core'
  },
  {
    id: 'explain',
    title: 'Explainability Card',
    description: 'Shows exactly which skills matched, which didn\'t, and pulls actual lines from the resume to justify the score.',
    icon: Lightbulb,
    type: 'reporting'
  },
  {
    id: 'locking',
    title: 'Candidate Locking',
    description: 'Reserves shortlisted candidates for a role for 14 days. After that they go back to the general talent pool automatically.',
    icon: Lock,
    type: 'action'
  }
];

function DownArrow() {
  return (
    <div className="flow-connector">
      <div className="flow-line"></div>
      <ArrowDown size={20} className="flow-icon" />
    </div>
  );
}

export default function AgentsPage() {
  return (
    <div className="page-content agents-page animate-fade-in">
      <div className="agents-header">
        <h1 className="text-gradient">AI Agents Architecture</h1>
        <p className="subtitle">The intelligent pipeline powering RecruitAI's candidate processing and matching.</p>
      </div>

      <div className="agents-flow">
        
        {/* Layer 1 */}
        <div className="flow-row">
          <div className="flow-column">
            <AgentCard data={agentsData.find(a => a.id === 'jd')} />
            <DownArrow />
          </div>
          <div className="flow-column">
            <AgentCard data={agentsData.find(a => a.id === 'parser')} />
            <DownArrow />
            <AgentCard data={agentsData.find(a => a.id === 'dedupe')} />
            <DownArrow />
          </div>
        </div>

        {/* Join Point */}
        <div className="flow-join">
          <div className="join-horizontal"></div>
          <div className="join-vertical"></div>
          <ArrowDown size={20} className="flow-icon" />
        </div>

        {/* Layer 2 */}
        <div className="flow-row single">
          <div className="flow-column">
            <AgentCard data={agentsData.find(a => a.id === 'filters')} />
            <DownArrow />
          </div>
        </div>

        {/* Layer 3 */}
        <div className="flow-row single">
          <div className="flow-column">
            <AgentCard data={agentsData.find(a => a.id === 'matching')} isCore={true} />
            <DownArrow />
          </div>
        </div>

        {/* Split Point */}
        <div className="flow-split">
          <div className="split-vertical"></div>
          <div className="split-horizontal"></div>
          <div className="split-arrows">
            <ArrowDown size={20} className="flow-icon left" />
            <ArrowDown size={20} className="flow-icon right" />
          </div>
        </div>

        {/* Layer 4 */}
        <div className="flow-row split-row">
          <div className="flow-column">
            <AgentCard data={agentsData.find(a => a.id === 'explain')} />
          </div>
          <div className="flow-column">
            <AgentCard data={agentsData.find(a => a.id === 'locking')} />
          </div>
        </div>

      </div>
    </div>
  );
}

function AgentCard({ data, isCore = false }: { data: any, isCore?: boolean }) {
  if (!data) return null;
  const Icon = data.icon;
  
  return (
    <div className={`agent-card glass-panel ${isCore ? 'core-card' : ''}`}>
      <div className="agent-card-header">
        <div className={`icon-container type-${data.type}`}>
          <Icon size={24} />
        </div>
        <h3 className="agent-title">{data.title}</h3>
      </div>
      <div className="agent-card-body">
        <p>{data.description}</p>
      </div>
      <div className="agent-card-footer">
        <div className={`status-dot active`}></div>
        <span>Agent Online</span>
      </div>
    </div>
  );
}
