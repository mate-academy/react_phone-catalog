import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { StoreProvider } from './context/StoreContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <StoreProvider>
      <App />
    </StoreProvider>
  </Router>,
);
