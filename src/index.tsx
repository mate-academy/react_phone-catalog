import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Root />
  </Router>,
);
