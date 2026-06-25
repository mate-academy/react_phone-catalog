import { ReactNode, useContext, useState } from 'react';
import { createContext } from 'react';
import { Product } from '../../types/Producst';

type FavouriteContextType = {
  liked: Product[];
  addFavourite: (newItems: Product) => void;
  deleteFavourite: (product: Product) => void;
};

export const FavouriteContext = createContext<FavouriteContextType | null>(
  null,
);

export const useFavouriteContext = () => {
  const context = useContext(FavouriteContext);

  if (!context) {
    throw new Error('useMyContext must be used within MyContextProvider');
  }

  return context;
};

type Props = {
  children: ReactNode;
};

export const FavouriteProvider: React.FC<Props> = ({ children }) => {
  const [liked, setLiked] = useState<Product[]>(() => {
    return JSON.parse(localStorage.getItem('liked') || '[]');
  });

  const addFavourite = (newItems: Product) => {
    const existing = JSON.parse(localStorage.getItem('liked') || '[]');

    existing.push(newItems);

    localStorage.setItem('liked', JSON.stringify(existing));

    setLiked(existing);
  };

  const deleteFavourite = (product: Product) => {
    const filtered = liked.filter(item => item.id !== product.id);

    localStorage.setItem('liked', JSON.stringify(filtered));
    setLiked(filtered);
  };

  return (
    <FavouriteContext.Provider value={{ liked, addFavourite, deleteFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
};
