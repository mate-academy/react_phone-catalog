import { createRoot } from 'react-dom/client';
import { App } from './App';
import { FavoritesProvider } from './contexts/FavoritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <FavoritesProvider>
    <App />
  </FavoritesProvider>,
);
