import { createContext, useMemo, useState } from 'react';
import { ProductPreview } from 'types/ProductPreview';

type ProductsContextType = {
  allProducts: ProductPreview[];
  setAllProducts: (products: ProductPreview[]) => void;
};

export const ProductsContext = createContext<ProductsContextType>({
  allProducts: [],
  setAllProducts: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<ProductPreview[]>([]);
  const value = useMemo(
    () => ({
      allProducts,
      setAllProducts,
    }),
    [allProducts],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
