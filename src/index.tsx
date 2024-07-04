import { createRoot } from 'react-dom/client';
import { AppRouter } from './modules/AppsRouter/AppsRouter';
import { GlobalStateProvider } from './Store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalStateProvider>
    <AppRouter />
  </GlobalStateProvider>,
);
