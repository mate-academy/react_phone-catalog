import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import { PageProvider } from './context/PageContext';
import { FavouritesProvider } from './context/FavouritesContext';
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <PageProvider>
      <FavouritesProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FavouritesProvider>
    </PageProvider>
  </HashRouter>,
);
