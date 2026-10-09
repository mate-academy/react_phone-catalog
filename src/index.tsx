import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter as Router } from 'react-router-dom';
import { GlobalStateProvider } from './context/ItemProvider';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <GlobalStateProvider>
    <Router>
      <App />
    </Router>
  </GlobalStateProvider>,
);
