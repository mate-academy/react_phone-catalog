import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { GlobalStateProvider } from './context/GlobalContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <GlobalStateProvider>
    <Root />
  </GlobalStateProvider>,
);
