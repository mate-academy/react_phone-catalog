import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';
import { HashRouter as Router } from 'react-router-dom';
import { AppContext } from './appContext/AppContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <AppContext>
      <App />
    </AppContext>
  </Router>,
);
