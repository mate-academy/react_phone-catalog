import { createContext, useEffect, useMemo, useState } from 'react';

import { getAllProducts } from 'shared/services/services';
import { ProductsByCategory, ProductsContextType } from 'shared/types/Context';
import { Product } from 'shared/types/Product';

type Props = {
  children: React.ReactNode;
};

export const ProductsContext = createContext<ProductsContextType>({
  allProducts: [],
  productsByCategory: {
    phones: [] as Product[],
    tablets: [] as Product[],
    accessories: [] as Product[],
  },
  loading: false,
  error: null,
});

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await getAllProducts();

        setAllProducts(products);
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const productsByCategory: ProductsByCategory = useMemo(() => {
    return {
      phones: allProducts.filter(p => p.category === 'phones'),
      tablets: allProducts.filter(p => p.category === 'tablets'),
      accessories: allProducts.filter(p => p.category === 'accessories'),
    };
  }, [allProducts]);

  return (
    <ProductsContext.Provider
      value={{ allProducts, productsByCategory, loading, error }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
