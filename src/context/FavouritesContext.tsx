import { createContext } from 'react';
import { Product } from '../types/Product';
import { useContext, useEffect, useState } from 'react';

type FavouritesContextType = {
  favourites: Product[];
  toggleProduct: (product: Product) => void;
};

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined,
);

export const FavouritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favourites, setFavourites] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const storedFavourites = localStorage.getItem('favourites');

      if (storedFavourites) {
        setFavourites(JSON.parse(storedFavourites));
      }
    } catch (error) {
      // console.error('Помилка при зчитуванні з localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('favourites', JSON.stringify(favourites));
    } catch (error) {
      // console.error('Помилка при записі в localStorage:', error);
    }
  }, [favourites]);

  const toggleProduct = (product: Product) => {
    const isFavourite = favourites.some(p => p.id === product.id);

    if (isFavourite) {
      setFavourites(prevState => prevState.filter(p => p.id !== product.id));
    } else {
      setFavourites(prevState => [...prevState, product]);
    }
  };

  return (
    <FavouritesContext.Provider value={{ favourites, toggleProduct }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }

  return context;
};
