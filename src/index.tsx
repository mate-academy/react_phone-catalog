import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import './App.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
