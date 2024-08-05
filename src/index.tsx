import { createRoot } from 'react-dom/client';

import { HashRouter as Router } from 'react-router-dom';

import { Root } from './routes/index';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Root />
  </Router>,
);
