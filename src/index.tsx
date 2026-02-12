import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { Root } from './Root';
import { AppProviders } from './context/AppProviders';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <AppProviders>
    <Router>
      <Root />
    </Router>
  </AppProviders>,
);
