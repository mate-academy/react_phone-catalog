import { createRoot } from 'react-dom/client';

import { BrowserRouter as Router } from 'react-router-dom';
import { Root } from './Root';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <Router>
    <Root />
  </Router>,
);
