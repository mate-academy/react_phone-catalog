import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.scss';
import { Root } from './Root';
import { HashRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router
      future={{
        v7_relativeSplatPath: true,
      }}
    >
      <Root />
    </Router>
  </StrictMode>,
);
