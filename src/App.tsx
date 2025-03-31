// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import LogTrigger from './pages/LogTrigger';
import ViewLogs from './pages/ViewLogs';
import EditTrigger from './pages/EditTrigger';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="log" element={<LogTrigger />} />
        <Route path="view-logs" element={<ViewLogs />} />
        <Route path="log/edit/:index" element={<EditTrigger />} />
      </Route>
    </Routes>
  );
};

export default App;