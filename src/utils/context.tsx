import React, { useState } from 'react';

type LikedIdContextType = {
  likedIds: string[];
  cardIds: string[];
  setLikedIds: (id: string[]) => void;
  addLikedId: (id: string) => void;
  removeLikedId: (id: string) => void;
  addCardId: (id: string) => void;
  removeCardId: (id: string) => void;
  setCardIds: (id: string[]) => void;
};

export const LikedIdContext = React.createContext<LikedIdContextType>({
  likedIds: [],
  cardIds: [],
  setLikedIds: () => { },
  addLikedId: () => { },
  removeLikedId: () => { },
  addCardId: () => { },
  removeCardId: () => { },
  setCardIds: () => { },
});

type Props = {
  children: React.ReactNode;
};

function useLocalStorage<T>(key: string, startValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      return startValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}

export const LikedIdProvider: React.FC<Props> = ({ children }) => {
  const [likedIds, setLikedIds] = useLocalStorage<string[]>('liked', []);
  const [cardIds, setCardIds] = useLocalStorage<string[]>('card', []);

  const addLikedId = (id: string) => {
    const newLikedId = [...likedIds, id];

    setLikedIds(newLikedId);
  };

  const removeLikedId = (id: string) => {
    const newLikedId = likedIds.filter((x: string) => x !== id);

    setLikedIds(newLikedId);
  };

  const addCardId = (id: string) => {
    const newCardId = [...cardIds, id].sort();

    setCardIds(newCardId);
  };

  const removeCardId = (id: string) => {
    const newCardId = cardIds.filter((x: string) => x !== id);

    setCardIds(newCardId);
  };

  const value = {
    likedIds,
    cardIds,
    setLikedIds,
    addLikedId,
    removeLikedId,
    addCardId,
    removeCardId,
    setCardIds,
  };

  return (
    <LikedIdContext.Provider value={value}>{children}</LikedIdContext.Provider>
  );
};
