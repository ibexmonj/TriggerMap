// src/pages/Home.tsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogTrigger = () => {
    navigate('/log');
  };

  return (
    <div>
      <h1>Welcome to TriggerMap</h1>
      <button onClick={handleLogTrigger}>Log a Trigger</button>
      <br />
      <Link to="/view-logs" style={{ marginTop: '1rem', display: 'inline-block' }}>
        View Logs
      </Link>
    </div>
  );
};

export default Home;