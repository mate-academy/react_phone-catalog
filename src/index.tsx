import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
