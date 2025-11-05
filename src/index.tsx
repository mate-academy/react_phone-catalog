import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import 'normalize.css';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <App />
  </Router>,
);
