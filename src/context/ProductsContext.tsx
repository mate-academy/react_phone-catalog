import { createContext, useMemo, useState } from 'react';
import { Product } from 'types/Product';
import { ProductData } from 'types/ProductData';

type ProductsContextType = {
  allProducts: Product[];
  setAllProducts: (products: Product[]) => void;
  categoryProducts: ProductData[];
  setCategoryProducts: (products: ProductData[]) => void;
};

export const ProductsContext = createContext<ProductsContextType>({
  allProducts: [],
  setAllProducts: () => {},
  categoryProducts: [],
  setCategoryProducts: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<ProductData[]>([]);

  const value = useMemo(
    () => ({
      allProducts,
      setAllProducts,
      categoryProducts,
      setCategoryProducts,
    }),
    [allProducts, categoryProducts],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
