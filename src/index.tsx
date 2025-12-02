import React from 'react';
import ReactDOM from 'react-dom/client';
import { CartProvider } from './providers/CartProvider';
import { FavoritesProvider } from './providers/FavoritesProvider';
// import { HotPriceProvider } from './providers/HotPriceProvider';
import { Root } from './Root';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <HotPriceProvider> */}
      <CartProvider>
        <FavoritesProvider>
          <Root />
        </FavoritesProvider>
      </CartProvider>
    {/* </HotPriceProvider> */}
  </React.StrictMode>,
);
