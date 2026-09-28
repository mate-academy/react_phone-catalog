import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { App } from './App';
import { CartProvider } from './modules/shared/context/CartContext';
import { FavoritesProvider } from './modules/shared/context/FavoritesContext';

const basename =
  import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL;

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter basename={basename}>
    <FavoritesProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FavoritesProvider>
  </BrowserRouter>,
);
