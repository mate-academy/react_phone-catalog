import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Item } from '../types/Item';
import { getAllProducts } from '../helpers/getProducts';
import { useLocalStorage } from '../helpers/useLocalStorage';
import { checkItemsAvailable } from '../helpers/checkItemsAvailable';

type ContextType = {
  products: Item[];
  favourites: Item[];
  cart: Item[];
  setFavourites: (products: Item[]) => void;
  setCart: (products: Item[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const defaultValue: ContextType = {
  products: [],
  favourites: [],
  cart: [],
  setFavourites: () => { },
  setCart: () => { },
  isLoading: false,
  setIsLoading: () => { },
};

export const ProductsContext = createContext(defaultValue);

export const ProductsProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [favourites, setFavourites]
    = useLocalStorage<Item[]>('favouritesList', []);
  const [cart, setCart] = useLocalStorage<Item[]>('cardList', []);

  const value = useMemo(() => ({
    products,
    isLoading,
    favourites,
    cart,
    setIsLoading,
    setFavourites,
    setCart,
  }), [products, isLoading, favourites, cart]);

  useEffect(() => {
    setIsLoading(true);
    getAllProducts()
      .then(setProducts)
      .catch(() => {
        throw new Error('Error while fetching products');
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => setProducts([]);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setFavourites(checkItemsAvailable(favourites, products));
    }
  }, [products]);

  useEffect(() => {
    if (!isLoading) {
      setFavourites(checkItemsAvailable(cart, products));
    }
  }, [products]);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
