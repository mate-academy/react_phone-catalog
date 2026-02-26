import '@fortawesome/fontawesome-free/css/all.min.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import { AppProvider } from './utils/Context';

createRoot(document.getElementById('root') as HTMLElement).render(
  <AppProvider>
    <Router basename={import.meta.env.BASE_URL}>
      <App />
    </Router>
  </AppProvider>,
);
