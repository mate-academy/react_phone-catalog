import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types/Product';
import { getProducts } from '@/api/api';
import { useTranslation } from 'react-i18next';

// 1. Definition of the context state shape
interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { t } = useTranslation();

  // --- GLOBAL DATA FETCHING ---
  // This effect runs once when the app starts, fetching the entire product catalog.
  // By doing this at the context level, we avoid redundant API calls when navigating between pages.
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();

        setProducts(data);
      } catch (err) {
        setError(t('errors.productsLoad'));
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

// --- CUSTOM HOOK ---
export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider');
  }

  return context;
};
