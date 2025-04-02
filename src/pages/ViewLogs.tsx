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
const [searchQuery, setSearchQuery] = useState<string>('');
const [analysisResults, setAnalysisResults] = useState<{ [key: number]: string }>({});

  // Load logs from LocalStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem('triggers');
    if (stored) {
      setLogs(JSON.parse(stored));
    }
  }, []);

  const filteredLogs = logs.filter(log =>
    log.event.toLowerCase().includes(searchQuery.toLowerCase())
  );

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


  const analyzeLog = async (log: TriggerFormData): Promise<string> => {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || '/api/analyze';

    const prompt = `Analyze the following emotional trigger log and provide empathetic insights and suggestions:
    
  Event: ${log.event}
  Emotions: ${log.emotions}
  Internal Narrative: ${log.narrative}
  Violated Core Needs: ${log.coreNeeds}
  Deeper Truth: ${log.deeperTruth}
  Ideal Alternative: ${log.idealAlternative}
  Action: ${log.action}`;
  
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
  };

  const handleAnalyze = async (index: number, log: TriggerFormData) => {
    try {
      const analysis = await analyzeLog(log);
      setAnalysisResults(prev => ({ ...prev, [index]: analysis }));
    } catch (error) {
      console.error('Error analyzing log:', error);
      setAnalysisResults(prev => ({ ...prev, [index]: 'Analysis failed. Please try again.' }));
    }
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

<div style={{ marginBottom: '1rem' }}>
  <input
    type="text"
    placeholder="Search logs by event..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    style={{ padding: '0.5rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
  />
</div>


      {filteredLogs.length === 0 ? (
        <p>No logs found. Log a trigger first!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredLogs.map((log, index) => (
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
                <strong>Date:</strong> {new Date(log.date).toLocaleString()}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleDelete(index)}>Delete Log</button>
                <Link to={`/log/edit/${index}`}>
                  <button>Edit Log</button>
                </Link>
                <button onClick={() => handleAnalyze(index, log)}>Analyze</button>
              </div>
              {analysisResults[index] && (
                <div
                  style={{
                    marginTop: '0.5rem',
                    backgroundColor: '#f1f1f1',
                    padding: '0.5rem',
                    borderRadius: '4px',
                  }}
                >
                  <strong>Analysis:</strong>
                  <p>{analysisResults[index]}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewLogs;