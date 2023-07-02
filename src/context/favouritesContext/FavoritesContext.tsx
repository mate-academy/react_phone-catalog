import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getFavourites } from '../../helpers/Favourites';

type Props = {
  addedToFavs: number;
  setAddedToFavs: Dispatch<SetStateAction<number>>;
};

export const FavouritesContext = React.createContext<Props>({
  addedToFavs: 0,
  setAddedToFavs: () => {},
});

export const useFavsContext = () => useContext(FavouritesContext);

const FavouritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [addedToFavs, setAddedToFavs] = useState(0);

  useEffect(() => {
    const count = getFavourites().length;

    setAddedToFavs(count);
  }, []);

  const contextValue = {
    addedToFavs,
    setAddedToFavs,
  };

  return (
    <FavouritesContext.Provider value={contextValue}>
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesProvider;
