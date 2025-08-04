import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import './i18n';

import { GlobalProvider } from './context/store';
import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <GlobalProvider>
      <Root />
    </GlobalProvider>
  </Router>,
);
