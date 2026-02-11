/* eslint-disable max-len */
import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { PhonesProvider } from '@modules/shared/components/Context/GadgetsContext';
import { ProductsProvider } from '@modules/shared/components/Context/ProductsContext';
import { FavoritesProvider } from '@modules/shared/components/Context/FavoritesContext';
import { CartProvider } from '@modules/shared/components/Context/CartContext';
import { SidebarProvider } from '@modules/shared/components/Context/SidebarContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <SidebarProvider>
    <CartProvider>
      <FavoritesProvider>
        <ProductsProvider>
          <PhonesProvider>
            <Root />
          </PhonesProvider>
        </ProductsProvider>
      </FavoritesProvider>
    </CartProvider>
  </SidebarProvider>,
);
