// src/pages/EditTrigger.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface TriggerFormData {
  event: string;
  emotions: string;
  narrative: string;
  coreNeeds: string;
  deeperTruth: string;
  idealAlternative: string;
  action: string;
}

const EditTrigger: React.FC = () => {
  // Get the index of the log to edit from the URL
  const { index } = useParams<{ index: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<TriggerFormData>({
    event: '',
    emotions: '',
    narrative: '',
    coreNeeds: '',
    deeperTruth: '',
    idealAlternative: '',
    action: '',
  });

  // Load the existing log data when the component mounts
  useEffect(() => {
    if (index !== undefined) {
      const stored = localStorage.getItem('triggers');
      if (stored) {
        const logs: TriggerFormData[] = JSON.parse(stored);
        const logToEdit = logs[parseInt(index, 10)];
        if (logToEdit) {
          setFormData(logToEdit);
        }
      }
    }
  }, [index]);

  // Handle changes in any field
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to update the log
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem('triggers');
    if (stored && index !== undefined) {
      const logs: TriggerFormData[] = JSON.parse(stored);
      logs[parseInt(index, 10)] = formData;
      localStorage.setItem('triggers', JSON.stringify(logs));
      alert('Log updated successfully!');
      navigate('/view-logs');
    }
  };

  return (
    <div>
      <h1>Edit Trigger Log</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '600px',
        }}
      >
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

        <button type="submit">Update Log</button>
      </form>
    </div>
  );
};

export default EditTrigger;