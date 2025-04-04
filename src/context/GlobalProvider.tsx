import { ReactNode } from 'react';
import { AccessoriesProvider } from './AccessoriesContext';
import { CartProvider } from './CartContext';
import { FavouritesProvider } from './FavouritesContext';
import { PhonesProvider } from './PhonesContext';
import { ProductsProvider } from './ProductsContext';
import { TabletsProvider } from './TabletsContext';
import { SnackbarProvider } from 'notistack';

type Props = {
  children: ReactNode;
};

export const GlobalProvider = ({ children }: Props) => {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <ProductsProvider>
        <FavouritesProvider>
          <CartProvider>
            <PhonesProvider>
              <TabletsProvider>
                <AccessoriesProvider>{children}</AccessoriesProvider>
              </TabletsProvider>
            </PhonesProvider>
          </CartProvider>
        </FavouritesProvider>
      </ProductsProvider>
    </SnackbarProvider>
  );
};
