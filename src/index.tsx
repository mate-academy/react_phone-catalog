import { HashRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { AppContext } from './context/AppContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <AppContext>
      <App />
    </AppContext>
  </Router>,
);
