import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import './styles/index.scss';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <App />
  </Router>,
);
