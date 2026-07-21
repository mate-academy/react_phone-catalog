import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Root } from './root';

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Root />
  </HashRouter>,
);
