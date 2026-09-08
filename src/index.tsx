import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { Root } from './Root';
import { GlobalStateProvider } from './contex/State';
import { ThemeProvider } from './contex/Theme';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <GlobalStateProvider>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </GlobalStateProvider>
  </Router>,
);
