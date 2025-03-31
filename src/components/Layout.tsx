// src/components/Layout.tsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/log">Log a Trigger</Link>
          <Link to="/view-logs">View Logs</Link>
        </nav>
      </header>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;