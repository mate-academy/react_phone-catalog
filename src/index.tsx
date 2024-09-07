import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeProvider';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { AppRouter } from './router/AppRouter';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <ThemeProvider>
    <Router>
      <AppRouter />
    </Router>
  </ThemeProvider>,
);
