import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Product } from '../types/Product';
import { Gadget } from '../types/Gadget';

type ProductsContextType = {
  products: Product[];
  phones: Gadget[];
  tablets: Gadget[];
  accessories: Gadget[];
  loading: boolean;
  error: boolean;
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Gadget[]>([]);
  const [tablets, setTablets] = useState<Gadget[]>([]);
  const [accessories, setAccessories] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('./api/products.json')
      .then(res => res.json())
      .then(data => {
        const productItems = [...data];

        setProducts(productItems);
      });
  }, []);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetch('./api/phones.json')
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          const phonesFromServer = [...data];

          setPhones(phonesFromServer);
          setLoading(false);
        }, 1000);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetch('./api/tablets.json')
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          const tabletsFromServer = [...data];

          setTablets(tabletsFromServer);
          setLoading(false);
        }, 1000);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetch('./api/accessories.json')
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          const accessoriesFromServer = [...data];

          setAccessories(accessoriesFromServer);
          setLoading(false);
        }, 1000);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, phones, tablets, accessories, loading, error }}
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
