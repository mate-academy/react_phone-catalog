import { createContext, ReactNode, useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type RightButtonContextType = {
  favouritesLength: number;
  shoppingBagLength: number;
  favourites: number[];
  shoppingBag: Record<number, number>;
  setFavourites: React.Dispatch<React.SetStateAction<number[]>>;
  setShoppingBag: React.Dispatch<React.SetStateAction<Record<number, number>>>;
};

export const RightButtonContext = createContext<RightButtonContextType>({
  favouritesLength: 0,
  shoppingBagLength: 0,
  favourites: [],
  shoppingBag: {},
  setFavourites: () => {},
  setShoppingBag: () => {},
});

type Props = {
  children: ReactNode;
};

export const RightButtonProvider: React.FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage<number[]>(
    'favourites',
    [],
  );
  const [shoppingBag, setShoppingBag] = useLocalStorage<Record<number, number>>(
    'shopping-bag',
    {},
  );

  const favouritesLength = useMemo(() => favourites.length, [favourites]);
  const shoppingBagLength = useMemo(
    () => Object.keys(shoppingBag).length,
    [shoppingBag],
  );

  const value = useMemo(
    () => ({
      favouritesLength,
      shoppingBagLength,
      favourites,
      shoppingBag,
      setFavourites,
      setShoppingBag,
    }),
    [
      favouritesLength,
      shoppingBagLength,
      favourites,
      shoppingBag,
      setFavourites,
      setShoppingBag,
    ],
  );

  return (
    <RightButtonContext.Provider value={value}>
      {children}
    </RightButtonContext.Provider>
  );
};
