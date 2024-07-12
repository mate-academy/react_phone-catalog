/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Product } from '../../types/Product';

type LikedContextType = {
  liked: Product[];
  setLiked: (newLiked: Product[]) => void;
};

export const LikedContext = React.createContext<LikedContextType>({
  liked: [],
  setLiked: () => {},
});
type Props = {
  children: React.ReactNode;
};

export const LikedProvider: React.FC<Props> = ({ children }) => {
  const [liked, setLiked] = useLocalStorage<Product[]>('liked', []);

  const value = useMemo(() => ({ liked, setLiked }), [liked, setLiked]);

  return (
    <LikedContext.Provider value={value}> {children} </LikedContext.Provider>
  );
};
