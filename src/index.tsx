import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ScrollToTop } from './modules/shared/components/ScrollToTop';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>,
);
