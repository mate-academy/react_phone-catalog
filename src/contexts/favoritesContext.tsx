import {
  Dispatch, SetStateAction, createContext, useContext,
} from 'react';
import { useLocalStorage } from '../helpers/useLocalStorage';
import { Product } from '../helpers/Product';
import { NotificationContext, NotificationStatus } from './notificationContext';

type Props = {
  children: React.ReactNode,
};

type FavouritesContextType = {
  favorites: Product[],
  setFavorites: Dispatch<SetStateAction<Product[]>>,
  handleFavorites: (p: Product) => void,
  isInFavorites: (p: Product) => boolean,
};

export const FavouritesContext = createContext<FavouritesContextType>({
  favorites: [],
  setFavorites: () => {},
  handleFavorites: () => {},
  isInFavorites: () => false,
});

export const FavouritesProvider:React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);
  const { setNotification } = useContext(NotificationContext);
  const isInFavorites = (product: Product) => {
    return favorites.some(favor => favor.id === product.id);
  };

  const handleFavorites = (product: Product) => {
    if (isInFavorites(product)) {
      setFavorites(prev => prev
        .filter(favor => favor.id !== product.id));

      setNotification({
        message: 'Deleted from favorites', color: NotificationStatus.Error,
      });
    } else {
      setFavorites(prev => [...prev, product]);

      setNotification({
        message: 'Added to favorites', color: NotificationStatus.Success,
      });
    }
  };

  return (
    <FavouritesContext.Provider value={{
      favorites, setFavorites, handleFavorites, isInFavorites,
    }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
