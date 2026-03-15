'use client';

import React from 'react';
import { ShieldAlert, Download, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import { mockBiasAudits } from '@/lib/mockData';
import './page.css';

export default function BiasAuditsPage() {
  return (
    <div className="bias-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">
            <ShieldAlert className="title-icon text-warning" size={32} /> 
            Bias Audits
          </h1>
          <p className="page-subtitle">Monitor and review systemic flags triggered by the fairness evaluation agent.</p>
        </div>
        <button className="btn-secondary">
          <Download size={18} /> Export Log
        </button>
      </header>

      <section className="audit-metrics grid glass-panel">
        <div className="audit-stat">
          <div className="stat-value text-warning">3</div>
          <div className="stat-label">Active Flags (30 days)</div>
        </div>
        <div className="audit-stat">
          <div className="stat-value text-success">14</div>
          <div className="stat-label">Resolved Issues</div>
        </div>
        <div className="audit-stat">
          <div className="stat-value">99.4%</div>
          <div className="stat-label">Fairness Confidence Score</div>
        </div>
      </section>

      <div className="audit-table-container glass-panel">
        <div className="table-header">
          <h3>Recent Audit Trail</h3>
          <div className="search-bar-small">
            <Search size={14} className="text-secondary" />
            <input type="text" placeholder="Search audits..." />
          </div>
        </div>
        
        <table className="audit-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Candidate Affected</th>
              <th>Trigger Type</th>
              <th>System Detail</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockBiasAudits.map(audit => (
              <tr key={audit.id}>
                <td className="col-date">{audit.date}</td>
                <td className="col-candidate">
                  <span className="candidate-name-link">{audit.candidate}</span>
                </td>
                <td className="col-trigger">
                  <span className="trigger-badge">{audit.trigger}</span>
                </td>
                <td className="col-detail">
                  <p className="detail-text">{audit.detail}</p>
                </td>
                <td className="col-status">
                  {audit.status.includes('Resolved') ? (
                    <span className="status-badge success"><CheckCircle size={14} /> {audit.status}</span>
                  ) : (
                    <span className="status-badge warning"><AlertTriangle size={14} /> {audit.status}</span>
                  )}
                </td>
                <td className="col-action">
                  <button className="btn-table">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
