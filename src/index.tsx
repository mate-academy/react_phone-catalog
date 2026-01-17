import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './styles/main.scss';
import { CartProvider } from './context/CartContext';
import { FavouritesProvider } from './context/FavouritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <CartProvider>
    <FavouritesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FavouritesProvider>
  </CartProvider>,
);
