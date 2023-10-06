import React, { useMemo, useState } from 'react';
import { KeysOfStorage } from '../types/KeysOfStorage';

const gotLiked = localStorage.getItem(KeysOfStorage.Like);
const storageLiked: string[] = gotLiked ? JSON.parse(gotLiked) : [];
const gotAdded = localStorage.getItem(KeysOfStorage.Cart);
const storageAdded: string[] = gotAdded ? JSON.parse(gotAdded) : [];

export const LikeAndCartContext = React.createContext<{
  liked: string[],
  setLiked: React.Dispatch<React.SetStateAction<string[]>>,
  addedToCart: string[],
  setAddedToCart: React.Dispatch<React.SetStateAction<string[]>>,
}>({
  liked: [] as string[],
  setLiked: () => {},
  addedToCart: [] as string[],
  setAddedToCart: () => {},
});

type Props = {
  children: React.ReactNode,
};

export const LikeAndCartProvider: React.FC<Props> = ({ children }) => {
  const [liked, setLiked] = useState<string[]>(storageLiked);
  const [addedToCart, setAddedToCart] = useState<string[]>(storageAdded);

  const values = useMemo(() => ({
    liked, setLiked, addedToCart, setAddedToCart,
  }), [liked, addedToCart]);

  return (
    <LikeAndCartContext.Provider value={values}>
      {children}
    </LikeAndCartContext.Provider>
  );
};
