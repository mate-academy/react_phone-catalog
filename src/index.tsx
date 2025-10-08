import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </GlobalProvider>,
);
