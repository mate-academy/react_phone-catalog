import {
  createContext, useCallback, useContext, useMemo,
} from 'react';
import { ProductDetails } from '@typings/productDetails';
import { Product } from '@typings/product';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { prepareObject } from '@helpers/object';

type ContextValue = {
  favItems: Product[];
  addFavItem: (product: Product | ProductDetails) => void;
  deleteFavItem: (productId: string) => void;
};

const FavContext = createContext<ContextValue>({
  favItems: [],
  addFavItem: () => {},
  deleteFavItem: () => {},
});

export const FavoritesProvider = ({
  children,
}: React.PropsWithChildren<React.ReactNode>) => {
  const [favItems, setFavItems] = useLocalStorage<Product[]>('favorites', []);

  const addFavItem = useCallback((product: Product | ProductDetails) => {
    let favItem = product;

    if ('images' in product) {
      favItem = prepareObject(product);
    }

    setFavItems(current => current.concat(favItem as Product));
  }, []);

  const deleteFavItem = useCallback((itemId: string) => {
    setFavItems(current => [...current.filter(item => itemId !== item.itemId)]);
  }, []);

  const value = useMemo(() => {
    return {
      favItems,
      addFavItem,
      deleteFavItem,
    };
  }, [favItems]);

  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
};

export const useFav = () => {
  const context = useContext(FavContext);

  return context;
};
