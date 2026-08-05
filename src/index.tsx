import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // Імпортуємо роутер
import './styles/App.scss';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
