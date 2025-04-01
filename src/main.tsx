import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const basename = import.meta.env.MODE === 'production' ? '/' : '/';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
  <HashRouter>
    <App />
  </HashRouter>
  </React.StrictMode>
);