import { createContext, useEffect, useState } from 'react';
import { getProductsWithDetails } from '../../../_services/products';
import { ProductsWithDetails } from '../../../_types/products';

interface ProductsContextType {
  products: ProductsWithDetails[];
  loading: boolean;
  error: string | null;
}

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  loading: true,
  error: null,
});

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<ProductsWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProductsWithDetails();

        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

/*{export const LangContext = createContext({
  lang: Lang.EN,
  setLang: (lang: Lang) => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [input1, setInput1] = useState('ssss');

  return (
    <ProductsContext.Provider value={{ input1, setInput1 }}>
      {children}
    </ProductsContext.Provider>
  );
}; }*/
