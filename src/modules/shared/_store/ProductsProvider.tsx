import { createContext } from 'react';
import { getProducts } from '../../../_services/products';
import { Product } from '../../../_types/products';
import { useProducts } from '../../../_hooks/useProducts';

interface ProductsContextType {
  products: Product[];
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
  const {
    data: products,
    loading,
    error,
  } = useProducts(() => getProducts(), 'Failed to fetch products');

  return (
    <ProductsContext.Provider
      value={{ products: products || [], loading, error }}
    >
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
