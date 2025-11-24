import { createRoot } from 'react-dom/client';

import { Root } from './Root';
import { CartProvider } from './context/ShoppingContex';

createRoot(document.getElementById('root') as HTMLElement).render(
  <CartProvider>
    <Root />
  </CartProvider>,
);
