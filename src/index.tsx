import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { AppProviders } from './AppProviders';
import { Root } from './Root';
import './styles/index.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <AppProviders>
      <Root />
    </AppProviders>
  </HashRouter>,
);
