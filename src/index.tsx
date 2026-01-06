import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import { GlobalContextProvider } from './store/Store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </HashRouter>,
);
