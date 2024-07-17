import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';

createRoot(document.querySelector('#root') as HTMLElement).render(
  <Router>
    <App />
  </Router>,
);
