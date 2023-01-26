import React, { useEffect, useState } from 'react';

interface FavsType {
  favs: string[],
  handleFavs: (id: string) => void,
}

export const FavContext = React.createContext<FavsType>({
  favs: [],
  handleFavs: () => {},
});

type Props = {
  children: React.ReactNode,
};

export const FavContextProvider: React.FC<Props> = ({
  children,
}) => {
  const [favs, setFavs] = useState<string[]>([]);

  const localFavs = localStorage.getItem('favorites');

  useEffect(() => {
    if (localFavs) {
      setFavs(JSON.parse(localFavs));
    }
  }, []);

  const handleFavs = async (favId: string) => {
    if (favs.includes(favId)) {
      setFavs(prev => prev.filter(
        item => item !== favId,
      ));

      localStorage.setItem('favorites', JSON.stringify(
        favs.filter(id => id !== favId),
      ));
    } else {
      setFavs(prev => [...prev, favId]);

      localStorage.setItem('favorites', JSON.stringify(
        [...favs, favId],
      ));
    }
  };

  return (
    <FavContext.Provider
      value={{
        favs,
        handleFavs,
      }}
    >
      { children }
    </FavContext.Provider>
  );
};
