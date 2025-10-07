import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface Product {
  id: number;
  category: string;
  itemId: string;
  name: string;
  capacity: string;
  fullPrice: number;
  price: number;
  color: string;
  image: string;
  screen: string;
  ram: string;
  year: number;
  favourit?: boolean;
}

type TabsContextType = {
  productsList: Product[];
  loading: boolean;
  error: boolean;
};

export const TabsContext = createContext<TabsContextType>({
  productsList: [],
  loading: false,
  error: false,
});

export const TabsProvider = ({ children }: { children: ReactNode }) => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => {
        if (!res) {
          throw new Error('Error throw');
        }

        return res.json();
      })
      .then(data => {
        setProductsList(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <TabsContext.Provider value={{ productsList, loading, error }}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => useContext(TabsContext);
