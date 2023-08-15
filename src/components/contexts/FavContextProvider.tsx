import { createContext, ReactNode } from 'react';
import { Product } from '../../types/Product';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type FavContextProps = {
  favourites: Product[]
  addToFav: (product: Product) => void,
  removeFromFav: (productId: string) => void,
};

export const FavContext = createContext<FavContextProps>({
  favourites: [],
  addToFav: () => { },
  removeFromFav: () => { },
});

type Props = {
  children: ReactNode
};

export const FavContextProvider: React.FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage<Product[]>(
    'favourites', [],
  );

  const addToFav = (product: Product) => {
    setFavourites([...favourites, product]);
  };

  const removeFromFav = (productId: string) => {
    setFavourites([
      ...favourites.filter(item => item.phoneId !== productId),
    ]);
  };

  return (
    <FavContext.Provider
      value={{ favourites, addToFav, removeFromFav }}
    >
      {children}
    </FavContext.Provider>
  );
};
