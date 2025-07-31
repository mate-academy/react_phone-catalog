import type { ReactNode } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import { PhonesContext } from '../../context/PhonesContext';
import { TabletsContext } from '../../context/TabletsContext';
import { AccessoriesContext } from '../../context/AccessoriesContext';
import { CartProvider } from '../../context/CartContext';
import { ProductsWithDetailsContext } from '../../context/ProductsWithDetailsContext';
import { useLoading } from '../../hooks/useLoading';
import { Loader } from '../Loader';
import { LanguageProvider } from '../../context/language/LanguageProvider';
import { ThemeProvider } from 'next-themes';
//import { LanguageProvider } from '../../context/language/LanguageContext';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  const {
    isLoading,
    products,
    phones,
    tablets,
    accessories,
    productsWithDetails,
  } = useLoading();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      themes={['light', 'dark']}
      enableSystem={false}
    >
      <LanguageProvider>
        <CartProvider>
          <ProductsWithDetailsContext.Provider value={productsWithDetails}>
            <ProductsContext.Provider value={products}>
              <PhonesContext.Provider value={phones}>
                <TabletsContext.Provider value={tablets}>
                  <AccessoriesContext.Provider value={accessories}>
                    {children}
                  </AccessoriesContext.Provider>
                </TabletsContext.Provider>
              </PhonesContext.Provider>
            </ProductsContext.Provider>
          </ProductsWithDetailsContext.Provider>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};
