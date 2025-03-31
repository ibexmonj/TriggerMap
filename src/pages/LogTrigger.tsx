// src/pages/LogTrigger.tsx
import React, { useState } from 'react';

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

const LogTrigger: React.FC = () => {
  // Initialize form state
  const [formData, setFormData] = useState<TriggerFormData>({
    event: '',
    emotions: '',
    narrative: '',
    coreNeeds: '',
    deeperTruth: '',
    idealAlternative: '',
    action: '',
    date: ''
  });

  const [error, setError] = useState<string>('');
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.event.trim() === '') {
      setError('Event description is required.');
      return;
    }

    const currentDate = new Date().toISOString();
    const dataToSave = { ...formData, date: currentDate };

    // 1. Retrieve existing triggers from LocalStorage
    const stored = localStorage.getItem('triggers');
    const triggers = stored ? JSON.parse(stored) : [];

    // 2. Append new form data
    triggers.push(dataToSave);
    localStorage.setItem('triggers', JSON.stringify(triggers));

    // 4. Reset the form (optional)
    setFormData({
      event: '',
      emotions: '',
      narrative: '',
      coreNeeds: '',
      deeperTruth: '',
      idealAlternative: '',
      action: '',
      date:''
    });

    alert('Trigger logged successfully!');
  };

  return (
    <div>
      <h1>Log a Trigger</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
        <label>
          Event:
          <textarea
            name="event"
            value={formData.event}
            onChange={handleChange}
            rows={2}
            placeholder="Describe what happened"
          />
        </label>
        {error && (
          <p style={{ color: 'red' }}>{error}</p>
        )}

        <label>
          Emotions:
          <textarea
            name="emotions"
            value={formData.emotions}
            onChange={handleChange}
            rows={2}
            placeholder="What emotions did you feel?"
          />
        </label>

        <label>
          Internal Narrative:
          <textarea
            name="narrative"
            value={formData.narrative}
            onChange={handleChange}
            rows={2}
            placeholder="What story did you tell yourself?"
          />
        </label>

        <label>
          Violated Core Needs:
          <textarea
            name="coreNeeds"
            value={formData.coreNeeds}
            onChange={handleChange}
            rows={2}
            placeholder="Which needs do you feel were violated?"
          />
        </label>

        <label>
          Deeper Truth:
          <textarea
            name="deeperTruth"
            value={formData.deeperTruth}
            onChange={handleChange}
            rows={2}
            placeholder="What deeper truth or compassionate perspective can you see?"
          />
        </label>

        <label>
          Ideal Alternative:
          <textarea
            name="idealAlternative"
            value={formData.idealAlternative}
            onChange={handleChange}
            rows={2}
            placeholder="What would you rather experience or do?"
          />
        </label>

        <label>
          Action:
          <textarea
            name="action"
            value={formData.action}
            onChange={handleChange}
            rows={2}
            placeholder="What action or next step will you take?"
          />
        </label>

        <button type="submit">Save Trigger</button>
      </form>
    </div>
  );
};

export default LogTrigger;