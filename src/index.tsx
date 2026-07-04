import { createRoot } from 'react-dom/client';
import { App } from './App';
import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <StrictMode>
      <App />
    </StrictMode>
  </Router>,
);
