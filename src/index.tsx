import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ThemeProvider } from './components/context/ThemeContext';
import { HashRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
);
