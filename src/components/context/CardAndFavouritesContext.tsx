import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type ID = number;
type CardItem = { id: number; quantity: number };
type CardAndFavouritesContextType = {
  favourites: ID[];
  toggleFavourite: (id: ID) => void;
  isFavourite: (id: ID) => boolean;

  card: CardItem[];
  toggleCard: (id: ID) => void;
  isInCard: (id: ID) => boolean;
  changeQuantity: (id: ID, action: 'plus' | 'minus' | 'delete') => void;

  clearCard: () => void;
};

const defaultContext: CardAndFavouritesContextType = {
  favourites: [],
  card: [],
  toggleFavourite: () => {},
  toggleCard: () => {},
  changeQuantity: () => {},
  isFavourite: () => false,
  isInCard: () => false,
  clearCard: () => {},
};

export const CardAndFavouritesContext =
  createContext<CardAndFavouritesContextType>(defaultContext);

export const CardAndFavouritesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage<ID[]>('favourites', []);
  const [card, setCard] = useLocalStorage<CardItem[]>('card', []);

  // Fav

  const toggleFavourite = (id: ID) => {
    const newFavourites = favourites.includes(id)
      ? favourites.filter(f => f !== id)
      : [...favourites, id];

    setFavourites(newFavourites);
  };

  const isFavourite = (id: ID) => favourites.includes(id);

  // Card

  const toggleCard = (id: ID) => {
    const exists = card.some(item => item.id === id);

    const newCard = exists
      ? card.filter(item => item.id !== id)
      : [...card, { id, quantity: 1 }];

    setCard(newCard);
  };

  const isInCard = (id: ID) => card.some(item => item.id === id);

  const changeQuantity = (id: ID, action: 'plus' | 'minus' | 'delete') => {
    const newCard = card.flatMap(item => {
      if (item.id !== id) {
        return [item];
      }

      if (action === 'plus') {
        return [{ ...item, quantity: item.quantity + 1 }];
      }

      if (action === 'minus') {
        return item.quantity > 1
          ? [{ ...item, quantity: item.quantity - 1 }]
          : [];
      }

      if (action === 'delete') {
        return [];
      }

      return [item];
    });

    setCard(newCard);
  };

  const clearCard = () => setCard([]);

  return (
    <CardAndFavouritesContext.Provider
      value={{
        favourites,
        toggleFavourite,
        isFavourite,

        card,
        toggleCard,
        isInCard,
        changeQuantity,

        clearCard,
      }}
    >
      {children}
    </CardAndFavouritesContext.Provider>
  );
};

export const useCartAndFavourites = () => useContext(CardAndFavouritesContext);
