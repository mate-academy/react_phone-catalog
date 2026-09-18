import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { StoreProvider } from './context/StoreContext';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <StoreProvider>
      <App />
    </StoreProvider>
  </Router>,
);
