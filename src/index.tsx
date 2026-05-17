import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import './styles/index.scss';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
