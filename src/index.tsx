import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
// eslint-disable-next-line max-len
import { SelectedProductProvider } from './utils/contexts/SelectedProductContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <SelectedProductProvider>
      <App />
    </SelectedProductProvider>
  </Router>,
);
