import '@fortawesome/fontawesome-free/css/all.min.css';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { AppProvider } from './utils/Context';

createRoot(document.getElementById('root') as HTMLElement).render(
  <AppProvider>
    <Router>
      <App />
    </Router>
  </AppProvider>,
);
