import { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { fetchProducts } from '../utils/products';

type ProductContextType = {
  products: Product[];
  loading: boolean;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    load();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>{children}</ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
