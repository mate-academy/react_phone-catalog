import { createContext, useState } from 'react';
import { Product } from '../../types/Product';

type FavContextType = {
  favItems: Product[],
  addToFav: (product: Product) => void,
  removeFromFav: (productId: string) => void,
};

export const FavContext = createContext<FavContextType>({
  favItems: [],
  addToFav() {},
  removeFromFav() {},
});

export const FavContextProvider: React.FC = ({
  children,
}) => {
  const [favItems, setFavItems] = useState<Product[]>([]);

  const addToFav = (product: Product) => {
    setFavItems(prev => ([...prev, product]));
  };

  const removeFromFav = (productId: string) => {
    setFavItems(prev => {
      return [
        ...prev.filter(({ id }) => id !== productId),
      ];
    });
  };

  return (
    <FavContext.Provider value={{ favItems, addToFav, removeFromFav }}>
      {children}
    </FavContext.Provider>
  );
};
