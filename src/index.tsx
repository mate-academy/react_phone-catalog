import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './components/context/ThemeContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
);
