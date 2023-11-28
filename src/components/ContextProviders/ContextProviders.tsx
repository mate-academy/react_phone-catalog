import { createContext, useState } from 'react';
import { Phones } from '../../types/Phones';

type SerchContextType = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

type FavoritesContextType = {
  favorites: Phones[],
  // setFavorites: React.Dispatch<React.SetStateAction<Phones[]>>,
  handleAddToFavorites: (addedValue: Phones) => void,
  handleRemoveFromFavorites: (addedValue: string) => void
};

export const SearchContext
  = createContext<SerchContextType>({} as SerchContextType);
export const FavoritesContext
  = createContext<FavoritesContextType>({} as FavoritesContextType);

type Props = {
  children: React.ReactNode,
};

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState<Phones[]>([]);

  const handleAddToFavorites = (addedValue: Phones) => {
    setFavorites([...favorites, addedValue]);
  };

  const handleRemoveFromFavorites = (itemId: string) => {
    const filteredItems = favorites
      .filter((item: Phones) => item.itemId !== itemId);

    setFavorites(filteredItems);
  };

  return (
    <>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <FavoritesContext.Provider
          value={{ favorites, handleAddToFavorites, handleRemoveFromFavorites }}
        >
          {children}
        </FavoritesContext.Provider>
      </SearchContext.Provider>

    </>
  );
};
