import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
// import { App } from './App';

import 'bulma/css/bulma.css';
import { Root } from './Root';
import { GlobalStateProvider } from './store/GadgetsContext';
// import '@fortawesome/fontawesome-free/css/all.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <GlobalStateProvider>
      <Root />
    </GlobalStateProvider>
  </Router>,
);
