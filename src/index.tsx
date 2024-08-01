import App from './app/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './app/providers/ThemeProvider';
import './app/styles/index.scss';
import { StoreProvider } from './app/providers/StoreProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StoreProvider>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </StoreProvider>,
);
