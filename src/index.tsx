import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import { ScrollToTop } from './modules/shared/components/ScrollToTop';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <ScrollToTop />
    <App />
  </HashRouter>,
);
