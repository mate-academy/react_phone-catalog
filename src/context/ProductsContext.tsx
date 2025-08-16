import React, { useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../utils/services/products';

type ProductsContextType = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  getProductByItemId: (itemId: string) => Product | undefined;
};

const ProductsContext = React.createContext<ProductsContextType>({
  products: [],
  isLoading: false,
  error: null,
  getProductByItemId: () => undefined,
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getProducts();

      setProducts(data);
    } catch {
      setError('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const getProductByItemId = (itemId: string) =>
    products.find(product => product.itemId === itemId);

  return (
    <ProductsContext.Provider
      value={{ products, isLoading, error, getProductByItemId }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
