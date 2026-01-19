import { createRoot } from 'react-dom/client';
import { Root } from './routes/Root';
import './lexical/i18n';
import { GlobalProvider } from './store/GlobalProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalProvider>
    <Root />
  </GlobalProvider>,
);
