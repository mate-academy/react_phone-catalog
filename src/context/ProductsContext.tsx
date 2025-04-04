import { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { Gadget } from '../types/Gadgets';

const BASE_URL = import.meta.env.BASE_URL || '/';

type ProductsContextType = {
  products: Product[];
  loading: boolean;
  error: boolean;
  getGadgetById: (category: string, itemId: string) => Promise<Gadget>;
  getProductById: (id: string) => Promise<Product>;
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${BASE_URL}/api/products.json`);
      const data = await response.json();

      setProducts([...data]);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getGadgetById = async (category: string, itemId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/${category}.json`);
      const data = await response.json();

      return data.find((p: Gadget) => p.id === itemId);
    } catch (e) {
      return null;
    }
  };

  const getProductById = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/products.json`);
      const data = await response.json();

      const productsForGetById = [...data];

      const neededProduct = productsForGetById.find(p => p.itemId === id);

      return neededProduct;
    } catch (e) {}
  };

  return (
    <ProductsContext.Provider
      value={{ products, loading, error, getProductById, getGadgetById }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }

  return context;
};
