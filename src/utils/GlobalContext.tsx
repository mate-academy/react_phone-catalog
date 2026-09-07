import React, { createContext, useMemo, useState } from 'react';
import { KEY_CART, KEY_FAVOURITES } from '../constants/localStorage';

type StateContextType = {
  favourites: number[];
  cart: number[];
};

export const StateContext = createContext<StateContextType>({
  favourites: [],
  cart: [],
});

type ActionsContextType = {
  setFavourites: React.Dispatch<React.SetStateAction<number[]>>;
  setCart: React.Dispatch<React.SetStateAction<number[]>>;
};

export const ActionsContext = createContext<ActionsContextType>({
  setFavourites: () => {},
  setCart: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<number[]>(() => {
    const cartJs = localStorage.getItem(KEY_CART);

    return cartJs ? JSON.parse(cartJs) : [];
  });

  const [favourites, setFavourites] = useState<number[]>(() => {
    const favouritesJs = localStorage.getItem(KEY_FAVOURITES);

    return favouritesJs ? JSON.parse(favouritesJs) : [];
  });

  const states = useMemo(
    () => ({
      favourites,
      cart,
    }),
    [cart, favourites],
  );

  const actions = useMemo(
    () => ({
      setFavourites,
      setCart,
    }),
    [],
  );

  return (
    <StateContext.Provider value={states}>
      <ActionsContext.Provider value={actions}>
        {children}
      </ActionsContext.Provider>
    </StateContext.Provider>
  );
};
