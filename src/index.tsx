import { createRoot } from 'react-dom/client';
import { App } from './App';
import { GlobalCatalogProvider } from './Components/CatalogProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalCatalogProvider>
    <App />
  </GlobalCatalogProvider>,
);
