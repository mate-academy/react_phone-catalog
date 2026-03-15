// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { Product } from '../types';

// type FavoritesContextType = {
//   favoritesItems: Product[];
//   toggleFavorite: (product: Product) => void;
//   isFavorite: (productId: number) => boolean;
//   favoritesCount: number;
// };

// const FavoritesContext = createContext<FavoritesContextType>({
//   favoritesItems: [],
//   toggleFavorite: () => {},
//   isFavorite: () => false,
//   favoritesCount: 0,
// });

// export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [favoritesItems, setFavoritesItems] = useState<Product[]>(() => {
//     const saved = localStorage.getItem('favorites');

//     return saved ? JSON.parse(saved) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem('favorites', JSON.stringify(favoritesItems));
//   }, [favoritesItems]);

//   const isFavorite = (productId: number) => {
//     return favoritesItems.some(item => item.id === productId);
//   };

//   const toggleFavorite = (product: Product) => {
//     setFavoritesItems(prev => {
//       if (isFavorite(product.id)) {
//         return prev.filter(item => item.id !== product.id);
//       }

//       return [...prev, product];
//     });
//   };

//   const favoritesCount = favoritesItems.length;

//   return (
//     <FavoritesContext.Provider
//       value={{
//         favoritesItems,
//         isFavorite,
//         toggleFavorite,
//         favoritesCount,
//       }}
//     >
//       {children}
//     </FavoritesContext.Provider>
//   );
// };

// export const useFavorites = () => useContext(FavoritesContext);

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types';

type FavoritesContextType = {
  favoritesItems: Product[];
  toggleFavorite: (
    product: Product,
    onToggle?: (added: boolean) => void,
  ) => void;
  isFavorite: (productId: number) => boolean;
  favoritesCount: number;
};

const FavoritesContext = createContext<FavoritesContextType>({
  favoritesItems: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
  favoritesCount: 0,
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favoritesItems, setFavoritesItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem('favorites');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favoritesItems));
  }, [favoritesItems]);

  const isFavorite = (productId: number) =>
    favoritesItems.some(item => item.id === productId);

  const toggleFavorite = (
    product: Product,
    onToggle?: (added: boolean) => void,
  ) => {
    setFavoritesItems(prev => {
      if (isFavorite(product.id)) {
        onToggle?.(false);

        return prev.filter(item => item.id !== product.id);
      }

      onToggle?.(true);

      return [...prev, product];
    });
  };

  const favoritesCount = favoritesItems.length;

  return (
    <FavoritesContext.Provider
      value={{
        favoritesItems,
        isFavorite,
        toggleFavorite,
        favoritesCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
