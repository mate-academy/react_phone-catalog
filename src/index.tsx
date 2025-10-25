import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalProvider } from './utils/GlobalContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalProvider>
    <Router>
      <App />
    </Router>
  </GlobalProvider>,
);
