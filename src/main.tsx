import { createRoot } from 'react-dom/client';
import { Root } from './Root.tsx';

import { CartProvider } from './context/CartContext.tsx';
import { FavoritesProvider } from './context/FavoritesContext.tsx';
import { ProductProvider } from './context/ProductContext.tsx';
import './styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <ProductProvider>
    <FavoritesProvider>
      <CartProvider>
        <Root />
      </CartProvider>
    </FavoritesProvider>
  </ProductProvider>,
);
