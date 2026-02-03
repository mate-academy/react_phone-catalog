import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import Modal from 'react-modal';
import { App } from './App';
import './utils/i18n';

Modal.setAppElement('#root');

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
