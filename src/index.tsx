import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
// import 'bulma/css/bulma.css';
// import '@fortawesome/fontawesome-free/css/all.css';
import { Root } from './Root';
import { AppProviders } from './context/AppProviders';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <AppProviders>
    <Router>
      <Root />
    </Router>
  </AppProviders>,
);
