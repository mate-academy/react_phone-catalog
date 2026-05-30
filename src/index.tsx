import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import './fonts.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <App />
  </Router>,
);
