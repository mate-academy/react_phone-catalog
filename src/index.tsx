import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './styles/index.scss';
import App from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HashRouter>
    <App />
  </HashRouter>,
);
