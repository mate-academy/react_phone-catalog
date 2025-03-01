import { ProductMainInfo } from '../types/Product';
import { createContext, useContext, useEffect, useState } from 'react';
import phones from '../api/phones.json';
import tablets from '../api/tablets.json';
import accessories from '../api/accessories.json';

interface ProductContextType {
  products: ProductMainInfo[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductMainInfo[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Імпортуйте дані безпосередньо
        setProducts([...phones, ...tablets, ...accessories] as unknown as ProductMainInfo[]);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return <ProductContext.Provider value={{ products }}>{children}</ProductContext.Provider>;
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }

  return context;
};

export default ProductContext;
