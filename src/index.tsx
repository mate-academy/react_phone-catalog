import { createRoot } from 'react-dom/client';
import { App } from './App';
import { AppProvider } from './context/AppContext';
import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </HashRouter>,
);
