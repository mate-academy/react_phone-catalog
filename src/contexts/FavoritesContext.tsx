import { createContext, useEffect, useState, type ReactNode } from 'react';

export interface FavoritesProviderProps {
  children: ReactNode;
}

export interface FavoritesContextType {
  favoriteIds: (number | string)[];
  toggleFavorite: (id: number | string) => void;
  isFavorite: (id: number | string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);

// O Provider recebe tudo que estiver dentro dele através de:
export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  // cria o meu array de favoritos, e a função para alterar
  // a função no useState é para descobrir o valor inicial quando criar o estado

  const [favoriteIds, setFavoriteIds] = useState<(number | string)[]>(() => {
    const savedFavorites = localStorage.getItem('favoriteIds');
    //json sempre devolve texto, o parse faz: string -> objeto/array

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    // stringify objeto/array -> string
    localStorage.setItem('favoriteIds', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = (id: number | string) => {
    setFavoriteIds(prev =>
      prev.includes(id)
        ? prev.filter(favoriteId => favoriteId !== id)
        : [...prev, id],
    );
  };

  const isFavorite = (id: number | string) => {
    return favoriteIds.includes(id);
  };

  return (
    <FavoritesContext.Provider
      //Tudo que estiver dentro do FavoritesProvider pode acessar tudo isso:
      // const { favoriteIds, toggleFavorite, isFavorite } = useCart();

      value={{
        favoriteIds,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
