import { createRoot } from 'react-dom/client';
import { GlobalProvider } from './context/store';
import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalProvider>
    <Root />
  </GlobalProvider>,
);
