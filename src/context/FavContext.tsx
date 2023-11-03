import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type FavContextType = {
  fav: string[],
  setFav: (v: string[]) => void,
  handleAddToFav: (id: string) => void,
};

export const FavContext = React.createContext<FavContextType>({
  fav: [],
  setFav: () => {},
  handleAddToFav: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FavProvider: React.FC<Props> = ({ children }) => {
  const [fav, setFav] = useLocalStorage<string>('fav', []);

  function handleAddToFav(productId: string) {
    if (fav.includes(productId)) {
      setFav([...fav].filter(item => item !== productId));
    } else {
      setFav([...fav, productId]);
    }
  }

  const value = ({
    fav,
    setFav,
    handleAddToFav,
  });

  return (
    <FavContext.Provider value={value}>
      {children}
    </FavContext.Provider>
  );
};
