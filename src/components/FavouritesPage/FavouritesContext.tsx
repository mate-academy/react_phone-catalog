import React, { createContext, useContext, useState, useEffect } from 'react';

const FavouritesContext = createContext<any>(null);

export const FavouritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favourites, setFavourites] = useState<any[]>(() => {
    const saved = localStorage.getItem('favourites');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addToFav = (product: any) => {
    setFavourites(prev => {
      const exists = prev.find(item => String(item.id) === String(product.id));

      if (exists) {
        // Якщо вже є — видаляємо (логіка перемикача/toggle)
        return prev.filter(item => String(item.id) !== String(product.id));
      }

      return [...prev, product];
    });
  };

  return (
    <FavouritesContext.Provider value={{ favourites, addToFav }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
