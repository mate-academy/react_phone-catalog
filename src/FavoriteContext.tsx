import React, {
  createContext, useContext, useEffect, useState,
} from 'react';

interface FavoriteContextValue {
  basket: { id: string; price: number; quantity: number }[];
  favorites: string[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  addToBasket: (productId: string) => void;
  removeFromBasket: (productId: string) => void;
  removeFromAllB: (productId: string) => void;
  favoritesLength: number;
  basketLength: number;
}

const FavoriteContext = createContext<FavoriteContextValue
| undefined>(undefined);

export const useFavoriteContext = () => {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error(`useFavoriteContext must be used within 
    a FavoriteContextProvider`);
  }

  return context;
};

export const useBasketContext = () => {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error(`useBasketContext must be used 
    within a FavoriteContextProvider`);
  }

  return context;
};

export const FavoriteContextProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [basket, setBasket] = useState<
  { id: string; price: number; quantity: number }[]>([]);

  const addToFavorites = (productId: string) => {
    setFavorites((prevFavorites) => [...prevFavorites, productId]);
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter(
      (favId) => favId !== productId,
    ));
  };

  const addToBasket = (productId: string) => {
    const existingProduct = basket.find((product) => product.id === productId);

    if (existingProduct) {
      setBasket((prevBasket) => prevBasket.map(
        (product) => (product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product),
      ));
    } else {
      setBasket((prevBasket) => [
        ...prevBasket,
        {
          id: productId,
          price: 0,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromBasket = (productId: string) => {
    setBasket((prevBasket) => prevBasket
      .map((product) => (product.id === productId
        ? { ...product, quantity: product.quantity - 1 }
        : product))
      .filter((product) => product.quantity > 0));
  };

  const removeFromAllB = (productId: string) => {
    setBasket((prevBasket) => prevBasket.filter(
      (product) => product.id !== productId,
    ));
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const favoritesLength = favorites.length;

  useEffect(() => {
    const storedBasket = localStorage.getItem('basket');

    if (storedBasket) {
      setBasket(JSON.parse(storedBasket));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

  const basketLength = basket.length;

  const contextValue: FavoriteContextValue = {
    favorites,
    basket,
    addToFavorites,
    removeFromFavorites,
    addToBasket,
    removeFromBasket,
    removeFromAllB,
    favoritesLength,
    basketLength,
  };

  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
    </FavoriteContext.Provider>
  );
};
