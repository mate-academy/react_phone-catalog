import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import { Root } from './Root';
import { GlobalStateProvider } from './store/GadgetsContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <GlobalStateProvider>
      <Root />
    </GlobalStateProvider>
  </Router>,
);
