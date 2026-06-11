import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/index.scss';
import { HashRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <App />
  </Router>,
);
