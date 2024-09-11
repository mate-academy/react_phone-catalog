import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeProvider';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { AppRouter } from './router/AppRouter';
import { MenuProvider } from './contexts/MenuProvider';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <ThemeProvider>
    <Router>
      <MenuProvider>
        <AppRouter />
      </MenuProvider>
    </Router>
  </ThemeProvider>,
);
