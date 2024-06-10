import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import { PageProvider } from './context/PageContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <PageProvider>
      <App />
    </PageProvider>
  </HashRouter>,
);
