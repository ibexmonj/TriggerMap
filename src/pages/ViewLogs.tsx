// src/pages/ViewLogs.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface TriggerFormData {
  event: string;
  emotions: string;
  narrative: string;
  coreNeeds: string;
  deeperTruth: string;
  idealAlternative: string;
  action: string;
  date: string;
}

const ViewLogs: React.FC = () => {
  const [logs, setLogs] = useState<TriggerFormData[]>([]);

  // Load logs from LocalStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem('triggers');
    if (stored) {
      setLogs(JSON.parse(stored));
    }
  }, []);

  // Delete a single log by index
  const handleDelete = (indexToDelete: number) => {
    const updatedLogs = logs.filter((_, index) => index !== indexToDelete);
    localStorage.setItem('triggers', JSON.stringify(updatedLogs));
    setLogs(updatedLogs);
  };

  // Clear all logs from LocalStorage and state
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all logs?')) {
      localStorage.removeItem('triggers');
      setLogs([]);
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(logs, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trigger_logs.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>View Logs</h1>
      
      {/* Clear All Logs Button */}
      {logs.length > 0 && (
        <button onClick={handleClearAll} style={{ marginBottom: '1rem' }}>
          Clear All Logs
        </button>
      )}

           {/* Export Logs Button */}
      {logs.length > 0 && (
        <button onClick={handleExport} style={{ marginBottom: '1rem', marginRight: '1rem' }}>
          Export Logs
        </button>
      )}


      {logs.length === 0 ? (
        <p>No logs found. Log a trigger first!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {logs.map((log, index) => (
            <li
              key={index}
              style={{
                marginBottom: '1rem',
                border: '1px solid #ccc',
                padding: '1rem',
                borderRadius: '5px',
              }}
            >
              <p>
                <strong>Event:</strong> {log.event}
              </p>
              <p>
                <strong>Emotions:</strong> {log.emotions}
              </p>
              <p>
                <strong>Internal Narrative:</strong> {log.narrative}
              </p>
              <p>
                <strong>Violated Core Needs:</strong> {log.coreNeeds}
              </p>
              <p>
                <strong>Deeper Truth:</strong> {log.deeperTruth}
              </p>
              <p>
                <strong>Ideal Alternative:</strong> {log.idealAlternative}
              </p>
              <p>
                <strong>Action:</strong> {log.action}
              </p>
              <p>
                 <strong>Date:</strong> {log.date ? new Date(log.date).toLocaleString() : 'No date available'}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleDelete(index)}>Delete Log</button>
                <Link to={`/log/edit/${index}`}>
                  <button>Edit Log</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewLogs;