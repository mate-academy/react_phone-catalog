import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Product } from './Types/Product';

type FavContextType = {
  products: Product[];
  toggleFav: (product: Product) => void;
  quantity: number,
  favStates: { [key: string]: boolean };
  setFavStates: React.Dispatch<React.SetStateAction<{
    [key: string]: boolean;
  }>>
  isLoading: boolean;
};

const FavContext = createContext<FavContextType | undefined>(undefined);

function useLocalStorage(key: string, initialValue: Product[] | number) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (newValue: Product[] | number) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
}

export const FavProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useLocalStorage('favProducts', []);
  const [quantity, setQuantity] = useLocalStorage('quantity', 0);
  const [favStates, setFavStates]
    = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const toggleFav = (product: Product) => {
    const isAlreadyFavorited = favStates[product.id];

    if (isAlreadyFavorited) {
      const updatedFav
        = products.filter(
          (favProduct: Product) => favProduct.id !== product.id,
        );

      setProducts(updatedFav);
      setQuantity(updatedFav.length);
    } else {
      const updatedFav = [...products, product];

      setProducts(updatedFav);
      setQuantity(updatedFav.length);
    }
  };

  return (
    <FavContext.Provider value={
      {
        products,
        toggleFav,
        quantity,
        favStates,
        setFavStates,
        isLoading,
      }
    }
    >
      {children}
    </FavContext.Provider>
  );
};

export const useFav = () => {
  const context = useContext(FavContext);

  if (context === undefined) {
    throw new Error('useFav must be used within a CartProvider');
  }

  return context;
};
