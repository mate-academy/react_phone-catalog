import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Product } from '../../types/Producst';

type ProducstContextProps = {
  products: Product[];
  error: string;
  isLoading: boolean;
  fetchData: () => void;
};

type Props = {
  children: ReactNode;
};

const ProductContext = createContext<ProducstContextProps | null>(null);

export const useProductContext = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useMyContext must be used within MyContextProvider');
  }

  return context;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [products, setProduct] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      fetch('/api/products.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Something went wrong');
          }

          return response.json();
        })
        .then(data => {
          setProduct(data);
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
          setError(error.message);
        });
    }, 2000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProductContext.Provider value={{ products, error, isLoading, fetchData }}>
      {children}
    </ProductContext.Provider>
  );
};
