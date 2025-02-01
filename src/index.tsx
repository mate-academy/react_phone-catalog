import { createRoot } from 'react-dom/client';
import { Root } from './modules/Root';
import { GlobalProvider } from './components/GlobalProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalProvider>
    <Root />
  </GlobalProvider>,
);
