import { createContext, ReactNode } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type FavouriteContextProps = {
  favourites: Product[]
  addToFavourite: (product: Product) => void,
  removeFromFavourite: (productId: string) => void,
};

export const FavouriteContext = createContext<FavouriteContextProps>({
  favourites: [],
  addToFavourite: () => { },
  removeFromFavourite: () => { },
});

type Props = {
  children: ReactNode
};

export const FavouriteContextProvider: React.FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage<Product[]>(
    'favourites', [],
  );

  const addToFavourite = (product: Product) => {
    setFavourites([...favourites, product]);
  };

  const removeFromFavourite = (productId: string) => {
    setFavourites([
      ...favourites.filter(item => item.phoneId !== productId),
    ]);
  };

  return (
    <FavouriteContext.Provider
      value={{ favourites, addToFavourite, removeFromFavourite }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};
