import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { Root } from './Root';
import { GlobalStateProvider } from './contex/State';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <GlobalStateProvider>
      <Root />
    </GlobalStateProvider>
  </Router>,
);
